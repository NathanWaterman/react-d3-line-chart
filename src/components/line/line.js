import React, { Component } from "react";
import { select, selectAll } from "d3-selection";
import { transition } from "d3-transition";
import * as d3 from "d3";

class Line extends Component {
	constructor() {
		super();
		this.ref = React.createRef();
	}
	componentDidMount() {
		const node = this.ref.current;

		const { lineGenerator, xScale, yScale, data } = this.props;

		//map data
		const initialData = data.map(d => ({
			date: new Date(d.date),
			close: d.close,
			open: d.open,
			volume: d.volume,
			high: d.high,
			low: d.low,
			changePercent: d.changePercent
		}));
	
		// Scale the range of the data
		xScale.domain(d3.extent(initialData, function(d) { return d.date; }));
		yScale.domain(d3.extent(initialData, function(d) { return d.close; }));

		select(node)
		.append('path')
		.datum(initialData)
		.attr('class', 'line')
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr('fill', 'none')
		.attr('d', lineGenerator);

		this.updateChart();
	}
	componentDidUpdate() {
		this.updateChart();
	}

	updateChart() {
		const node = this.ref.current;

		const { lineGenerator, xScale, yScale, data } = this.props;

		//map data
		const initialData = data.map(d => ({
			date: new Date(d.date),
			close: d.close,
			open: d.open,
			volume: d.volume,
			high: d.high,
			low: d.low,
			changePercent: d.changePercent
		}));


		const margin = { top: 30, right: 120, bottom: 30, left: 50 },
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		const t = transition().duration(500);
		const line = select('.line');


		// Parse the date / time
		const formatDate = d3.timeFormat("%d-%b");
		const bisectDate = d3.bisector(function(d) { return d.date; }).left;

		//parse volume
		const volumeFormat = (num) =>{
			return Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'k';
		}

		const focus = select(this.ref.current).append("g") .style("display", "none");

		// Scale the range of the data
		xScale.domain(d3.extent(initialData, function(d) { return d.date; }));
		yScale.domain(d3.extent(initialData, function(d) { return d.close; }));

		line
		.datum(initialData)
		.transition(t)
		.attr('d', lineGenerator);

		focus.append("rect")
		.attr("class","tooltip")
		.attr("transform",
					"translate(" + 5 + "," +
									5 + ")");

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

		//Date
		focus.append("foreignObject")
			.attr("class", "y1")
			.attr("transform","translate(" + 8 + "," + 10 + ")")
			.append("xhtml:div")

		//Open
		focus.append("foreignObject")
		.attr("class", "y2")
		.attr("transform","translate(" + 8 + "," + 28 + ")")
		.append("xhtml:div")

		//high
		focus.append("foreignObject")
		.attr("class", "y3")
		.attr("transform","translate(" + 8 + "," + 48 + ")")
		.append("xhtml:div")

		//low
		focus.append("foreignObject")
		.attr("class", "y4")
		.attr("transform","translate(" + 8 + "," + 66 + ")")
		.append("xhtml:div")

		//Close
		focus.append("foreignObject")
		.attr("class", "y5")
		.attr("transform","translate(" + 8 + "," + 82 + ")")
		.append("xhtml:div")

		//Volume
		focus.append("foreignObject")
		.attr("class", "y6")
		.attr("transform","translate(" + 8 + "," + 100 + ")")
		.append("xhtml:div")

		//% change
		focus.append("foreignObject")
		.attr("class", "y7")
		.attr("transform","translate(" + 8 + "," + 120 + ")")
		.append("xhtml:div")



		
		// append the rectangle to capture mouse
		select(node).append("rect")
			.attr("width", width)
			.attr("height", height)
			.style("fill", "none")
			.style("pointer-events", "all")
			.on("mouseover", function() { 
				focus.style("display", null); 
			})
			.on("mouseout", function() { 
				focus.style("display", "none"); 
			})
			.on("mousemove", mousemove);
			
		function mousemove(){
			var x0 = xScale.invert(d3.mouse(this)[0]),
			i = bisectDate(initialData, x0, 1),
			d0 = initialData[i - 1],
			d1 = initialData[i],
			d = x0 - d0.date > d1.date - x0 ? d1 : d0;

		focus.select("circle.y")
			.attr("transform",
					"translate(" + xScale(d.date) + "," +
									yScale(d.close) + ")");

		//date
		focus.select("foreignObject.y1")
			.html("<span>Date</span>" +"<span>"+ formatDate(d.date) +"</span>")
		//open
		focus.select("foreignObject.y2")
		.html("<span>Open</span>" +"<span>"+ d.open +"</span>")
		//high
		focus.select("foreignObject.y3")
		.html("<span>High</span>" +"<span>"+ d.high +"</span>")
		//low
		focus.select("foreignObject.y4")
		.html("<span>Low</span>" +"<span>"+ d.low +"</span>")
		//close
		focus.select("foreignObject.y5")
		.html("<span>Close</span>" +"<span>"+ d.close +"</span>")
		//volume
		focus.select("foreignObject.y6")
		.html("<span>Volume</span>" +"<span>"+ volumeFormat(d.volume) +"</span>")
		//% change
		focus.select("foreignObject.y7")
		.html("<span>%Change</span>" +"<span>"+ d.changePercent +"%</span>")


		focus.select(".x")
			.attr("transform",
					"translate(" + xScale(d.date) + "," + yScale(d.close) + ")")
						.attr("y1", -height)
						.attr("y2", height - yScale(d.close));

		focus.select(".y")
			.attr("transform",
					"translate(" + width * -1 + "," + yScale(d.close) + ")")
						.attr("x2", width + width);
		}

	}
	render() {
		return <g className="line-group" ref={this.ref} />;
	}
}

export default Line;
