var jsonThrobber;

function addFields(collection, eachCallback, allCallback) {
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

      eachCallback();
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

function formatHistogramField(field) {
   return sprintf('<li>' +
      '%(name)s' +
      '<a href="#">+value</a>' +
      '</li>', field);
}

function updateCollection(collection) {
   $('#numbers, #strings').html('');

   _.chain(collection.fields).filter(function(field) { return field.type === "number"; }).each(function(field) {
      $('#numbers').append(sprintf('<li>%(name)s</li>', field));
   });

   _.chain(collection.fields).filter(function(field) { return field.type === "string"; }).each(function(field) {
      $('#strings').append(sprintf('<li>%(name)s</li>', field));
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
      fields: {
         unlimited: ['number', 'string']
      }
   },
   map: {
      fields: {
         latitude: {
            types: ['number']
         },
         longitude: {
            types: ['number']
         },
         label: {
            types: ['number', 'string']
         }
      }
   },
   histogram: {
      formatter: formatHistogramField,
      fields: {
         value: {
            types: ['number']
         }
      }
   },
   scatter: {
      fields: {
         x: {
            types: ['number']
         },
         y: {
            types: ['number']
         },
         label: {
            types: ['string']
         }
      }
   }
};

var collections;

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
   $('#collections').chosen().change(function() {
      updateCollection(collections[$(this).val()]);
   });

   // Update the UI when the user selects a graph type
   $('input[name=graph-type]').change(function() {
      var checked = $('input[name=graph-type]:checked').eq(0).val();
   });

   var requests = [];

   startThrobber();

   // Get the data from Singly
   _.each(collections, function(collection) {
      // Populate the list of JSON fields with a sample of the actual data
      requests.push(addFields(collection, function() {
         // Add the collection type to the dropdown once we have the data
         $('#collections').append(sprintf('<option value="%(handle)s">%(name)s</option>', collection));
         $('#collections').trigger('liszt:updated');
      }));
   });

   // We use apply here because requests is an array
   // and $.when expects multiple arguments
   $.when.apply($, requests).done(function() {
      // Stop the throbber when all of the requests complete
      stopThrobber();
   });
});
