import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getBook} from "../../util/bookHelper";
import _ from 'lodash';
import {buyBookIdChanged} from "../../redux/reducer/shop";

class ShopPage extends React.PureComponent {

    renderContent() {
        const {shopListBookRep} = this.props;
        if (!shopListBookRep || !shopListBookRep.fulfilled) {
            return null;
        }
        const chests = _.take(_.flatten([shopListBookRep.value, _.fill(Array(4), null)]), 4);
        return <div>
            {this.renderChests(chests)}
        </div>;
    }

    renderChests(chests) {
        return <div className='chests'>
            {chests.map(e => this.renderChest(e))}
        </div>
    }

    renderChest(chest) {
        const {onBookClick, screen} = this.props;
        const width = (screen.contentWidth - 20) / 4;
        return <div style={{width, height: 80}}
                    className='chestContainer'
                    onClick={() => chest && onBookClick(chest.id)}>
            {chest &&
            <div className='chest'><img height={70} width={width - 4} alt='' src={getBook(chest.type)}/></div>}
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page shopPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground'/>
            <div className='pageContent'>
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        shopListBookRep: state.repository.shopListBook
    }),
    (dispatch) => ({
        onBookClick: (id) => dispatch(buyBookIdChanged(id))
    })
)(ShopPage);
