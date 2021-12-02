import useD3 from '../hooks/useD3';
import React from 'react'
import * as d3 from 'd3';
import { onMouseMove, onMouseOut } from '../modules/hover.js';

function BarChart({ data }) {
    // Create basic variables
    const margin = { top: 40, right: 20, bottom: 20, left: 120 };
    const height = 375 - margin.top - margin.bottom;
    const width = 750 - margin.left - margin.right;

    // Filters out only the highest values for the data
    const values = data.map(d => d.value);
    const average = Math.round(values.reduce((a, b) => a + b, 0) / (values.length + 100));
    const highestValues = data.filter((d) => d.value >= average);

    // Creation of the bar chart
    const ref = useD3(
        (svg) => {
            const xScale = d3
                .scaleLinear()
                .domain([0, d3.max(highestValues, (d) => d.value
                )])
                .range([0, width]);
            const yScale = d3
                .scaleBand()
                .domain(highestValues.map((d) => d.currency))
                .rangeRound([0, height])
                .paddingInner(0.15);

            const xAxis = d3.axisTop().scale(xScale);
            const yAxis = d3.axisLeft().scale(yScale);

            svg
                .select('g')
                .attr('class', 'chart')
                .append('g').attr('class', 'x-axis')
                .append('g').attr('class', 'y-axis');

            svg.select('.x-axis').call(xAxis);
            svg.select('.y-axis').call(yAxis);

            const rect = svg
                .select('.chart')
                .selectAll('rect')
                .data(highestValues, d => d.name)
                .join(enter => {
                    const rect_enter = enter.append('rect').attr('x', 0)
                    rect_enter.append('title')
                    return rect_enter
                })
                .on('mousemove', onMouseMove)
                .on('mouseout', onMouseOut)
                .attr('height', yScale.bandwidth())
                .attr('y', (d) => yScale(d.currency))
                .transition()
                .attr('width', (d) => xScale(d.value))
                .duration(1500)
                .ease(d3.easeCircleOut);

            rect.select('title')
                .text((d) => d.currency);
        },
        [highestValues.length]
    );

    return (
        <svg
            className="barchart"
            ref={ref}
            viewBox="0 0 750 375"
            preserveAspectRatio="xMidYMid meet"
        >
            <g className='x-axis' />
        </svg >
    );
}

export default BarChart;
