import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {
    claimRewardBookIdChanged,
    discardBookIdChanged,
    startReadBookIdChanged,
    stopReadBookIdChanged
} from "../../redux/reducer/profile";
import Book from "../../component/book/Book";
import {getText, TEXT_BOOKSHELF, TEXT_EMPTY_BOOKSHELF} from "../../lang";
import _ from 'lodash';
import {Loading} from "../../component/loading/Loading";

class ProfilePage extends React.PureComponent {
    renderBooks(books) {
        return <div className='contentFragment'>
            <div className='title'>{getText(TEXT_BOOKSHELF)} </div>
            <div className='books'>
                {books.map(e => this.renderBook(e))}
            </div>
        </div>;
    }

    renderBook(book) {
        const {onClaimRewardClick, onStartReadClick, onStopReadClick, onDiscardClick} = this.props;
        return <Book
            {...book}
            onClaimRewardClick={() => onClaimRewardClick(book.id)}
            onStartReadClick={() => onStartReadClick(book.id)}
            onStopReadClick={() => onStopReadClick(book.id)}
            onDiscardClick={() => onDiscardClick(book.id)}
        />;
    }

    renderEmpty() {
        return <div className='contentFragment'>
            <div className='title'>{getText(TEXT_EMPTY_BOOKSHELF)}</div>
        </div>;
    }

    render() {
        const {profileListBookRep} = this.props;
        if (!profileListBookRep || !profileListBookRep.fulfilled) {
            return <Loading/>;
        }
        const books = profileListBookRep.value;
        if (_.isEmpty(books)) {
            return this.renderEmpty();
        }
        return this.renderBooks(books);
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        profileListBookRep: state.repository.profileListBook
    }),
    (dispatch) => ({
        onClaimRewardClick: (id) => dispatch(claimRewardBookIdChanged(id)),
        onStartReadClick: (id) => dispatch(startReadBookIdChanged(id)),
        onStopReadClick: (id) => dispatch(stopReadBookIdChanged(id)),
        onDiscardClick: (id) => dispatch(discardBookIdChanged(id)),
    })
)(ProfilePage);
