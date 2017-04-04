<?php

/*
* Plugin Name: Salah Time Table Fiq
* Description: Salah Time Table Fiq
* Version: 1.0
* Author: Sheraz
* Licence: none
*/


$db = null;

function getDbConnection()
{
    global $db;
    if (!isset($db)) {
        $db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if (mysqli_connect_errno()) {
            exit("Couldn't connect to the database: " . mysqli_connect_error());
        }
    }
    return $db;
}

function printTime($date)
{
    if (isset($date)) {
        $date = new DateTime($date);
        echo $date->format('h:ia');
    }
}

function printDate($date)
{
    if (isset($date)) {
        $date = new DateTime($date);
        echo $date->format('m/d');
    }
}

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

function getConfigValue($db, $configName)
{
    if (!isset($db) || !isset($configName)) {
        return null;
    }
    $resultValue = null;

    if ($result = $db->query("select * from configuration where config_name='" . $configName . "'")) {
        if ($count = $result->num_rows) {
            if ($configuration = $result->fetch_object()) {
                $resultValue = $configuration->config_value;
            }
        }
    }
    return $resultValue;
}

function getJumahTime()
{
    return getConfigValue(getDbConnection(), "jumah_prayer");
}


class SalahTimeTableService
{
    private $db = null;

    function __construct()
    {
        $this->db = getDbConnection();
    }

    public function getTodaysSalatTimes()
    {
        if (!isset($this->db)) {
            return null;
        }

        $date = new DateTime();
        $monthDate = $date->format('m-d');

        if ($result = $this->db->query("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d') = '" . $monthDate . "' limit 1")) {
            if ($count = $result->num_rows) {
                $salatTimes = $result->fetch_object();
            }
        }

        if (isset($salatTimes)) {

            if ($result = $this->db->query("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d') > '" . $monthDate . "'")) {
                if ($count = $result->num_rows) {
                    $changeSetFajr = false;
                    $changeSetThuhr = false;
                    $changeSetAsr = false;
                    $changeSetMaghrib = false;
                    $changeSetIsha = false;

                    while (($row = $result->fetch_object())
                        && (!$changeSetFajr || !$changeSetThuhr || !$changeSetAsr || !$changeSetMaghrib || !$changeSetIsha)) {

                        if (!$changeSetFajr && ($row->fajr_iqama != $salatTimes->fajr_iqama)) {
                            $salatTimes->fajr_change = $row->fajr_iqama;
                            $salatTimes->fajr_change_date = $row->prayer_date;
                            $changeSetFajr = true;
                        }

                        if (!$changeSetThuhr && ($row->thuhr_iqama != $salatTimes->thuhr_iqama)) {
                            $salatTimes->thuhr_change = $row->thuhr_iqama;
                            $salatTimes->thuhr_change_date = $row->prayer_date;
                            $changeSetThuhr = true;
                        }

                        if (!$changeSetAsr && ($row->asr_iqama != $salatTimes->asr_iqama)) {
                            $salatTimes->asr_change = $row->asr_iqama;
                            $salatTimes->asr_change_date = $row->prayer_date;
                            $changeSetAsr = true;
                        }

                        if (!$changeSetMaghrib && ($row->maghrib_athan != $salatTimes->maghrib_athan)) {
                            $salatTimes->maghrib_change = $row->maghrib_athan;
                            $salatTimes->maghrib_change_date = $row->prayer_date;
                            $changeSetMaghrib = true;
                        }

                        if (!$changeSetIsha && ($row->isha_iqama != $salatTimes->isha_iqama)) {
                            $salatTimes->isha_change = $row->isha_iqama;
                            $salatTimes->isha_change_date = $row->prayer_date;
                            $changeSetIsha = true;
                        }
                    }
                }
            }
            return $salatTimes;
        } else {
            return null;
        }
    }

}

class SalahTimeTableFiq extends WP_Widget
{

    private $sts = null;

    function __construct()
    {
        parent::__construct(false, $name = __('Salah Time Table Fiq'));
        $this->sts = new SalahTimeTableService();
    }

    function form($instance)
    {
        $defaultFormArray = array(
            'title' => 'Title',
            'stt_styles' => 'Default text area value'
        );

        $instance = wp_parse_args((array)$instance, $defaultFormArray);
        ?>

        <p>
            <label for="<?php echo $this->get_field_id('title') ?>">
                Title:
            </label>
            <input
                type="text"
                class="widefat"
                id="<?php echo $this->get_field_id('title') ?>"
                name="<?php echo $this->get_field_name('title') ?>"
                value="<?php echo $instance['title'] ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('stt_styles') ?>">
                Style Sheet
            </label>
            <textarea
                type="text"
                class="widefat"
                id="<?php echo $this->get_field_id('stt_styles') ?>"
                name="<?php echo $this->get_field_name('stt_styles') ?>"
                placeholder="Salat Time Table Style Sheet"><?php echo $instance['stt_styles'] ?></textarea>
        </p>
        <?php

    }

