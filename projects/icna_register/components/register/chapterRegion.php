<div class="form-group">
    <label for="chapterRegion">Chapter/Region</label>
    <select class="form-control" name="chapterRegion" id="chapterRegion" required>
        <option></option>
    </select>
</div>
<script>
    var chapterRegions = [
        "Atlanta",
        "Duluth",
        "Alpharetta"
    ];

    var chapterRegionSelect = $('#chapterRegion');

    chapterRegions.map(function (chapterRegion, index) {
        chapterRegionSelect.append($("<option/>").val(chapterRegion).text(chapterRegion))
    });
</script>