import React from "react"
import Title from "./header/Title"

export default class Header extends React.Component {
    handleChangeTitle(event) {
        const title = event.target.value;
        this.props.changeTitle(title);
    }
    render(){
        return (
            <header>
                <Title title={this.props.title}/>
                <input value={this.props.title} onChange={this.handleChangeTitle.bind(this)}/>
            </header>
        );
    };
}