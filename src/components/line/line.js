import React from "react";
import { select, selectAll } from "d3-selection";
import { transition } from "d3-transition";
import * as d3 from "d3";

class Line extends React.Component {
	constructor() {
		super();
		this.ref = React.createRef();
	}
	// componentWillReceiveProps() {
	// 	//select(this.ref.current).remove();
	// 	this.updateChart();
	// }
	componentDidMount() {
		this.updateChart();
	}
	componentDidUpdate() {
		this.updateChart();
	}
	updateChart() {
		const node = this.ref.current;

		const { lineGenerator, xScale, yScale, data } = this.props;

		const initialData = data.map(d => ({
			date: d.date,
			close: d.close
		}));

		// select(node)
		// 	.append("path")
		// 	.datum(initialData)
		// 	.attr("id", "line")
		// 	.attr("stroke", "black")
		// 	.attr("stroke-width", 2)
		// 	.attr("fill", "none")
		// 	.attr("d", lineGenerator);

		// line
		// 	.datum(data)
		// 	.transition(t)
		// 	.attr("d", lineGenerator);

		// var newData = [];

		// for (var i = 0; i < data.length; i++) {
		// 	newData.push([new Date(data[i].date).getDate(), data[i].close]);
		// }

		const margin = { top: 30, right: 120, bottom: 30, left: 50 },
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		const t = transition().duration(1000);

		const line = select("#line");

		// select(this.ref.current)
		//   .selectAll("dot").data(data)
		//   .enter().append("circle")
		//   .attr("r", 5)
		//   .attr("cx", d => xScale(d.date))
		//   .attr("cy", d => yScale(d.close))

		// select(this.ref.current)
		//   .selectAll("dot").data(data)
		//   .enter().append("rect")
		//   .attr("class", "tooltip")
		//   .attr("width", 200)
		//   .attr("height", 50)
		//   .attr("rx", 4)
		//   .attr("ry", 4)
		//   .attr("fill", "none")
		//   .attr("stroke", "red")
		//   .attr("x", d => xScale(d.date))
		//   .attr("y", d => yScale(d.close))

		// select(this.ref.current)
		//   .selectAll("dot").data(data)
		//   .enter().append("text")
		//   .attr("x", d => xScale(d.date))
		//   .attr("y", d => yScale(d.close))
		//   .text(d => yScale(d.close));

		// const focus = select(this.ref.current)
		// 	.append("g")
		// 	.style("display", "none");

		// focus
		// 	.append("line")
		// 	.attr("id", "focusLineX")
		// 	.attr("class", "focusLine");
		// focus
		// 	.append("line")
		// 	.attr("id", "focusLineY")
		// 	.attr("class", "focusLine");
		// focus
		// 	.append("circle")
		// 	.attr("id", "focusCircle")
		// 	.attr("r", 5)
		// 	.attr("class", "circle focusCircle");

		// var data3 = [];
		// var currentValue = 100;
		// var random = d3.randomNormal(0, 20.0);

		// for (var i = 0; i < 100; i++) {
		// 	var currentDate = new Date();
		// 	currentDate.setDate(currentDate.getDate() + i);

		// 	data3.push([currentDate, currentValue]);
		// 	currentValue = currentValue + random();
		// }
		// console.log(data3);

		// Parse the date / time
		const formatDate = d3.timeFormat("%d-%b");
		const bisectDate = d3.bisector(function(d) { return d.date; }).left;

		const focus = select(this.ref.current).append("g") .style("display", "none");

		//map data
		data.forEach(function(d) {
			d.date = new Date(d.date);
			d.close = +d.close;
		});

		// Scale the range of the data
		xScale.domain(d3.extent(data, function(d) { return d.date; }));
		yScale.domain(d3.extent(data, function(d) { return d.close; }));

		//add line 
		select(node).append("path")
		.attr("class", "line")
		.attr("d", lineGenerator(data));

		// append the x line
		focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line
    focus.append("line")
        .attr("class", "y")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", width)
        .attr("x2", width);

    // append the circle at the intersection
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // place the value at the intersection
    focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");
    
    // append the rectangle to capture mouse
    select(node).append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
		.on("mousemove", mousemove);
		
		function mousemove(){
			console.log('mouse move');
			var x0 = xScale.invert(d3.mouse(this)[0]),
		    i = bisectDate(data, x0, 1),
		    d0 = data[i - 1],
		    d1 = data[i],
		    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

		focus.select("circle.y")
		    .attr("transform",
		          "translate(" + xScale(d.date) + "," +
		                         yScale(d.close) + ")");

		focus.select("text.y1")
		    .attr("transform",
		          "translate(" + xScale(d.date) + "," +
		                         yScale(d.close) + ")")
		    .text(d.close);

		focus.select("text.y2")
		    .attr("transform",
		          "translate(" + xScale(d.date) + "," +
		                         yScale(d.close) + ")")
		    .text(d.close);

		focus.select("text.y3")
		    .attr("transform",
		          "translate(" + xScale(d.date) + "," +
		                         yScale(d.close) + ")")
		    .text(formatDate(d.date));

		focus.select("text.y4")
		    .attr("transform",
		          "translate(" + xScale(d.date) + "," +
		                         yScale(d.close) + ")")
		    .text(formatDate(d.date));

		focus.select(".x")
		    .attr("transform",
		          "translate(" + xScale(d.date) + "," +
		                         yScale(d.close) + ")")
		               .attr("y2", height - yScale(d.close));

		focus.select(".y")
		    .attr("transform",
		          "translate(" + width * -1 + "," +
		                         yScale(d.close) + ")")
		               .attr("x2", width + width);
		}


		// var newData = [];
		// data.forEach(function(d) {
		// 	newData.push([new Date(d.date).getDate(),d.close]);
		// 	return newData;
		// });
		// console.log(newData);

		// var xDomain = d3.extent(newData, function(d) {
		// 	return d[0];
		// });
		// var yDomain = d3.extent(newData, function(d) {
		// 	return d[1];
		// });

		// var newXScale = d3
		// 	.scaleTime()
		// 	.range([0, width])
		// 	.domain(xDomain);
		// var newYScale = d3
		// 	.scaleLinear()
		// 	.range([height, 0])
		// 	.domain(yDomain);

		// var bisectDate = d3.bisector(function(d) {
		// 	return d[0];
		// }).left;

		// select(this.ref.current)
		// 	.append("rect")
		// 	.attr("class", "overlay")
		// 	.attr("width", width)
		// 	.attr("height", height)
		// 	.on("mouseover", function() {
		// 		focus.style("display", null);
		// 	})
		// 	.on("mouseout", () => {
		// 		focus.style("display", "none");
		// 	})
		// 	.on("mousemove", function() {
		// 		var x0 = newXScale.invert(d3.mouse(this)[0]),
		// 		i = bisectDate(newData, x0, 1),
		// 		d0 = newData[i - 1],
		// 		d1 = newData[i],
		// 		d = x0 - d0[0] > d1[0] - x0 ? d1 : d0;

		// 		var x = newXScale(d[0]);
		// 		var y = newYScale(d[1]);

		// 		focus.select('#focusCircle')
        //                 .attr('cx', x)
        //                 .attr('cy', y);
				// focus
				// 	.select("#focusLineX")
				// 	.attr("x1", x)
				// 	.attr("y1", newYScale(yDomain[0]))
				// 	.attr("x2", x)
				// 	.attr("y2", newYScale(yDomain[1]));
				// focus
				// 	.select("#focusLineY")
				// 	.attr("x1", newXScale(xDomain[0]))
				// 	.attr("y1", y)
				// 	.attr("x2", newXScale(xDomain[1]))
				// 	.attr("y2", y);
			//});

		// Define the div for the tooltip
		// var div = d3
		// 	.select("body")
		// 	.append("div")
		// 	.attr("class", "tooltip")
		// 	.style("opacity", 0);

		// select(this.ref.current)
		// 	.selectAll("dot")
		// 	.data(data)
		// 	.enter()
		// 	.append("circle")
		// 	.attr("r", 5)
		// 	.attr("cx", d => xScale(d.date))
		// 	.attr("cy", d => yScale(d.close))
		// 	.on("mouseover", function(d) {
		// 		div
		// 			.transition()
		// 			.duration(200)
		// 			.style("opacity", 0.9);
		// 		div
		// 			.html(d.date + "<br/>" + d.close)
		// 			.style("left", d3.event.pageX + "px")
		// 			.style("top", d3.event.pageY - 28 + "px");
		// 	});
		// .on("mouseout", function(d) {
		//     div.transition()
		//         .duration(500)
		//         .style("opacity", 0);
		// });
	}
	render() {
		return <g className="line-group" ref={this.ref} />;
	}
}

export default Line;
