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
  var states = require('../datas/states.json');

  exports.Generator = {
    // Agrega el color de acuerdo al total de cambios
    getTotalChanges: function(val, sm) {
      if (val === 0 && sm === "s") {
        return sm + "-0";
      }else if (val > 0 && val <= 15) {
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

    getTotalAmount: function(total, val, mapFilters, mapFilterSelected) {
      switch (mapFilters.length) {
        case 3:
          if (mapFilterSelected[0] === val.crime &&
            mapFilterSelected[1] === val.mp &&
            mapFilterSelected[2] === val.admin_unit
          ) {
            total++;
          }
          break;
        case 2:
          if (mapFilterSelected[0] === val[mapFilters[0]] &&
            mapFilterSelected[1] === val[mapFilters[1]]
          ) {
            total++;
          }
          break;
        case 1:
          if (mapFilterSelected[0] === val[mapFilters[0]]) {
            total++;
          }
          break;
        default:
          total++;
      }

      return total;
    },

    renderMapPops: function() {
      $('#map svg#map-viz g path').mousemove(function(e) {
        //console.log("x: " + e.pageX + "  --  y: " + e.pageY);
        $('.map-pops').remove();

				$('body').append('<div class="map-pops">' +
				  '<span class="arrow"></span>' +
					'<p class="line-data date">' +
						'<span class="title">'+ $(this).attr('level') +'</span>' +
            '<span class="count">'+ $(this).attr('level-val') +'</span>' +
						'<span class="line"></span>' +
					'</p>' +
					'<p class="line-data totals">' +
						'<span class="title">Total de cambios</span>' +
            '<span class="count">'+ $(this).attr('total-changes') +'</span>' +
					'</p>' +
					'<p class="line-data changes-folder">' +
						'<span class="title">Tipo de delito</span>' +
            '<span class="count">0</span>' +
						// '<span class="count">'+ $(this).attr('data-changes-folder') +'</span>' +
					'</p>' +
					'<p class="line-data new-folders">' +
						'<span class="title">Agencia del ministerio público</span>' +
            '<span class="count">0</span>' +
						// '<span class="count">'+ $(this).attr('data-new-folders') +'</span>' +
					'</p>' +
					'<p class="line-data complementary">' +
						'<span class="title">Unidad administrativa</span>' +
            '<span class="count">0</span>' +
						// '<span class="count">'+ $(this).attr('data-complementary') +'</span>' +
					'</p>' +
					// '<p class="line-data intermediate">' +
					// 	'<span class="title">Carpetas que cambiaron a etapa intermedia</span>' +
					// 	'<span class="count">'+ $(this).attr('data-intermediate') +'</span>' +
					// '</p>' +
					// '<p class="line-data judgment">' +
					// 	'<span class="title">Carpetas que cambiaron a juicio</span>' +
					// 	'<span class="count">'+ $(this).attr('data-judgment') +'</span>' +
					// '</p>' +
				'</div>');

        $('.map-pops').css({top: e.pageY -28, left: e.pageX + 30});

				// $('.line-data.' + $('#calendar-changes option:selected').val()).addClass('indicator-selected');

        $('#map svg#map-viz g path, .map-pops').mouseleave(function() {
          $('.map-pops').remove();
        });
      });
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

      var svg = d3.select("#map svg#map-viz");
      var path = d3.geo.path().projection(projection);

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
          .each(function(d) {
            var el = d3.select(this);
            var total = 0;

            if (mapLevel === "Municipal") {
              jsonDatas.forEach(function(val, ind) {
                if (
                  parseInt(d.properties.CVE_ENT) === parseInt(val.idState) &&
                  parseInt(d.properties.CVE_MUN) === parseInt(val.idTown) &&
                  val.date.substr(6,4) === mapYear
                ) {
                  total = self.getTotalAmount(total, val, mapFilters, mapFilterSelected);
                }
              });

              el.attr('class', self.getTotalChanges(total, 'm'));
              el.attr('total-changes', total);
              el.attr('level', 'Municipio');
              el.attr('level-val', d.properties.NOM_MUN);
            } else {
              jsonDatas.forEach(function(val, ind) {
                if (
                  parseInt(d.properties.CVE_ENT) === parseInt(val.idState) &&
                  val.date.substr(6,4) === mapYear
                ) {
                  total = self.getTotalAmount(total, val, mapFilters, mapFilterSelected);
                }
              });

              el.attr('class', self.getTotalChanges(total, 's'));
              el.attr('total-changes', total);
              el.attr('level', 'Estado');
              el.attr('level-val', states[parseInt(d.properties.CVE_ENT) - 1].name);
            }
          });

        svg.append("path")
          .datum(topojson.mesh(mx, mx.objects.municipios2, function(a, b) { return a.properties.CVE_ENT !== b.properties.CVE_ENT; }))
          .attr("class", "state-boundary")
          .attr("d", path);

        // Obtiene los datos de los path y los coloca en el tooltip
        self.renderMapPops();
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