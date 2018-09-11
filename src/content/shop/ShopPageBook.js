import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import _ from 'lodash';
import {Loading} from "../../component/loading/Loading";
import {getText, TEXT_BOOKSHELF} from "../../lang/langText";
import {calculateBookWidth} from "../../util/bookHelper";
import ShopBook from "../../component/book/ShopBook";
import {bookFilterLevelChanged, buyBookIdChanged, showBooksChanged} from "../../redux/reducer/shop";
import {ERROR_NO_SPACE_FOR_BOOK, ERROR_NOT_ENOUGH_RESOURCES} from "../../lang/langError";
import {noticeError} from "../../component/notification/noticeError";
import {checkRepValueCode} from "../../util/repositoryHelper";
import Rating from "../../component/rating/Rating";
import {FaPlusCircle, FaMinusCircle} from "react-icons/fa";
import {repFulfilled} from "../../util/repositoryHelper";

class ShopPageBook extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {shopBuyBookRep} = this.props;
        if (!repFulfilled(shopBuyBookRep)) {
            return;
        }
        if (prevProps.shopBuyBookRep && prevProps.shopBuyBookRep.fulfilled) {
            return;
        }
        if (checkRepValueCode(shopBuyBookRep, -3)) {
            noticeError(ERROR_NOT_ENOUGH_RESOURCES)
        } else if (checkRepValueCode(shopBuyBookRep, -2)) {
            noticeError(ERROR_NO_SPACE_FOR_BOOK)
        }
    }

    get bookWidth() {
        const {screen} = this.props;
        return calculateBookWidth(screen.contentWidth - 20);
    }

    renderBooksGroup(books, i) {
        return <div key={i} className='justifyAround booksGroup'>
            {books.map(e => this.renderBook(e))}
        </div>;
    }

    renderBook(book) {
        const {onBuyClick, profile} = this.props;
        return <ShopBook
            key={book.id}
            isBuyEnable={(book.canBuyByGold && profile.gold >= book.goldCost) || (book.canBuyByCrystal && profile.crystal >= book.crystalCost)}
            {...book}
            onBuyClick={() => onBuyClick(book.id)}
        />;
    }

    renderFilter() {
        const {bookFilterLevel, onBookFilterLevelChanged} = this.props;
        const style = _.isNil(bookFilterLevel) ? {opacity: '0.7'} : {};
        return <div className='justifyCenter' style={style}>
            <Rating value={bookFilterLevel} onChange={onBookFilterLevelChanged}/>
        </div>;
    }

    renderBooks() {
        const {shopListBookRep, bookFilterLevel, screen, showBooks} = this.props;
        if (!showBooks) {
            return null;
        }
        if (!shopListBookRep || !shopListBookRep.fulfilled) {
            return <Loading/>;
        }
        const filteredBooks = _.isNil(bookFilterLevel)
            ? shopListBookRep.value
            : shopListBookRep.value.filter(e => e.level === bookFilterLevel * 2);
        const sortedBooks = _.sortBy(filteredBooks, 'id');
        const groupCount = Math.floor(screen.contentWidth / this.bookWidth);
        const bookGroups = _.chunk(sortedBooks, groupCount);
        return <div>
            {this.renderFilter()}
            <div className='justifyCenter flexColumn marginAuto' style={{width: '96%'}}>
                {bookGroups.map((e, i) => this.renderBooksGroup(e, i))}
            </div>
        </div>
    }

    render() {
        const {showBooks, onShowBookChanged, onBookFilterLevelChanged} = this.props;
        const iconClassName = 'pointer paddingLeftRem';
        return <div className='contentFragment'>
            <div className='title justifyCenter'>
                {getText(TEXT_BOOKSHELF)}
                <div className='justifyCenter flexColumn'>
                    {!showBooks
                    && <FaPlusCircle className={iconClassName} onClick={() => onShowBookChanged(true)}/>}
                    {showBooks
                    && <FaMinusCircle className={iconClassName} onClick={() => {onShowBookChanged(false);onBookFilterLevelChanged(undefined)}}/>}
                </div>
            </div>
            {this.renderBooks()}
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        bookFilterLevel: state.shop.bookFilterLevel,
        showBooks: state.shop.showBooks,
        path: state.router.location.pathname,
        profile: state.profile.profile,
        shopListBookRep: state.repository.shopListBook,
        shopBuyBookRep: state.repository.shopBuyBook
    }),
    (dispatch) => ({
        onBuyClick: (id) => dispatch(buyBookIdChanged(id)),
        onBookFilterLevelChanged: (level) => dispatch(bookFilterLevelChanged(level)),
        onShowBookChanged: (show) => dispatch(showBooksChanged(show)),
    })
)(ShopPageBook);
