import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../component/modal/Modal";
import HeroStat from "../../component/hero/HeroStat";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";
import {
    CHARISMA,
    COMBINING_FACTS,
    CONCENTRATION,
    COUNTING,
    IMAGINATION,
    INTUITION,
    LEADERSHIP,
    MEMORY,
    PATTERN_RECOGNITION,
    PERCEPTIVITY,
    REFLEX
} from "../../util/heroStatHelper";
import Hero from "../../component/hero/Hero";
import {heroDetailsChanged} from "../../redux/reducer/hero";
import {Button} from "../../component/button/Button";

class HeroDetailsPage extends React.PureComponent {

    renderHero(hero) {
        return <Hero {...hero} style={{}}>
            {this.renderHeroStats(hero)}
        </Hero>;
    }

    renderHeroStats(hero) {
        return <div className='justifyEvenly' style={{fontSize: '0.8em'}}>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <HeroStat hero={hero} stat={MEMORY}/>
                <HeroStat hero={hero} stat={PERCEPTIVITY}/>
                <HeroStat hero={hero} stat={COUNTING}/>
                <HeroStat hero={hero} stat={COMBINING_FACTS}/>
                <HeroStat hero={hero} stat={PATTERN_RECOGNITION}/>
                <HeroStat hero={hero} stat={IMAGINATION}/>
            </div>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <HeroStat hero={hero} stat={REFLEX}/>
                <HeroStat hero={hero} stat={CONCENTRATION}/>
                <HeroStat hero={hero} stat={LEADERSHIP}/>
                <HeroStat hero={hero} stat={CHARISMA}/>
                <HeroStat hero={hero} stat={INTUITION}/>
            </div>
        </div>;
    }

    renderModalHeader() {
        return null;
        // <div className='left'>
            /*<Button icon={<FaPlusCircle/>}>Dodaj do drużyny</Button>*/
        // </div>
    }

    render() {
        const {heroDetails, onExitClick} = this.props;
        if (!heroDetails) {
            return null;
        }
        return <Modal header={this.renderModalHeader()} onExitClick={onExitClick}>
            {this.renderHero(heroDetails)}
        </Modal>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        heroDetails: state.hero.heroDetails,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onExitClick: () => dispatch(heroDetailsChanged(undefined)),
    })
)(HeroDetailsPage);
