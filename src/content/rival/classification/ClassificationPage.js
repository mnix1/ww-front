import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "../../../component/loading/Loading";
import Profile from "../../../component/profile/Profile";
import MeshBackground from "../../../component/background/MeshBackground";
import {repFulfilled} from "../../../util/repositoryHelper";
import {RIVAL_TYPE_BATTLE, RIVAL_TYPE_WAR, CLASSIFICATION_ROUTE_RIVAL_TYPE} from "../../../util/rivalHelper";
import {getText, TEXT_RANKING} from "../../../lang/langText";
import position1 from '../../../media/image/position/position1.svg';
import position2 from '../../../media/image/position/position2.svg';
import position3 from '../../../media/image/position/position3.svg';
import positionLow from '../../../media/image/position/positionLow.svg';
import _ from 'lodash';
import cn from 'classnames';
import ClassificationListFetch from "./ClassificationListFetch";

class ClassificationPage extends React.PureComponent {

    renderContent() {
        const {classificationListRep, path, profile} = this.props;
        if (!repFulfilled(classificationListRep)) {
            return <Loading/>;
        }
        const type = CLASSIFICATION_ROUTE_RIVAL_TYPE[path];
        const myProfile = classificationListRep.value.filter(e => e.tag === profile.tag)[0];
        const isLast = myProfile.tag === _.last(classificationListRep.value).tag;
        const otherProfiles = classificationListRep.value.filter(e => e.tag !== profile.tag);
        return <div className='justifyCenter flexColumn'>
            {otherProfiles.map(e => this.renderPosition(e, type === RIVAL_TYPE_WAR, type === RIVAL_TYPE_BATTLE))}
            {isLast && this.renderPosition(myProfile, type === RIVAL_TYPE_WAR, type === RIVAL_TYPE_BATTLE)}
        </div>
    }

    renderPositionImage(profile) {
        let src = positionLow;
        if (profile.position === 1) {
            src = position1;
        } else if (profile.position === 2) {
            src = position2;
        } else if (profile.position === 3) {
            src = position3;
        }
        return <img alt='' src={src} height={src === positionLow ? 30 : 50}/>;
    }

    renderPosition = (profile, renderWarElo, renderBattleElo) => {
        const {tag} = this.props.profile;
        const className = cn('justifyCenter relative boxShadow paddingRem marginRem', {
            'active': profile.tag === tag,
        });
        return <div className='justifyCenter'>
            <div className={className}>
                <div className='blackBackground absoluteBackgroundMix'/>
                <div className='justifyCenter relative paddingRightRem'>
                    <div className='justifyCenter'>{profile.position}</div>
                    <div className='paddingLeftRem'> {this.renderPositionImage(profile)}</div>
                </div>
                <Profile defaultClassNames={false} defaultDetailsClassNames={false}
                         detailsContainerClassName='justifyBetween'
                         detailsInsideContainerClassName='paddingLeftRem'
                         renderWarElo={renderWarElo} renderBattleElo={renderBattleElo}
                         key={profile.tag} {...profile}>
                </Profile>
            </div>
        </div>
    };

    render() {
        const {screen, path} = this.props;
        return <div className='page classificationPage'
                    style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <div className='pageContent overflowAuto'>
                <div className='pageHeader'>{getText(TEXT_RANKING)}</div>
                {this.renderContent()}
            </div>
            <ClassificationListFetch path={path}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        path: state.router.location.pathname,
        classificationListRep: state.repository.classificationList,
    }),
    (dispatch) => ({})
)(ClassificationPage);
