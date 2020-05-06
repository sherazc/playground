import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
    calculate() {
        return 2 * 30;
    }
    render() {
        const myName = "Sheraz";
        return (
            <div>
                <h1>Hi I am {myName}</h1>
                <h2>3 + 2 = {3 + 2}</h2>
                <h2>calculate() = {this.calculate()}</h2>
                <h2>
                    I live in {
                    // Curly braces can only have single statement.
                    // Means no semi colons.
                    // For multiple lines we can use self executing function inside JSX
                    function () {
                        let cityName = "Atlanta";
                        return cityName;
                    }()

                }
                </h2>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<Layout/>, app);