<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CI - Members</title>
</head>
<body>
<div id="container">
    <h1>Members</h1>

<pre>
<!--
NOTE: In CI 3 ‘session_id’, ‘ip_address’, ‘user_agent’, ‘last_activity’ are no longer part of userdata array.
https://www.codeigniter.com/user_guide/libraries/sessions.html#accessing-session-metadata
-->
Session ID: <?php var_dump(session_id()); ?>

Session Data: <?php print_r($this->session->all_userdata()); ?>
</pre>


    <a href="<?php echo base_url()?>main/logout">Logout</a>
</div>
</body>
</html>