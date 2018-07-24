import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import Back from "../../component/back/Back";
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import {OBJECT_APP_TRAINING, OBJECTS_APP} from "../object-group/objectsApp";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";

class App extends React.PureComponent {

    renderContent() {
        const {contentId, screen, onContentIdChange} = this.props;
        if (contentId === undefined) {
            return <SimpleObjectGroup
                objects={OBJECTS_APP}
                onObjectClick={onContentIdChange}
                screen={screen}
            />;
        }
        if (contentId === OBJECT_APP_TRAINING) {
            return <PractisePage/>
        }
    }

    renderBack() {
        const {contentId} = this.props;
        if (contentId === undefined) {
            return null;
        }
        return <Back/>;
    }

    render() {
        const {screen} = this.props;
        const {height, contentWidth} = screen;
        return <div className={styles.app}>
            <div style={{height, width: contentWidth}} className={styles.content}>
                <TopBar/>
                {this.renderBack()}
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        contentId: state.content.id,
    }),
    (dispatch) => ({
        onContentIdChange: (e) => dispatch(idChanged(e.id)),
    })
)(App);