    function update()
    {
    }

    function widget($args, $instance)
    {

        $salatTimes = $this->sts->getTodaysSalatTimes();
        if (isset($salatTimes)) {


            ?>

            <table id="prayer_table" class="center">
                <tr>
                    <th></th>
                    <th>Beginning</th>
                    <th>Athan</th>
                    <th>Iqama</th>
                    <th>Next Change</th>
                </tr>
                <tr>
                    <th>
                        Fajr
                    </th>
                    <td id="cell_fajr_beginning"><?php printTime($salatTimes->fajr_beginning); ?></td>
                    <td id="cell_fajr_athan"><?php printTime($salatTimes->fajr_athan); ?></td>
                    <td id="cell_fajr_iqama"><?php printTime($salatTimes->fajr_iqama); ?></td>
                    <td id="cell_fajr_next_change" class="small_time">
                        <?php
                        printDate($salatTimes->fajr_change_date);
                        ?>
                        <?php
                        printTime($salatTimes->fajr_change);
                        ?>
                    </td>
                </tr>
                <tr>
                    <th>
                        Shurooq
                    </th>
                    <td id="cell_shurooq" colspan="4"><?php printTime($salatTimes->shurooq); ?></td>
                </tr>
                <tr>
                    <th>
                        Thuhr
                    </th>
                    <td id="cell_thuhr_beginning"><?php printTime($salatTimes->thuhr_beginning); ?></td>
                    <td id="cell_thuhr_athan"><?php printTime($salatTimes->thuhr_athan); ?></td>
                    <td id="cell_thuhr_iqama"><?php printTime($salatTimes->thuhr_iqama); ?></td>
                    <td id="cell_thuhr_next_change" class="small_time">
                        <?php
                        printDate($salatTimes->thuhr_change_date);
                        ?>
                        <?php
                        printTime($salatTimes->thuhr_change);
                        ?>
                    </td>
                </tr>
                <tr>
                    <th>
                        Asr Shafi
                    </th>
                    <td id="cell_asr_shafi_beginning"><?php printTime($salatTimes->asr_beginning_shafi); ?></td>
                    <td id="cell_asr_athan" rowspan="2"><?php printTime($salatTimes->asr_athan); ?></td>
                    <td id="cell_asr_iqama" rowspan="2"><?php printTime($salatTimes->asr_iqama); ?></td>
                    <td id="cell_asr_next_change" rowspan="2" class="small_time">
                        <?php
                        printDate($salatTimes->asr_change_date);
                        ?>
                        <?php
                        printTime($salatTimes->asr_change);
                        ?>
                    </td>
                </tr>
                <tr>
                    <th>
                        Asr Hanafi
                    </th>
                    <td id="cell_asr_hanafi_beginning"><?php printTime($salatTimes->asr_beginning_hanafi); ?></td>
                </tr>

                <tr>
                    <th>
                        Maghrib
                    </th>

                    <td id="cell_maghrib_athan" colspan="2"><?php printTime($salatTimes->maghrib_athan); ?></td>
                    <td id="cell_maghrib_iqama"><?php echo $salatTimes->maghrib_iqama; ?></td>
                    <td id="cell_maghrib_next_change" class="small_time">
                        <?php
                        printDate($salatTimes->maghrib_change_date);
                        ?>
                        <?php
                        printTime($salatTimes->maghrib_change);
                        ?>
                    </td>
                </tr>
                </td>
                </tr>
                <tr>
                    <th>
                        Isha
                    </th>
                    <td id="cell_isha_beginning"><?php printTime($salatTimes->isha_beginning); ?></td>
                    <td id="cell_isha_athan"><?php printTime($salatTimes->isha_athan); ?></td>
                    <td id="cell_isha_iqama"><?php printTime($salatTimes->isha_iqama); ?></td>
                    <td id="cell_isha_next_change" class="small_time">
                        <?php
                        printDate($salatTimes->isha_change_date);
                        ?>
                        <?php
                        printTime($salatTimes->isha_change);
                        ?>
                    </td>
                </tr>
                <tr>
                    <th>
                        Jum'ah
                    </th>
                    <td colspan="4">
                        <?php
                        pv(getJumahTime());
                        ?>
                    </td>
                </tr>
            </table>


            <?php
        } else {
            ?>
            Salat Times not found
            <?php
        }
    }
}


add_action("widgets_init", function () {
    register_widget("SalahTimeTableFiq");
});

if (isset($db)) {
    mysqli_close($db);
}