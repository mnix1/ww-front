import React from 'react';
import PropTypes from "prop-types";
import {getHeroStatLabel} from "../../lang/heroStat";

export default class HeroStat extends React.PureComponent {

    static propTypes = {
        stat: PropTypes.string,
        hero: PropTypes.object
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const {stat, hero, className} = this.props;
        return <div className={`heroStat justifyBetween ${className}`}>
            <div className='justifyCenter paddingRem'>{getHeroStatLabel(stat)}</div>
            <div className='justifyCenter paddingRem'>{hero[stat]}</div>
        </div>;
    }

}
