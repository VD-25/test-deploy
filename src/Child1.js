import React, {Component} from "react";
import * as d3 from "d3";

class Child1 extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount(){
        console.log(this.props.data1)
    }
    componentDidUpdate(){
        var data=this.props.data1 //save data passed down from parent in variable

        //set dimensions and margins of graph
        var margin = {top: 10, right: 10, bottom: 30, left: 20},
        w = 500-margin.left-margin.right,
        h = 300 - margin.top - margin.bottom;
        
        //i assume if you put . before classname of component
        //giving us container to store visualization
        var container = d3.select(".child1_svg")
        .attr("width", w+margin.left+margin.right)
        .attr("height", h+margin.top+margin.bottom)
        .select(".g_1")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //add x axis, data is total_bill column
        var x_data=data.map(item=>item.total_bill)
        const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left,w]);
        //what is domain and range in this case?
        //for code below:nothing with this class name yet so you first bind data and then join
        //binding data array with just one element so it will create 1 g element for us
        //setting class to what we want className to be -> MUST MATCH
        container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
        .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));
        //if you don't translate then it'll be formed at the top, we want the numbers to be at x axis at the bottom

        //now y:
        //what is item?
        var y_data=data.map(item=>item.tip)
        const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
        container.selectAll(".y_axis_g").data([0]).join('g').attr("class", "y_axis_g")
        .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

        container.selectAll("circle") 
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
            return x_scale(d.total_bill);
        })
        .attr("cy", function(d){
            return y_scale(d.tip)
        })
        .attr("r", 3)
        .style("fill", "#69b3a2")
    }
    render(){
        return <svg className="child1_svg">
            <g className="g_1"></g>
        </svg>
    }
}

export default Child1;