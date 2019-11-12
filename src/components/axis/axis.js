import React, { Component } from "react";
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { transition } from 'd3-transition';
import * as d3 from 'd3';

class Axis extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.renderAxis();
  }

  //rendering axis
  renderAxis() {
    const { scale, orient, ticks } = this.props;
    const node = this.ref.current;
    let axis;
    const t = transition().duration(500);

    if (orient === "bottom") {
      axis = axisBottom(scale)
      .ticks(ticks)
      .tickSize(-window.innerHeight);
    }
    if (orient === "left") {
      axis = axisLeft(scale)
        .ticks(ticks).tickSize(-window.innerWidth);
    }
    select(node).transition(t).call(axis);
  }
  //updating axis
  updateAxis() {
    const { scale, orient, ticks } = this.props;
    const t = transition().duration(500)

    if (orient === "left") {
      const axis = axisLeft(scale).ticks(ticks); 
      selectAll(`.${orient}`).transition(t).call(axis)
    }
  }
  render() {
    const { orient, transform } = this.props;
    return (
      <g
        ref={this.ref}
        transform={transform}
        className={`${orient} axis`}
      />
    );
  }
}

export default Axis;
