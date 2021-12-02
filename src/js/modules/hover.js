import * as d3 from 'd3';

// Activates on hover bar chart
function onMouseMove(d, data) {
    const xPosition = d.clientX;
    const yPosition = d.clientY;

    d3.select('#tooltip')
        .classed('hidden', false)
        .style('left', xPosition + -40 + 'px')
        .style('top', yPosition + -40 + 'px');

    d3.select('#content')
        .classed('hidden', false)
        .text(`${data.currency}: ${data.value}`);
}

// Activates on stop hovering bar chart
function onMouseOut() {
    d3.select('#tooltip').classed('hidden', true);
    d3.select('#content').classed('hidden', true);
}

export { onMouseMove, onMouseOut };