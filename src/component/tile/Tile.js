import React from 'react';
import styles from './tile.css';

export default class Tile extends React.PureComponent {
    render() {
        const {children, style} = this.props;
        return <div className={styles.tile} style={style}>{children}</div>;
    }
}