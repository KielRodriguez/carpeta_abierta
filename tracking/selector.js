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
  var $folderId = $('#tracking-id-folder');

  var years = [];

  jsonDatas.forEach(function(val, ind) {
    if (years.indexOf(val.date.substr(6,4)) < 0) {
      years.push(val.date.substr(6,4));
      $years.append('<option value="'+ val.date.substr(6,4) +'">'+ val.date.substr(6,4) +'</option>');
    }
  });

  // Genera la gráfica limpia (sin datos)
  Generator.vizGenerator();

  // Observa si el usuario selecciona un año
  $years.on('change', function() {
    if ($folderId.val().trim() !== "") {
      Generator.searchAndPrintId( $folderId.val().trim(), parseInt($years.val()) );
    }
  });

  $('#search-id-folder').on('click', function() {
    if ($folderId.val().trim() !== "") {
      Generator.searchAndPrintId( $folderId.val().trim(), parseInt($years.val()) );
    }
  });
})();