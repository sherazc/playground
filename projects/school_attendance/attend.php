<!DOCTYPE html>
<html lang="en">
<head>
    <title>Student Attendance - Attend</title>
    <?php include "components/scripts_include.php"; ?>
    <?php

    $yearParam = date('Y');
    $monthParam = date('m');
    $attendDateParam = date('d');

    if (isset($_REQUEST["y"]) && is_numeric($_REQUEST["y"])) {
        $yearParam = $_REQUEST["y"];
    }
    if (isset($_REQUEST["m"]) && is_numeric($_REQUEST["m"])) {
        $monthParam = $_REQUEST["m"];
    }
    if (isset($_REQUEST["d"]) && is_numeric($_REQUEST["d"])) {
        $attendDateParam = $_REQUEST["d"];
    }

    $attendDate = mktime(null, null, null, $monthParam, $attendDateParam, $yearParam);
    $attendDateFormatted = date("Y-m-d", $attendDate);

    if (isset($_REQUEST["student_id"])) {
        $studentIdParam = $_REQUEST["student_id"];
        $student = findStudent($db, $studentIdParam);

        if (isset($student)) {
            $validSecretPin = false;
            if (isset($_REQUEST["spin"])) {
                $validSecretPin = validateSecretPin($db, $_REQUEST["spin"]);
            }
            $attendance = findAttendance($db, $student, $attendDateFormatted);
            if (isset($_REQUEST["mark"]) && $attendance == null && $validSecretPin) {
                addAttendance($db, $studentIdParam, $attendDateFormatted);
                $attendance = findAttendance($db, $student, $attendDateFormatted);
            } else if (isset($_REQUEST["unmark"]) && $validSecretPin) {
                if ($attendance != null) {
                    deleteAttendance($db, $studentIdParam, $attendDateFormatted);
                }
                $attendance = null;
            }
        }
        // echo "Attendance ". $attendance->id;
    }
    $openDate = isOpenDate($db, $attendDateFormatted);
    ?>
    <style>
        .attend_row {
            margin: 0 auto;
            clear: both;
        }

        .attend_label {
            font-size: large;
            font-weight: bold;
            float: left;
            margin: 10px;
            width: 100px;
        }

        .attend_value {
            font-size: large;
            float: left;
            margin: 10px;
        }
    </style>
</head>
<body>
<?php include "components/main_nav.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <?php
            if(!$openDate) {
                ?>
                <div class="alert alert-danger" role="alert">
                    <span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
                    Can't mark attendance. School is not open on <?php pv(date("m/d/Y", $attendDate)) ?>.
                </div>
                <?php
            } else if (!isset($student)) {
                ?>
                <div class="alert alert-danger" role="alert">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    Student with id <?php pv($_REQUEST["student_id"]) ?> not found. <br/>
                    Please <a href="register_student.php">register</a> the student.
                </div>
                <?php
            } else if ((isset($_REQUEST["unmark"]) || isset($_REQUEST["mark"])) && !$validSecretPin) {
                ?>
                <div class="alert alert-danger" role="alert">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    Invalid Secret pin.
                </div>
                <?php
            } else if (isset($_REQUEST["unmark"]) && (!isset($attendance) || $attendance == null)) {
                ?>

                <div class="alert alert-success" role="alert">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    Marked Absent
                </div>
                <?php
            } else if (!isset($attendance) || $attendance == null) {
                ?>

                <div class="alert alert-warning" role="alert">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    Please enter "Secret Pin" and click "Mark Present".
                </div>
                <?php
            } else {
                ?>

                <div class="alert alert-success" role="alert">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    Marked Present
                </div>
                <?php
            }
            ?>
            <?php
            if (isset($student) && isset($student->id)) {
                ?>
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Attend -
                            <?php
                            echo date("D m/d/Y", $attendDate);
                            ?>
                        </h3>
                    </div>
                    <div class="panel-body">

                        <div class="attend_row">
                            <div class="attend_label">
                                Id:
                            </div>
                            <div class="attend_value">
                                <?php pv($student->id) ?>
                            </div>
                        </div>
                        <div class="attend_row">
                            <div class="attend_label">
                                First Name:
                            </div>
                            <div class="attend_value">
                                <?php pv($student->first_name) ?>
                            </div>
                        </div>
                        <div class="attend_row">
                            <div class="attend_label">
                                Last Name:
                            </div>
                            <div class="attend_value">
                                <?php pv($student->last_name) ?>
                            </div>
                        </div>
                        <div class="attend_row">
                            <div class="attend_label">
                                Grade:
                            </div>
                            <div class="attend_value">
                                <?php pv($student->grade) ?>
                            </div>
                        </div>
                        <?php
                        if ($openDate) {
                        ?>
                        <form action="attend.php" method="post">
                            <input type="hidden" name="student_id" value="<?php pv($_REQUEST["student_id"]) ?>"/>
                            <input type="hidden" name="y" value="<?php pv($yearParam) ?>"/>
                            <input type="hidden" name="m" value="<?php pv($monthParam) ?>"/>
                            <input type="hidden" name="d" value="<?php pv($attendDateParam) ?>"/>

                            <div class="form-group form-inline attend_row">
                                <label class="attend_label" for="spin">Secret pin:</label>
                                <input type="password" class="form-control attend_value" id="spin" name="spin"
                                       required/>
                            </div>
                            <div style="clear: both"></div>
                            <br>
                            <?php
                            if (!isset($attendance) || $attendance == null) {
                                ?>
                                <input type="hidden" name="mark" value="true"/>
                                <button class="btn btn-success">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    Mark Present
                                </button>
                                <?php
                            } else {
                                ?>
                                <input type="hidden" name="unmark" value="true">
                                <button class="btn btn-danger">
                                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    Mark Absent
                                </button>
                                <?php
                            }
                            ?>
                        </form>
                        <?php
                        }
                        ?>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
</div>
<?php include "components/footer.php"; ?>
</body>
</html>