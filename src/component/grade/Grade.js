import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import seal from '../../media/image/icon/seal.svg';
import {GRADE_STYLE} from "../../util/gradeHelper";

export default class Grade extends React.PureComponent {

    static propTypes = {
        grade: PropTypes.string,
        className: PropTypes.string,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool
    };

    static defaultProps = {
        styleMargin: false,
        stylePadding: false,
    };

    render() {
        const {grade, styleMargin, stylePadding, className} = this.props;
        const customClassName = cn('justifyCenter', {
            [className]: className,
            'marginRem': styleMargin,
            'paddingRem': stylePadding,
        });
        return <div className={customClassName}>
            <div className='justifyCenter relative'>
                <div className='absolute'
                     style={{
                         backgroundColor: GRADE_STYLE[grade].backgroundColor,
                         borderRadius: '50%',
                         height: 28,
                         width: 28,
                         left: 1,
                         top: 1
                     }}/>
                <img alt='' src={seal} height={30} style={{opacity: 0.1}}/>
                <div className='absolute width100 height100 textAlignCenter'>
                    <div className='relative' style={{
                        color: GRADE_STYLE[grade].color,
                        fontSize: 24,
                        fontFamily: 'Black Ops One'
                    }}>{grade}</div>
                </div>
            </div>
        </div>;
    }
}