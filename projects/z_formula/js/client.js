import $ from 'jquery';

let ageFiled = $("#age");
let inrFiled = $("#inr");
let total_proteinField = $("#total_protein");
let sgotField = $("#sgot");
let glucoseField = $("#glucose");
let albuminField = $("#albumin");
let platelet_countField = $("#platelet_count");
let raceField = $("#race");
let sgptField = $("#sgpt");
let bunField = $("#bun");

$("#calculateUicIndexButton").on("click", calculateUciIndex);

function calculateUciIndex() {
    let age = ageFiled.val();
    let inr = inrFiled.val();
    let total_protein = total_proteinField.val();
    let sgot = sgotField.val();
    let glucose = glucoseField.val();
    let albumin = albuminField.val();
    let platelet_count = platelet_countField.val();
    let race = raceField.val();
    let sgpt = sgptField.val();
    let bun = bunField.val();

    if (validateUciIndexForm()) {
        let eqTop = 10 * age * inr * total_protein * Math.log(sgot) * Math.log(glucose);
        let eqBottom = albumin * platelet_count * race * Math.log(sgpt) * Math.log(bun);
        let result = eqTop / eqBottom;
        let resultFix = result.toFixed(3);
        //showModal("Result", result);
        $("#resultNumber").html(resultFix);
        let resultPercentile = result / 30 * 100;
        let progressBar = $("#resultProgress");
        let resultText = $("#resultText");

        progressBar.css("width", resultPercentile + "%");
        progressBar.removeClass("progress-bar-success");
        progressBar.removeClass("progress-bar-info");
        progressBar.removeClass("progress-bar-warning");
        progressBar.removeClass("progress-bar-danger");

        let resultString = "NA";
        if (result >= 0 && result <= 4.5) {
            resultString = "Extremely unlikely";
            progressBar.addClass("progress-bar-success");
        } else if (result > 4.5 && result <= 8) {
            resultString = "Unlikely";
            progressBar.addClass("progress-bar-info");
        } else if (result > 8 && result <= 20) {
            resultString = "Likely";
            progressBar.addClass("progress-bar-warning");
        } else if (result > 20) {
            resultString = "Extremely likely";
            progressBar.addClass("progress-bar-danger");
        }
        resultText.html(resultString);
    }
}

function validateUciIndexForm() {

    let age = ageFiled.val();
    let inr = inrFiled.val();
    let total_protein = total_proteinField.val();
    let sgot = sgotField.val();
    let glucose = glucoseField.val();
    let albumin = albuminField.val();
    let platelet_count = platelet_countField.val();
    let race = raceField.val();
    console.log("race = ", raceField.val());
    let sgpt = sgptField.val();
    let bun = bunField.val();

    var result = validateField(age, "Age")
        && validateField(inr, "INR")
        && validateField(total_protein, "Total Protein")
        && validateField(sgot, "SGOT")
        && validateField(glucose, "Glucose")
        && validateField(albumin, "Albumin")
        && validateField(platelet_count, "Platelet Count")
        //&& validateField(race, "Race")
        && validateField(sgpt, "SGPT")
        && validateField(bun, "BUN");
    return result;
}

function validateField(fieldValue, fieldName) {
    var valid = fieldValue != null && fieldValue.length > 0 && !isNaN(fieldValue);
    console.log(fieldName + "=" + fieldValue);
    if (!valid) {
        showModal("Invalid value", "Please enter valid " + fieldName);
    }
    return valid;
}