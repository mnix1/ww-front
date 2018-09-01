import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';
import {connect} from "react-redux";

class Team extends React.PureComponent {

    static defaultProps = {
        className: 'justifyCenter',
        heroClassName: '',
        contentClassName: '',
        renderHobbies: false,
        renderImg: true,
    };

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.heroImgHeight;
    }

    renderHeroes(heroes, activeIndex, presentIndexes) {
        return heroes.map((e, i) => this.renderHero(e, i + 1, i + 1 === activeIndex, !_.includes(presentIndexes, i + 1)));
    }

    renderHero(hero, index, isActive, isDisabled) {
        const {renderHobbies, onClick, imgHobbyHeight, renderImg, heroClassName} = this.props;
        const className = `${heroClassName} ${isDisabled ? 'disabled' : ''}`;
        return <Hero
            onClick={isDisabled ? _.noop : () => onClick(index)}
            className={className}
            key={hero.type}
            isActive={isActive}
            imgHeight={this.imgHeight}
            renderImg={renderImg}
            renderDetails={true}
            renderHobbies={renderHobbies}
            imgHobbyHeight={imgHobbyHeight}
            isOwned={true}
            {...hero}/>;
    }

    render() {
        const {profile, team, onClick, activeIndex, presentIndexes, contentClassName, className} = this.props;
        const isProfileDisabled = _.head(presentIndexes) !== 0;
        return <div className={className}>
            <div className={`justifyCenter ${contentClassName}`}>
                <Profile onClick={isProfileDisabled ? _.noop : () => onClick(0)}
                         blackBackground={true}
                         renderDetailsHorizontal={true}
                         isActive={activeIndex === 0} {...profile}
                         imgHeight={this.imgHeight}
                         className={isProfileDisabled ? 'disabled' : ''}/>
                {this.renderHeroes(team, activeIndex, presentIndexes)}
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
