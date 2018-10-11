import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "../../../component/loading/Loading";
import Profile from "../../../component/profile/Profile";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {getText, TEXT_RANKING} from "../../../lang/langText";
import position1 from '../../../media/image/position/position1.svg';
import position2 from '../../../media/image/position/position2.svg';
import position3 from '../../../media/image/position/position3.svg';
import positionLow from '../../../media/image/position/positionLow.svg';
import _ from 'lodash';
import cn from 'classnames';
import ClassificationListFetch from "./ClassificationListFetch";
import ScreenPage from "../../../component/page/ScreenPage";

class ClassificationPage extends React.PureComponent {

    renderContent() {
        const {classificationListRep} = this.props;
        if (!isRepFulfilled(classificationListRep)) {
            return <Loading/>;
        }
        return <div className='justifyCenter flexColumn'>
            {this.renderClassification(classificationListRep.value)}
        </div>
    }

    renderClassification(positions) {
        if (_.isEmpty(positions)) {
            return null;
        }
        const {profile} = this.props;
        const me = positions.filter(e => e.profile.tag === profile.tag)[0];
        const isPresent = !_.isNil(me);
        const isLast = isPresent && profile.tag === _.last(positions).profile.tag;
        positions = isLast
            ? positions.filter(e => e.tag !== profile.tag)
            : positions;
        return <div className='justifyCenter flexColumn'>
            {positions.map(e => this.renderPosition(e))}
            {isPresent && isLast && this.renderPosition(me)}
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

    renderPosition = (profile) => {
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
                         renderElo={true}
                         key={profile.tag} {...profile}>
                </Profile>
            </div>
        </div>
    };

    render() {
        const {path} = this.props;
        return <ScreenPage>
            <div className='pageHeader'>{getText(TEXT_RANKING)}</div>
            {this.renderClassification()}
            <ClassificationListFetch path={path}/>
        </ScreenPage>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
        path: state.router.location.pathname,
        classificationListRep: state.repository.classificationList,
    }),
    (dispatch) => ({})
)(ClassificationPage);
