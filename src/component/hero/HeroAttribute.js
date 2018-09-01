import React from 'react';
import PropTypes from "prop-types";
import {getHeroAttributeLabel} from "../../lang/langHeroAttribute";
import {NAME_TO_PROP} from "../../util/wisieAttributeHelper";
import _ from 'lodash';

export default class HeroAttribute extends React.PureComponent {

    static propTypes = {
        attribute: PropTypes.string,
        hero: PropTypes.object,
        change: PropTypes.node
    };

    static defaultProps = {
        className: '',
    };

    render() {
        const {attribute, change, hero, className} = this.props;
        return <div className={`justifyBetween ${className}`}>
            <div className='justifyCenter paddingRem'><span>{getHeroAttributeLabel(attribute)}</span></div>
            <div className='justifyCenter paddingRem'>
                {!_.isNil(change) && change}
                <span>{hero[NAME_TO_PROP[attribute]]}</span>
            </div>
        </div>;
    }

}
