<!doctype html>
<html lang="en">
<head>
    <title>Register</title>
    <?php include_once 'common_html_head.php' ?>
</head>
<body>
<?php include 'header.php'; ?>
<div class="container">
<div class="row">
        <div class="col-sm-6">
            <h3>Login</h3>
            <form method="post" action="login_submit.php">
                <div class="form-group">
                    <label for="userName">User Name</label>
                    <input type="text" class="form-control" name="userName" id="userName"
                           placeholder="User name"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password" id="password"
                           placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
<?php include 'footer.php'?>
</body>
</html>