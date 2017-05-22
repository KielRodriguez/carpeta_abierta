// map/generator
//-----------------------------
//
// Módulo para generar la gráfica correspondiente
// de acuerdo a cada filtro seleccionado en la sección
// de mapa coroplético
// ====================================================

(function() {
  'use strict';

  var jsonDatas = require('../datas/carpa.json');
  var d3 = require('d3');

  exports.Generator = {
    // Agrega el color de acuerdo al total de cambios
    getTotalChanges: function(val, sm) {
      if (val > 0 && val <= 15) {
        return sm + "-1-15";
      } else if (val > 15 && val <= 30) {
        return sm + "-16-30";
      } else if (val > 30 && val <= 60) {
        return sm + "-31-60";
      } else if (val > 60 && val <= 140) {
        return sm + "-61-140";
      } else if (val > 140) {
        return sm + "-141";
      }
    },

    // Carga el mapa con los filtros correspondientes
    loadMap: function(mapLevel, mapFilters, mapFilterSelected, mapYear) {
      var self = this;
      var width = 960,
          height = 670;

      var projection = d3.geo.conicConformal()
          .rotate([102, 0])
          .center([0, 24])
          .parallels([17.5, 29.5])
          .scale(1850)
          .translate([width / 2, height / 2]);

      var svg = d3.select("svg#map-viz");
      var path = d3.geo.path().projection(projection);
      var tooltip = svg.append("g")
                      .style("position", "absolute")
                      .style("z-index", "999999999")
                      .style("visibility", "hidden")
                      .text("a simple tooltip");

      d3.json("../map/mx_idMun.json", function(error, mx) {
        if (error) throw error;

        svg.append("g")
          .attr("class", "municipalities")
          .selectAll("path")
          .data(topojson.feature(mx, mx.objects.municipios2).features)
          .enter().append("path")
          .attr("d", path)
          .attr("id-estado", function(d) { return parseInt(d.properties.CVE_ENT) })
          .attr("id-municipio", function(d) { return parseInt(d.properties.CVE_MUN) })
          // .attr("class", function(d) {
          //   var total = 0;

          //   jsonDatas.forEach(function(val, ind) {
          //     if (
          //       parseInt(d.properties.CVE_ENT) === parseInt(val.idState) &&
          //       parseInt(d.properties.CVE_MUN) === parseInt(val.idTown) &&
          //       val.date.substr(6,4) === mapYear
          //     ) {
          //       total++;
          //     }
          //   });

          //   return self.getTotalChanges(total, 'm');
          // })
          ;
          // .on("mouseover", function(d) {
          //   $('#map-viz path[id-estado="'+ d.properties.state +'"]').css({fill: 'red', stroke: 'red'});
          // })
          // .on("mouseout", function(d) {
          //   $('#map-viz path').css({fill: '#fff', stroke: '#d2d2d2'});
          // })

          //  .on("mouseover", function(event){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          //  .on("mousemove", function(event){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          //  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

        svg.append("path")
          .datum(topojson.mesh(mx, mx.objects.municipios2, function(a, b) { return a.properties.CVE_ENT !== b.properties.CVE_ENT; }))
          .attr("class", "state-boundary")
          .attr("d", path);

        // svg.append("path")  
        //    .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state === b.properties.state && a !== b; }))
        //    .attr("class", "municipality-boundary")
        //    .attr("d", path);
      });

      // // sample data array
      // var sample_data = [
      //   {"value": 7123, "country": "Colima", "name": "Colima"},
      //   {"value": 1349, "country": "Jalisco", "name": "Jalisco"}
      // ]
      // // instantiate d3plus
      // var visualization = d3plus.viz()
      //   .container("#map-viz")        // container DIV to hold the visualization
      //   .data(sample_data)        // data to use with the visualization
      //   .coords("../datas/edostopo.json") // pass topojson coordinates
      //   // .coords({
      //   //   "solo": ["properties.estado"],
      //   //   "value": "../datas/edostopo.json"
      //   //   // "value": "http://d3plus.org/topojson/countries.json"
      //   // })
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