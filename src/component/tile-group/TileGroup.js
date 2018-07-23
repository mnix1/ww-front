import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import _ from 'lodash';
import {CREAME_COLOR} from "../../util/style/constant";

export default class TileGroup extends React.PureComponent {

    static propTypes = {
        tiles: PropTypes.array,
        id: PropTypes.string,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        onClick: PropTypes.func,
        style: PropTypes.object,
        defaultFontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        forceCollideStrengthFactor: PropTypes.number,
        forceXYStrength: PropTypes.number,
        addRandomMoving: PropTypes.bool
    };

    static defaultProps = {
        forceCollideStrengthFactor: 0.6,
        forceXYStrength: 0.06,
        addRandomMoving: false,
        defaultFontSize: 16
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.containerId = _.uniqueId('tile-group');
        this.state = {id: props.id, data: this.prepareData(props.tiles)};
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.redraw();
    }

    prepareData(tiles) {
        const {defaultFontSize} = this.props;
        return tiles.map(e => ({
            ...e,
            strokeWidthFactor: _.defaultTo(e.strokeWidthFactor, 1),
            fontSize: _.defaultTo(e.fontSize, defaultFontSize),
            x: this.centerWidth,
            y: this.centerHeight
        }));
    }

    updateData() {
        const stateDataMap = _.keyBy(this.state.data, 'id');
        return this.props.tiles.map(e => {
            const oldObj = stateDataMap[e.id];
            if (oldObj) {
                return {...e, x: oldObj.x, y: oldObj.y};
            }
            return {...e, x: this.centerWidth, y: this.centerHeight};
        });
    }

    get centerWidth() {
        return this.props.width / 2;
    }

    get centerHeight() {
        return this.props.height / 2;
    }

    static prepareStroke(d) {
        return d.strokeFill
            ? d.strokeFill
            : (d.material.isDark ? d3.rgb(d.material.background).darker() : (d.material.isBright ? d3.rgb(d.material.background).darker() : d.material.background));
    }

    draw(data = this.state.data) {
        const {onClick, forceXYStrength, forceCollideStrengthFactor} = this.props;
        this.view = d3.select(`#${this.containerId}`).append('g');
        this.nodes = this.view
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'node')
            .style('stroke', TileGroup.prepareStroke)
            .style('stroke-width', d => d.strokeWidthFactor * 1)
            .style('cursor', 'pointer')
            .on('click', function (d) {
                if(d.customMouseOver){
                    return d.customMouseOver(d);
                }
                onClick(d.id);
            })
            .on('mouseover', function (d) {
                if(d.customMouseOver){
                    return d.customMouseOver(d);
                }
                d3.select(this).style('stroke-width', d.strokeWidthFactor * 2).style('stroke', CREAME_COLOR);
            })
            .on('mouseout', function (d) {
                if(d.customMouseOut){
                    return d.customMouseOver(d);
                }
                d3.select(this).style('stroke-width', d.strokeWidthFactor * 1).style('stroke', TileGroup.prepareStroke)
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
        this.drawNodesText();
        this.drawAdditional();
        this.simulation = d3.forceSimulation()
            .force('x', d3.forceX().strength(forceXYStrength).x(d => this.centerWidth + d.xTarget * this.centerWidth))
            .force('y', d3.forceY().strength(forceXYStrength).y(d => this.centerHeight + d.yTarget * this.centerHeight))
            .force('collide', d3.forceCollide(d => d.a * forceCollideStrengthFactor))
            .on('tick', this.onTick);
        this.simulation.stop();
        this.restartAnimation();
    }

    drawAdditional() {
        this.view.selectAll('.node').each(function (d) {
            if (!d.imageCreator && !d.outsideLabel) {
                return;
            }
            const el = d3.select(this);
            if (d.imageCreator) {
                d.imageCreator(el, d);
            }
            if (d.outsideLabel) {
                el.append('text')
                    .attr('y', -_.defaultTo(d.h, d.a) / 2 - 8)
                    .style('text-anchor', 'middle')
                    .style('font-size', d.fontSize + 10)
                    .style('fill', d => d.material.isDark ? d3.rgb(d.material.color).brighter() : (d.material.isBright ? d3.rgb(d.material.color).darker() : d.material.color))
                    .style('stroke', d => d.material.color)
                    .style('stroke-width', 0.4)
                    .text(d.outsideLabel);
            }
        });
    }

    drawNodesText() {
        this.nodes.append('text')
            .attr('dy', 1)
            .style('text-anchor', 'middle')
            .style('stroke', d => d.material.color)
            .style('stroke-width', 0.4)
            .style('fill', d => d.material.isDark ? d3.rgb(d.material.color).brighter() : d3.rgb(d.material.color).darker())
            .style('font-size', d => d.fontSize)
            .text(d => d.label);
        this.view.selectAll('text').each(this.drawMultiLineText);
    }

    drawMultiLineText(d) {
        if (!_.isArray(d.label)) {
            return;
        }
        const el = d3.select(this);
        el.text('');
        el.attr('dy', 0);
        for (let i = 0; i < d.label.length; i++) {
            const tspan = el.append('tspan').text(d.label[i]);
            if (i === 0) {
                tspan.attr('x', 0).attr('dy', -d.fontSize * (d.label.length - 1) / 2 + d.fontSize * 0.3);
            } else {
                tspan.attr('x', 0).attr('dy', d.fontSize);
            }
        }
    };

    redraw() {
        const {id} = this.props;
        if (id === this.state.id) {
            this.restartAnimation();
        } else {
            const data = this.updateData();
            this.clear();
            this.draw(data);
            this.setState({id, data});
        }
    }

    restartAnimation() {
        this.simulation.nodes(this.state.data);
        this.simulation.alpha(1).restart();
    }

    clear() {
        this.simulation.stop();
        this.nodes.remove();
    }

    onTick = () => {
        if (this.props.addRandomMoving) {
            const alpha = this.simulation.alpha();
            const sin = Math.sin(alpha * 2 * Math.PI);
            const cos = Math.cos(alpha * 6 * Math.PI);
            this.nodes.attr('transform', d => `translate(${d.x + d.y / 10 * sin + d.x / 10 * cos},${d.y + sin * sin * d.x / 10})`);
        } else {
            this.nodes.attr('transform', d => `translate(${d.x},${d.y })`);
        }
    };

    render() {
        const {width, height, style} = this.props;
        return <svg id={this.containerId} ref={this.ref} width={width} height={height} style={style}/>;
    }
}