import useD3 from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart({ data }) {
    const ref = useD3(
        (svg) => {
            const margin = { top: 40, right: 20, bottom: 20, left: 120 };
            const height = 750 - margin.top - margin.bottom;
            const width = 1500 - margin.left - margin.right;

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.currency))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.value)])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .style("color", "#61dafb")
                    .call(d3.axisBottom()
                        .scale(x));

            const y1Axis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "#61dafb")
                    .call(d3.axisLeft()
                        .scale(y1));

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            svg
                .select(".plot-area")
                .attr("fill", "#61dafb")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d.currency))
                .attr("width", x.bandwidth())
                .attr("y", (d) => y1(d.value))
                .attr("height", (d) => y1(0) - y1(d.value));
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 750,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px"
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default BarChart;