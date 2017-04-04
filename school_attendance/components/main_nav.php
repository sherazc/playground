<link rel="stylesheet" href="scripts/css/custom_nav_color.css">
<?php
$currentPageName = basename($_SERVER['PHP_SELF']);
?>
<nav class="navbar navbar-inverse navbar-fixed-top" style="box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#desktopNavBar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="index.php" class="navbar-brand" style="color: white;">
                <span class="glyphicon glyphicon-home"></span>
                &nbsp;
                Attendance
            </a>
        </div>

        <div class="collapse navbar-collapse" id="desktopNavBar">

            <ul class="nav navbar-nav navbar-right">
                <li class="<?php assertPrint($currentPageName, "all_student.php", "active", "") ?>">
                    <a href="all_student.php">
                        <span class="glyphicon glyphicon-qrcode" ></span>
                        All Students
                    </a>
                </li>
                <li class="<?php assertPrint($currentPageName, "report.php", "active", "") ?>">
                    <a href="report.php">
                        <span class="glyphicon glyphicon-calendar"></span>
                        Report
                    </a>
                </li>
                <li class="<?php assertPrint($currentPageName, "register_student.php", "active", "") ?>">
                    <a href="register_student.php">
                        <span class="glyphicon glyphicon-user"></span>
                        Register Student
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div style="margin: 80px"></div>