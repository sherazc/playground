import React, {Component} from "react";
import Funds from "./Funds/Funds";
import Expenses from "./Expenses/Expenses";
import styles from "./Accounts.module.scss"
import {equalObjects, filterEnabledItems} from "../../../../services/utilities";

const TOTAL_SLIDES = 2;



/*
<Expenses expenses={this.props.centralControl.expenses}/>,
<Funds funds={this.props.centralControl.funds}/>,
*/

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
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.shouldUpdateStateFromProps(this.props, prevProps, this.state)) {
            this.cleanup();

            let enabledExpenses = filterEnabledItems(this.props.centralControl.expenses);
            let enabledFunds = filterEnabledItems(this.props.centralControl.funds);

            if (enabledExpenses && enabledExpenses.length > 0) {
                this.slides.push((
                    <div>
                        <Expenses expenses={enabledExpenses}/>
                    </div>
                ));
            }

            if (enabledFunds && enabledFunds.length > 0) {
                this.slides.push((
                    <div>
                        <Funds funds={enabledFunds}/>
                    </div>
                ));
            }

            addShowHideInitialStyles(this.slides);




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
    }


    addShowHideInitialStyles(slides) {
        this.slides.for

    }


    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                one two three
            </div>
        );
    }
}

export default Accounts2;
