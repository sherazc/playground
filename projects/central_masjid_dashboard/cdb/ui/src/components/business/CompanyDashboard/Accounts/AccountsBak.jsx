import React, {Component} from "react";
import Funds from "./Funds/Funds";
import Expenses from "./Expenses/Expenses";
import styles from "./Accounts.module.scss"

const TOTAL_SLIDES = 2;

class AccountsBak extends Component {

    constructor(props) {
        super(props);

        this.animationSeconds = 1;
        this.animationStaySeconds = 5;
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
        slidesClassesClone[this.currentSlide] = styles.slideUp;
        this.setState({slidesClasses: slidesClassesClone});

        this.currentSlide++;

        if (this.currentSlide >= totalSlides) {
            this.currentSlide = 0;
        }

        setTimeout(() => {
            slidesClassesClone[this.currentSlide] = styles.slideDown;
            this.setState({slidesClasses: slidesClassesClone});
        }, this.animationSeconds * 1000);
    }

    createDefaultSlideClasses(totalSlides) {
        let slidesClasses = [];
        for (let i = 0; i < totalSlides; i++) {
            slidesClasses.push(styles.sliderHeightZero);
        }
        return slidesClasses;
    }


    createSlides() {
        if (!this.slides) {
            this.slides = [];
        }

        if (this.slides.length < 1 && this.props.centralControl.id !== undefined) {
            this.slides = [
                <Expenses expenses={this.props.centralControl.expenses}/>,
                <Funds funds={this.props.centralControl.funds}/>,
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
                <div className={`${styles.heading1} ${styles.vMargin8}`}>Expenses</div>
                <div className={styles.vMargin6}>
                    {this.createSlidesDivs()}
                </div>
            </div>
        );
    }
}

export default AccountsBak;
