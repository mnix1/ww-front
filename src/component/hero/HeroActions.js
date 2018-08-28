import React from 'react';
import PropTypes from "prop-types";
import {getHeroActionLabel} from "../../lang/heroAction";
import _ from 'lodash';

export default class HeroActions extends React.PureComponent {

    static propTypes = {
        actions: PropTypes.array,
    };

    static defaultProps = {
        actions: []
    };

    renderAction(action) {
        return <div className='justifyCenter'>
            {getHeroActionLabel(action)}
        </div>
    }

    render() {
        const {actions} = this.props;
        return <div className='heroActions justifyCenter flexColumn'>
            {_.takeRight(actions, 3).map(e => this.renderAction(e))}
        </div>;
    }

}
