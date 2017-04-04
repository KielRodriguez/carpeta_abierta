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
  Generator.loadJsonTreemap("Delito abreviado", "Cantidad de delitos");

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
    Generator.loadJsonTreemap("Delito abreviado", "Cantidad de delitos");
  });

  $criminalProcess.on('click', function() {
    activeButton($criminalProcess);
    clearGrapich();
    Generator.loadJsonTreemap("Etapa del proceso penal", "Cantidad de etapas");
  });

  $adminUnit.on('click', function() {
    activeButton($adminUnit);
    clearGrapich();
    Generator.loadJsonTreemap("Unidad Administrativa", "Cantidad de unidades");
  });

  $mp.on('click', function() {
    activeButton($mp);
    clearGrapich();
    Generator.loadJsonTreemap("Agencia del Ministerio Público", "Cantidad de agencias");
  });

  $state.on('click', function() {
    activeButton($state);
    clearGrapich();
    Generator.loadJsonTreemap("Entidad", "Cantidad de entidades");
  });

  $judgment.on('click', function() {
    activeButton($judgment);
    clearGrapich();
    Generator.loadJsonTreemap("Sentencia absolutoria", "Cantidad de sentencias");
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