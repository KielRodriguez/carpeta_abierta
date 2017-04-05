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
    Generator.loadJsonTreemap("guilty_verdict", "Cantidad de sentencias");
  });

  function clearGrapich() {
    var $graph = $("#status-viz");
    var $fatherEl = $graph.parent();

    $graph.remove();
    $fatherEl.append('<div id="status-viz" class="col-md-12"></div>');
  }

  function activeButton(buttonEl) {
    $("#status-activators")
    .find(".btn-primary")
    .removeClass("btn-primary");
    buttonEl.addClass("btn-primary");
  }
})();