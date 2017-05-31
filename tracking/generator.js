// tracking/generator
//-----------------------------
//
// Módulo para generar la gráfica correspondiente
// de acuerdo a cada filtro seleccionado en la sección
// de seguimiento de carpeta
// ====================================================

(function() {
  'use strict';

  var jsonDatas = require('../datas/carpa.json');
  var months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  var owl = $('.owl-carousel');
  var titleDatas = "Fecha y hora de la última actualización,Número de Carpeta de Investigación,Etapa del proceso penal,Delito abreviado,Delito completo,Unidad Administrativa,Agencia del Ministerio Público,Sexo del AMPF,Latitud,Longitud,País,Entidad,Municipio,Localidad,Fecha de inicio de la Carpeta de Investigación,Judicializado,Delito judicializado completo,Número de acusados,Incompetencias,Delito por incompetencia completo,Archivo Temporal,Delito por archivo temporal completo,No ejercicio de la Acción Penal,Delito por No ejercicio de la Acción Penal completo,Criterio de Oportunidad,Delito por criterio de oportunidad completo,Sobreseimiento,Delito por sobreseimiento completo,Reclasificación,Delito reclasificado abreviado,Delito reclasificado completo,Sentencia absolutoria,Número de personas absueltas,Número de mujeres absueltas,Número de hombres absueltos,Sentencia condenatoria,Número de personas condenadas,Número de mujeres condenadas,Número de hombres condenados,Mecanismos alternos,Delito por mecanismo alterno,Tipo de mecanismo";
  titleDatas = titleDatas.split(",");

  exports.Generator = {
    vizGenerator: function() {
      var self = this;

      months.forEach(function(val, ind) {
        if (ind < 6) {
          $('#tracking-viz .first-months').append(self.printMonths(val));
        } else {
          $('#tracking-viz .last-months').append(self.printMonths(val));
        }
      });

      self.createCarousel();
    },

    searchAndPrintId: function(folderId, selectedYear) {
      var self = this;
      var folderFound = false;
      var folderYearFound = false;

      // Limpia datos anteriores
      $('#tracking-viz .card .header .changes').text('Sin cambios');
      $('#tracking-viz .card .body-changes .item-changes').remove();
      $('#tracking-viz .card .header .line-changes').removeClass('_1_5 _6');

      jsonDatas.forEach(function(val, ind) {
        // Busca el id de carpeta
        if (folderId === val.id) {
          var differentDays = [];
          var differentMonths = [];
          var totalChanges = 0;
          var firstChangesYear = parseInt(val.date_start.substr(6,4));
          var firstChangesMonth = parseInt(val.date_start.substr(3,2) - 1);
          var firstChangesDay = val.date_start.substr(0,2);
          folderFound = true;

          // Muestra las aperturas de las carpetas
          if (firstChangesYear === selectedYear && val.changes === 0) {
            folderYearFound = true;

            self.printChanges(
              months[firstChangesMonth],
              firstChangesDay,
              'Se abrió la carpeta de investigación'
            );

            // Suma un cambio más al mes
            totalChanges = 1;
            // Imprime el número de cambios por mes
            self.printTotalChanges(totalChanges, months[firstChangesMonth]);
            // Envía los últimos cambios para ser actualizados en el carrusel
            self.resetCarousel(val.last_changes);
          } else if (firstChangesYear === selectedYear && val.changes > 0) {
            folderYearFound = true;

            self.printChanges(
              months[firstChangesMonth],
              firstChangesDay,
              'Se abrió la carpeta de investigación'
            );

            // Suma un cambio más al mes
            totalChanges++;
            // Imprime el número de cambios por mes
            self.printTotalChanges(totalChanges, months[firstChangesMonth]);
            // Envía los últimos cambios para ser actualizados en el carrusel
            self.resetCarousel(val.last_changes);
          }

          // Itera en todo el array de cambios para sumar cambios
          val.complete_changes.forEach(function(_val, _ind) {
            var changesYear = parseInt(_val.date.substr(6,4));
            var changesMonth = parseInt(_val.date.substr(3,2) - 1);
            var changesDay = _val.date.substr(0,2);
            var valueItem = "";
            var labelItem = "";

            // Cambia valores de S Y N por Si o No
            if (_val.value === "S") { valueItem = "Si"; }
            else if (_val.value === "N") { valueItem = "No"; }
            else { valueItem = _val.value; }

            // Cambia el label de fecha > hora
            if(_val.title_text === "Fecha y hora de la última actualización") {
              labelItem = "Hora de la última actualización";
              valueItem = valueItem.substr(10,9);
            } else { labelItem = _val.title_text; }


            if (changesYear === selectedYear) {
              folderYearFound = true;
              // Si no existe el mes aún
              if (differentMonths.indexOf(changesMonth) < 0) {
                self.printChanges(
                  months[changesMonth],
                  changesDay,
                  '<strong>'+ labelItem +':</strong> '+ valueItem
                );

                // El número de items por mes, es también una forma de contar los cambios
                var totalChanges = $('.'+ months[changesMonth] +' .body-changes .item-changes').length;
                // Imprime el número de cambios por mes
                self.printTotalChanges(totalChanges, months[changesMonth]);

                // borra los días para que no sean repetidos con el siguiente mes
                differentMonths = [];
                differentDays = [];

                differentMonths.push(changesMonth);
                differentDays.push(changesDay);
                // Si ya existe el mes y el dia
              } else if (differentMonths.indexOf(changesMonth) > -1 && differentDays.indexOf(changesDay) > -1) {
                // Obtiene el item del último elemento item-changes que se encuentra hasta ese momento
                var itemNum = $('.'+ months[changesMonth] +' .body-changes .item-changes').length;

                $('#tracking-viz .'+ months[changesMonth] +' .body-changes .item-changes:nth-child('+ itemNum +')').append(
                  '<p class="item">' +
                    '<strong>'+ labelItem +':</strong> '+ valueItem +
                  '</p>'
                );
                // Si existe el mes, pero no el día
              } else if (differentMonths.indexOf(changesMonth) > -1 && differentDays.indexOf(changesDay) < 0) {
                self.printChanges(
                  months[changesMonth],
                  changesDay,
                  '<strong>'+ labelItem +':</strong> '+ valueItem
                );

                // El número de items por mes, es también una forma de contar los cambios
                var totalChanges = $('.'+ months[changesMonth] +' .body-changes .item-changes').length;
                // Imprime el número de cambios por mes
                self.printTotalChanges(totalChanges, months[changesMonth]);

                differentDays.push(changesDay);
              }
            }
          });

          // Remueve único cambio de hora de actualización:
          // "Hora de la última actualización"
          months.forEach(function(ival, iind) {
            var sizeItemChanges = $('.'+ ival +' .body-changes .item-changes').length;

            if (sizeItemChanges > 0) {
              for (var i = 1; i <= sizeItemChanges; i++) {
                if ($('.'+ ival +' .body-changes .item-changes:nth-child('+ i +') .item').length === 1 &&
                    $('.'+ ival +' .body-changes .item-changes:nth-child('+ i +') .item:nth-child(2) strong').text() === "Hora de la última actualización:") {
                  // Se remueve la única actualización de hora
                  $('.'+ ival +' .body-changes .item-changes:nth-child('+ i +')').remove();
                  
                  // Se hace el recuento de cambios de a cuerdo
                  // a los elementos existentes
                  var textChanges = $('.'+ ival +' .header .changes').text();
                  var totChanges = parseInt(textChanges.substr(0,1));

                  self.printTotalChanges(--totChanges, ival);
                }
              }
            }
          });
        }
      });

      if (!folderFound) {
        $('#horizontal-scroll').css('display', 'none');
        alert("No se encontró la carpeta que busca");
      } else {
        $('#horizontal-scroll').css('display', 'block');
      }
      if (!folderYearFound) {
        $('#horizontal-scroll').css('display', 'none');
        alert("No hay cambios encontrados para la carpeta " + folderId + " en el año " + selectedYear);
      } else {
        $('#horizontal-scroll').css('display', 'block');
      }
    },

    // Pinta un nuevo cambio en el mes elegido
    printChanges: function(monthName, day, text) {
      $('#tracking-viz .'+ monthName +' .body-changes').append(
        '<div class="item-changes">' +
          '<p class="item-date">'+ day +' '+ monthName +'</p>' +
          '<p class="item">' +
            text +
          '</p>' +
        '</div>'
      );
    },

    // Pinta el número de cambios hechos en un mes descrito
    printTotalChanges: function(total, monthName) {
      var numChanges = total === 0 ? "Sin cambios" : total === 1 ? "1 cambio" : total + " cambios";

      $('#tracking-viz .'+ monthName +' .header .changes').text(numChanges);

      if (total === 0) {
        $('#tracking-viz .'+ monthName +' .header .line-changes').removeClass('_1_5');
        $('#tracking-viz .'+ monthName +' .header .line-changes').removeClass('_6');
      } else if (total <= 5) {
        $('#tracking-viz .'+ monthName +' .header .line-changes').addClass('_1_5');
      } else if (total > 5) {
        $('#tracking-viz .'+ monthName +' .header .line-changes').removeClass('_1_5');
        $('#tracking-viz .'+ monthName +' .header .line-changes').addClass('_6');
      }
    },

    // Imprime los meses vacíos (sin información)
    printMonths: function(monthName) {
      return '' +
        '<div class="card ' + monthName + '">' +
          '<div class="header">' +
            '<span class="month">' + monthName + '</span>' +
            '<span class="changes">Sin cambios</span>' +
            '<span class="line-changes"></span>' +
            // '<i class="glyphicon glyphicon-menu-down"></i>' +
          '</div>' +
          '<div class="body-changes">' +
          '</div>' +
        '</div>'
      ;
    },

    resetCarousel: function(changes) {
      var resetYear = parseInt(changes[0].substr(6,4));
      var resetMonth = parseInt(changes[0].substr(3,2) - 1);
      var resetDay = changes[0].substr(0,2);

      $('#horizontal-scroll > p').text(resetDay + " " + months[resetMonth] + " " + resetYear);

      changes.forEach(function(val, ind) {
        var html = '<div class="card item item-horizontal"><h5>'+ titleDatas[ind] +'</h5><p>'+ val +'</p></div>';
        owl.trigger('remove.owl.carousel', ind);
        owl.trigger('add.owl.carousel', [html, ind]).trigger('refresh.owl.carousel');
      });
    },

    // Crea el carrusel
    createCarousel: function() {
      owl.owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
          0: {
            items:1
          },
          600: {
            items:3
          },
          1000: {
            items:5
          }
        }
      });

      // Configura el botón de la izquiera en vez del nativo
      $('#tracking .left-click').on('click', function() {
        owl.trigger('prev.owl.carousel');
      });
      // Configura el botón de la derecha en vez del nativo
      $('#tracking .right-click').on('click', function() {
        owl.trigger('next.owl.carousel');
      });

      $('#horizontal-scroll').css('display', 'none');
    }
  }
})();