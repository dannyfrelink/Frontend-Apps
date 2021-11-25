import useD3 from '../hooks/useD3';
import React, { useEffect, useState } from 'react'
import * as d3 from 'd3';

function BarChart({ data, selectedFilter }) {
    // const [initialised, setInitialised] = useState(false);
    const margin = { top: 40, right: 20, bottom: 20, left: 120 };
    const height = 750 - margin.top - margin.bottom;
    const width = 1500 - margin.left - margin.right;

    const ref = useD3(
        (svg) => {
            const xScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.value)])
                .range([0, width]);
            const yScale = d3
                .scaleBand()
                .domain(data.map((d) => d.currency))
                .rangeRound([0, height])
                .paddingInner(0.15);

            const xAxis = d3.axisTop().scale(xScale);
            const yAxis = d3.axisLeft().scale(yScale);

            // if (!initialised) {
            const g = svg
                .select('g')
                .attr('transform', `translate(${margin.left},${margin.top})`)
                .attr('class', 'chart')

            const g_xAxis = g.append('g').attr('class', 'x-axis')
            const g_yAxis = g.append('g').attr('class', 'y-axis')
            // }

            const rect = svg
                .select('.chart')
                .selectAll('rect')
                .data(data, d => d.name)
                .join(enter => {
                    const rect_enter = enter.append('rect').attr('x', 0)
                    rect_enter.append('title')
                    return rect_enter
                })

            // // aanroepen van de mouse events
            // .on('mousemove', onMouseMove) // Mousemove returnt constant de coördinaten van de muis
            // .on('mouseout', onMouseOut)

            rect
                .attr('height', yScale.bandwidth())
                .attr('y', (d) => yScale(d.currency))
                .transition()
                .attr('width', (d) => xScale(d.value))
                .duration(1500)
                .ease(d3.easeCircleOut);

            rect.select('title')
                .text((d) => d.currency);

            // const xScale = d3
            //     .scaleBand()
            //     .domain(data.map(d => d.currency))
            //     .rangeRound([margin.left, width - margin.right])
            //     .padding(0.1);


            // const yScale = d3
            //     .scaleLinear()
            //     .domain([0, d3.max(data, (d) => d.value)])
            //     .rangeRound([height - margin.bottom, margin.top])

            // const xAxis = (g) =>
            //     g
            //         .attr('transform', `translate(0,${height - margin.bottom})`)
            //         .call(d3.axisBottom()
            //             .scale(xScale));

            // const yAxis = (g) =>
            //     g
            //         .attr('transform', `translate(${margin.left},0)`)
            //         .call(d3.axisLeft()
            //             .scale(yScale));



            svg.select('.x-axis').call(xAxis);
            svg.select('.y-axis').call(yAxis);

            // svg
            //     .select('.plot-area')
            //     .attr('fill', '#61dafb')
            //     .selectAll('.bar')
            //     .data(data)
            //     .join('rect')
            //     .attr('class', 'bar')
            //     .attr('x', (d) => xScale(d.currency))
            //     .attr('width', xScale.bandwidth())
            //     .attr('y', (d) => yScale(d.value))
            //     .attr('height', (d) => yScale(0) - yScale(d.value));
        },
        [data.length, selectedFilter]
    );
    // useEffect(() => {
    //     setInitialised(true)
    // }, []);

    return (
        <svg
            ref={ref}
            style={{
                height: 750,
                width: '100%',
                marginRight: '0px',
                marginLeft: '0px'
            }}
        >
            <g className='plot-area' />
            <g className='x-axis' />
            <g className='y-axis' />
        </svg >
    );
}

export default BarChart;