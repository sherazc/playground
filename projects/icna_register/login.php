<!doctype html>
<html lang="en">
<head>
    <title>Event Tracker</title>
    <?php include_once 'common_html_head.php' ?>
</head>
<body>
<?php include_once 'header.php'; ?>
<div class="container">
<div class="row">
        <div class="col-sm-6">
            <h3>Login</h3>
            <?php
            if (isset($_REQUEST["failLogin"])) {
                ?>
                <span style="color: red">Failed to login</span>
                <?php
            }
            ?>
            <form method="post" action="login_submit.php">
                <div class="form-group">
                    <label for="userId">User Name</label>
                    <input type="text" class="form-control" name="userId" id="userId"
                           placeholder="User name" required/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password" id="password"
                           placeholder="Password" required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
<?php include_once 'footer.php'?>
</body>
</html>