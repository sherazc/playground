<!doctype html>
<html lang="en">
<head>
    <title>Event Tracker</title>
    <?php include_once 'common_html_head.php' ?>
    <?php include_once 'authenticate.php' ?>
</head>
<body>
<?php include_once 'header.php'?>
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <h3>View Event</h3>
<?php
$stmt = $db->prepare("SELECT * FROM event_tracker");
// $stmt->bind_param("s", $_POST['name']);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) {
    echo "No events found";
} else {
    ?>
    <table id="event_grid">
        <thead>
            <tr>
                <th>Id</th>
                <th>Event Name</th>
                <th>Chapter Region</th>
                <th>Event Start</th>
                <th>Event End</th>
                <th>Category</th>
                <th>Category Type</th>
                <th>Attendance</th>
                <th>Servings</th>
                <th>Location Types</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Attendees</th>
                <th>Event In-Charge</th>
                <th>Speakers</th>
                <th>Expense</th>
                <th>Paid By</th>
                <th>Income</th>
                <th>Donation</th>
                <th>Workers</th>
                <th>Volunteers</th>
                <th>Rating</th>
                <th>Issues</th>
                <th>Comments</th>
            </tr>
        </thead>
        <tbody>
    <?php
    while($row = $result->fetch_assoc()) {
        ?>
        <tr>
            <td><?php echo $row['id']?></td>
            <td><?php echo $row['event_name']?></td>
            <td><?php echo $row['chapter_region']?></td>
            <td><?php echo $row['event_start_date']?></td>
            <td><?php echo $row['event_end_date']?></td>
            <td><?php echo $row['category']?></td>
            <td><?php echo $row['category_type']?></td>
            <td><?php echo $row['attendance']?></td>
            <td><?php echo $row['servings']?></td>
            <td><?php echo $row['location_types']?></td>
            <td><?php echo $row['street']?></td>
            <td><?php echo $row['city']?></td>
            <td><?php echo $row['state']?></td>
            <td><?php echo $row['zip']?></td>
            <td><?php echo $row['attendees']?></td>
            <td><?php echo $row['event_in_charge']?></td>
            <td><?php echo $row['speakers']?></td>
            <td><?php echo $row['expense']?></td>
            <td><?php echo $row['paid_by']?></td>
            <td><?php echo $row['income']?></td>
            <td><?php echo $row['donation']?></td>
            <td><?php echo $row['workers']?></td>
            <td><?php echo $row['volunteers']?></td>
            <td><?php echo $row['rating']?></td>
            <td><?php echo $row['issues']?></td>
            <td><?php echo $row['comments']?></td>
        </tr>
        <?php
    }
    ?>
        </tbody>
    </table>
    <?php
}
?>
        </div>
    </div>
</div>
<script>
    $(document).ready( function () {
        $('#event_grid').DataTable();
    });
</script>
<?php
$stmt->close();
?>
<?php include_once 'footer.php'?>
</body>
</html>