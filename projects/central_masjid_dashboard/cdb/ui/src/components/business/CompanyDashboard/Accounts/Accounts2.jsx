import React, {Component} from "react";
import Funds from "./Funds/Funds";
import Expenses from "./Expenses/Expenses";
import styles from "./Accounts.module.scss"
import {equalObjects, filterEnabledItems} from "../../../../services/utilities";

class Accounts2 extends Component {

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
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.shouldUpdateStateFromProps(this.props, prevProps, this.state)) {
            this.cleanup();

            let enabledExpenses = filterEnabledItems(this.props.centralControl.expenses);
            let enabledFunds = filterEnabledItems(this.props.centralControl.funds);

            this.setState({expenses: enabledExpenses, funds: enabledFunds});

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

            this.addShowHideInitialStyles(this.slides.length, this.state.slidesClasses);

        }



        /*
        ✅ Expense
          check if props.expense != state.expense
          state.expense = props.expenses


        get all enabled
        create component only if found
        if component created then push it to slides []

        Funds
            same as Expenses

        Create this.slideDiv[]

        if slideDiv[] is empty show error message

        Set state
        this.state = {
            slidesClasses: this.createDefaultSlideClasses(slideDiv.lenght)
            currentSlide: 0
        }

            createDefaultSlideClasses()
                will set Open style class in slidesClasses[0]
                and will set Close style class in slidesClasses[0]


        If slideDiv.lenght is > 1
            Start animation by toggling open close style classes in this.state.slidesClasses

        */



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

export default Accounts2;
