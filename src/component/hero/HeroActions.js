import React from 'react';
import PropTypes from "prop-types";
import {getHeroActionLabel} from "../../lang/langHeroAction";
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
        return <div className='heroActions fontSize08Rem justifyCenter flexColumn'>
            {_.takeRight(actions, 2).map(e => this.renderAction(e))}
        </div>;
    }

}
