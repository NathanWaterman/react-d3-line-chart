import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './components/axis/xy-axis';
import Line from './components/line/line';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import * as d3 from 'd3';
import { select, selectAll } from "d3-selection";

class App extends Component {
  constructor() {
    super();

    this.data1 = [
      {
        date: "2019-09-25",
        open: 181.45,
        close: 182.8,
        "high": 183.42,
        "low": 177.87,
        volume: 18339960,
        "uOpen": 181.45,
        "uClose": 182.8,
        "uHigh": 183.42,
        "uLow": 177.87,
        "uVolume": 18339960,
        change: 0,
        "changePercent": 0,
        "label": "Sep 25",
        "changeOverTime": 0
      },
      {
        date: "2019-09-26",
        open: 181.33,
        close: 180.11,
        "high": 181.4,
        "low": 177.67,
        volume: 16280691,
        "uOpen": 181.33,
        "uClose": 180.11,
        "uHigh": 181.4,
        "uLow": 177.67,
        "uVolume": 16280691,
        change: -2.69,
        "changePercent": -1.4716,
        "label": "Sep 26",
        "changeOverTime": -0.014716
      },
      {
        date: "2019-09-27",
        open: 180.49,
        close: 177.1,
        "high": 180.75,
        "low": 175.66,
        volume: 14663575,
        "uOpen": 180.49,
        "uClose": 177.1,
        "uHigh": 180.75,
        "uLow": 175.66,
        "uVolume": 14663575,
        change: -3.01,
        "changePercent": -1.6712,
        "label": "Sep 27",
        "changeOverTime": -0.031182
      },
      {
        date: "2019-09-30",
        open: 177.87,
        close: 178.08,
        "high": 178.67,
        "low": 176.85,
        volume: 11071425,
        "uOpen": 177.87,
        "uClose": 178.08,
        "uHigh": 178.67,
        "uLow": 176.85,
        "uVolume": 11071425,
        change: 0.98,
        "changePercent": 0.5534,
        "label": "Sep 30",
        "changeOverTime": -0.025821
      },
      {
        date: "2019-10-01",
        open: 179.15,
        close: 175.81,
        "high": 179.84,
        "low": 174.88,
        volume: 17261556,
        "uOpen": 179.15,
        "uClose": 175.81,
        "uHigh": 179.84,
        "uLow": 174.88,
        "uVolume": 17261556,
        change: -2.27,
        "changePercent": -1.2747,
        "label": "Oct 1",
        "changeOverTime": -0.038239
      },
      {
        date: "2019-10-02",
        open: 174.84,
        close: 174.6,
        "high": 176.53,
        "low": 173.09,
        volume: 16374148,
        "uOpen": 174.84,
        "uClose": 174.6,
        "uHigh": 176.53,
        "uLow": 173.09,
        "uVolume": 16374148,
        change: -1.21,
        "changePercent": -0.6882,
        "label": "Oct 2",
        "changeOverTime": -0.044858
      },
      {
        date: "2019-10-03",
        open: 175.57,
        close: 179.38,
        "high": 179.84,
        "low": 173.63,
        volume: 16789319,
        "uOpen": 175.57,
        "uClose": 179.38,
        "uHigh": 179.84,
        "uLow": 173.63,
        "uVolume": 16789319,
        change: 4.78,
        "changePercent": 2.7377,
        "label": "Oct 3",
        "changeOverTime": -0.018709
      },
      {
        date: "2019-10-04",
        open: 179.55,
        close: 180.45,
        "high": 180.98,
        "low": 178.1,
        volume: 10476395,
        "uOpen": 179.55,
        "uClose": 180.45,
        "uHigh": 180.98,
        "uLow": 178.1,
        "uVolume": 10476395,
        change: 1.07,
        "changePercent": 0.5965,
        "label": "Oct 4",
        "changeOverTime": -0.012856
      },
      {
        date: "2019-10-07",
        open: 180,
        close: 179.68,
        "high": 181.18,
        "low": 178.09,
        volume: 9359793,
        "uOpen": 180,
        "uClose": 179.68,
        "uHigh": 181.18,
        "uLow": 178.09,
        "uVolume": 9359793,
        change: -0.77,
        "changePercent": -0.4267,
        "label": "Oct 7",
        "changeOverTime": -0.017068
      },
      {
        date: "2019-10-08",
        open: 178.26,
        close: 177.75,
        "high": 180.37,
        "low": 177.72,
        volume: 10084896,
        "uOpen": 178.26,
        "uClose": 177.75,
        "uHigh": 180.37,
        "uLow": 177.72,
        "uVolume": 10084896,
        change: -1.93,
        "changePercent": -1.0741,
        "label": "Oct 8",
        "changeOverTime": -0.027626
      },
      {
        date: "2019-10-09",
        open: 179.16,
        close: 179.85,
        "high": 180.72,
        "low": 177.94,
        volume: 7648874,
        "uOpen": 179.16,
        "uClose": 179.85,
        "uHigh": 180.72,
        "uLow": 177.94,
        "uVolume": 7648874,
        change: 2.1,
        "changePercent": 1.1814,
        "label": "Oct 9",
        "changeOverTime": -0.016138
      },
      {
        date: "2019-10-10",
        open: 180.32,
        close: 180.03,
        "high": 181.61,
        "low": 179.17,
        volume: 8980978,
        "uOpen": 180.32,
        "uClose": 180.03,
        "uHigh": 181.61,
        "uLow": 179.17,
        "uVolume": 8980978,
        change: 0.18,
        "changePercent": 0.1001,
        "label": "Oct 10",
        "changeOverTime": -0.015153
      },
      {
        date: "2019-10-11",
        open: 182.15,
        close: 184.19,
        "high": 186.49,
        "low": 182.14,
        volume: 14998754,
        "uOpen": 182.15,
        "uClose": 184.19,
        "uHigh": 186.49,
        "uLow": 182.14,
        "uVolume": 14998754,
        change: 4.16,
        "changePercent": 2.3107,
        "label": "Oct 11",
        "changeOverTime": 0.007604
      },
      {
        date: "2019-10-14",
        open: 184.2,
        close: 183.28,
        "high": 184.62,
        "low": 182.57,
        volume: 7203665,
        "uOpen": 184.2,
        "uClose": 183.28,
        "uHigh": 184.62,
        "uLow": 182.57,
        "uVolume": 7203665,
        change: -0.91,
        "changePercent": -0.4941,
        "label": "Oct 14",
        "changeOverTime": 0.002626
      },
      {
        date: "2019-10-15",
        open: 183.8,
        close: 188.89,
        "high": 190.38,
        "low": 183.66,
        volume: 15143119,
        "uOpen": 183.8,
        "uClose": 188.89,
        "uHigh": 190.38,
        "uLow": 183.66,
        "uVolume": 15143119,
        change: 5.61,
        "changePercent": 3.0609,
        "label": "Oct 15",
        "changeOverTime": 0.033315
      },
      {
        date: "2019-10-16",
        open: 188.32,
        close: 189.55,
        "high": 189.7,
        "low": 186.9,
        volume: 10560343,
        "uOpen": 188.32,
        "uClose": 189.55,
        "uHigh": 189.7,
        "uLow": 186.9,
        "uVolume": 10560343,
        change: 0.66,
        "changePercent": 0.3494,
        "label": "Oct 16",
        "changeOverTime": 0.036926
      },
      {
        date: "2019-10-17",
        open: 190.3,
        close: 190.39,
        "high": 190.84,
        "low": 188.76,
        volume: 9761548,
        "uOpen": 190.3,
        "uClose": 190.39,
        "uHigh": 190.84,
        "uLow": 188.76,
        "uVolume": 9761548,
        change: 0.84,
        "changePercent": 0.4432,
        "label": "Oct 17",
        "changeOverTime": 0.041521
      },
      {
        date: "2019-10-18",
        open: 190.23,
        close: 185.85,
        "high": 191.49,
        "low": 183.92,
        volume: 16882862,
        "uOpen": 190.23,
        "uClose": 185.85,
        "uHigh": 191.49,
        "uLow": 183.92,
        "uVolume": 16882862,
        change: -4.54,
        "changePercent": -2.3846,
        "label": "Oct 18",
        "changeOverTime": 0.016685
      },
      {
        date: "2019-10-21",
        open: 187.04,
        close: 189.76,
        "high": 189.91,
        "low": 186.75,
        volume: 8580744,
        "uOpen": 187.04,
        "uClose": 189.76,
        "uHigh": 189.91,
        "uLow": 186.75,
        "uVolume": 8580744,
        change: 3.91,
        "changePercent": 2.1038,
        "label": "Oct 21",
        "changeOverTime": 0.038074
      },
      {
        date: "2019-10-22",
        open: 190,
        close: 182.34,
        "high": 190.65,
        "low": 181.5,
        volume: 19854192,
        "uOpen": 190,
        "uClose": 182.34,
        "uHigh": 190.65,
        "uLow": 181.5,
        "uVolume": 19854192,
        change: -7.42,
        "changePercent": -3.9102,
        "label": "Oct 22",
        "changeOverTime": -0.002516
      },
      {
        date: "2019-10-23",
        open: 182.01,
        close: 186.15,
        "high": 186.38,
        "low": 182,
        volume: 12370819,
        "uOpen": 182.01,
        "uClose": 186.15,
        "uHigh": 186.38,
        "uLow": 182,
        "uVolume": 12370819,
        change: 3.81,
        "changePercent": 2.0895,
        "label": "Oct 23",
        "changeOverTime": 0.018326
      },
      {
        date: "2019-10-24",
        open: 184.62,
        close: 186.38,
        "high": 186.73,
        "low": 182.8,
        volume: 11505406,
        "uOpen": 184.62,
        "uClose": 186.38,
        "uHigh": 186.73,
        "uLow": 182.8,
        "uVolume": 11505406,
        change: 0.23,
        "changePercent": 0.1236,
        "label": "Oct 24",
        "changeOverTime": 0.019584
      }
    ];

    this.data2 = [
      {
        date: "2019-09-30",
        open: 383,
        close: 380.47,
        "high": 383.77,
        "low": 376.69,
        volume: 3211818,
        "uOpen": 383,
        "uClose": 380.47,
        "uHigh": 383.77,
        "uLow": 376.69,
        "uVolume": 3211818,
        change: 0,
        "changePercent": 0,
        "label": "Sep 30",
        "changeOverTime": 0
      },
      {
        date: "2019-10-01",
        open: 381.7,
        close: 374.94,
        "high": 382.85,
        "low": 374.63,
        volume: 2953276,
        "uOpen": 381.7,
        "uClose": 374.94,
        "uHigh": 382.85,
        "uLow": 374.63,
        "uVolume": 2953276,
        change: -5.53,
        "changePercent": -1.4535,
        "label": "Oct 1",
        "changeOverTime": -0.014535
      },
      {
        date: "2019-10-02",
        open: 371.85,
        close: 367.36,
        "high": 372.99,
        "low": 363.77,
        volume: 3736441,
        "uOpen": 371.85,
        "uClose": 367.36,
        "uHigh": 372.99,
        "uLow": 363.77,
        "uVolume": 3736441,
        change: -7.58,
        "changePercent": -2.0217,
        "label": "Oct 2",
        "changeOverTime": -0.034457
      },
      {
        date: "2019-10-03",
        open: 366.21,
        close: 372.07,
        "high": 372.25,
        "low": 363.23,
        volume: 2719561,
        "uOpen": 366.21,
        "uClose": 372.07,
        "uHigh": 372.25,
        "uLow": 363.23,
        "uVolume": 2719561,
        change: 4.71,
        "changePercent": 1.2821,
        "label": "Oct 3",
        "changeOverTime": -0.022078
      },
      {
        date: "2019-10-04",
        open: 372.25,
        close: 375.7,
        "high": 376.13,
        "low": 371.72,
        volume: 2013254,
        "uOpen": 372.25,
        "uClose": 375.7,
        "uHigh": 376.13,
        "uLow": 371.72,
        "uVolume": 2013254,
        change: 3.63,
        "changePercent": 0.9756,
        "label": "Oct 4",
        "changeOverTime": -0.012537
      },
      {
        date: "2019-10-07",
        open: 374.06,
        close: 376.54,
        "high": 378.15,
        "low": 373.06,
        volume: 1953195,
        "uOpen": 374.06,
        "uClose": 376.54,
        "uHigh": 378.15,
        "uLow": 373.06,
        "uVolume": 1953195,
        change: 0.84,
        "changePercent": 0.2236,
        "label": "Oct 7",
        "changeOverTime": -0.010329
      },
      {
        date: "2019-10-08",
        open: 371.05,
        close: 374.1,
        "high": 377.34,
        "low": 368.64,
        volume: 4051648,
        "uOpen": 371.05,
        "uClose": 374.1,
        "uHigh": 377.34,
        "uLow": 368.64,
        "uVolume": 4051648,
        change: -2.44,
        "changePercent": -0.648,
        "label": "Oct 8",
        "changeOverTime": -0.016742
      },
      {
        date: "2019-10-09",
        open: 376,
        close: 374.96,
        "high": 377.86,
        "low": 373.5,
        volume: 2794769,
        "uOpen": 376,
        "uClose": 374.96,
        "uHigh": 377.86,
        "uLow": 373.5,
        "uVolume": 2794769,
        change: 0.86,
        "changePercent": 0.2299,
        "label": "Oct 9",
        "changeOverTime": -0.014482
      },
      {
        date: "2019-10-10",
        open: 373.7,
        close: 371,
        "high": 374.54,
        "low": 370.33,
        volume: 2760659,
        "uOpen": 373.7,
        "uClose": 371,
        "uHigh": 374.54,
        "uLow": 370.33,
        "uVolume": 2760659,
        change: -3.96,
        "changePercent": -1.0561,
        "label": "Oct 10",
        "changeOverTime": -0.02489
      },
      {
        date: "2019-10-11",
        open: 373,
        close: 374.92,
        "high": 376.94,
        "low": 370.08,
        volume: 3973451,
        "uOpen": 373,
        "uClose": 374.92,
        "uHigh": 376.94,
        "uLow": 370.08,
        "uVolume": 3973451,
        change: 3.92,
        "changePercent": 1.0566,
        "label": "Oct 11",
        "changeOverTime": -0.014587
      },
      {
        date: "2019-10-14",
        open: 374.25,
        close: 373.18,
        "high": 378.7,
        "low": 372.68,
        volume: 2138932,
        "uOpen": 374.25,
        "uClose": 373.18,
        "uHigh": 378.7,
        "uLow": 372.68,
        "uVolume": 2138932,
        change: -1.74,
        "changePercent": -0.4641,
        "label": "Oct 14",
        "changeOverTime": -0.019161
      },
      {
        date: "2019-10-15",
        open: 372.58,
        close: 370.96,
        "high": 373.52,
        "low": 370.53,
        volume: 2861420,
        "uOpen": 372.58,
        "uClose": 370.96,
        "uHigh": 373.52,
        "uLow": 370.53,
        "uVolume": 2861420,
        change: -2.22,
        "changePercent": -0.5949,
        "label": "Oct 15",
        "changeOverTime": -0.024995
      },
      {
        date: "2019-10-16",
        open: 370.22,
        close: 372.43,
        "high": 377.42,
        "low": 369.24,
        volume: 3683227,
        "uOpen": 370.22,
        "uClose": 372.43,
        "uHigh": 377.42,
        "uLow": 369.24,
        "uVolume": 3683227,
        change: 1.47,
        "changePercent": 0.3963,
        "label": "Oct 16",
        "changeOverTime": -0.021132
      },
      {
        date: "2019-10-17",
        open: 372.42,
        close: 369.06,
        "high": 373.8,
        "low": 369.06,
        volume: 2402691,
        "uOpen": 372.42,
        "uClose": 369.06,
        "uHigh": 373.8,
        "uLow": 369.06,
        "uVolume": 2402691,
        change: -3.37,
        "changePercent": -0.9049,
        "label": "Oct 17",
        "changeOverTime": -0.029989
      },
      {
        date: "2019-10-18",
        open: 369,
        close: 344,
        "high": 369.35,
        "low": 344,
        volume: 13568415,
        "uOpen": 369,
        "uClose": 344,
        "uHigh": 369.35,
        "uLow": 344,
        "uVolume": 13568415,
        change: -25.06,
        "changePercent": -6.7902,
        "label": "Oct 18",
        "changeOverTime": -0.095855
      },
      {
        date: "2019-10-21",
        open: 332.89,
        close: 331.06,
        "high": 334.24,
        "low": 324.4,
        volume: 15538450,
        "uOpen": 332.89,
        "uClose": 331.06,
        "uHigh": 334.24,
        "uLow": 324.4,
        "uVolume": 15538450,
        change: -12.94,
        "changePercent": -3.7616,
        "label": "Oct 21",
        "changeOverTime": -0.129866
      },
      {
        date: "2019-10-22",
        open: 336.07,
        close: 337,
        "high": 341.48,
        "low": 334.46,
        volume: 7972185,
        "uOpen": 336.07,
        "uClose": 337,
        "uHigh": 341.48,
        "uLow": 334.46,
        "uVolume": 7972185,
        change: 5.94,
        "changePercent": 1.7942,
        "label": "Oct 22",
        "changeOverTime": -0.114253
      },
      {
        date: "2019-10-23",
        open: 345,
        close: 340.5,
        "high": 350.8,
        "low": 336.5,
        volume: 10993362,
        "uOpen": 345,
        "uClose": 340.5,
        "uHigh": 350.8,
        "uLow": 336.5,
        "uVolume": 10993362,
        change: 3.5,
        "changePercent": 1.0386,
        "label": "Oct 23",
        "changeOverTime": -0.105054
      },
      {
        date: "2019-10-24",
        open: 341.7,
        close: 344.55,
        "high": 345.74,
        "low": 337.77,
        volume: 5414087,
        "uOpen": 341.7,
        "uClose": 344.55,
        "uHigh": 345.74,
        "uLow": 337.77,
        "uVolume": 5414087,
        change: 4.05,
        "changePercent": 1.1894,
        "label": "Oct 24",
        "changeOverTime": -0.09441
      },
      {
        date: "2019-10-25",
        open: 342.92,
        close: 339.83,
        "high": 343.37,
        "low": 338.9,
        volume: 4058018,
        "uOpen": 342.92,
        "uClose": 339.83,
        "uHigh": 343.37,
        "uLow": 338.9,
        "uVolume": 4058018,
        change: -4.72,
        "changePercent": -1.3699,
        "label": "Oct 25",
        "changeOverTime": -0.106815
      },
      {
        date: "2019-10-28",
        open: 341.5,
        close: 340.88,
        "high": 344.98,
        "low": 339.49,
        volume: 3234472,
        "uOpen": 341.5,
        "uClose": 340.88,
        "uHigh": 344.98,
        "uLow": 339.49,
        "uVolume": 3234472,
        change: 1.05,
        "changePercent": 0.309,
        "label": "Oct 28",
        "changeOverTime": -0.104056
      }
    ]

    this.state = {
      data: this.data1,
      data2: this.data2
    }
  }

