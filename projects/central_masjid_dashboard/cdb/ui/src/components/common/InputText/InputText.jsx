import React, {Component} from "react";
import PropTypes from 'prop-types';
import styles from "./InputText.module.scss"

class InputText extends Component {
    render() {
        return <div> Input Text</div>
    }
}


InputText.propType = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string,
    mode: PropTypes.oneOf(['view', 'edit']),
    placeholder: PropTypes.string,
    help: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.boolean,

};

export default InputText;