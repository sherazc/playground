<?php
require_once "db_connect.php";
require_once "utilities.php";
?>
<style>
    .mainNav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    .mainNav ul li {
        float: left;
    }

    .mainNav ul li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    /* Change the link color to #111 (black) on hover */
    .mainNav ul li a:hover {
        background-color: #111;
    }
</style>
<div class="container" style="margin-bottom: 20px;">
    <div class="row">
        <div class="col-lg-12">
            <div style="background-color: #518bbf; color: #dce0ef; font-size: 40px; padding: 30px;">
                <div style="display: inline; word-spacing: 20px; letter-spacing: 5px; font-weight: 200; text-shadow: 2px 2px 3px rgba(0,0,0,0.6)">
                    EVENT TRACKER
                </div>
                <?php
                if (isLoggedIn()) {
                    ?>
                    <div style="display: inline; float: right; ">
                        <a href="logout.php" style="border: 0;">
                            <img src="images/baseline-power_settings_new-24px.svg" alt="logout" style="width: 40px; border: 0">
                        </a>
                    </div>
                    <?php
                }
                ?>
            </div>
        </div>
    </div>
    <?php
    if (isLoggedIn()) {
        ?>
        <div class="row">
            <div class="col-sm-12">
                <div class="mainNav">
                    <ul>
                        <li><a href="even-tracker.php">Create Event</a></li>
                        <li><a href="view-events.php">View All Event</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <?php
    }
    ?>
</div>
