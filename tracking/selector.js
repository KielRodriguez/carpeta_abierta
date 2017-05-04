// tracking/selector
//-----------------------------
//
// Módulo para obtener la selección requerida del
// usuario (carpeta y año) en la sección de
// seguimiento de carpeta
// ====================================================

(function() {
  'use strict';

  var Generator = require('../tracking/generator').Generator;
  var jsonDatas = require('../datas/carpa.json');

  // Elementos
  var $years = $('#tracking-years');

  var years = [];

  jsonDatas.forEach(function(val, ind) {
    if (years.indexOf(val.date.substr(6,4)) < 0) {
      years.push(val.date.substr(6,4));
      $years.append('<option value="'+ val.date.substr(6,4) +'">'+ val.date.substr(6,4) +'</option>');
    }
  });

  Generator.vizGenerator("", parseInt(years[0]));
})();