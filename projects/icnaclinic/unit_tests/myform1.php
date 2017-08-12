<?php
require './services/util/basic_utils.php';
$varMovie = "";
$varName = "";

if(getRequestParam('formSubmit') == "Submit")
//if($_POST['formSubmit'] == "Submit")
{
	$errorMessage = "";
	
	
	if(isEmpty(getRequestParam('formMovie')))
	{
		$errorMessage .= "<li>You forgot to enter a movie!</li>";
	}
	if(isEmpty(getRequestParam('formName')))
	{
		$errorMessage .= "<li>You forgot to enter a name!</li>";
	}
	
	$varMovie = getRequestParam('formMovie');
	$varName = getRequestParam('formName');

	if(empty($errorMessage)) 
	{
		$fs = fopen("mydata.csv","a");
		fwrite($fs,$varName . ", " . $varMovie . "\n");
		fclose($fs);
		
		header("Location: thankyou.html");
		exit;
	}
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>My Form</title>
</head>

<body>
	<?php
		if(!empty($errorMessage)) 
		{
			echo("<p>There was an error with your form:</p>\n");
			echo("<ul>" . $errorMessage . "</ul>\n");
		} 
	?>
	<form action="myform1.php" method="post">
		<p>
			What is your favorite movie?<br>
			<input type="text" name="formMovie" maxlength="50" value="<?=$varMovie;?>" />
		</p>
		<p>
			What is your name?<br>
			<input type="text" name="formName" maxlength="50" value="<?=$varName;?>" />
		</p>				
		<input type="submit" name="formSubmit" value="Submit" />
	</form>
</body>
</html>