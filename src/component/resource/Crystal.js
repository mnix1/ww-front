import React from 'react';
import crystals from '../../media/image/resource/crystals.svg';
import Resource from "./Resource";

export default class Crystal extends React.PureComponent {

    render() {
        return <Resource imgSrc={crystals} {...this.props}/>
    }
}
