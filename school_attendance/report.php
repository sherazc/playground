<!DOCTYPE html>
<html lang="en">
<head>
    <title>Student Attendance - Report</title>
    <?php include "components/scripts_include.php"; ?>
    <script src="scripts/libs/datatables/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="scripts/libs/datatables/css/jquery.dataTables.min.css">
    <style>
        #attendanceTable {
            border: 1px solid #2f6c37;
            border-radius: 10px;
        }

        #attendanceTable th, td {
            font-size: 10px;
            padding: 3px;
            text-align: center;
            white-space: nowrap;
        }

        #attendanceTable th {
            background-color: #2f6c37;
            color: white;
            border: 1px solid #274f27;
        }

        #attendanceTable td {
            color: #444444;
            border: 1px solid #e6e6e6;
        }

        #attendanceTable tr:nth-child(even) {
            background-color: white;
        }

        #attendanceTable tr:nth-child(odd) {
            background-color: #e9fae8;
        }
    </style>
</head>
<body>
<?php include "components/main_nav.php"; ?>
<?php
// Grab all Wednesdays in a given month in PHP
// http://stackoverflow.com/questions/4293174/grab-all-wednesdays-in-a-given-month-in-php
// http://www.w3schools.com/php/php_date.asp
// http://stackoverflow.com/questions/13346395/php-array-containing-all-dates-of-the-current-month
$year = date('Y');
if (isset($_REQUEST["y"]) && is_numeric($_REQUEST["y"])) {
    $year = $_REQUEST["y"];
}
$reportDate = mktime(null, null, null, 1, 1, $year);
$reportYear = date("Y", $reportDate);
$urlPrevious = "report.php?&y=" . ($reportYear - 1);
$urlNext = "report.php?y=" . ($reportYear + 1);

$allOpenDatesInYearArray = allOpenDatesInYear($db, $reportYear);
$allStudentAttendanceArray = allStudentAttendance($db, $reportYear);
?>
<div class="container">
    <div class="row">
        <div class="col-lg-12" style="color: white">
            <h3>Yearly Attendance Report</h3>
            <h4>
                <a href="<?php pv($urlPrevious); ?>" style="color: white;">&lt; Previous</a>
                | <?php
                pv($reportYear)
                ?> |
                <a href="<?php pv($urlNext); ?>" style="color: white;">Next &gt;</a>
            </h4>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12">
            <?php
            if (!isset($allOpenDatesInYearArray) || count($allOpenDatesInYearArray) < 1) {
                ?>
                <div class="container alert alert-warning center centerText" role="alert">
                    <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                    No Open Days found in <?php pv($year) ?>.
                </div>
                <?php
            } else if ($studentResult = $db->query("select * from students where enabled='1'")) {
                if ($count = $studentResult->num_rows) {
                    ?>
                    <table class="center" id="attendanceTable">
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Grade
                            </th>
                            <?php
                            for ($i = 0; $i < count($allOpenDatesInYearArray); $i++) {
                                $openDate = new DateTime($allOpenDatesInYearArray[$i]);
                                ?>
                                <th>
                                    <?php
                                    pv($openDate->format('m/d'));
                                    echo "<br/>";
                                    pv($openDate->format('D'));
                                    ?>
                                </th>
                                <?php
                            }
                            ?>
                            <th>
                                Presents
                            </th>
                            <th>
                                Absents
                            </th>
                        </tr>
                        <?php
                        while ($student = $studentResult->fetch_object()) {
                            ?>
                            <tr>
                                <td>
                                    <?php echo $student->first_name . " " . $student->last_name; ?>
                                </td>
                                <td>
                                    <?php echo $student->grade; ?>
                                </td>
                                <?php
                                $totalPresent = 0;
                                $totalAbsent = 0;
                                for ($i = 0; $i < count($allOpenDatesInYearArray); $i++) {
                                    ?>
                                    <td>
                                        <?php
                                        $studentPresent = isStudentPresent($student->id, $allOpenDatesInYearArray[$i], $allStudentAttendanceArray);
                                        if ($studentPresent) {
                                            $totalPresent++;
                                            echo "P";
                                        } else {
                                            $totalAbsent++;
                                            echo "-";
                                        }
                                        ?>
                                    </td>
                                    <?php
                                }
                                ?>
                                <td>
                                    <?php pv($totalPresent) ?>
                                </td>
                                <td>
                                    <?php pv($totalAbsent) ?>
                                </td>
                            </tr>
                            <?php
                        }
                        ?>
                    </table>
                    <?php
                } else {
                    ?>
                    <div class="container alert alert-warning center centerText" role="alert">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        No student records found.
                    </div>
                    <?php
                }
                $studentResult->close();
            }
            ?>
        </div>
    </div>
</div>
<?php include "components/footer.php"; ?>
</body>
</html>