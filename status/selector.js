// status/selector
//-----------------------------
//
// Módulo para obtener la selección requerida del
// usuario (delito, proceso penal, unidad administrativa,
// ministerio público, entidad y sentencia) en la sección
// de estatus de carpetas
// ======================================================

(function() {
  'use strict';

  var Generator = require('../status/generator.js').Generator;
  Generator.loadJsonTreemap("crime", "Cantidad de delitos");

  var $crime = $('#status-crime');
  var $criminalProcess = $('#status-criminal-process');
  var $adminUnit = $('#status-admin-unit');
  var $mp = $('#status-mp');
  var $state = $('#status-state');
  var $judgment = $('#status-judgment');

  $(window).on('resize', function() {
    var element = $('#status-activators').find('.btn-primary')[0].id;
    
    $('#' + element).trigger('click');
  });

  // bind events
  $crime.on('click', function() {
    activeButton($crime);
    clearGrapich();
    Generator.loadJsonTreemap("crime", "Cantidad de delitos");
  });

  $criminalProcess.on('click', function() {
    activeButton($criminalProcess);
    clearGrapich();
    Generator.loadJsonTreemap("status_process", "Cantidad de etapas");
  });

  $adminUnit.on('click', function() {
    activeButton($adminUnit);
    clearGrapich();
    Generator.loadJsonTreemap("admin_unit", "Cantidad de unidades");
  });

  $mp.on('click', function() {
    activeButton($mp);
    clearGrapich();
    Generator.loadJsonTreemap("mp", "Cantidad de agencias");
  });

  $state.on('click', function() {
    activeButton($state);
    clearGrapich();
    Generator.loadJsonTreemap("state", "Cantidad de entidades");
  });

  $judgment.on('click', function() {
    activeButton($judgment);
    clearGrapich();
    Generator.loadJsonTreemap("verdict", "Cantidad de sentencias");
  });

  function clearGrapich() {
    var $graph = $("#status-viz");
    var $fatherEl = $graph.parent();

    $graph.remove();
    $fatherEl.append('<div id="status-viz" class="col-md-12"></div>');
  }

  function activeButton(buttonEl) {
    var titles = {
      "Delito": "Se muestra el total de carpetas de investigación por tipo de delito.",
      "Proceso Penal": "Se muestra el total de carpetas por etapa del proceso penal, dado el estatus en el que se encuentran a la fecha de la última actualización.",
      "Unidad Administrativa": "Se muestra el total de carpetas distribuidas por Unidad Administrativa encargada de la investigación.",
      "Ministerio Público": "Se muestra el total de carpetas distribuidas por agencia del ministerio público encargada de llevar a cabo la investigación.",
      "Entidad": "Se muestra el total de carpetas de investigación por entidad.",
      "Sentencia": "Se muestra la distribución de las carpetas por tipo de sentencia, dado el estatus en el que se encuentran a la fecha de la última actualización."
    }

    $("#status-activators")
    .find(".btn-primary")
    .removeClass("btn-primary");
    buttonEl.addClass("btn-primary");

    // Agrega un título al la gráfica seleccionada
    $('#title-status-activator').text(titles[buttonEl.text()]);
  }
})();