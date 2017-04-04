<?php
header('Content-Type: application/javascript');
$clientFunctionName = 'callback';
if(isset($_REQUEST['clientFunctionName'])) {
    $clientFunctionName = $_REQUEST['clientFunctionName'];
}
?>
<?php echo $clientFunctionName; ?>({dish: "Pizza", ingredients: ['Cheese', 'Tomato Paste', 'Flour']})