<?php
require_once "db_connect.php";
require_once "utilities.php";
?>
<div class="container">
    <div style="background-color: #518bbf; color: #dce0ef; font-size: 40px; padding: 30px; margin-bottom: 20px">
        <div style="display: inline">
            REGISTER
        </div>
        <?php
        if (isLoggedIn()) {
            ?>
            <div style="display: inline; float: right; ">
                <a href="logout.php" style="border: 0">
                    <img src="images/baseline-power_settings_new-24px.svg" alt="logout" style="width: 40px; border: 0">
                </a>
            </div>
            <?php
        }
        ?>
    </div>
</div>
