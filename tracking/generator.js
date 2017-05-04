// tracking/generator
//-----------------------------
//
// Módulo para generar la gráfica correspondiente
// de acuerdo a cada filtro seleccionado en la sección
// de seguimiento de carpeta
// ====================================================

(function() {
  'use strict';

  exports.Generator = {
    vizGenerator: function(folderId, selectedYear) {
      var self = this;
      var months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      months.forEach(function(val, ind) {
        if (ind < 6) {
          $('#tracking-viz .first-months').append(self.printMonths(val));
        } else {
          $('#tracking-viz .last-months').append(self.printMonths(val));
        }
      });
    },

    printMonths: function(monthName) {
      return '' +
        '<div class="month-changes">' +
          '<div class="header">' +
            '<span class="month">' + monthName + '</span>' +
            '<span class="changes">Sin cambios</span>' +
            '<span class="line-changes"></span>' +
            '<i class="glyphicon glyphicon-menu-down"></i>' +
          '</div>' +
        '</div>'
      ;
    }
  }
})();