import React, {Component} from "react";
import zero from "../../../../images/clock_digital/0.svg";
import one from "../../../../images/clock_digital/1.svg";
import two from "../../../../images/clock_digital/2.svg";
import three from "../../../../images/clock_digital/3.svg";
import four from "../../../../images/clock_digital/4.svg";
import five from "../../../../images/clock_digital/5.svg";
import six from "../../../../images/clock_digital/6.svg";
import seven from "../../../../images/clock_digital/7.svg";
import eight from "../../../../images/clock_digital/8.svg";
import nine from "../../../../images/clock_digital/9.svg";

class DigitalClockDigit extends Component {
    constructor(props) {
        super(props);
        this.digitsImages = this.createDigitsArray();

        const numberStyle = {
            position: "relative",
            top: '0px',
            backgroundImage: `url(${this.digitsImages[0]})`,
            backgroundSize: "100% 100%",
        };

        this.state = {
            previousDigit: 0,
            numberPreviousStyle: {...numberStyle},
            numberCurrentStyle: {...numberStyle},
            digitContainerStyle : {
                float: "left",
                overflow: "hidden"
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const previousDigit = prevProps.digit;
        const currentDigit = this.props.digit;

        if (previousDigit !== currentDigit || this.props.width !== prevProps.width) {
            const slideStyle = {
                transition: "top 500ms ease-in 0s",
                top: "-100%",
            };
            this.flipNumber(previousDigit, currentDigit, slideStyle);
            setTimeout(() => {
                const slideStyle = {
                    transition: "",
                    top: "0",
                };
                this.flipNumber(currentDigit, previousDigit, slideStyle);
            }, 500);
        }
    }

    flipNumber(previousDigit, currentDigit, slideStyle) {

        const size = {
            width: this.props.width,
            height: this.props.height
        };

        const numberPreviousStyle = {
            ...this.state.numberPreviousStyle,
            ...slideStyle,
            backgroundImage: `url(${this.digitsImages[previousDigit]})`,
            ...size
        };

        const numberCurrentStyle = {
            ...this.state.numberCurrentStyle,
            ...slideStyle,
            backgroundImage: `url(${this.digitsImages[currentDigit]})`,
            ...size
        };

        const digitContainerStyle = {...this.state.digitContainerStyle, ...size};

        this.setState({numberPreviousStyle, numberCurrentStyle, digitContainerStyle});
    }

    createDigitsArray() {
        return [zero, one, two, three, four, five, six, seven, eight, nine];
    }

    render() {
        return(
            <div style={this.state.digitContainerStyle}>
                <div style={this.state.numberPreviousStyle}></div>
                <div style={this.state.numberCurrentStyle}></div>
            </div>
        );
    }
}

export default DigitalClockDigit;