  componentDidMount() {

    // function mouseover() {
    //   select(".mouse-line")
    //     .style("opacity", "1");
    // }
    // function mousemove() {
    //   console.log('mouse move');

    //   let mouse = d3.mouse(this);
    //   select(".mouse-line")
    //     .attr("d", function () {
    //       let d = "M" + mouse[0] + "," + window.innerHeight;
    //       d += " " + mouse[0] + "," + 0;
    //       return d;
    //     });
    // }

    // function mouseup() {
    //   console.log('mouse move');
    // }

    // let mouseG = select('svg');
    // mouseG.append("path") // this is the black vertical line to follow mouse
    //   .attr("class", "mouse-line")
    //   .style("stroke", "black")
    //   .style("stroke-width", "1px")
    //   .style("opacity", "0");

    // select('svg')
    //   .on('mouseover', mouseover)
    //   .on("mousemove", mousemove)
 
  }


  randomData = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      const data = prevState.data2.map(d => ({
        date: d.date,
        close: d.close
      }))
      return {
        data
      }
    })
  }

  render() {
    const { data } = this.state;
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

     // const data = [
    //   {
    //     date: 0,
    //     close: 606.98
    //   },
    //   {
    //     date: 10,
    //     close: 614.48
    //   },
    //   {
    //     date: 20,
    //     close: 617.62
    //   }
    // ]


    const margin = { top: 30, right: 120, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.date))
      .range([0, width])
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.close))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close))


    return (
      <div>
        <button onClick={this.randomData}>Next data</button>
        <svg
          className="lineChartSvg"
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margins.left + 30}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}

export default App;