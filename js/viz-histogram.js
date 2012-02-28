function formatHistogramField(field) {
   return sprintf(
      '<li>' +
         '%(name)s' +
      '</li>', field);
}

function formatHistogramData(fields, data) {
   // TODO: Change data format to include context (for hovertips, etc.)
   var data = [];

   // XXX: Don't hardcode this?
   var path = $('#graph-fields input[data-field=value]').val();

   var source = getSource();

   _.each(source.data, function(datum) {
      data.push(propertyByPath(datum, path));
   });

   // Coerce strings to their length for XXX numeric fields
   data = _.map(data, function(datum) {
      if (typeof datum == "string") {
         return datum.length;
      }

      return datum;
   });

   // Return the scrubbed data
   return _.without(data, undefined, null, false, NaN, '');
}

function renderHistogram(data) {
   var uniqueValues = _.uniq(data).length;

   var settings = {
      data: data,
      height: 400,
      bins: Math.min(uniqueValues, 25),
      bottompad: 15,
      toppad: 25,
      labelsize: 10,
      labelGenerator: function(d, i) {
         var val = d3.round(d.y);

         if (val == 0) {
            return '';
         } else {
            return val;
         }
      },
      rangeGenerator: function(d) {
         return sprintf('%d', Math.ceil(d.x));
      }
   };

   // XXX: Don't hardcode this?
   var path = $('#graph-fields input[data-field=value]').val();

   var source = getSource();

   $('#title').html(sprintf('Histogram of <em>%s</em> data', source.name));
   $('#sub-title').text(path);

   $('#canvas').d3histogram(settings);
}
