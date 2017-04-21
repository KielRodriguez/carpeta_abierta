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

  // Obtención de valores de acuerdo al json de datos,
  // los datos obtenidos son puestos en los selectores
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

    if (val.changes > 0) {
      calendarDatas.push({
        dateChanges: new Date("" + val.date.substr(6,4) + "," + val.date.substr(3,2) + "," + val.date.substr(0,2)),
        totalChanges: val.changes
      });
    }
  });

  $('#calendar-years option').on('click', function() {
    $calendar.calendar({
      startYear: parseInt(this.value),
      calendarDatas: calendarDatas
    });
  });

  $calendar.calendar({
    startYear: years[0],
    calendarDatas: calendarDatas
  });
})();
