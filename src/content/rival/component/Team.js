import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';
import {connect} from "react-redux";

class Team extends React.PureComponent {

    static defaultProps = {
        className: 'justifyCenter',
        wisieClassName: '',
        contentClassName: '',
        renderHobbies: false,
        renderImg: true,
        onClick: _.noop,
    };

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight;
    }

    renderWisies(wisies, activeIndex, presentIndexes) {
        return wisies.map((e, i) => this.renderWisie(e, i + 1, i + 1 === activeIndex, !_.includes(presentIndexes, i + 1)));
    }

    renderWisie(wisie, index, isActive, isDisabled) {
        const {renderHobbies, onClick, imgHobbyHeight, renderImg, wisieClassName} = this.props;
        const className = `${wisieClassName} ${isDisabled ? 'disabled' : ''}`;
        return <Wisie
            onClick={isDisabled ? _.noop : () => onClick(index)}
            className={className}
            key={wisie.type}
            isActive={isActive}
            imgHeight={this.imgHeight}
            renderImg={renderImg}
            renderDetails={true}
            renderHobbies={renderHobbies}
            imgHobbyHeight={imgHobbyHeight}
            isOwned={true}
            {...wisie}/>;
    }

    render() {
        const {profile, team, onClick, activeIndex, presentIndexes, contentClassName, className} = this.props;
        const isProfileDisabled = _.head(presentIndexes) !== 0;
        return <div className={className}>
            <div className={`justifyCenter ${contentClassName}`}>
                <Profile
                    onClick={isProfileDisabled ? _.noop : () => onClick(0)}
                    blackBackground={true}
                    isActive={activeIndex === 0} {...profile}
                    imgHeight={this.imgHeight + 18}
                    className={isProfileDisabled ? 'disabled' : ''}
                />
                {this.renderWisies(team, activeIndex, presentIndexes)}
            </div>
        </div>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(Team);
