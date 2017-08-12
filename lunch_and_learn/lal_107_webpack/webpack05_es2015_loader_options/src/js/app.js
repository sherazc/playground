import $ from "jquery";
import {myAdd} from "./my_math";
import "../styles/main.css";

let appContainer = $("#app");
appContainer.html(`
<div id='heading'>My Application</div>
`);

appContainer.append(`
<div id='content'>
    Calculation 10 + 5 = ${myAdd(10, 5)}
</div>
`);
