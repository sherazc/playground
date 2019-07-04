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
    static cpbCounter = 0;
    constructor(props) {
        super(props);
        this.cpbSvgPathId = "cpb_svg_path_" + CircleProgressBar.cpbCounter++;
    }

    componentDidMount() {
        const percentage = 75;
        const path = document.getElementById(this.cpbSvgPathId);
        const pathLenght = path.getTotalLength();

        path.style.transition = path.style.WebkitTransition = 'none';
        path.style.strokeDashoffset = pathLenght;

        path.getBoundingClientRect();
        path.style.strokeDasharray = `${pathLenght} ${pathLenght}`;

        setTimeout(() => {
            path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
            path.style.strokeDashoffset = this.calculateStrokeDashoffset(percentage, pathLenght);
        }, 1000);
    }

    calculateStrokeDashoffset(percentage, pathLenght) {
        if (percentage >= 100) {
            return 0;
        }
        if (percentage <= 0) {
            return pathLenght;
        }
        const reversePercentage = 100 - (percentage % 100)
        return pathLenght * reversePercentage / 100;
    }

    render() {
        return (
            <div>
                Circle Progress Bar changed
                <CircleProgressBarSvg id={this.cpbSvgPathId} fill="orange" stroke="blue" width="10vh"/>
            </div>

        );
    }
}


export default CircleProgressBar;