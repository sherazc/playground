import React, {Component} from "react";
import CircleProgressBarSvg from "./CircleProgressBarSvg";
import styles from "./CircleProgressBar.module.scss";

// https://jakearchibald.com/2013/animated-line-drawing-svg/

class CircleProgressBar extends Component {
    static cpbCounter = 0;
    constructor(props) {
        super(props);
        this.animationSeconds = 2;
        this.animationStaySeconds = 10;

        this.cpbSvgPathId = "cpb_svg_path_" + CircleProgressBar.cpbCounter++;
        this.setupProgressBar = this.setupProgressBar.bind(this);
    }

    componentDidMount() {
        this.setupProgressBar();
        this.animationInterval = setInterval(this.setupProgressBar, this.animationStaySeconds * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.animationInterval);
    }

    setupProgressBar() {
        const percentage = this.props.percentage;
        const path = document.getElementById(this.cpbSvgPathId);
        const pathLenght = path.getTotalLength();

        path.style.transition = path.style.WebkitTransition = 'none';
        path.style.strokeDashoffset = pathLenght;

        path.getBoundingClientRect();
        path.style.strokeDasharray = `${pathLenght} ${pathLenght}`;

        setTimeout(() => {
            path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${this.animationSeconds}s ease-in-out`;
            path.style.strokeDashoffset = this.calculateStrokeDashoffset(percentage, pathLenght);
        }, 500);
    }

    calculateStrokeDashoffset(percentage, pathLenght) {
        if (percentage >= 100) {
            return 0;
        }
        if (percentage <= 0) {
            return pathLenght;
        }
        const reversePercentage = 100 - (percentage % 100);
        return pathLenght * reversePercentage / 100;
    }

    render() {
        return (
            <div className={styles.circleProgressBarSvg}>
            <CircleProgressBarSvg

                id={this.cpbSvgPathId}
                // fill="orange"
                stroke="#b8b72f"/>
            </div>
        );
    }
}

export default CircleProgressBar;