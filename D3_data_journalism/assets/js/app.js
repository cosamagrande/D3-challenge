// @TODO: YOUR CODE HERE!

// Setting margins
var svgWidth = 690;
var svgHeight = 500;
var margin = {top: 20,right: 40,bottom: 60,left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG - Generating canvas that contains chart and centering it on canvas
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chart= svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Fetching & parsing data
d3.csv("assets/data/data.csv")
  .then(function(table) {
    table.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

// scale  and axis functions
    var x = d3.scaleLinear()
        .domain([d3.min(table, d => d.age)-1, d3.max(table, d => d.age)])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([d3.min(table, d => d.smokes)-1, d3.max(table, d => d.smokes)])
        .range([height, 0]);

    var bottom = d3.axisBottom(x);
    var left = d3.axisLeft(y);

// Appending axes to chart
    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottom);

    chart.append("g")
         .call(left);

// generating circles
    chart.selectAll("circle")
        .data(table)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.age))
        .attr("cy", d => y(d.smokes))
        .attr("r", "15")
        .attr("fill", "orange")
        .attr("opacity", "0.5");

    chart.selectAll("label")
        .data(table)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("font-size",12)
        .attr("x", d => x(d.age)-8)
        .attr("y", d => y(d.smokes)+4);

// Create axes labels
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left +50)
        .attr("x", 0 - (height/2))
        .attr("class", "axisText")
        .text("Average # of Smokes");

    chart.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top +20})`)
        .attr("class", "axisText")
        .text("Age");
});