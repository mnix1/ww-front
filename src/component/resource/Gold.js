import React from 'react';
import goldBar from '../../media/image/resource/goldBar.svg';
import Resource from "./Resource";

export default class Gold extends React.PureComponent {

    render() {
        return <Resource imgSrc={goldBar} {...this.props}/>
    }
}
