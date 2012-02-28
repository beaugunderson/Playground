var jsonThrobber;

var RE_NUMERIC_FIELD = /\.\d+(\.|$)/g;

function addFields(source, success) {
   return $.getJSON(source.url, { 'limit': 250 }, function(data) {
      var fields = [];

      _.chain(data).shuffle().first(100).each(function(entry) {
         fields = fields.concat(usableFields(entry));
      });

      _.each(fields, function(field) {
         // XXX: Hack. Why doesn't /g work?
         field.name = field.name.replace(RE_NUMERIC_FIELD, '.<em>i</em>$1');
         field.name = field.name.replace(RE_NUMERIC_FIELD, '.<em>i</em>$1');
      });

      fields = _.uniq(fields, false, function(field) {
         return field.name;
      });

      fields = _.sortBy(fields, function(field) {
         return field.name;
      });

      // XXX: Temporary
      fields = _.filter(fields, function(field) {
         return !/<em>/.test(field.name);
      });

      source.fields = fields;
      source.data = data;

      success();
   });
}

// XXX: Refactor this.
function usableFields(obj, name) {
   function recurseUsableFields(obj, name, depth, results) {
      if (depth === undefined) {
         depth = 0;
      }

      if (depth === 10) {
         return;
      }

      for (prop in obj) {
         var p = prop;

         if (name !== '' && name !== undefined) {
            p = name + "." + prop;
         }

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

   recurseUsableFields(obj, '', 0, results);

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

         $(this).trigger('change');
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

function updateSource(collection) {
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
         var $field = $(sprintf(
            '<div class="input-append control-group">' +
               '<input id="%(name)s" data-field="%(name)s" type="text" placeholder="%(title)s" class="input-medium" />' +
               '<span class="add-on"><a href="#"><em>ƒ</em>(<em>χ</em>)</a></span>' +
            '</div>', field)).appendTo('#graph-fields');

         $field.find('input').bind('change keyup', function() {
            if (validateFields()) {
               render();
            }
         });
      });
   }

   $('.add-on a').click(function() {
      var editor = CodeMirror.fromTextArea(document.getElementById('function-definition'),
         {
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

               var f;

               // Try to create the function
               try {
                  f = new Function('value', content);
               } catch(e) {
                  $('#function-output').html(sprintf('compile error: <em>%s</em>', e.message));
               }

               if (f === undefined) {
                  return;
               }

               // Try to run the function on the test data
               try {
                  $('#function-output').text(String(f('test data')));
               } catch(e) {
                  $('#function-output').html(sprintf('run error: <em>%s</em>', e.message));
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
      formatData: formatHistogramData,
      render: renderHistogram,
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
   },
   line: {
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

// Get the list of collections from the map
function collectionsFromMap(map) {
   var collections = {};

   _.chain(map).filter(function(collection) {
      return collection.is === "collection" &&
         collection.handle !== "search";
   }).each(function(collection) {
      collections[collection.handle] = {
         name: collection.title,
         handle: collection.handle,
         url: sprintf('%s/Me/%s', baseUrl, collection.handle)
      };
   });

   return collections;
}

// Get the list of connectors from the map
function connectorsFromMap(map) {
   var connectors = {};

   _.chain(map).filter(function(connector) {
      return connector.synclets !== undefined;
   }).each(function(connector) {
      connectors[connector.handle] = {
         name: connector.title,
         handle: connector.handle,
         url: sprintf('%s/Me/%s', baseUrl, connector.handle),
         providers: {}
      };

      _.each(connector.synclets, function(synclet) {
         connectors[connector.handle].providers[synclet.name] = {
            name: sprintf('%s/%s', connector.handle, synclet.name),
            handle: synclet.name,
            url: sprintf('%s/getCurrent/%s', connectors[connector.handle].url, synclet.name)
         };
      });
   });

   return connectors;
}

// Runs when any input is changed
function validateFields() {
   var graphType = getGraphType();
   var source = getSource();

   var validates = true;

   _.each(graphType.fields, function(field) {
      var $field = $(sprintf('#graph-fields input[data-field=%s]', field.name));
      var path = $field.val();

      $field.parent('.control-group').removeClass('success');
      $field.parent('.control-group').removeClass('error');

      var state = 'success';

      if (field.required && path === '') {
         state = 'error'
         validates = false;
      }

      var definitionField = _.find(graphType.fields, function(f) {
         return f.name == field.name;
      });

      var sourceField = _.find(source.fields, function(f) {
         return f.name == path;
      });

      if (definitionField === undefined ||
         sourceField === undefined) {
         state = 'error';
         validates = false;
      }/* else if (!_.contains(definitionField.types, sourceField.type)) {
         state = 'error';
         validates = false;
      } */

      $field.parent('.control-group').addClass(state);
   });

   return validates;
}

function render() {
   var graphType = getGraphType();

   var data = graphType.formatData(graphType.fields);

   $('#canvas').html('');

   graphType.render(data);
}

function propertyByPath(obj, path) {
   var segments = path.split('.');

   var currentObj = obj;

   try {
      _.each(segments, function(segment) {
         currentObj = currentObj[segment];
      });
   } catch(e) {
      return undefined;
   }

   return currentObj;
}

// XXX: Refactor this
function getSource() {
   var $selected = $('#data-sources').find(':selected');

   var data = $selected.data();

   var collection = sources.collections[data['collection']];

   var connector = sources.connectors[data['connector']];
   var provider = data['provider'];

   var push = sources.push[data['dataset']];

   var source;

   if (collection) {
      return collection;
   } else if (connector && provider) {
      return connector.providers[provider];
   } else if (push) {
      return push;
   }
}

function applyFunction(f, values) {
   explore.yy = {
      data: {
         values: values
      },
      _: _,
      apply: function(data, f) {
         return _.map(data, function(datum) {
            return f(datum);
         });
      }
   };

   return explore.parse(f);
}

var sources = {};

// State:
// - Selected data source
// - Selected graph type
// - Selected fields
//   - Function definitions for each field

function getPushDatasets(push) {
   var datasets = {};

   _.each(push, function(dataset, i) {
      datasets[i] = {
         name: i,
         handle: i,
         url: sprintf('%s/push/%s/getCurrent', baseUrl, i)
      };
   });

   return datasets;
}

$(function() {
   if (baseUrl === false) {
      window.alert("Couldn't find your locker, you might need to add a config.js " +
         "(see <a href=\"https://me.singly.com/Me/devdocs/\">the docs</a>)");
   }

   $.getJSON(baseUrl + '/push', function(datasets) {
      sources.push = getPushDatasets(datasets);

      // Add push datasets
      if (_.toArray(sources.push).length > 0) {
         var $push = $('<optgroup label="Push"></optgroup>').appendTo('#data-sources');

         _.chain(sources.push).sortBy(function(dataset) {
            return dataset.name;
         }).each(function(dataset) {
            $push.append(sprintf('<option data-dataset="%(handle)s">%(name)s</option>',
               dataset));
         });
      }

      $('#data-sources').trigger('liszt:updated');
   });

   $.getJSON(baseUrl + '/map', function(map) {
      sources.collections = collectionsFromMap(map);
      sources.connectors = connectorsFromMap(map);

      var requests = [];

      // Add collections
      _.chain(sources.collections).sortBy(function(collection) {
         return collection.name;
      }).each(function(collection) {
         $('#collections').append(sprintf('<option data-collection="%(handle)s">%(name)s</option>',
            collection));
      });

      // Add connectors
      _.chain(sources.connectors).sortBy(function(connector) {
         return connector.name;
      }).each(function(connector) {
         var $providers = $(sprintf('<optgroup data-connector="%(handle)s" label="%(name)s"></optgroup>',
            connector)).appendTo('#data-sources');

         _.chain(connector.providers).sortBy(function(provider) {
            return provider.name;
         }).each(function(provider) {
            $providers.append(sprintf('<option data-connector="%s" data-provider="%s">%s</option>',
               connector.handle,
               provider.handle,
               provider.name));
         });
      });

      $('#data-sources').trigger('liszt:updated');
   });

   // Update the UI when the user selects a collection type
   $('#data-sources').chosen().change(function() {
      var source = getSource();

      $('#source-name').text(source.name);

      startThrobber();

      // Populate the list of JSON fields with a sample of the actual data
      addFields(source, function() {
         if (source.fields.length > 0) {
            $('#no-data-returned').hide();
         } else {
            $('#no-data-returned').show();
         }

         updateSource(source);

         setupDraggables();

         stopThrobber();
      });
   });

   // Update the UI when the user selects a graph type
   $('input[name=graph-type]').change(function() {
      updateFields();
   });

   updateFields();
});
