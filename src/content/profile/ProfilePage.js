import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getBook} from "../../util/bookHelper";
import _ from 'lodash';
import {readBookIdChanged, claimRewardBookIdChanged} from "../../redux/reducer/profile";

class ProfilePage extends React.PureComponent {

    renderContent() {
        const {profileListBookRep} = this.props;
        if (!profileListBookRep || !profileListBookRep.fulfilled) {
            return null;
        }
        const books = _.take(_.flatten([profileListBookRep.value, _.fill(Array(4), null)]), 4);
        return <div>
            {this.renderBooks(books)}
        </div>;
    }

    renderBooks(books) {
        return <div className='books'>
            {books.map(e => this.renderBook(e))}
        </div>
    }

    renderBook(book) {
        const {onBookClick, screen} = this.props;
        const width = (screen.contentWidth - 20) / 4;
        return <div style={{width, height: 200}}
                    className='bookContainer'
                    onClick={() => book && onBookClick(book)}>
            {book &&
            <div className='book'><img height={200} alt='' src={getBook(book.type)}/></div>}
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page profilePage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
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
        profileListBookRep: state.repository.profileListBook
    }),
    (dispatch) => ({
        onBookClick: (book) => book.canClaimReward
            ? dispatch(claimRewardBookIdChanged(book.id))
            : (book.isInProgress
                ? null
                : dispatch(readBookIdChanged(book.id)))
    })
)(ProfilePage);
