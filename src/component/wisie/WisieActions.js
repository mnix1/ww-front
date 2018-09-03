import React from 'react';
import PropTypes from "prop-types";
import {getWisieActionLabel} from "../../lang/langWisieAction";
import _ from 'lodash';

export default class WisieActions extends React.PureComponent {

    static propTypes = {
        actions: PropTypes.array,
    };

    static defaultProps = {
        actions: []
    };

    renderAction(action) {
        return <div key={action} className='justifyCenter'>
            {getWisieActionLabel(action)}
        </div>
    }

    render() {
        const {actions} = this.props;
        return <div className='wisieActions fontSize08Rem justifyCenter flexColumn'>
            {_.takeRight(actions, 2).map(e => this.renderAction(e))}
        </div>;
    }

}
