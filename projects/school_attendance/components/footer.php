<script>
    $(document).ready(function () {
        $("#cr").html("&copy; " + new Date().getFullYear());
    });
</script>
<style>
    footer {
        background-color: rgba(0, 0, 0, 0.6);
        bottom: 0px;
        width: 100%;
        height: 40px;
        position: fixed;
        color: white;
        z-index: 100;
        box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.8);
    }
</style>
<div style="margin-top: 60px;"></div>
<footer style="">
    <div class="container">
        <div class="row">

            <div class="col-lg-12" style="color: white; text-align: center; margin-top: 10px">
                School Attendance
                <span id="cr"></span>
            </div>
        </div>

    </div>
</footer>
<?php
include "close_resources.php";