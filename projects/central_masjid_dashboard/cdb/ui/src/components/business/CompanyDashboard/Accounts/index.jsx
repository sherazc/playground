import React, {Component} from "react";
import Funds from "./Funds";
import Expenses from "./Expenses";
import "./Accounts.scss"

const TOTAL_SLIDES = 2;

class Accounts extends Component {

    constructor(props) {
        super(props);

        this.animationSeconds = 1;
        this.animationStaySeconds = 6;
        this.currentSlide = 0;

        this.startSlides = this.startSlides.bind(this);

        this.state = {
            slidesClasses: this.createDefaultSlideClasses(TOTAL_SLIDES)
        }
    }

    componentDidMount() {
        this.startSlides();
        this.animationInterval = setInterval(this.startSlides, this.animationStaySeconds * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.animationInterval);
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
        for (let i = 0; i < totalSlides; i++) {
            slidesClasses.push("sliderHeightZero");
        }
        return slidesClasses;
    }


    createSlides() {
        if (!this.slides) {
            this.slides = [];
        }

        if (this.slides.length < 1 && this.props.centralControl.id !== undefined) {
            console.log("Creating Slides", this.props.centralControl);
            this.slides = [
                <Funds funds={this.props.centralControl.funds}/>,
                <Expenses expenses={this.props.centralControl.expenses}/>
                ];
        }
    }

    createSlidesDivs() {
        this.createSlides();

        return this.slides.map((component, index) => {
            return (
                <div key={index}
                     className={this.state.slidesClasses[index]}
                     style={{animationDuration: `${this.animationSeconds}s`}}>
                    {component}
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <div className="heading1 vMargin6">Expenses</div>
                <div className="vMargin6">
                    {this.createSlidesDivs()}
                </div>
            </div>
        );
    }
}

export default Accounts;
