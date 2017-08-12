<script type="text/javascript">


// common function
function removeHint(hintText, inputFieldId) {
	var inputField = document.getElementById(inputFieldId);
	if (inputField.value == hintText) {
		inputField.value = "";
		searchField.style.color="#333333";
	}
}

function showHint(hintText, inputFieldId) {
	var inputField = document.getElementById(inputFieldId);
	if (inputField.value == "" || inputField.value == null) {
		inputField.value = hintText;
		searchField.style.color="#888888";
	}
}

</script>
