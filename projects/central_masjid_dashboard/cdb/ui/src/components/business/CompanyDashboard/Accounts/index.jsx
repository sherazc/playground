import React, {Component} from "react";
import Funds from "./Funds";
import Expenses from "./Expenses";
import "./Accounts.scss"

class Accounts extends Component {

    constructor(props) {
        super(props);

        this.animationSeconds = 1;
        this.slideStaySeconds = 2;
        this.currentSlide = 0;

        this.startSlides = this.startSlides.bind(this);

        this.slides = [<Funds/>, <Expenses/>];
        this.state = this.createInitialState(this.slides.length);
    }

    createInitialState(totalSlides) {
        const state = {
            fundsClasses : "slideUp",
            slidesClasses: this.createDefaultSlideClasses(totalSlides)
        };

        state.slidesClasses[0] = "sliderHeightFull";
        return state;
    }

    componentDidMount() {
        if (this.slides.length > 1) {
            this.slideInterval = setInterval(this.startSlides, this.slideStaySeconds * 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.slideInterval);
    }

    startSlides() {
        const totalSlides = this.slides.length;
        const slidesClassesClone = this.state.slidesClasses.map(c => c);
        slidesClassesClone[this.currentSlide] = "slideUp";
        this.setState({slidesClasses: slidesClassesClone});

        this.currentSlide++;

        if (this.currentSlide >= totalSlides) {
            this.currentSlide = 0;
        }

        setTimeout(() => {
            slidesClassesClone[this.currentSlide] = "slideDown";
            this.setState({slidesClasses: slidesClassesClone});
        }, this.animationSeconds * 1000);
    }

    createDefaultSlideClasses(totalSlides) {
        let slidesClasses = [];
        for(let i = 0; i < totalSlides; i++) {
            slidesClasses.push("sliderHeightZero");
        }
        return slidesClasses;
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
        return (
            <div>
                <div className="heading1">Expenses</div>
                {this.createSlidesDivs()}
            </div>
        );
    }
}

export default Accounts;
