<!DOCTYPE html>
<html lang="en">
<head>
    <title>Student Attendance - All Students</title>
    <?php include "components/scripts_include.php"; ?>
    <script src="scripts/libs/datatables/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="scripts/libs/datatables/css/jquery.dataTables.min.css">
</head>
<body>
<?php include "components/main_nav.php"; ?>

<div class="container">
    <div class="row">
        <div class="col-lg-12">

            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title">All Student</h3>
                </div>
                <div class="panel-body">
                    <?php
                    if ($result = $db->query("select * from students where enabled='1'")) {
                        if ($count = $result->num_rows) {

                            ?>
                            <table style="margin: 0 auto;" id="studentsDataTable" class="display">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Grade</th>
                                    <th>Attend</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                while ($student = $result->fetch_object()) {
                                    ?>
                                    <tr>
                                        <td>
                                            <a href="register_student.php?student_id=<?php pv($student->id) ?>">
                                                <?php pv($student->id) ?>
                                            </a>
                                        </td>
                                        <td><?php pv($student->first_name) ?></td>
                                        <td><?php pv($student->last_name) ?></td>
                                        <td><?php pv($student->grade) ?></td>
                                        <td>
                                            <a href="attend.php?student_id=<?php pv($student->id) ?>">
                                                <span class="glyphicon glyphicon-ok-circle"></span>
                                            </a>
                                        </td>
                                    </tr>
                                    <?php
                                }
                                ?>
                                </tbody>
                            </table>
                            <?php
                        } else {
                            echo "No student records found.";
                        }
                        $result->close();
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include "components/footer.php"; ?>
<script>
    $(document).ready(function () {
        $('#studentsDataTable').DataTable({
            "bStateSave": true
        });
    });
</script>
</body>
</html>