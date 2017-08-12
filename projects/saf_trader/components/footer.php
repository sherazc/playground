<!--<head>
<script src="../scripts/libs/jquery/jquery-1.11.2.min.js"></script>
<script src="../scripts/libs/bootstrap-3.3.2/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="../scripts/css/main.css">
<script src="../scripts/js/commons.js"></script>
<link rel="stylesheet" href="../scripts/libs/bootstrap-3.3.2/css/bootstrap.min.css">
</head>

-->
<script>
    $(document).ready(function () {
        $("#cr").html("&copy; " + new Date().getFullYear());
    });
</script>
<?php
$footerTextColor = "#D9D9D9";
?>
<style>
    footer {
        /*background: color image position/size repeat origin clip attachment initial|inherit;*/
        background: rgba(0, 0, 0, 0.6) url("images/footer_background.png");
        bottom: 0px;
        width: 100%;
        height: 450px;
        position: relative;""
        color: <?php pv($footerTextColor);?>;
        z-index: 100;
        box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.8);
    }

    .footerLinkListTitle {
        color: <?php pv($footerTextColor);?>;
        font-size: 30px;
        margin-top: 30px;
    }

    .footerLinkList ul li {
        color: <?php pv($footerTextColor);?>;
        font-size: 15px;
        list-style: none;
        margin-top: 10px;
        margin-left: -20px;
    }

    .footerLinkList ul li a {
        color: <?php pv($footerTextColor);?>;
        font-size: 15px;
    }

    .footerSocialMediaTitle {
        font-size: 50px;
        text-align: center;
        color: <?php pv($footerTextColor);?>;
    }

    .footerSocialMediaIcon div {
        margin: 0 auto;
        width: 416px;
    }

    .footerSocialMediaIcon img {
        margin: 5px 20px;
    }

    .footerVerticalSeparator {
        background-color: <?php pv($footerTextColor);?>;
        width: 2px;
        height: 200px;
        position: relative;
        float: left;
        margin-top: 30px;
        margin-left: -30px;
    }

    .footerHorizontalSeparator {
        width: 100%;
        height: 2px;
        margin: 20px auto;
        background-color: <?php pv($footerTextColor);?>;
    }

    .footerCopywrite{
        text-align: center;
        margin-top: 10px;
        color: <?php pv($footerTextColor);?>;
    }
</style>
<div style="margin-top: 0px;"></div>

<footer>
    <div class="container" >

        <div class="row">
            <div class="col-lg-4 col-lg-offset-4">
                <div class="footerVerticalSeparator"></div>
                <div class="footerLinkListTitle">
                    Company
                </div>
                <div class="footerLinkList">
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">Policies</a></li>
                        <li><a href="#">Terms & Policies</a></li>
                    </ul>
                </div>

            </div>
            <div class="col-lg-4">
                <div class="footerVerticalSeparator"></div>
                <div class="footerLinkListTitle">
                    Discover
                </div>
                <div class="footerLinkList">
                    <ul>
                        <li><a href="#">Trust & Safety</a></li>
                        <li><a href="#">Gift Cards</a></li>
                        <li><a href="#">Invite Your Friend</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="row">

            <div class="col-lg-12">
                <div class="footerHorizontalSeparator"></div>
                <div class="footerSocialMediaTitle">
                    Join Us On
                </div>
                <div class="footerSocialMediaIcon">
                    <div>
                        <img src="images/social_round_facebook.png">
                        <img src="images/social_round_twitter.png">
                        <img src="images/social_round_gplus.png">
                        <img src="images/social_round_ig.png">
                        <img src="images/social_round_youtube.png">
                    </div>
                </div>
                <div class="footerCopywrite">
                    <span id="cr"></span>
                </div>

            </div>
        </div>

    </div>
</footer>
<?php
include "close_resources.php";
