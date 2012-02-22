// A jQuery plugin which creates histograms using d3.js
(function($) {
   $.fn.d3histogram = function(settings) {
      settings = jQuery.extend({
         data: [],
         width: null, // uses the width of the containing element
         height: null, // uses the height of the containing element
         bins: 10,
         bottompad: 10, // pixels of room to leave at the bottom for binlabels
         leftpad: 15,
         toppad: 10,
         labelsize: null, // uses the height of the padding - 2 for font size
         // function which generates bin labels
         // by default it labels the bins from 1 to N, where N is the number of bins
         labelGenerator: function(d, i) { return i+1+""; },
         rangeGenerator: function(d, i) { return i+1+""; }
      }, settings);

      return this.each(function() {
         var $this = $(this);
         var w = settings.width === null ? $this.width() : settings.width;
         var h = settings.height === null ? $this.height() : settings.height;
         var ls = settings.labelsize === null ? settings.bottompad - 2 : settings.labelsize;

         d3.select(this).each(function(d, i) {
            var histogram = d3.layout.histogram().bins(settings.bins)(settings.data);

            var x = d3.scale.ordinal()
               .domain(histogram.map(function(d) { return d.x; }))
               .rangeRoundBands([settings.leftpad, w - settings.leftpad]);

            var y = d3.scale.linear()
               .domain([0, d3.max(histogram, function(d) { return d.y; })])
               .range([0, h - settings.bottompad - settings.toppad]);

            var vis = d3.select(this).append("svg:svg")
               .attr("class", "chart")
               .attr("width", w)
               .attr("height", h);

            vis.selectAll("rect")
               .data(histogram)
               .enter().append("svg:rect")
                  // move the bars down by their total height, so they animate up (not down)
                  .attr("transform", function(d) { return "translate(" + x(d.x) + "," + (h - y(d.y) - settings.bottompad) + ")"; })
                  .attr("width", x.rangeBand())
                  // they all start at zero height
                  .attr("y", function(d) { return y(d.y); })
                  .attr("height", 0)
               .transition()
                  .duration(750)
                  // they all animate up to the top of their context, which would be the top
                  // of the chart if not for the transform above.
                  .attr("y", 0)
                  .attr("height", function(d) { return y(d.y); });

            // bottom line
            vis.append("svg:line")
               .attr("x1", settings.leftpad)
               .attr("x2", w)
               .attr("y1", h - settings.bottompad)
               .attr("y2", h - settings.bottompad);

            // counts
            vis.selectAll("text.count")
               .data(histogram)
               .enter().append("svg:text")
                  .attr("x", function(d) { return x(d.x) + x.rangeBand() / 2; })
                  .attr("y", function(d) { return (h - y(d.y)) - 25; })
                  .attr("class", "count")
                  .attr("width", x.rangeBand())
                  .attr("text-anchor", function(d) { return "middle"; })
                  .attr("font-size", ls)
                  .attr("opacity", 0.0)
                  .text(settings.labelGenerator)
               .transition()
                  .duration(750)
                  .attr("opacity", 1.0);

            // range numbers
            vis.selectAll("text.range")
               .data(histogram)
               .enter().append("svg:text")
                  .attr("x", function(d) { return x(d.x); })
                  .attr("y", h)
                  .attr("class", "range")
                  .attr("width", x.rangeBand())
                  .attr("text-anchor", function(d) { return "middle"; })
                  .attr("font-size", ls)
                  .text(settings.rangeGenerator);

            // range numbers (the last one)
            // XXX: The worst possible way to do this.
            vis.selectAll("text.lastRange")
               .data([histogram[histogram.length - 1]])
               .enter().append("svg:text")
                  .attr("x", function(d) {
                     return x(d.x) + x.rangeBand(); })
                  .attr("y", h)
                  .attr("class", "lastRange")
                  .attr("width", x.rangeBand())
                  .attr("text-anchor", function(d) { return "middle"; })
                  .attr("font-size", ls)
                  .text(function(d) {
                     return settings.rangeGenerator({ x: d.x + d.dx });
                  });
         });
      });
   };
})(jQuery);
