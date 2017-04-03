// status/generator
//-----------------------------
//
// Módulo para generar la gráfica correspondiente
// de acuerdo a cada filtro seleccionado en la sección
// de estatus de carpetas
// ====================================================

(function() {
  'use strict';

  exports.Generator = {
    loadJsonTreemap: function(selected, title) {
      var jsonTreemap = [];

      //Carga json Treemap
      $.ajax({
        url: "../datas/carpa.json",
        async: false,
        success: function(data) {
          data.forEach(function(el) {
            jsonTreemap.push({
              nivel1: el[selected],
              valor: 1
            });
          });
        }
      });

      drawTreemap(title);

      function drawTreemap(showText){
        //instantiate d3plus Treemap
        var visualization = d3plus.viz()
        .container("#status-viz") // container DIV to hold the visualization
        .data(jsonTreemap)
        .id({
          "value": ["nivel1"],
          "grouping": false            // grouping set to false ungroups parent nesting
        })
        .type("tree_map") //visualization type
        .size("valor") //sizing of blocks
        .color({
          "heatmap": [ "#d16d65" , "#e2893b", "#ebad69", "#edd268", "#bad4a3" ],
          "value": "valor"
        })
        .font({ "family": "'Open Sans', Helvetica, Arial, sans-serif", "size": 14 })
        .format({
          "text": function(text, params) {

            if (text === "valor") {
              return showText;
            }
            else {
              return d3plus.string.title(text, params);
            }
          },
          "number": function(number, params) {
            //var formattedFirst = d3plus.number.format(number, params);
            //var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var n = parseFloat(number).toFixed(1);
            var formatted = Number(n).toLocaleString('en');
            if (params.key == "valor") {
              //return "$" + formatted;
              return formatted;
            }
            else {
              return formatted + '%';
            }
          },
          "locale":"es_ES"
        })
        .tooltip({
          "small":350
        })
        //.labels({"align": "middle", "valign": "top", "text" : "valor"})
        .height(600)
        .resize(true)
        .ui({"padding":15})
        .draw()  //finally, draw the visualization!
      }
    }
  }
})();