import React from 'react';
import './styles.css';
import coins from '../../media/image/resource/coins.svg';

export default class Gold extends React.PureComponent {

    render() {
        const {children} = this.props;
        return <div className='resource'>
            {children}
            <img src={coins} height={20}/>
        </div>
    }
}
