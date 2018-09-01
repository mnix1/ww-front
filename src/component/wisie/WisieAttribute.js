import React from 'react';
import PropTypes from "prop-types";
import {getWisieAttributeLabel} from "../../lang/langWisieAttribute";
import {NAME_TO_PROP} from "../../util/wisieAttributeHelper";
import _ from 'lodash';

export default class WisieAttribute extends React.PureComponent {

    static propTypes = {
        attribute: PropTypes.string,
        wisie: PropTypes.object,
        change: PropTypes.node
    };

    static defaultProps = {
        className: '',
    };

    render() {
        const {attribute, change, wisie, className} = this.props;
        return <div className={`justifyBetween ${className}`}>
            <div className='justifyCenter paddingRem'><span>{getWisieAttributeLabel(attribute)}</span></div>
            <div className='justifyCenter paddingRem'>
                {!_.isNil(change) && change}
                <span>{wisie[NAME_TO_PROP[attribute]]}</span>
            </div>
        </div>;
    }

}
