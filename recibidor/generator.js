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
      var datas = file.split('\n');

      datas.shift();
      datas.reverse();

      for (var i = 1; i <= datas.length - 1; i++) {
        var pureDatas = datas[i].split(',');

        if (jsonResult.length === 0) {
          // Agrega el primer elemento
          jsonResult.push({
            "id": pureDatas[1],
            "date": pureDatas[0].substring(0, 10).trim(),
            "date_start": pureDatas[14],
            "status_process": pureDatas[2],
            "crime": pureDatas[3],
            "admin_unit": pureDatas[5],
            "mp": pureDatas[6],
            "absol_verdict": pureDatas[31],
            "guilty_verdict": pureDatas[35],
            "state": pureDatas[11],
            "changes": 0,
            "value": 1
          });
        } else {
          var notFound = false;
          // Repasar los demás
          jsonResult.forEach(function(val, ind) {
            if (pureDatas[1] === val.id) {
              // Reemplazar elemento y contar un cambio
              jsonResult[ind] = {
                "id": pureDatas[1],
                "date": pureDatas[0].substring(0, 10).trim(),
                "date_start": pureDatas[14],
                "status_process": pureDatas[2],
                "crime": pureDatas[3],
                "admin_unit": pureDatas[5],
                "mp": pureDatas[6],
                "absol_verdict": pureDatas[31],
                "guilty_verdict": pureDatas[35],
                "state": pureDatas[11],
                "changes": jsonResult[ind].changes + 1,
                "value": 1
              };
            } else if (jsonResult.length - 1 === ind) {
              notFound = true;
            }
          });

          if (notFound) {
            jsonResult.push({
              "id": pureDatas[1],
              "date": pureDatas[0].substring(0, 10).trim(),
              "date_start": pureDatas[14],
              "status_process": pureDatas[2],
              "crime": pureDatas[3],
              "admin_unit": pureDatas[5],
              "mp": pureDatas[6],
              "absol_verdict": pureDatas[31],
              "guilty_verdict": pureDatas[35],
              "state": pureDatas[11],
              "changes": 0,
              "value": 1
            });
          }
        }
      }

      window.open('data:application/json,' + escape(JSON.stringify(jsonResult)));
    }
  }
})();