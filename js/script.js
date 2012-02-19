function explore(collection) {
   $.getJSON(collection.url, { 'limit': 1000 }, function(data) {
      var fields = [];

      _.chain(data).shuffle().first(100).each(function(entry) {
         fields = fields.concat(usableFields(entry, collection.handle));
      });

      _.each(fields, function(field) {
         field.name = field.name.replace(/\.\d+(\.|$)/g, '.<em>index</em>$1');
      });

      fields = _.uniq(fields, false, function(field) {
         return field.name;
      });

      fields = _.sortBy(fields, function(field) {
         return field.name;
      });

      collection.fields = fields;
   });
}

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

$(function() {
   if (baseUrl === false) {
      window.alert("Couldn't find your locker, you might need to add a config.js (see <a href=\"https://me.singly.com/Me/devdocs/\">the docs</a>)");
   }

   var placesUrl = baseUrl + '/Me/places/';
   var contactsUrl = baseUrl + '/Me/contacts/';
   var linksUrl = baseUrl + '/Me/links/';
   var photosUrl = baseUrl + '/Me/photos/';

   var collections = {
      places: {
         name: "Places",
         handle: "places",
         url: placesUrl,
         fields: []
      },
      contacts: {
         name: "Contacts",
         handle: "contacts",
         url: contactsUrl,
         fields: []
      },
      links: {
         name: "Links",
         handle: "links",
         url: linksUrl,
         fields: []
      },
      photos: {
         name: "Photos",
         handle: "photos",
         url: photosUrl,
         fields: []
      }
   };

   _.each(collections, function(collection) {
      $('#collections').append(sprintf('<option value="%(handle)s">%(name)s</option>', collection));

      explore(collection);
   });

   $('#collections').chosen().change(function() {
      var option = $(this).val();

      var collection = _.find(collections, function(c) {
         return c.handle === option;
      });

      $('#numbers, #strings').html('');

      _.chain(collection.fields).filter(function(field) { return field.type === "number"; }).each(function(field) {
         $('#numbers').append(sprintf('<option value="%(name)s">%(name)s</option>', field));
      });

      _.chain(collection.fields).filter(function(field) { return field.type === "string"; }).each(function(field) {
         $('#strings').append(sprintf('<option value="%(name)s">%(name)s</option>', field));
      });

      $("#fields").trigger("liszt:updated");
   });

   $('#fields').chosen();
});
