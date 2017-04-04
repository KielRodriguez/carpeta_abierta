// recibidor/selector
//-----------------------------
//
// Módulo para obtener un archivo CSV y convertirlo
// en un archivo JSON únicamente con los datos necsarios
// para visualizar las gráficas requeridas
// ======================================================

(function() {
  'use strict';

  var fileInput;

  $(document).on('change', ':file', function() {
    var input = $(this);
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    $('#filename').val(label);
    fileInput = input;
  });

  $('#createJson').on('click', function() {
    console.dir(fileInput);
  });
})();