import React, {Component} from "react";

const digitImageBasePath = `${process.env.PUBLIC_URL}/images/clock_digital`;

class DigitalClockDigit extends Component {
    constructor(props) {
        super(props);
        const numberStyle = {
            width: "22px",
            height: "30px",
            position: "relative",
            top: '0px',
            backgroundImage: `url(${digitImageBasePath}/0.svg)`,
            backgroundSize: "100% 100%",

        };

        this.state = {
            previousDigit: 0,
            numberPreviousStyle: {...numberStyle},
            numberCurrentStyle: {...numberStyle},
        };

        this.styles = {
            digitContainer : {
                height: "30px",
                width: "22px",
                float: "left",
                backgroundColor: "green",
                overflow: "hidden"
            }
        };

        console.log(this.props);
    }


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const previousDigit = prevProps.digit;
        const currentDigit = this.props.digit;

        if (previousDigit !== currentDigit) {
            const slideStyle = {
                transition: "top 500ms ease-out 0s",
                top: "-30px",
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

        const numberPreviousStyle = {
            ...this.state.numberPreviousStyle,
            ...slideStyle,
            backgroundImage: `url(${digitImageBasePath}/${previousDigit}.svg)`
        };

        const numberCurrentStyle = {
            ...this.state.numberCurrentStyle,
            ...slideStyle,
            backgroundImage: `url(${digitImageBasePath}/${currentDigit}.svg)`
        };

        this.setState({numberPreviousStyle, numberCurrentStyle});
    }

    render() {

        return(
            <div style={this.styles.digitContainer}>
                <div style={this.state.numberPreviousStyle}></div>
                <div style={this.state.numberCurrentStyle}></div>
            </div>

            /*
            <div>
                previousDigit = {this.state.previousDigit}
                <br/>
                currentDigit = {this.props.digit}

            </div>
            */

        );
    }
}

export default DigitalClockDigit;