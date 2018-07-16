import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import _ from 'lodash';

export default class TileGroup extends React.PureComponent {

    static propTypes = {
        tiles: PropTypes.array,
        id: PropTypes.string,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        onClick: PropTypes.func,
        style: PropTypes.object,
    };
    static defaultProps = {
        defaultFontSize: '16px'
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.containerId = _.uniqueId('tile-group');
        this.state = {id: props.id};
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.redraw();
    }

    prepareData() {
        return this.props.tiles.map(e => ({
            ...e,
            x: this.centerWidth,
            y: this.centerHeight
        }));
    }

    get centerWidth() {
        return this.props.width / 2;
    }

    get centerHeight() {
        return this.props.height / 2;
    }

    draw() {
        const {onClick} = this.props;
        const forceStrength = 0.01;
        this.data = this.prepareData();
        this.view = d3.select(`#${this.containerId}`).append('g');
        this.nodes = this.view
            .selectAll('g')
            .data(this.data)
            .enter()
            .append('g')
            .style('stroke', d => d.material.isDark ? d3.rgb(d.material.background).darker() : d3.rgb(d.material.background).brighter())
            .style('stroke-width', 1)
            .style('cursor', 'pointer')
            .on('click', function (d) {
                onClick(d.id);
            })
            .on('mouseover', function (d) {
                d3.select(this).style('stroke-width', 2)
            })
            .on('mouseout', function (d) {
                d3.select(this).style('stroke-width', 1)
            });
        this.tiles = this.nodes
            .append('rect')
            .attr('width', d => _.defaultTo(d.w, d.a))
            .attr('x', d => -_.defaultTo(d.w, d.a) / 2)
            .attr('height', d => _.defaultTo(d.h, d.a))
            .attr('y', d => -_.defaultTo(d.h, d.a) / 2)
            .attr('rx', 8)
            .attr('ry', 8)
            .style('fill', d => d.material.background);
        this.nodes.append('text')
            .attr('dy', '0.1em')
            .style('text-anchor', 'middle')
            .style('stroke', d => d.material.color)
            .style('stroke-width', 0.4)
            .style('fill', d => d.material.isDark ? d3.rgb(d.material.color).brighter() : d3.rgb(d.material.color).darker())
            .style('font-size', d => _.defaultTo(d.fontSize, this.props.defaultFontSize))
            .text(d => d.label);
        this.simulation = d3.forceSimulation()
            .velocityDecay(0.2)
            .force('x', d3.forceX().strength(forceStrength).x(d => this.centerWidth + d.xTarget * this.centerWidth))
            .force('y', d3.forceY().strength(forceStrength).y(d => this.centerHeight + d.yTarget * this.centerHeight))
            .force('collide', d3.forceCollide(d => d.a * 0.1))
            .on('tick', this.onTick);
        this.simulation.stop();
        this.restartAnimation();
    }

    redraw() {
        if (this.props.id === this.state.id) {
            this.restartAnimation();
        } else {
            this.clear();
            this.draw();
            this.setState({id: this.props.id});
        }
    }

    restartAnimation() {
        this.simulation.nodes(this.data);
        this.simulation.alpha(1).restart();
    }

    clear() {
        this.simulation.stop();
        this.nodes.remove();
    }

    onTick = () => {
        this.nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    };

    render() {
        const {width, height, style} = this.props;
        return <svg id={this.containerId} ref={this.ref} width={width} height={height} style={style}/>;
    }
}