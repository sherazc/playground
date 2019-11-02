import React, {Component} from "react";
import Funds from "./Funds/Funds";
import Expenses from "./Expenses/Expenses";
import styles from "./Accounts.module.scss"
import {equalObjects, filterEnabledItems} from "../../../../services/utilities";

class Accounts extends Component {

    constructor(props) {
        super(props);

        this.animationSeconds = 1;
        this.animationStaySeconds = 5;
        this.currentSlide = 0;
        this.slides = [];

        this.state = {
            expenses: {},
            funds: {},
            slidesClasses: []
        };

        this.startSlideShow = this.startSlideShow.bind(this);
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.shouldUpdateStateFromProps(this.props, prevProps, this.state)) {
            // 1. Clean up if needed
            this.cleanup();

            // 2. Update State
            let enabledExpenses = filterEnabledItems(this.props.centralControl.expenses);
            let enabledFunds = filterEnabledItems(this.props.centralControl.funds);

            this.setState({expenses: enabledExpenses, funds: enabledFunds});

            // 3. Create slide objects
            const defaultProps = {
                style: {animationDuration: `${this.animationSeconds}s`}
            };

            if (enabledExpenses && enabledExpenses.length > 0) {
                this.createSlideObject(this.slides, Expenses, "Expenses",
                    {expenses: enabledExpenses, ...defaultProps});
            }

            if (enabledFunds && enabledFunds.length > 0) {
                this.createSlideObject(this.slides, Funds, "Funds",
                    {funds: enabledFunds, ...defaultProps});
            }

            // 4. Set initial classes
            this.addShowHideInitialStyles(this.slides.length, this.state.slidesClasses);

            // 5. Start Animation
            if (this.slides.length > 1) {
                this.animationInterval = setInterval(this.startSlideShow, this.animationStaySeconds * 1000);
            }
        }
    }


    startSlideShow() {
        const totalSlides = this.slides.length;
        const slidesClassesClone = this.state.slidesClasses.map(c => c);
        slidesClassesClone[this.currentSlide] = styles.slideUp;
        this.setState({slidesClasses: slidesClassesClone});

        setTimeout(() => {
            slidesClassesClone[this.currentSlide] = styles.slideDown;
            this.setState({slidesClasses: slidesClassesClone});
        }, this.animationSeconds * 1000);


        // Increment current slide
        this.currentSlide++;
        if (this.currentSlide >= totalSlides) {
            this.currentSlide = 0;
        }
    }

    shouldUpdateStateFromProps(currentProps, prevProps, state) {
        const currentExpense = currentProps.centralControl.expenses;
        const previousExpense = prevProps.centralControl.expenses;
        const stateExpense = state.expenses;

        const currentFunds = currentProps.centralControl.funds;
        const previousFunds = prevProps.centralControl.funds;
        const stateFunds = state.funds;

        const expenseShouldUpdate = !equalObjects(currentExpense, previousExpense)
            && !equalObjects(currentExpense, stateExpense);


        const fundsShouldUpdate = !equalObjects(currentFunds, previousFunds)
            && !equalObjects(currentFunds, stateFunds);

        return expenseShouldUpdate || fundsShouldUpdate;
    }

    cleanup() {
        // TODO stop interval and maybe cleanup state.
        console.log("Cleaning up.");
        clearInterval(this.animationInterval);
    }


    addShowHideInitialStyles(slidesCount, slidesClasses) {
        for (let i = 0; i < slidesCount; i++) {
            if (i === 0) {
                slidesClasses[i] = styles.slideDown;
            } else {
                slidesClasses[i] = styles.slideUp;

            }
        }
    }


    componentWillUnmount() {
        this.cleanup();
    }

    createSlideObject(slides, componentType, slideKey, props) {
        props.key = slideKey;
        return slides.push({type: componentType, props});
    }

    render() {
        return (
            <>
                <div className={`${styles.heading1} ${styles.vMargin8}`}>
                    Expenses
                </div>
                <div className={styles.vMargin6}>
                    {this.slides.map((s, i) => {
                        const SlideComponent = s.type;
                        return <SlideComponent
                            {...s.props}
                            className={this.state.slidesClasses[i]} />;
                    })}
                </div>
            </>
        );
    }

}

export default Accounts;
