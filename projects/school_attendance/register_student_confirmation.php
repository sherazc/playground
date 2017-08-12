<!DOCTYPE html>
<html lang="en">
<head>
    <title>Student Attendance - Registration Confirmation</title>
    <?php include "components/scripts_include.php"; ?>
</head>
<body>
<?php include "components/main_nav.php"; ?>
<?php
$action = $_REQUEST["action"];
$updateStudentId = null;
if (isset($_REQUEST["update_student_id"])) {
    $updateStudentId = $_REQUEST["update_student_id"];
}
$firstName = $_REQUEST["first_name"];
$lastName = $_REQUEST["last_name"];
$grade = $_REQUEST["grade"];
$picture = null;

$insertOrUpdate = strcasecmp($action, "insertOrUpdate") == 0;
$validSecretPin = validateSecretPin($db, $_REQUEST["spin"]);
if ($validSecretPin) {
    if (strcasecmp($action, "insertOrUpdate") == 0) {
        $message = addOrUpdateStudent($db, $updateStudentId, $firstName, $lastName, $grade, $picture);
    } else if (strcasecmp($action, "delete") == 0) {
        $message = deleteStudent($db, $updateStudentId);
    } else {
        $message = "Invalid Action.";
    }
} else {
    $message = "Invalid Secret Pin.";
}
?>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="jumbotron" style="background-color: rgba(0, 0, 0, 0.6)">
                <h3 style="text-align: center; color: white">
                    <?php
                    pv($message);
                    if ($insertOrUpdate || !$validSecretPin) {
                        ?>
                        <br/><br/>
                        <a class="btn btn-success" href="register_student.php?student_id=<?php pv($updateStudentId) ?>">
                            <span class="glyphicon glyphicon-arrow-left"></span>
                            Back to Student Record
                        </a>
                        <?php
                    }
                    ?>
                    <br/><br/>
                    <a class="btn btn-success" href="all_student.php">
                        <span class="glyphicon glyphicon-arrow-left"></span>
                        Back to All Students
                    </a>
                </h3>
            </div>
        </div>
    </div>

</div>

<?php include "components/footer.php"; ?>
</body>
</html>