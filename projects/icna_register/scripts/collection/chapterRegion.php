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