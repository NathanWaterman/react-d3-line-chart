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

		// var newData = [];

		// for (var i = 0; i < data.length; i++) {
		// 	newData.push([new Date(data[i].date).getDate(), data[i].close]);
		// }

		const margin = { top: 30, right: 120, bottom: 30, left: 50 },
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		const t = transition().duration(1000);

		const line = select("#line");

		select(node)
			.append("path")
			.datum(initialData)
			.attr("id", "line")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("fill", "none")
			.attr("d", lineGenerator);

		line
			.datum(data)
			.transition(t)
			.attr("d", lineGenerator);

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

		const focus = select(this.ref.current)
			.append("g")
			.style("display", "none");

		focus
			.append("line")
			.attr("id", "focusLineX")
			.attr("class", "focusLine");
		focus
			.append("line")
			.attr("id", "focusLineY")
			.attr("class", "focusLine");
		focus
			.append("circle")
			.attr("id", "focusCircle")
			.attr("r", 5)
			.attr("class", "circle focusCircle");

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

		var newData = [];

		data.forEach(function(d) {
			newData.push([new Date(d.date).getDate(),d.close]);
			return newData;
		});
		console.log(newData);

		// for (var i = 0; i < data.length; i++) {
		// 	newData.push([Date.parse(data[i].date), data[i].close]);
		// }

		var xDomain = d3.extent(newData, function(d) {
			return d[0];
		});
		var yDomain = d3.extent(newData, function(d) {
			return d[1];
		});

		var newXScale = d3
			.scaleTime()
			.range([0, width])
			.domain(xDomain);
		var newYScale = d3
			.scaleLinear()
			.range([height, 0])
			.domain(yDomain);

		var bisectDate = d3.bisector(function(d) {
			return d[0];
		}).left;

		select(this.ref.current)
			.append("rect")
			.attr("class", "overlay")
			.attr("width", width)
			.attr("height", height)
			.on("mouseover", function() {
				focus.style("display", null);
			})
			.on("mouseout", () => {
				focus.style("display", "none");
			})
			.on("mousemove", function() {
				var x0 = newXScale.invert(d3.mouse(this)[0]),
				i = bisectDate(newData, x0, 1),
				d0 = newData[i - 1],
				d1 = newData[i],
				d = x0 - d0[0] > d1[0] - x0 ? d1 : d0;

				var x = newXScale(d[0]);
				var y = newYScale(d[1]);

				focus.select('#focusCircle')
                        .attr('cx', x)
                        .attr('cy', y);
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
			});

		// Define the div for the tooltip
		var div = d3
			.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

		select(this.ref.current)
			.selectAll("dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("r", 5)
			.attr("cx", d => xScale(d.date))
			.attr("cy", d => yScale(d.close))
			.on("mouseover", function(d) {
				div
					.transition()
					.duration(200)
					.style("opacity", 0.9);
				div
					.html(d.date + "<br/>" + d.close)
					.style("left", d3.event.pageX + "px")
					.style("top", d3.event.pageY - 28 + "px");
			});
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
