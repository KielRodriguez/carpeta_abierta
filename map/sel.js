var $crime = $('#map-crime');
var $mp = $('#map-mp');
var $unity = $('#map-unity');
var $years = $('#map-years');

var crimes = [];
var mp = [];
var unity = [];
var years = [];
var jsonDat = {};

// Sólo para filtrados
var filters = [];
var filterSelected = [];

var levelSelected = "";
var yearSelected = "";

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
});

// Selector de tipo (nivel) de mapa que se mostrará
$('#map-level button').on('click', function() {
  var level = $(this).text();

  $('#map-level button.btn-primary').removeClass('btn-primary').addClass('btn-default');
  $(this).addClass('btn-primary');

  $('svg#map-viz *').remove();

  totalFilters();
  createMapViz(level, filters, filterSelected, $years.val());
});

// Selector y filtrado con tipos de delito
$('#map-crime, #map-agency, #map-unity').on('change', function() {
  var level = $('#map-level button.btn-primary').text();

  $('svg#map-viz *').remove();

  totalFilters();
  createMapViz(level, filters, filterSelected, $years.val());
});

// Selector de año
$years.on('change', function() {
  var level = $('#map-level button.btn-primary').text();

  $('svg#map-viz *').remove();

  totalFilters();
  createMapViz(level, filters, filterSelected, $years.val());
});

// Obtiene el o los tipos de filtrados que el usuario elija
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