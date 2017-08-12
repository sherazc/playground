<script type="text/javascript">

$(document).ready(function(){
	var i = $('input').size() + 1;
	$('#add').click(function() {
		$('<div><input type="text" class="field" name="dynamic" value="' + i + '" /></div>').fadeIn('slow').appendTo('.inputs');
		i++;
	});

	$('#remove').click(function() {
		if(i > 1) {
			$('.field:last').remove();
			i--; 
		}
	});

	$('#reset').click(function() {
		while(i > 2) {
			$('.field:last').remove();
			i--;
		}
	});

// here's our click function for when the forms submitted

//	$('.submit').click(function(){
//		var answers = [];
//    	$.each($('.field'), function() {
//        	answers.push($(this).val()); 
//    	});
//    	if(answers.length == 0) { 
//        	answers = "none"; 
//    	}
//		document.getElementById("form1").submit();
//		
//		return true;
//	});
});

-->

</script>

<div class="dynamic-form">

<a href="#" id="add">Add</a> | <a href="#" id="remove">Remove</a>  | <a href="#" id="reset">Reset</a>  

<form id="form1" action="field" method="get">
<div class="inputs">
<div><input type="text" name="dynamic" class="field" value="1"/></div>
</div>
<input name="submit" type="submit" class="submit" value="Submit" />
</form>
</div>
