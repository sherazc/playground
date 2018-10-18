<div class="form-group">
    <label for="category">Category</label>
    <select class="form-control" name="category" id="category" required>
        <option></option>
    </select>
</div>
<div class="form-group">
    <label for="categoryType">Category Type</label>
    <select class="form-control" name="categoryType" id="categoryType" required>
        <option></option>
    </select>
</div>

<script>
    var categoryTypes = [
        {
            name: "Organizational",
            types: [
                "MGA",
                "Shura",
                "Worker Meeting",
                "Phone Meeting",
                "Event Planning Meeting",
                "Leadership Visit",
                "Regional Meeting",
                "Central Meeting",
                "National Campaign",
                "Chapter Visit",
                "New Unit",
                "Other"
            ]
        },
        {
            name: "Tarbiyah",
            types: [
                "NN",
                "Lecture",
                "Workshop",
                "Book Study",
                "Study Circle",
                "Night Vigil",
                "Fasting",
                "Retreat",
                "Other"
            ]
        },
        {
            name: "Da'wah",
            types: [
                "Info Table",
                "Billboard",
                "Da'wah Workshop",
                "Door2Door",
                "Flyer Distribution",
                "Radio Ad",
                "TV Ad",
                "Bus Ad",
                "Train Ad",
                "Interfaith Dialogue",
                "Revert Follow up",
                "Prison Dawah Trip",
                "Iftar for Neighbors",
                "Other",
            ]
        },
        {
            name: "Relief",
            types: [
                "Food Drive",
                "Feed the Hungry",
                "Clinic",
                "Used Clothing",
                "Back2School",
                "Refugee Assistance",
                "Direct Assistance",
                "Iftar",
                "Muslim Family Services",
                "Shelter",
                "Meat Drive",
                "Health Fair",
                "Flyer Distribution",
                "Other"
            ]
        },
        {
            name: "ILF",
            types: [
                "Workshop",
                "Seminar",
                "Quran Class",
                "Hifz Class",
                "Seerah Class",
                "Sunday School",
                "Other"
            ]
        },
        {
            name: "Public Program",
            types: [
                "MFD",
                "Convention",
                "Quiz",
                "Hajj Seminar",
                "Youth Camp",
                "Family Camp",
                "Seminar",
                "Fund Raising",
                "Welcome Ramadan",
                "Iftar",
                "Eid",
                "Picnic",
                "Other"
            ]
        },
        {
            name: "Public Relations",
            types: [
                "Funeral",
                "Wedding",
                "Aqeeqah",
                "Local Masjid Program",
                "Community Dinner",
                "Other Organization Program",
                "Financial Support",
                "Masjid Visit",
                "Flyer Distribution",
                "Other"
            ]
        },
        {
            name: "ICNA Sponsored",
            types: [
                "Youth Games",
                "Masjid Fund Raising",
                "HH Fundraising",
                "Conference",
                "Competition",
                "Other"
            ]
        },
        {
            name: "Media",
            types: [
                "Press Conference",
                "PR-Ethnic",
                "PR-Local",
                "PR-National",
                "News Item-Ethnic",
                "News Item-Local",
                "News Item-National",
                "Interview",
                "Dinner",
                "Other"
            ]
        },
    ];

    var categorySelect = $('#category');
    var categoryTypeSelect = $('#categoryType');

    categoryTypes.map(function(categoryType, index) {
        categorySelect.append($("<option/>").val(categoryType.name).text(categoryType.name))
    });

    categorySelect.on('change', function(event) {
        var selectedCategoryOption = $("#category option:selected");
        var selectedCategoryValue = selectedCategoryOption.val();
        categoryTypeSelect.find('option')
            .remove()
            .end()
            .append('<option></option>');

        var selectedCategoryType = categoryTypes.filter(function(categoryType) {
            return categoryType.name === selectedCategoryValue;
        })[0];

        selectedCategoryType.types.map(function(type, index) {
            categoryTypeSelect.append($("<option/>").val(type).text(type))
        });
    });

</script>