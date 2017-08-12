<?php
include "db_connect.php";

function pv(&$name, $default = null)
{
    $value = "";
    if (isset($name)) {
        $value = $name;
    } else if (isset($default)) {
        $value = $default;
    }
    echo $value;
}

function assertPrint($value1, $value2, $result, $otherwise)
{
    if ($value1 == $value2) {
        echo $result;
    } else {
        echo $otherwise;
    }
}

function findStudent($db, $studentId)
{
    if ($db == null || $studentId == null) {
        return null;
    }
    $student = null;
    $queryString = "select * from students where id='" . $studentId . "' and enabled='1'";
    if ($result = $db->query($queryString)) {
        if ($count = $result->num_rows) {
            $student = $result->fetch_object();
        }
        $result->close();
    }
    return $student;
}

function addOrUpdateStudent($db, $updateStudentId, $firstName, $lastName, $grade, $picture)
{
    $message = null;
    if (!isset($db) || !isset($firstName) || !isset($lastName) || !isset($grade)) {
        return "Required fields missing.";
    }

    if (isset($updateStudentId)) {
        $dbStudent = findStudent($db, $updateStudentId);
    }
    if (isset($dbStudent)) {
        $statement = $db->prepare("UPDATE students SET first_name=?, last_name=?, grade=?, picture=? WHERE id=?");
        $statement->bind_param("sssss", $firstName, $lastName, $grade, $picture, $updateStudentId);
    } else {
        $statement = $db->prepare("INSERT INTO students (first_name, last_name, grade, picture) VALUES (?, ?, ?, ?)");
        $statement->bind_param("ssss", $firstName, $lastName, $grade, $picture);
    }

    if ($statement->execute()) {
        $message = "Student successfully saved.";
    } else {
        $message = "Failed to save student.";
    }
    $statement->close();
    return $message;
}

function deleteStudent($db, $studentId)
{
    if (!isset($db) || !isset($studentId)) {
        return "Missing Student Id or can not connect.";
    }
    $statement = $db->prepare("UPDATE students SET enabled='0' WHERE id=?");
    $statement->bind_param("s", $studentId);

    if ($statement->execute()) {
        $message = "Student deleted.";
    } else {
        $message = "Failed to delete student.";
    }
    return $message;
}

function findAttendance($db, &$student, $attendDate)
{
    if ($student == null || $db == null || $attendDate == null) {
        return null;
    }
    $attendance = null;
    if ($student != null && isset($attendDate)) {
        $queryString = "select * from attendance where student_id='" . $student->id . "' and attend_date='" . $attendDate . "'";
        if ($result = $db->query($queryString)) {
            if ($count = $result->num_rows) {
                $attendance = $result->fetch_object();
            }
            $result->close();
        }
    }
    return $attendance;
}

function addAttendance($db, $studentId, $attendDate)
{
    if ($studentId == null || $db == null || $attendDate == null) {
        return null;
    }
    $statement = $db->prepare("INSERT INTO attendance (student_id, attend_date) VALUES (?, ?)");
    $statement->bind_param("ss", $studentId, $attendDate);
    $statement->execute();
    $statement->close();
}

function deleteAttendance($db, $studentId, $attendDate)
{
    if ($studentId == null || $db == null || $attendDate == null) {
        return null;
    }
    $statement = $db->prepare("delete from attendance where student_id = ? and attend_date = ?");
    $statement->bind_param("ss", $studentId, $attendDate);
    $statement->execute();
    $statement->close();
}

// Deprecated
function modifyMonthsDate($month, $monthsDate)
{
    if (!isset($month) || !isset($monthsDate) || !is_numeric($month) || !is_numeric($monthsDate)) {
        return null;
    }
    return mktime(null, null, null, date('m', $month), $monthsDate, date('Y', $month));
}

function validateSecretPin($db, $spin)
{
    if (!isset($spin)) {
        return false;
    }
    $secretPin = findConfigValueByName($db, "secret_pin");
    return strcasecmp(trim($spin), trim($secretPin)) == 0;
}

function findConfigValueByName($db, $configName)
{
    if (!isset($db) || !isset($configName)) {
        return null;
    }

    $queryString = "select config_value from configuration where config_name = ? limit 1";

    $result = null;
    if ($statement = $db->prepare($queryString)) {
        $statement->bind_param("s", $configName);
        if ($statement->execute()) {
            $statement->bind_result($result);
            $statement->fetch();
        }
        $statement->close();
    }
    return $result;
}

function allOpenDatesInYear($db, $year)
{
    if (!isset($db) || !isset($year)) {
        return null;
    }

    $queryString = "select open_date from open_dates where date_format(open_date, '%Y') = '" . $year . "' order by open_date";
    if ($result = $db->query($queryString)) {
        if ($count = $result->num_rows) {
            while ($openDate = $result->fetch_object()) {
                if (isset($openDate->open_date)) {
                    $openDates[] = $openDate->open_date;
                }
            }
        }
        $result->close();
    }

    if (isset($openDates)) {
        return $openDates;
    } else {
        return null;
    }

}

function allStudentAttendance($db, $year)
{
    if (!isset($db) || !isset($year)) {
        return null;
    }

    $queryString = "select * from attendance where date_format(attend_date, '%Y') = '" . $year . "'";
    if ($result = $db->query($queryString)) {
        if ($count = $result->num_rows) {
            while ($studentAttendance = $result->fetch_object()) {
                $studentAttendances[] = $studentAttendance;
            }
        }
        $result->close();
    }

    if (isset($studentAttendances)) {
        return $studentAttendances;
    } else {
        return null;
    }
}

function isStudentPresent($studentId, $openDate, $allStudentAttendanceArray)
{
    if (!isset($studentId) || !isset($openDate) || !isset($allStudentAttendanceArray) || count($allStudentAttendanceArray) < 1) {
        return false;
    }
    $present = false;
    for ($i = 0; $i < count($allStudentAttendanceArray); $i++) {
        $studentAttendance = $allStudentAttendanceArray[$i];
        if ($studentAttendance->student_id == $studentId && $studentAttendance->attend_date == $openDate) {
            $present = true;
            break;
        }
    }
    return $present;
}

function isOpenDate($db, $checkDate)
{
    if (!isset($db) || !isset($checkDate)) {
        return false;
    }
    $open = false;
    $queryString = "select count(*) open_date_count from open_dates where open_date = '" . $checkDate . "'";
    if ($result = $db->query($queryString)) {
        if ($count = $result->num_rows) {
            $open = $result->fetch_object()->open_date_count > 0;
        }
        $result->close();
    }
    return $open;
}


function findAllGrades($db)
{
    if (!isset($db)) {
        return null;
    }

    $queryString = "select * from grades";
    if ($result = $db->query($queryString)) {
        if ($count = $result->num_rows) {
            while ($grade = $result->fetch_object()) {
                $grades[] = $grade;
            }
        }
        $result->close();
    }

    if (isset($grades)) {
        return $grades;
    } else {
        return null;
    }
}