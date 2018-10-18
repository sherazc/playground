<div class="form-group">
    <label for="locationTypes">Location</label>
    <select class="form-control" name="locationTypes" id="locationTypes" required>
        <option></option>
    </select>
</div>
<script>
    var locationTypes = [
        "masjid",
        "office",
        "home",
        "hotel",
        "mall",
        "street",
        "park"
    ];

    var locationTypesSelect = $('#locationTypes');

    locationTypes.map(function (locationType, index) {
        locationTypesSelect.append($("<option/>").val(locationType).text(locationType))
    });
</script>