import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super();
        this.person = props.person;
        this.hobbies = props.hobbies;
        this.personLocation = props.personLocation;
        this.calculate = props.calculate;
    }
    render() {
        return (
            <div>
                <p>
                    Hi I am {this.person.name}.
                    I am {this.person.age} year old.
                    I live in {this.personLocation}.
                </p>
                <p style={{margin: "20px"}}>
                    My hobbies are
                    <ul>
                        {this.hobbies.map((hobbie, index) => {return(
                            <li key={index}>{hobbie}</li>
                        );})}
                    </ul>
                </p>
                {this.calculate(10, 20)}
            </div>
        );
    }
}

let person = {
    name: "Sheraz",
    age: 20
};

let hobbies = ["computers", "sport"];

let addFunction = (a, b) => {
    return(
        <div>
            {a} + {b} = {a + b}
        </div>
    );
};

const app = document.getElementById("app");
ReactDOM.render(
    <App
        person={person}
        hobbies={hobbies}
        personLocation="Atlanta"
        calculate={addFunction}/>,
    app
);