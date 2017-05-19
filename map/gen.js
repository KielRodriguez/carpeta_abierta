function createMapViz(mapLevel, mapFilters, mapFilterSelected, mapYear) {
  var width = 960,
      height = 670;

  var projection = d3.geo.conicConformal()
      .rotate([102, 0])
      .center([0, 24])
      .parallels([17.5, 29.5])
      .scale(1850)
      .translate([width / 2, height / 2]);

  var svg = d3.select("svg#map-viz");
  var path = d3.geo.path().projection(projection);
  var tooltip = svg.append("g")
                  .style("position", "absolute")
                  .style("z-index", "999999999")
                  .style("visibility", "hidden")
                  .text("a simple tooltip");

  d3.json("../map/mx_idMun.json", function(error, mx) {
    if (error) throw error;

    svg.append("g")
      .attr("class", "municipalities")
      .selectAll("path")
      .data(topojson.feature(mx, mx.objects.municipios2).features)
      .enter().append("path")
      .attr("d", path)
      .attr("id-estado", function(d) { return parseInt(d.properties.CVE_ENT) })
      .attr("id-municipio", function(d) { return parseInt(d.properties.CVE_MUN) })
      .attr("class", function(d) {
        var total = 0;

        jsonDat.forEach(function(val, ind) {
          if (
            parseInt(d.properties.CVE_ENT) === parseInt(val.idState) &&
            parseInt(d.properties.CVE_MUN) === parseInt(val.idTown) &&
            val.date.substr(6,4) === mapYear
          ) {
            total++;
          }
        });

        return getTotalChanges(total, 'm');
      });
      // .on("mouseover", function(d) {
      //   $('#map-viz path[id-estado="'+ d.properties.state +'"]').css({fill: 'red', stroke: 'red'});
      // })
      // .on("mouseout", function(d) {
      //   $('#map-viz path').css({fill: '#fff', stroke: '#d2d2d2'});
      // })

      //  .on("mouseover", function(event){return tooltip.style("visibility", "visible").style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      //  .on("mousemove", function(event){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      //  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    svg.append("path")
      .datum(topojson.mesh(mx, mx.objects.municipios2, function(a, b) { return a.properties.CVE_ENT !== b.properties.CVE_ENT; }))
      .attr("class", "state-boundary")
      .attr("d", path);

    // svg.append("path")  
    //    .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state === b.properties.state && a !== b; }))
    //    .attr("class", "municipality-boundary")
    //    .attr("d", path);
  });
}

// Agrega el color de acuerdo al total de cambios
function getTotalChanges(val, sm) {
  if (val > 0 && val <= 15) {
    return sm + "-1-15";
  } else if (val > 15 && val <= 30) {
    return sm + "-16-30";
  } else if (val > 30 && val <= 60) {
    return sm + "-31-60";
  } else if (val > 60 && val <= 140) {
    return sm + "-61-140";
  } else if (val > 140) {
    return sm + "-141";
  }
}

// Pinta el mapa con los primero filtros
createMapViz(
  $('#map-level button.btn-primary').text(),
  [],
  [],
  $('#map-years').val()
);