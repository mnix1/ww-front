import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';
import {connect} from "react-redux";

class Team extends React.PureComponent {

    static defaultProps = {
        className: 'justifyCenter',
        memberClassName: '',
        contentClassName: '',
        renderHorizontal: false,
        renderHobbies: false,
        renderImg: true,
        onClick: _.noop,
    };

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight - 10;
    }

    renderWisies(wisies, activeIndex, presentIndexes) {
        return wisies.map((e, i) => this.renderWisie(e, i + 1, i + 1 === activeIndex, !_.includes(presentIndexes, i + 1)));
    }

    renderWisie(wisie, index, active, disabled) {
        const {renderHobbies, onClick, renderImg, memberClassName} = this.props;
        return <Wisie
            onClick={() => onClick(index)}
            disabled={disabled}
            className={memberClassName}
            key={wisie.type}
            active={active}
            imgHeight={this.imgHeight}
            renderImg={renderImg}
            renderDetails={true}
            renderHobbies={renderHobbies}
            isOwned={true}
            {...wisie}/>;
    }

    renderProfile() {
        const {profile, onClick, activeIndex, memberClassName, presentIndexes} = this.props;
        return <Profile
            onClick={() => onClick(0)}
            disabled={ _.head(presentIndexes) !== 0}
            active={activeIndex === 0} {...profile}
            imgHeight={this.imgHeight + 18}
            className={memberClassName}
        />;
    }

    render() {
        const {team, activeIndex, presentIndexes, renderHorizontal, contentClassName, className} = this.props;
        const customClassName = `${className} ${renderHorizontal ? 'justifyStart' : ''}`;
        const customContentClassName = `${contentClassName} ${renderHorizontal ? 'flexColumn' : ''}`;
        return <div className={customClassName}>
            <div className={`justifyCenter ${customContentClassName} flexWrap`}>
                {this.renderProfile()}
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
