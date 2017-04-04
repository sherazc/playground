import React from "react"
import Title from "./Title"

export default class Header extends React.Component {
    // Called by <input/> but the context is Header. because of bind(this)
    handleChange(event) {
        // event.target is <input />
        const title = event.target.value;
        // changeHeaderTitle === Layout's changeTitle
        this.props.changeHeaderTitle(title);
    }

    render() {return(
        <div>
            <Title titleH1={this.props.titleHeading} />
            <input value={this.props.titleHeading}
                   onChange={this.handleChange.bind(this)} />
        </div>
    );}
}