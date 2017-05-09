// map/generator
//-----------------------------
//
// Módulo para generar la gráfica correspondiente
// de acuerdo a cada filtro seleccionado en la sección
// de mapa coroplético
// ====================================================

(function() {
  'use strict';

  exports.Generator = {
    watch: function() {
      console.log("Im watching you!!");

      // // sample data array
      // var sample_data = [
      //   {"value": 7123, "country": "namex", "name": "México"},
      //   {"value": 1349, "country": "nausa", "name": "Estados Unidos"}
      // ]
      // // instantiate d3plus
      // var visualization = d3plus.viz()
      //   .container("#map-viz")        // container DIV to hold the visualization
      //   .data(sample_data)        // data to use with the visualization
      //   //.coords("http://d3plus.org/topojson/countries.json") // pass topojson coordinates
      //   .coords({
      //     "solo": ["namex"],
      //     "value": "http://d3plus.org/topojson/countries.json"
      //   })
      //   .type("geo_map")          // visualization type
      //   .id("country")            // key for which our data is unique on
      //   .text("name")             // key to use for display text
      //   .color("value")           // key for coloring countries
      //   .tooltip("value")         // keys to place in tooltip
      //   .draw()                   // finally, draw the visualization!
      // ;



      // var svg = d3.select("svg");

      // var path = d3.geoPath();

      // d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      //   if (error) throw error;

      //   svg.append("g")
      //       .attr("class", "counties")
      //     .selectAll("path")
      //     .data(topojson.feature(us, us.objects.counties).features)
      //     .enter().append("path")
      //       .attr("d", path);

      //   svg.append("path")
      //       .attr("class", "county-borders")
      //       .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; })));
      // });
    }
  }
})();