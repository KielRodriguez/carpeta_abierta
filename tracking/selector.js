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

  // var content = "";

  // titleDatas.forEach(function(val, ind) {
  //   content += '<div class="card item item-horizontal">' +
  //                '<h5>'+ val +'</h5>' +
  //                '<p>'+ ++ind +'</p>' +
  //              '</div>'
  //   ;
  // });

  // $('#horizontal-scroll').append(
  //   '<h4>Estatus actual de la carpeta</h4>' +
  //   '<p>25 Mayo 2017</p>' +
  //   '<div class="content owl-carousel owl-theme">' +
  //     content +
  //   '</div>'
  // );

  // owl.owlCarousel({
  //   loop: true,
  //   margin: 10,
  //   nav: false,
  //   dots: false,
  //   responsive: {
  //     0: {
  //       items:1
  //     },
  //     600: {
  //       items:3
  //     },
  //     1000: {
  //       items:5
  //     }
  //   }
  // }).trigger('refresh.owl.carousel');

  // $('#tracking .left-click').on('click', function() {
  //   owl.trigger('prev.owl.carousel');
  // });
  // $('#tracking .right-click').on('click', function() {
  //   owl.trigger('next.owl.carousel');
  // });
})();