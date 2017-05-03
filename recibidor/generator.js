// recibidor/generator
//-----------------------------
//
// Módulo para generar el archivo JSON a partir de un
// archivo con extensión CSV
// ====================================================

(function() {
  'use strict';

  exports.Generator = {
    jsonGenerator: function(file) {
      var jsonResult = [];
      var ids = [];
      var datas = file.split('\n');
      var titles = datas[0].replace(/"/g,"").split(",");
      var states = require('../datas/states.json');

      // En vez de iniciar con: 2017 - 2014
      // revierte a: 2014 - 2017
      // Para reemplazar datos anteriores
      datas.shift();
      datas.reverse();

      for (var i = 1; i <= datas.length - 1; i++) {
        var pureDatas = datas[i].replace(/"/g,"").split(',');
        // Seleccionador del estado por id de estado
        // menos 1 para que coincida con el indice del array
        var idState = pureDatas[11] - 1;
        var state = "";
        if (idState < 0) { state = states[0].name }
        else if (idState === 32) { state = states[31].name }
        else { state = states[idState].name }

        // Seleccionador de veredicto
        // Sentencia absolutoria = pureDatas[31]
        // Sentencia condenatoria = pureDatas[35]
        var veredict = "";
        if (pureDatas[31] === "S" && pureDatas[35] === "N") { veredict = "Sentencia absolutoria" }
        else if (pureDatas[31] === "N" && pureDatas[35] === "S") { veredict = "Sentencia condenatoria" }
        else if (pureDatas[31] === "N" && pureDatas[35] === "N") { veredict = "Sin sentencia" }
        else if (pureDatas[31] === "S" && pureDatas[35] === "S") { veredict = "Sentencia condenatoria y absolutoria" }

        var indexId = ids.indexOf(pureDatas[1]);
        if (indexId < 0) {
          // Agrega sólo el id para poder compararlo
          // en la otra vuelta
          ids.push(pureDatas[1]);
          
          // Agrega un elemento no existente aún
          jsonResult.push({
            "id": pureDatas[1],
            "date": pureDatas[0].substring(0, 10).trim(),
            "date_start": pureDatas[14],
            "status_process": pureDatas[2],
            "crime": pureDatas[3],
            "admin_unit": pureDatas[5],
            "mp": pureDatas[6],
            "verdict": veredict,
            "state": state,
            "changes": 0,
            "value": 1
          });
        } else {
          // Reemplazar elemento y contar un cambio
          jsonResult[indexId] = {
            "id": pureDatas[1],
            "date": pureDatas[0].substring(0, 10).trim(),
            "date_start": pureDatas[14],
            "status_process": pureDatas[2],
            "crime": pureDatas[3],
            "admin_unit": pureDatas[5],
            "mp": pureDatas[6],
            "verdict": veredict,
            "state": state,
            "changes": jsonResult[indexId].changes + 1,
            "value": 1
          };
        }
      }

      // Abre el json generado en una ventana aparte
      window.open('data:application/json,' + escape(JSON.stringify(jsonResult)));
    }
  }
})();