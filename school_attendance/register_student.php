<!DOCTYPE html>
<html lang="en">
<head>
    <title>Student Attendance - Register Student</title>
    <?php include "components/scripts_include.php"; ?>
    <?php
    $allGrades = findAllGrades($db);
    if (isset($allGrades) && count($allGrades) > 0) {
        $gradesFirstItem = $allGrades[0];
    }
    pv($gradesFirstItem->name);

    $message = null;

    if (isset($_REQUEST["student_id"])) {
        $studentIdParam = $_REQUEST["student_id"];

        $student = findStudent($db, $studentIdParam);

        if ($student != null) {
            $id = $student->id;
            $firstName = $student->first_name;
            $lastName = $student->last_name;
            $grade = $student->grade;
        } else {
            $message = "Student not found with id " . $studentIdParam;
        }
    }
    ?>
    <style>
        #register_form label {
            width: 130px;
        }

        #register_form input {
            width: 250px;
        }

        #register_form select {
            width: 250px;
        }
        .has-error label {
            color: #A41915;
        }
    </style>
    <script>
        $(document).ready(function () {
            var grades = {
                <?php
                    for($i = 0; isset($allGrades) && $i < count($allGrades); $i++) {
                        $dbGradeRecord = $allGrades[$i];
                        ?>
                "<?php pv($dbGradeRecord->name)?>":"<?php pv($dbGradeRecord->long_name)?>",
                        <?php
                    }
                ?>
            };

            $.each(grades, function (key, value) {
                $('#grade')
                    .append($("<option></option>")
                        .attr("value", key)
                        .text(value));
            });

            $("#grade").val("<?php pv($grade, $gradesFirstItem->name) ?>");

            $("#saveButton").on("click", saveRegistrationForm);
            $("#deleteButton").on("click", showDeleteConfirmModal);
            $("#deleteConfirmButton").on("click", deleteSubmit);

            function deleteSubmit() {
                submitRegisterForm("delete");
                return true;
            }

            function saveRegistrationForm() {
                submitRegisterForm("insertOrUpdate");
                return false;
            }

            function submitRegisterForm(action) {
                var valid = validateRegistrationForm();
                if (valid) {
                    $("#validate_error_message_div").hide(400);
                    $("#action").val(action);
                    $("#register_form").submit();
                } else {
                    $("#validate_error_message_div").show(400);
                }
                return true;
            }

            function validateRegistrationForm() {
                var firstNameFieldDiv = $("#first_name_div");
                var lastNameFieldDiv = $("#last_name_div");
                var gradeFieldDiv = $("#grade_div");
                var spinFieldDiv = $("#spin_div");

                var firstNameField = $("#first_name");
                var lastNameField = $("#last_name");
                var gradeField = $("#grade");
                var spinField = $("#spin");


                var valid = validateRequiredField(firstNameFieldDiv, firstNameField);
                valid = valid & validateRequiredField(lastNameFieldDiv, lastNameField);
                valid = valid & validateRequiredField(gradeFieldDiv, gradeField);
                valid = valid & validateRequiredField(spinFieldDiv, spinField);
                return valid;
            }

            function validateRequiredField(fieldDiv, inputField) {
                var valid = false;
                if (inputField.val() == null || inputField.val().trim() == '') {
                    fieldDiv.addClass("has-error");
                    valid = false;
                } else {
                    fieldDiv.removeClass("has-error");
                    valid  = true;
                }
                return valid;
            }

            function showDeleteConfirmModal() {
                $('#deleteConfirmModal').modal();
            }
        });
    </script>
</head>
<body>
<?php include "components/main_nav.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <?php
            if (!empty($message)) {
                ?>

                <div class="alert alert-success" role="alert">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <?php pv($message) ?>
                </div>
                <?php
            }
            ?>
            <div id="validate_error_message_div" style="display: none;">
                <div class="alert alert-danger" role="alert">
                    <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                    All fields are required.
                </div>
            </div>
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title">Register Student</h3>
                </div>
                <div class="panel-body">
                    <form id="register_form" role="form" action="register_student_confirmation.php" method="POST">
                        <input type="hidden" id="action" name="action">

                        <?php
                        if (isset($student)) {
                            ?>
                            <div class="form-group form-inline">
                                <label for="update_student_id">Update Student Id:</label>
                                <input type="text" class="form-control" id="update_student_id"
                                       name="update_student_id" value="<?php pv($student->id) ?>" required readonly style="background-color: white;">
                            </div>
                            <?php
                        }
                        ?>
                        <div id="first_name_div" class="form-group form-inline">
                            <label for="first_name">First Name:</label>
                            <input type="text" class="form-control" id="first_name" name="first_name"
                                   value="<?php pv($firstName) ?>" required>
                        </div>
                        <div id="last_name_div" class="form-group form-inline">
                            <label for="last_name">Last Name:</label>
                            <input type="text" class="form-control" id="last_name" name="last_name"
                                   value="<?php pv($lastName) ?>" required>
                        </div>
                        <div id="grade_div" class="form-group form-inline">
                            <label for="grade">Grade</label>
                            <select class="form-control" id="grade" name="grade" required>
                            </select>
                        </div>
                        <div id="spin_div" class="form-group form-inline">
                            <label for="spin">Secret pin:</label>
                            <input type="password" class="form-control" id="spin" name="spin" required>
                        </div>
                        <?php
                        if (isset($student)) {
                            ?>
                            <a id="saveButton" class="btn btn-success" href="#">Update</a>
                            <a id="deleteButton" class="btn btn-success" href="#">Delete</a>
                            <?php
                        } else {
                            ?>
                            <a id="saveButton" class="btn btn-success" href="#">Add</a>
                            <?php
                        }
                        ?>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="deleteConfirmModal" class="modal fade bs-example-modal-sm">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Delete Student</h4>
            </div>
            <div class="modal-body">
                <p>
                    Are you sure, you want to delete
                    <span style="font-weight: bold"><?php pv($firstName) ?> <?php pv($lastName) ?></span>?
                    <br/><br/>
                    <i>All the attendance records will also be deleted.</i>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                <a id="deleteConfirmButton" class="btn btn-primary btn-danger" data-dismiss="modal" href="#">Yes</a>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<?php include "components/footer.php"; ?>
</body>
</html>