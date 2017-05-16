var $crime = $('#map-crime');
var $mp = $('#map-mp');
var $unity = $('#map-unity');
var $years = $('#map-years');

var crimes = [];
var mp = [];
var unity = [];
var years = [];
var jsonDat = {};

//Carga json Treemap
$.ajax({
  url: "../datas/carpa.json",
  async: false,
  success: function(data){
    jsonDat = data;
  }
});

// Obtención de valores de acuerdo al json de datos,
// los datos obtenidos son puestos en los selectores
jsonDat.reverse();
jsonDat.forEach(function(val, ind) {
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

  // // Ordena el json como es necesario para el calendario
  // calendarDatas.push({
  //   id: val.id,
  //   dateChanges: new Date("" + val.date.substr(6,4) + "," + val.date.substr(3,2) + "," + val.date.substr(0,2)),
  //   changesFolder: val.changes,
  //   status: val.status_process,
  //   crime: val.crime,
  //   mp: val.mp,
  //   admin_unit: val.admin_unit
  // });
});