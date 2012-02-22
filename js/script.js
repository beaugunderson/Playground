var jsonThrobber;

function addFields(collection, success) {
   return $.getJSON(collection.url, { 'limit': 1000 }, function(data) {
      var fields = [];

      _.chain(data).shuffle().first(100).each(function(entry) {
         fields = fields.concat(usableFields(entry, collection.handle));
      });

      _.each(fields, function(field) {
         field.name = field.name.replace(/\.\d+(\.|$)/g, '.<em>i</em>$1');
      });

      fields = _.uniq(fields, false, function(field) {
         return field.name;
      });

      fields = _.sortBy(fields, function(field) {
         return field.name;
      });

      collection.fields = fields;
      collection.data = data;

      success();
   });
}

// XXX refactor this
function usableFields(obj, name) {
   function recurseUsableFields(obj, name, depth, results) {
      if (depth === undefined) {
         depth = 0;
      }

      if (depth === 10) {
         return;
      }

      for (prop in obj) {
         var p = name + "." + prop;

         if (typeof(obj[prop]) === "object" && prop !== "parent") {
            recurseUsableFields(obj[prop], p, depth + 1, results);
         } else {
            var result = {
               name: p
            };

            if (typeof obj[prop] === "number") {
               result.type = "number";
            } else if (typeof obj[prop] === "string") {
               result.type = "string";
            } else {
               continue;
            }

            results.push(result);
         }
      }
   }

   var results = [];

   recurseUsableFields(obj, name, 0, results);

   return results;
}

function setupDraggables() {
   $('li', '#numbers, #strings').draggable({
      revert: 'invalid',
      opacity: 0.8,
      helper: 'clone'
   });

   $('input', '#graph-fields').droppable({
      accept: 'li',
      activate: function(event, ui) {
         $(this).addClass('drag-here');
      },
      deactivate: function(event, ui) {
         $(this).removeClass('drag-here');
      },
      drop: function(event, ui) {
         $(this).val(ui.draggable.text());
      }
   });
}

function getGraphType() {
   return graphTypes[$('input[name=graph-type]:checked').eq(0).val()];
}

function formatField(field) {
   return sprintf(
      '<li>' +
         '%(name)s' +
      '</li>', field);
}

function formatHistogramField(field) {
   return sprintf(
      '<li>' +
         '%(name)s' +
      '</li>', field);
}

function updateCollection(collection) {
   $('#numbers, #strings').html('');

   var graphType = getGraphType();

   _.chain(collection.fields).filter(function(field) { return field.type === "number"; }).each(function(field) {
      $('#numbers').append(graphType.formatter(field));
   });

   _.chain(collection.fields).filter(function(field) { return field.type === "string"; }).each(function(field) {
      $('#strings').append(graphType.formatter(field));
   });
}

function updateFields() {
   var graphType = getGraphType();

   $('#graph-fields').html('');

   if (graphType.unlimitedFields) {
      // TODO
      $('#graph-fields').append('<input id="field-1" type="text" />');
   } else {
      _.each(graphType.fields, function(field) {
         $('#graph-fields').append(sprintf(
            '<div class="input-append control-group">' +
               '<input id="%(name)s" type="text" placeholder="%(title)s" />' +
               '<span class="add-on"><a href="#"><em>ƒ</em>(<em>χ</em>)</a></span>' +
            '</div>', field));
      });
   }

   $('.add-on a').click(function() {
      var editor = CodeMirror.fromTextArea(document.getElementById('function-definition'),
      {
         value: 'function(value) {\n\treturn value;\n}',
         mode: 'javascript',
         indentUnit: 3,
         tabSize: 3,
         lineWrapping: true,
         lineNumbers: true,
         matchBrackets: true,
         extraKeys: {
            "Ctrl-Enter": function(cm) { CodeMirror.simpleHint(cm, CodeMirror.javascriptHint); }
         },
         onChange: function() {
            var content = editor.getValue();

            try {
               var f = new Function('value', content);

               $('#function-output').text(f('test data'));
            } catch(e) {
               console.log('e', e);
            }
         }
      });

      $('#function-modal').modal('show');

      return false;
   });
}

function startThrobber() {
   if (jsonThrobber === undefined) {
      jsonThrobber = new Throbber({
         size: 20,
         color: 'black'
      });

      // XXX
      jsonThrobber.appendTo(document.getElementById('json-throbber'));
   }

   jsonThrobber.start();
}

function stopThrobber() {
   if (jsonThrobber !== undefined) {
      jsonThrobber.stop();
   }
}

// The graph types and their respective options
var graphTypes = {
   table: {
      formatter: formatField,
      unlimitedFields: true
   },
   map: {
      formatter: formatField,
      fields: [
         {
            name: 'latitude',
            title: 'Latitude',
            types: ['number'],
            required: true
         },
         {
            name: 'longitude',
            title: 'Longitude',
            types: ['number'],
            required: true
         },
         {
            name: 'label',
            title: 'Label (optional)',
            types: ['number', 'string']
         }
      ]
   },
   histogram: {
      formatter: formatHistogramField,
      fields: [
         {
            name: 'value',
            title: 'Value',
            types: ['number'],
            required: true
         }
      ]
   },
   scatter: {
      formatter: formatField,
      fields: [
         {
            name: 'x',
            title: 'X value',
            types: ['number'],
            required: true
         },
         {
            name: 'y',
            title: 'Y value',
            types: ['number'],
            required: true
         },
         {
            name: 'label',
            title: 'Label (optional)',
            types: ['string']
         }
      ]
   }
};

var collections;

// State:
// - Selected data source (collection at this point)
// - Selected graph type
// - Selected fields
//   - Function definitions for each field

$(function() {
   if (baseUrl === false) {
      window.alert("Couldn't find your locker, you might need to add a config.js (see <a href=\"https://me.singly.com/Me/devdocs/\">the docs</a>)");
   }

   // The collection types and their respective URLs
   collections = {
      places: {
         name: "Places",
         handle: "places",
         url: baseUrl + '/Me/places/'
      },
      contacts: {
         name: "Contacts",
         handle: "contacts",
         url: baseUrl + '/Me/contacts'
      },
      links: {
         name: "Links",
         handle: "links",
         url: baseUrl + '/Me/links/'
      },
      photos: {
         name: "Photos",
         handle: "photos",
         url: baseUrl + '/Me/photos/'
      }
   };

   // Update the UI when the user selects a collection type
   $('#data-sources').chosen().change(function() {
      updateCollection(collections[$(this).val()]);

      setupDraggables();
   });

   // Update the UI when the user selects a graph type
   $('input[name=graph-type]').change(function() {
      updateFields();
   });

   updateFields();

   var requests = [];

   startThrobber();

   // Get the data from Singly
   _.each(collections, function(collection) {
      // Populate the list of JSON fields with a sample of the actual data
      requests.push(addFields(collection, function() {
         // Add the collection type to the dropdown once we have the data
         $('#collections').append(sprintf('<option value="%(handle)s">%(name)s</option>', collection));

         $('#data-sources').trigger('liszt:updated');
      }));
   });

   // We use apply here because requests is an array
   // and $.when expects multiple arguments instead
   $.when.apply($, requests).done(function() {
      // Stop the throbber when all of the requests complete
      stopThrobber();
   });
});
