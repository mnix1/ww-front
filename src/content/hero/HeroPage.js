import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import HeroListPage from "./HeroListPage";
import HeroExperimentPage from "./HeroExperimentPage";
import AvailableResources from "../../component/resource/AvailableResources";
import {RESOURCE_SMALL} from "../../component/resource/Resource";

class HeroPage extends React.PureComponent {

    render() {
        const {screen} = this.props;
        return <div className='page heroPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageContent'>
                <div className='justifyEvenly'>
                    <AvailableResources showGold={false} size={RESOURCE_SMALL}/>
                    <HeroExperimentPage/>
                </div>
                <HeroListPage/>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(HeroPage);
