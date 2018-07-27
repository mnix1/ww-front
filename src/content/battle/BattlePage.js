import React from 'react';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {OBJECTS_BATTLE} from "../object-group/objectsBattle";

class BattlePage extends React.PureComponent {

    renderContent() {
        const {screen, onContentIdChange} = this.props;
        return <div>
            <SimpleObjectGroup
                objects={OBJECTS_BATTLE}
                onObjectClick={onContentIdChange}
                screen={screen}
            />
        </div>;
    }

    render() {
        return <div>
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({
        onContentIdChange: (e) => dispatch(idChanged(e.id)),
    })
)(BattlePage);
