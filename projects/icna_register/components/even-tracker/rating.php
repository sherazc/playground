<div class="form-group">
    <label for="rating">Rating</label>
    <select class="form-control" name="rating" id="rating" required>
        <option></option>
    </select>
</div>
<script>
    var rating = [
        "1",
        "2",
        "3",
        "4",
        "5"
    ];

    var ratingSelect = $('#rating');

    rating.map(function (rate, index) {
        ratingSelect.append($("<option/>").val(rate).text(rate))
    });
</script>