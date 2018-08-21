import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import _ from 'lodash';
import {Loading} from "../../component/loading/Loading";
import {getText, TEXT_BOOKSHELF} from "../../lang";
import {calculateBookWidth} from "../../util/bookHelper";
import ShopBook from "../../component/book/ShopBook";

class ShopPage extends React.PureComponent {

    get bookWidth() {
        const {screen} = this.props;
        const w= calculateBookWidth(screen.contentWidth - 20);
        return w;
    }

    renderBooksGroup(books, i) {
        return <div key={i} className='justifyEvenly booksGroup'>
            {books.map(e => this.renderBook(e))}
        </div>;
    }

    renderBook(book) {
        const {onClaimRewardClick, onStartReadClick, onStopReadClick, onDiscardClick} = this.props;
        return <ShopBook
            style={{width: this.bookWidth}}
            key={book.id}
            {...book}
            onClaimRewardClick={() => onClaimRewardClick(book.id)}
            onStartReadClick={() => onStartReadClick(book.id)}
            onStopReadClick={() => onStopReadClick(book.id)}
            onDiscardClick={() => onDiscardClick(book.id)}
        />;
    }

    render() {
        const {shopListBookRep, screen} = this.props;
        if (!shopListBookRep || !shopListBookRep.fulfilled) {
            return <Loading/>;
        }
        const books = _.sortBy(shopListBookRep.value, 'id');
        const groupCount = Math.floor(screen.contentWidth / this.bookWidth);
        const bookGroups = _.chunk(books, groupCount);
        return <div className='contentFragment'>
            <div className='title textAlignCenter'>{getText(TEXT_BOOKSHELF)} </div>
            <div className='justifyCenter flexColumn'>
                {bookGroups.map((e, i) => this.renderBooksGroup(e, i))}
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
    (dispatch) => ({})
)(ShopPage);
