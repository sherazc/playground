import $ from "jquery";
import {myAdd} from "./my_math";

// style-loader + css-loader do not return anything
// So we don't need to store it in any variable
// require("!style-loader!css-loader!../styles/main.css");
import "!style-loader!css-loader!../styles/main.css"

let appContainer = $("#app");
appContainer.html(`
<div id='heading'>My Application</div>
`);

appContainer.append(`
<div id='content'>
    Calculation 10 + 5 = ${myAdd(10, 5)}
</div>
`);