import React from 'react';
import PropTypes from "prop-types";
import {getWisieActionLabel} from "../../lang/langWisieAction";
import _ from 'lodash';
import {remToPixels} from "../../util/fontHelper";

export default class WisieActions extends React.PureComponent {

    static propTypes = {
        actions: PropTypes.array,
        className: PropTypes.string,
    };

    static defaultProps = {
        actions: [],
        className: 'justifyStart',
    };

    renderAction(action) {
        const {className} = this.props;
        return <div key={action} className={`${className} flexWrap paddingBottomRem`}>
            {getWisieActionLabel(action)}
        </div>
    }

    render() {
        const {actions} = this.props;
        return <div className='fontSize08Rem justifyEnd flexColumn' style={{minWidth: remToPixels(6)}}>
            {_.takeRight(actions, 2).map(e => this.renderAction(e))}
        </div>
    }
}
