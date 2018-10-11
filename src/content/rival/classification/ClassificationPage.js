import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "../../../component/loading/Loading";
import Profile from "../../../component/profile/Profile";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {
    getText,
    TEXT_NO_PLAYERS_YET,
    TEXT_RANKING,
    TEXT_REWARDS,
    TEXT_SEASON,
    TEXT_SEASON_REWARDS
} from "../../../lang/langText";
import position1 from '../../../media/image/position/position1.svg';
import position2 from '../../../media/image/position/position2.svg';
import position3 from '../../../media/image/position/position3.svg';
import positionLow from '../../../media/image/position/positionLow.svg';
import _ from 'lodash';
import cn from 'classnames';
import ClassificationListFetch from "./ClassificationListFetch";
import ScreenPage from "../../../component/page/ScreenPage";
import Line from "rc-progress/es/Line";
import Grade from "../../../component/grade/Grade";
import {GRADE_A, GRADE_B, GRADE_C, GRADE_D, GRADE_E, GRADE_F} from "../../../util/gradeHelper";
import {AvailableResourcesComponent} from "../../../component/resource/AvailableResources";
import {RESOURCE_VERY_SMALL} from "../../../component/resource/Resource";
import Elo from "../../../component/elo/Elo";

class ClassificationPage extends React.PureComponent {

    renderContent() {
        const {classificationListRep} = this.props;
        if (!isRepFulfilled(classificationListRep)) {
            return <Loading/>;
        }
        return <div className='justifyStart'>
            <div className='width100 justifyStart flexColumn'>
                {this.renderSeason(classificationListRep.value)}
                {this.renderClassification(classificationListRep.value.positions)}
            </div>
            <div>
                {this.renderGrades(classificationListRep.value.grades)}
            </div>
        </div>
    }

    renderSeason(season) {
        const {screen} = this.props;
        return <div className='marginRem justifyCenter'>
            <div className='boxShadow paddingRem relative'>
                <div className='blackBackground absoluteBackgroundMix'/>
                <div className='relative'>
                    <div>{`${getText(TEXT_SEASON)} ${season.name}`}</div>
                    <div className='paddingTopRem justifyCenter'>
                        <div className='justifyCenter flexColumn'>
                            <Line style={{width: screen.contentWidth / 2}} percent={season.done} strokeWidth="7"/>
                        </div>
                        <div className='justifyCenter flexColumn'>{season.done}%</div>
                    </div>
                </div>
            </div>
        </div>
    }

    renderGrades(grades) {
        return <div className='marginRem justifyCenter'>
            <div className='boxShadow paddingRem relative'>
                <div className='blackBackground absoluteBackgroundMix'/>
                <div className='relative'>
                    <div className='textAlignCenter'>{getText(TEXT_SEASON_REWARDS)}</div>
                    <div className='paddingTopRem justifyCenter flexColumn'>
                        {_.sortBy(grades, 'grade').map(e => this.renderGrade(e))}
                    </div>
                </div>
            </div>
        </div>
    }

    renderGrade(grade) {
        return <div className='justifyCenter marginRem '>
            <div className='boxShadow width100'>
                <div className='justifyCenter'>
                    <Grade styleMargin={true} className='justifyCenter' grade={grade.grade}/>
                    <Elo elo={grade.rangeFrom}/>
                </div>
                <AvailableResourcesComponent
                    stylePadding={false}
                    styleBoxShadow={false}
                    size={RESOURCE_VERY_SMALL}
                    renderTitle={false}
                    {...grade.rewards}
                />
            </div>
        </div>
    }

    renderClassification(positions) {
        if (_.isEmpty(positions)) {
            return <div className='justifyCenter flexColumn'>
                <div className='justifyCenter'>{getText(TEXT_NO_PLAYERS_YET)}</div>
            </div>
        }
        const {profile} = this.props;
        const me = positions.filter(e => e.profile.tag === profile.tag)[0];
        const isPresent = !_.isNil(me);
        const isLast = isPresent && profile.tag === _.last(positions).profile.tag;
        positions = isLast
            ? positions.filter(e => e.profile.tag !== profile.tag)
            : positions;
        return <div className='justifyCenter flexColumn overflowAuto'>
            <div className='justifyCenter'>{getText(TEXT_RANKING)}</div>
            {positions.map(e => this.renderPosition(e))}
            {isPresent && isLast && this.renderPosition(me)}
        </div>
    }

    renderPositionImage(position) {
        let src = positionLow;
        if (position.position === 1) {
            src = position1;
        } else if (position.position === 2) {
            src = position2;
        } else if (position.position === 3) {
            src = position3;
        }
        return <img alt='' src={src} height={src === positionLow ? 30 : 50}/>;
    }

    renderPosition = (position) => {
        const {profile} = position;
        const {tag} = this.props.profile;
        const className = cn('justifyCenter relative boxShadow paddingRem marginRem', {
            'active': position.profile.tag === tag,
        });
        return <div className='justifyStart' key={position.position}>
            <div className={className}>
                <div className='blackBackground absoluteBackgroundMix'/>
                <div className='justifyCenter relative paddingRightRem'>
                    <div className='justifyCenter'>{position.position}</div>
                    <div className='paddingLeftRem'> {this.renderPositionImage(position)}</div>
                </div>
                <Profile
                    defaultClassNames={false}
                    defaultDetailsClassNames={false}
                    detailsContainerClassName='justifyBetween'
                    detailsInsideContainerClassName='paddingLeftRem'
                    renderElo={true}
                    renderGrade={true}
                    elo={position.elo}
                    grade={position.grade}
                    key={profile.tag}
                    {...profile}
                />
            </div>
        </div>
    };

    render() {
        const {path} = this.props;
        return <ScreenPage>
            {this.renderContent()}
            <ClassificationListFetch path={path}/>
        </ScreenPage>;
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
