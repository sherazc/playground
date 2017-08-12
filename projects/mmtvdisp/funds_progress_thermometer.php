<?php
require_once "db_connect.php";

if ($result = $db->query("select * from funds_collection order by id")) {
    if ($result->num_rows > 1) {
        $fundA = $result->fetch_object();
        $fundB = $result->fetch_object();
    }
}

?>

<style>
    .progress_container {
        background-color: rgba(245, 245, 245, 0.40);
        width: 450px;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, .5);
        border-radius: 10px;
        margin-top: 20px;
    }

    .progress {
        width: 175px;
        height: 40px;
        /*border-radius: 100%;*/
        transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        background-color: tomato;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, .5);
        position: relative;
        top: 70px;
        left: -48px;
        border-radius: 10px;
    }
    .progress-bar-progress {
        background-color: #41B175;
    }

    .thermometer_container {
        position: relative;
        left: 10px;
        /*background-color: yellow;*/
        width: 100px;
        height: 250px;
        float: left;
        margin-left: 20px;
    }

    .thermometer_bottom {
        width: 75px;
        height: 75px;
        position: relative;
        background-color: #41B175;
        border-radius: 100%;
        top: 105px;
        left: 0px;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, .5);
    }

    .fund_table {
        text-align: left;
        border: 1px solid gray;
    }

    .fund_table th {
        border: 1px solid #cba234;
        white-space: nowrap;
        padding: 8px;
        font-weight: normal;
        font-size: 25px;
        color: #B38934;
    }

    .fund_table td {
        border: 1px solid #cba234;
        padding: 8px;
        text-align: center;
        font-size: 25px;
        white-space: nowrap;
    }

    .fund_table_container {
        float: right;
        margin-right: 20px;
        margin-top: 20px;
    }
</style>

<?php
if (isset($fundA)) {
    if (isset($fundA->target) && $fundA->target > 0) {
        $percentCollectedA = $fundA->collected / $fundA->target * 100;
    }
    $containsPledge = isset($fundA->pledge) && $fundA->pledge != 0;
?>
    <div class="progress_container">
        <p class="heading" style="text-align: center;"><?= $fundA->fund_name ?></p>

        <div class="thermometer_container">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-progress" role="progressbar"
                     aria-valuenow="20" aria-valuemin="0"
                     aria-valuemax="100" style="width: <?= $percentCollectedA ?>%">
                </div>
            </div>
            <div class="thermometer_bottom">
            </div>
        </div>
        <?php
        if ($containsPledge) {
            ?>
        <div class="fund_table_container" style="margin-top: -10px;">
            <?php
        } else {
            ?>
        <div class="fund_table_container">
            <?php
        }
        ?>
            <table border="1" class="fund_table">
                <tr>
                    <th>Target</th>
                    <td>$<?= number_format($fundA->target, 2) ?></td>
                </tr>
                <tr>
                    <th>End Date</th>
                    <td> <?= date ("m/d/Y", strtotime($fundA->end_date)) ?></td>
                </tr>
                <tr>
                    <th>Remaining</th>
                    <td>$<?= number_format($fundA->target - $fundA->collected, 2) ?></td>
                </tr>
                <?php
                if ($containsPledge) {
                ?>
                <tr>
                    <?php
                    } else {
                    ?>
                <tr style="display: none">
                    <?php
                    }
                    ?>
                    <th style="color: tomato">Pledge</th>
                    <td style="color: tomato">$<?= number_format($fundA->pledge, 2) ?></td>
                </tr>
                <tr>
                    <th>Collected</th>
                    <td>$<?= number_format($fundA->collected, 2)?></td>
                </tr>
            </table>
        </div>
    </div>
<?php
}
?>

<?php
if (isset($fundB)) {
    if (isset($fundB->target) && $fundB->target > 0) {
        $percentCollectedB = $fundB->collected / $fundB->target * 100;
    }
    $containsPledge = isset($fundB->pledge) && $fundB->pledge != 0;
    ?>
    <div class="progress_container">
        <p class="heading" style="text-align: center;"><?= $fundB->fund_name ?></p>
        <div class="thermometer_container">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-progress" role="progressbar"
                     aria-valuenow="20" aria-valuemin="0"
                     aria-valuemax="100" style="width: <?= $percentCollectedB ?>%">
                </div>
            </div>
            <div class="thermometer_bottom">
            </div>
        </div>
        <?php
        if ($containsPledge) {
            ?>
        <div class="fund_table_container" style="margin-top: -10px;">
            <?php
        } else {
            ?>
        <div class="fund_table_container">
            <?php
        }
        ?>
            <table border="1" class="fund_table">
                <tr>
                    <th>Target</th>
                    <td>$<?= number_format($fundB->target) ?></td>
                </tr>
                <tr>
                    <th>End Date</th>
                    <td> <?= date ("m/d/Y", strtotime($fundB->end_date)) ?></td>
                </tr>
                <tr>
                    <th>Remaining</th>
                    <td>$<?= number_format($fundB->target - $fundB->collected) ?></td>
                </tr>
                <?php
                if ($containsPledge) {
                ?>
                <tr>
                <?php
                } else {
                ?>
                <tr style="display: none">
                <?php
                }
                ?>
                    <th style="color: tomato">Pledge</th>
                    <td style="color: tomato">$<?= number_format($fundB->pledge) ?></td>
                </tr>
                <tr>
                    <th>Collected</th>
                    <td>$<?= number_format($fundB->collected)?></td>
                </tr>
            </table>
        </div>
    </div>
    <?php
}
?>
<?php
//mysqli_close($db);
