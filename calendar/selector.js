// calendar/selector
//-----------------------------
//
// Módulo para obtener la selección requerida del
// usuario (indicadores, filtros y año) en la sección
// de calendario
// ====================================================

(function() {
  'use strict';

  var jsonDatas = require('../datas/carpa.json');
  var Generator = require('../calendar/generator.js').Generator;
  Generator.watching();

  var $changes = $('#calendar-changes');
  var $crime = $('#calendar-crime');
  var $mp = $('#calendar-agency');
  var $unity = $('#calendar-unity');
  var $years = $('#calendar-years');
  var $calendar = $('#calendar-viz');

  var crimes = [];
  var mp = [];
  var unity = [];
  var years = [];
  var calendarDatas = [];

  // Sólo para filtrados
  var filters = [];
  var filterSelected = [];

  // Obtención de valores de acuerdo al json de datos,
  // los datos obtenidos son puestos en los selectores
  jsonDatas.reverse();
  jsonDatas.forEach(function(val, ind) {
    if (crimes.indexOf(val.crime) < 0) {
      crimes.push(val.crime);
      $crime.append('<option value="'+ val.crime +'">'+ val.crime +'</option>');
    }

    if (mp.indexOf(val.mp) < 0) {
      mp.push(val.mp);
      $mp.append('<option value="'+ val.mp +'">'+ val.mp +'</option>');
    }

    if (unity.indexOf(val.admin_unit) < 0) {
      unity.push(val.admin_unit);
      $unity.append('<option value="'+ val.admin_unit +'">'+ val.admin_unit +'</option>');
    }

    if (years.indexOf(val.date.substr(6,4)) < 0) {
      years.push(val.date.substr(6,4));
      $years.append('<option value="'+ val.date.substr(6,4) +'">'+ val.date.substr(6,4) +'</option>');
    }

    // Ordena el json como es necesario para el calendario
    calendarDatas.push({
      id: val.id,
      dateChanges: new Date("" + val.date.substr(6,4) + "," + val.date.substr(3,2) + "," + val.date.substr(0,2)),
      totalChanges: val.changes,
      status: val.status_process,
      crime: val.crime,
      mp: val.mp,
      admin_unit: val.admin_unit
    });
  });

  // Selector de indicadores
  $changes.on('change', function() {
    totalFilters();

    $calendar.calendar({
      startYear: parseInt($years.val()),
      calendarDatas: calendarDatas,
      indicator: $changes.val(),
      filters: filters,
      filterSelected: filterSelected
    });
  });

  // Selector y filtrado con tipos de delito
  $('#calendar-crime, #calendar-agency, #calendar-unity').on('change', function() {
    totalFilters();

    $calendar.calendar({
      startYear: parseInt($years.val()),
      calendarDatas: calendarDatas,
      indicator: $changes.val(),
      filters: filters,
      filterSelected: filterSelected
    });
  });

  // Selector de años
  $years.on('change', function() {
    totalFilters();

    $calendar.calendar({
      startYear: parseInt($years.val()),
      calendarDatas: calendarDatas,
      indicator: $changes.val(),
      filters: filters,
      filterSelected: filterSelected
    });
  });

  totalFilters();

  // Muestra la gráfica inicial de calendario
  $calendar.calendar({
    startYear: years[0],
    calendarDatas: calendarDatas,
    indicator: $changes.val(),
    filters: filters,
    filterSelected: filterSelected
  });

  function totalFilters() {
    filters = [];
    filterSelected = [];
    
    if ($crime.val() !== "default") {
      filters.push("crime");
      filterSelected.push($crime.val());
    }
    if ($mp.val() !== "default") {
      filters.push("mp");
      filterSelected.push($mp.val())
    }
    if ($unity.val() !== "default") {
      filters.push("admin_unit");
      filterSelected.push($unity.val());
    }
  }
})();
