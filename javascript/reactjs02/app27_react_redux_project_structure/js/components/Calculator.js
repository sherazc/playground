import React from "react";
import {connect} from "react-redux";
import Numbers from "./Numbers";
import Display from "./Display";
import Operations from "./Operations";
import addAction from "../actions/addAction";
import subtractAction from "../actions/subtractAction";
import setNum1Action from "../actions/setNum1Action";
import setNum2Action from "../actions/setNum2Action";

const Calculator = (props) => {
    return (
        <div className="paddedBoxGreen">
            <Display result={props.calculatorState.result}/>
            <Numbers
                num1={props.calculatorState.num1}
                num2={props.calculatorState.num2}
                setNum1={props.setNum1}
                setNum2={props.setNum2} />
            <Operations add={props.add} subtract={props.subtract} />
        </div>
    )
};


const mapStateToProps = (globalState) => {
    return {
        calculatorState: globalState.calculatorState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch(addAction());
        },
        subtract: () => {
            dispatch(subtractAction());
        },
        setNum1: (num) => {
            dispatch(setNum1Action(num));
        },
        setNum2: (num) => {
            dispatch(setNum2Action(num));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);