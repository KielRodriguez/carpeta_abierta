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
  var Generator = require('../recibidor/generator.js').Generator;

  $(document).on('change', ':file', function() {
    var input = $(this);
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    var indExt = label.indexOf(".");
    var extension = label.substring(indExt + 1);

    $('#filename').val(label);
    
    if (extension === "csv" || extension === "CSV") {
      fileInput = document.getElementById('filevalue');
    } else {
      alert("Sólo se admiten archivos con extension CSV");
    }
  });

  $('#createJson').on('click', function() {
    var reader = new FileReader();

    reader.readAsBinaryString(fileInput.files[0]);

    reader.onload = function(e) {
      Generator.jsonGenerator(e.target.result);
    }
  });
})();