<div class="form-group">
    <label for="attendees">Attendees</label>
    <select class="form-control" name="attendees" id="attendees" required>
        <option></option>
    </select>
</div>
<script>
    var attendees = [
        "Brothers",
        "Sisters",
        "Both",
        "Family",
        "Youth",
        "Public"
    ];

    var attendeesSelect = $('#attendees');

    attendees.map(function (attendee, index) {
        attendeesSelect.append($("<option/>").val(attendee).text(attendee))
    });
</script>