<!DOCTYPE html>
<html lang="en">
<head>
    <title>SAF Trader</title>
    <?php include "components/scripts_include.php"; ?>
    <script src="scripts/libs/jquery/jquery-1.11.2.min.js"></script>
    <script src="scripts/libs/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <script src="scripts/js/commons.js"></script>
    <link rel="stylesheet" href="scripts/libs/bootstrap-3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="scripts/css/main.css">
    <style>
        #main_jumbotron {
            background: transparent url("images/big_background2.png");
            height: 540px;
        }

        #main_jumbotron_footer {
            top: -80px;
            position: relative;
            height: 80px;
            background-color: rgba(255, 255, 255, 0.4);
        }

        #selling_quote {
            color: white;
            text-align: center;
            font-size: 60px;
            font-weight: bold;
            position: relative;
            top: 150px;
            text-shadow: 2px 2px 8px #000000;
            white-space: nowrap;
        }

        #selling_quote_sub_text {
            color: white;
            text-align: center;
            font-size: 30px;
            font-weight: bold;
            position: relative;
            top: 150px;
            text-shadow: 1px 1px 4px #000000;
            white-space: nowrap;
        }

        #howItWorks {
            font-size: 20px;
            margin-top: 200px;
            background-color: rgba(255, 255, 255, 0.7);
        }

        #mainPageButtonBar {
            margin-top: 12px;
            width: 615px;
            height: 68px;
            background-color: transparent;
        }

        #mainPageButtonBar button {
            width: 200px;
        }

        #mainPageButtonBarMore {
            position: relative;
            color: #e55541;
            top: -25px;
            left: 340px;
        }

        #mainPageButtonBarButtonGroupContainer {
            padding: 5px;
            background-color: rgba(255, 255, 255, 0.5);
        }
    </style>

</head>
<body>
<?php include "components/main_nav.php";
?>
<div id="main_jumbotron" class="container-fluid">
    <div class="row">
        <div class="col-lg-12 centerTextAndContainer">
            <p id="selling_quote">
                BRING STYLE TO YOUR LIFE
            </p>

            <p id="selling_quote_sub_text">
                You customize it, and we will deliver it.
            </p>
            <a id="howItWorks" href="#" class="btn btn-default">How It Works</a>
        </div>
    </div>
</div>

<div id="main_jumbotron_footer" class="container-fluid" style="">
    <div class="row">
        <div class="col-lg-12">
            <div class="centerTextAndContainer">
                <div id="mainPageButtonBar" class="centerTextAndContainer">
                    <div id="mainPageButtonBarButtonGroupContainer">
                        <div class="btn-group btn-group-lg" role="group" aria-label="">
                            <button type="button" class="btn btn-default">Bed Sheets</button>
                            <button type="button" class="btn btn-default">Table Cloths</button>
                            <button type="button" class="btn btn-default">Curtains</button>
                        </div>
                    </div>
                    <a href="#" id="mainPageButtonBarMore">
                        more...
                    </a>

                </div>
            </div>
        </div>
    </div>
</div>
<div style="margin-top: -80px;">
</div>


<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="jumbotron" style="background-color: rgba(0, 0, 0, 0.6)">
                <h3 style="text-align: center; color: white">
                    Page
                </h3>
                testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing
                <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing
                <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing
                <br>testing <br>testing <br>testing <br>testing <br>testing <br>testing <br>
            </div>
        </div>
    </div>

</div>

<?php include "components/footer.php"; ?>
</body>
</html>