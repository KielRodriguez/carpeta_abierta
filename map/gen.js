var svg = d3.select("svg");
var path = d3.geoPath();
var tooltip = svg.append("g")
                .style("position", "absolute")
                .style("z-index", "999999999")
                .style("visibility", "hidden")
                .text("a simple tooltip");

d3.json("../map/topojson-mx.json", function(error, mx) {
  if (error) throw error;

  svg.append("g")
    .attr("class", "municipalities")
    .selectAll("path")
    .data(topojson.feature(mx, mx.objects.municipalities).features)
    .enter().append("path")
    .attr("d", path)
    .attr("id-estado", function(d) { return d.properties.state })
    .attr("class", function(d) {
      var total = 0;

      jsonDat.forEach(function(val, ind) {
        if (d.properties.state === val.idState) {
          total++;
        }
      });

      return getTotalChanges(total);
    })
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
    .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state !== b.properties.state; }))
    .attr("class", "state-boundary")
    .attr("d", path);

  // svg.append("path")  
  //    .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state === b.properties.state && a !== b; }))
  //    .attr("class", "municipality-boundary")
  //    .attr("d", path);
});

function getTotalChanges(val) {
  if (val > 0 && val <= 15) {
    return "m-1-15";
  } else if (val > 15 && val <= 30) {
    return "m-16-30";
  } else if (val > 30 && val <= 60) {
    return "m-31-60";
  } else if (val > 60 && val <= 140) {
    return "m-61-140";
  } else if (val > 140) {
    return "m-141";
  }
}