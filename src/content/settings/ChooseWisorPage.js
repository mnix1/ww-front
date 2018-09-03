import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import _ from 'lodash';
import {allPossibleWisors, getWisor} from "../../util/wisorHelper";
import {getText, TEXT_CHOOSE_WISOR} from "../../lang/langText";
import {chosenWisorChanged} from "../../redux/reducer/settings";

class ChooseWisorPage extends React.PureComponent {

    renderWisor(wisor, height, width) {
        const {onChoose} = this.props;
        return <div
            key={wisor}
            onClick={() => onChoose(wisor)}
            className='justifyCenter marginRem pointer boxShadow'
            style={{width: width}}
        >
            <img alt='' src={getWisor(wisor)} height={height}/>
        </div>
    }

    render() {
        const {screen} = this.props;
        const height = screen.wisieImgHeight * 2;
        const groupCount = Math.floor(Math.min(Math.max(screen.contentWidth / height / 1.5, 1), 4));
        const wisorWidth = screen.contentWidth / groupCount;
        const wisors = allPossibleWisors();
        const wisorsGroups = _.chunk(wisors, groupCount);
        return <div>
            <div className='pageHeader'>{getText(TEXT_CHOOSE_WISOR)}</div>
            <div className='justifyCenter flexColumn'>
                {wisorsGroups.map((wisors, i) =>
                    <div key={i} className='justifyEvenly'>
                        {wisors.map(e => this.renderWisor(e, height, wisorWidth))}
                    </div>
                )}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onChoose: (wisor) => {
            dispatch(chosenWisorChanged(wisor));
        }
    })
)(ChooseWisorPage);
