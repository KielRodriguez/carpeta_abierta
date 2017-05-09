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
    },

    searchAndPrintId: function(folderId, selectedYear) {
      var folderFound = false;
      var folderYearFound = false;

      // Limpia datos anteriores
      $('#tracking-viz .month-changes .header .changes').text('Sin cambios');
      $('#tracking-viz .month-changes .body-changes .item-changes').remove();
      $('#tracking-viz .month-changes .header .line-changes').removeClass('_1_5 _6');

      jsonDatas.forEach(function(val, ind) {
        // Busca el id de carpeta
        if (folderId === val.id) {
          var differentDays = [];
          var differentMonths = [];
          var totalChanges = 0;
          var itemNum = 1;
          folderFound = true;

          val.complete_changes.forEach(function(_val, _ind) {
            var changesYear = parseInt(_val.date.substr(6,4));
            var changesMonth = parseInt(_val.date.substr(3,2) - 1);
            var changesDay = _val.date.substr(0,2);
            var valueItem = "";

            // Cambia valores de S Y N por Si o No
            if (_val.value === "S") { valueItem = "Si"; }
            else if (_val.value === "N") { valueItem = "No"; }
            else { valueItem = _val.value; }


            if (changesYear === selectedYear) {
              folderYearFound = true;
              // Si no existe el mes aún
              if (differentMonths.indexOf(changesMonth) < 0) {
                $('#tracking-viz .'+ months[changesMonth] +' .body-changes').append(
                  '<div class="item-changes">' +
                    '<p class="item-date">'+ changesDay +' '+ months[changesMonth] +'</p>' +
                    '<p class="item">' +
                      '<strong>'+ _val.title_text +':</strong> '+ valueItem +
                    '</p>' +
                  '</div>'
                );

                // Empieza a sumar cambios para cada mes diferente
                totalChanges = 1;
                // Imprime el primer cambio en la carpeta
                $('#tracking-viz .'+ months[changesMonth] +' .header .changes').text("1 cambio");
                $('#tracking-viz .'+ months[changesMonth] +' .header .line-changes').addClass('_1_5');

                // borra los días para que no sean repetidos con el siguiente mes
                differentMonths = [];
                differentDays = [];

                differentMonths.push(changesMonth);
                differentDays.push(changesDay);
                // Si ya existe el mes y el dia
              } else if (differentMonths.indexOf(changesMonth) > -1 && differentDays.indexOf(changesDay) > -1) {
                $('#tracking-viz .'+ months[changesMonth] +' .body-changes .item-changes:nth-child('+ itemNum +')').append(
                  '<p class="item">' +
                    '<strong>'+ _val.title_text +':</strong> '+ valueItem +
                  '</p>'
                );
                // Si existe el mes, pero no el día
              } else if (differentMonths.indexOf(changesMonth) > -1 && differentDays.indexOf(changesDay) < 0) {
                $('#tracking-viz .'+ months[changesMonth] +' .body-changes').append(
                  '<div class="item-changes">' +
                    '<p class="item-date">'+ changesDay +' '+ months[changesMonth] +'</p>' +
                    '<p class="item">' +
                      '<strong>'+ _val.title_text +':</strong> '+ valueItem +
                    '</p>' +
                  '</div>'
                );

                // Suma un cambio más al mes
                totalChanges++;
                // Imprime el número de cambios por mes
                $('#tracking-viz .'+ months[changesMonth] +' .header .changes').text(totalChanges + " cambios");
                if (totalChanges > 5) {
                  $('#tracking-viz .'+ months[changesMonth] +' .header .line-changes').removeClass('_1_5');
                  $('#tracking-viz .'+ months[changesMonth] +' .header .line-changes').addClass('_6');
                }

                differentDays.push(changesDay);
                itemNum++;
              }
            }
          });
        }
      });

      if (!folderFound) {
        alert("No se encontró la carpeta que busca");
      }
      if (!folderYearFound) {
        alert("No hay cambios encontrados para la carpeta " + folderId + " en el año " + selectedYear);
      }
    },

    printMonths: function(monthName) {
      return '' +
        '<div class="month-changes ' + monthName + '">' +
          '<div class="header">' +
            '<span class="month">' + monthName + '</span>' +
            '<span class="changes">Sin cambios</span>' +
            '<span class="line-changes"></span>' +
            '<i class="glyphicon glyphicon-menu-down"></i>' +
          '</div>' +
          '<div class="body-changes">' +
          '</div>' +
        '</div>'
      ;
    }
  }
})();