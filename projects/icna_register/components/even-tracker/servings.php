<div class="form-group">
    <label for="servings">Servings</label>
    <select class="form-control" name="servings" id="servings" required>
        <option></option>
    </select>
</div>
<script>
    var servings = [
        "None",
        "Beverages",
        "Snacks",
        "Lunch",
        "Dinner",
        "Multiple"
    ];

    var servingsSelect = $('#servings');

    servings.map(function (serving, index) {
        servingsSelect.append($("<option/>").val(serving).text(serving))
    });
</script>