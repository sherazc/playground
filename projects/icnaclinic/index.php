<?php include './components/main_page_begin.php';?>
<div id="container" class="hfeed">
<?php include './components/main_header.php';?>
<div id="wrapper" class="clearfix">

	<div id="featured" class="grid col-940">
	
		<div class="grid col-460">

			<h1 class="featured-title">ICNA Clinic</h1>
			<h2 class="featured-subtitle">Connect to your local health provider.</h2>
			<p>Please login if you are already registered.</p>
			
			<table style="border:0px">
				<tr>
				<td>&#160;</td>
				<td>
				<div id="login" class="widget-wrapper widget_search">
				<div class="widget-title">Login</div>
				<form method="get" id="loginform" action="./">
					<input type="text" class="field" name="username" id="username" placeholder="User name...">
					
					<input type="text" class="field" name="password" id="password" placeholder="Password..."> 
					
					<input type="submit" class="submit" value="Login">
				</form>
			</div>
				</td>
				<td>&#160;</td>
				</tr>
				
			</table>
			
			
			
			
			
			<!-- end of .call-to-action -->
			

		</div>
		<!-- end of .col-460 -->

		<div id="featured-image" class="grid col-460 fit">

			<img class="aligncenter" src="./images/featured-image.png" width="440" height="300" alt="">

			<p>Signup to get connected.</p>
			<div class="call-to-action">
				<a href="./register.php" class="blue button">Sign Up</a>
			</div>
			
		</div>
		<!-- end of #featured-image -->

	</div>
	<!-- end of #featured -->


	<div id="widgets" class="home-widgets">

		<div class="grid col-460">

			<div class="widget-wrapper">

				<div class="widget-title-home">
					<h3>Physicians</h3>
				</div>
				<div class="textwidget">
				A physician is a professional who practices medicine, which is concerned with promoting, maintaining or restoring human health through the study, diagnosis, and treatment of disease, injury, and other physical and mental impairments. 
	
					
				</div>

			</div>
			<!-- end of .widget-wrapper -->

		</div>
		<!-- end of .col-300 -->

		<div class="grid col-460 fit">

			<div class="widget-wrapper">

				<div class="widget-title-home">
					<h3>Patient</h3>
				</div>
				<div class="textwidget">
				A patient is any recipient of health care services. The patient is most often ill or injured and in need of treatment by a physician, physician assistant, advanced practice registered nurse, veterinarian, or other health care provider.
				</div>

			</div>
			<!-- end of .widget-wrapper -->

		</div>
		<!-- end of .col-300 fit -->
	</div>
	<!-- end of #widgets -->
</div>
<!-- end of #wrapper -->
</div>
<!-- end of #container -->
<?php include './components/main_footer.php';?>
<?php include './components/main_page_end.php';?>