import React, {Component} from "react";
import Funds from "./Funds";
import Expenses from "./Expenses";
import "./Accounts.scss"

class Accounts extends Component {

    constructor(props) {
        super(props);

        this.animationSeconds = 1;
        this.slideStaySeconds = 5;
        this.currentSlide = 0;

        this.slideDownAnimate = this.slideDownAnimate.bind(this);
        this.slideUpAnimate = this.slideUpAnimate.bind(this);
        this.startSlides = this.startSlides.bind(this);

        this.slides = [<Funds/>, <Expenses/>];
        this.state = this.createInitialState(this.slides.length);
    }

    createInitialState(numberOfComponents) {
        let state = {
            fundsClasses : "slideUp",
            slidesClasses: []
        };

        for(let i = 0; i < numberOfComponents; i++) {
            state.slidesClasses.push("sliderHeightZero");
        }

        return state;
    }

    componentDidMount() {
        this.slideInterval = setInterval(this.startSlides, this.slideStaySeconds * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.slideInterval);
    }

    startSlides() {
        const totalSlides = this.slides.length;

    }

    slideDownAnimate() {
        this.state.slidesClasses[0] = "slideDown";
        this.setState({slidesClasses: this.state.slidesClasses});
    }

    slideUpAnimate() {
        this.state.slidesClasses[0] = "slideUp";
        this.setState({slidesClasses: this.state.slidesClasses});
    }

    createSlidesDivs() {
        return this.slides.map((component, index) => {
            return (
                <div key={index} className={this.state.slidesClasses[index]}
                     style={{animationDuration: `${this.animationSeconds}s`}}>
                    {component}
                </div>
            )
        });
    }

    render() {
        console.log(this.props.centralControl);
        return (
            <div>
                <button onClick={this.slideDownAnimate}>Animate Down</button>
                <button onClick={this.slideUpAnimate}>Animate Up</button>
                <div className="heading1">Expenses</div>
                {this.createSlidesDivs()}
            </div>
        );
    }
}

export default Accounts;
