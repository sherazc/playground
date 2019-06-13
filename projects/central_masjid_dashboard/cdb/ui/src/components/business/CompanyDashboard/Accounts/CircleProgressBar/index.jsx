import React, {Component} from "react";
import CircleProgressBarSvg from "./CircleProgressBarSvg";
/*

var path = document.querySelector('.squiggle-animated path');
var length = path.getTotalLength();
// Clear any previous transition
path.style.transition = path.style.WebkitTransition =
  'none';
// Set up the starting positions
path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
path.getBoundingClientRect();
// Define our transition
path.style.transition = path.style.WebkitTransition =
  'stroke-dashoffset 2s ease-in-out';
// Go!
path.style.strokeDashoffset = '0';


 */

class CircleProgressBar extends Component {

    render() {
        return (
            <div>
                Circle Progress Bar
                <CircleProgressBarSvg fill="Orange" stroke="blue" width="10vh"/>

                {/*
                <svg version="1.1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="10vh">
                    <g transform="translate(0 -164.71)">
                        <path d="m490 414.71a240 240 0 0 1 -240 240 240 240 0 0 1 -240 -240 240 240 0 0 1 240 -240 240 240 0 0 1 240 240z" fill="none" stroke="#000" strokeMiterlimit="2" strokeWidth="20"
                              strokeDasharray="1540 1540"
                              strokeDashoffset="0"
                        />
                    </g>
                </svg>
*/}
            </div>

        );
    }
}


export default CircleProgressBar;