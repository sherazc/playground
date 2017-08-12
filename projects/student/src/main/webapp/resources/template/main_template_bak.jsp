<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script src="${contextPath}/resources/css/jquery.mtz.monthpicker.js"></script>
	<jsp:include page="/resources/css/main_css.jsp" />
	<jsp:include page="/resources/script/main_js.jsp" />
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Main Template</title>
</head>
<body>
<table style="width:80%; " align="center">
<tr>
<td>


<table id="main_page_box" style="width:100%; " align="center">
<tr>
<td>

<!-- start logo section -->
<table border="0" width="100%">
	<tr>
		<td width="5%">&nbsp;</td>
		<td width="90%">
<table border="0" width="100%">
	<tr>
		<td width="10%">
			&nbsp;<br/>&nbsp;<br/>
			<img border="0" alt="Student Registration" src="${contextPath}/resources/images/title.png">
		</td>
		<td width="80%" rowspan="2">&nbsp;</td>
		<td width="10%" rowspan="2">
			<img border="0" alt="ICNA Logo" src="${contextPath}/resources/images/logo_small.png">
		</td>
	</tr>
	<tr>
		<td valign="bottom">
			<a>Search <img alt="triangle" src="${contextPath}/resources/images/triangle_down.png"></a>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<a>Register <img alt="triangle" src="${contextPath}/resources/images/triangle_down.png"></a>
		</td>
	</tr>
</table>
		</td>
		<td width="5%">&nbsp;</td>
	</tr>
</table>
<!-- end logo section -->

<!-- start menu bar -->
<table border="0" width="100%">
	<tr>
	<td align="center">
		<table border="0" width="98%"><tr><td bgcolor="#437bcf">&nbsp;</td></tr></table>
	</td>
	</tr>
</table>
<!-- end menu bar -->

<!-- start main content -->
<table border="0" width="100%">
	<tr>
		<td width="10%">&nbsp;</td>
		<td width="80%" align="center">
		<br/>
<!-- Start search bar -->

<script type="text/javascript">
//page functions;
var searchFieldHintText = "Search Student...";

function initSearchHint() {
	var searchField = document.getElementById("searchField");
	searchField.value = searchFieldHintText; 
	searchField.style.color="#888888";
}

$( document ).ready(function() {
	initSearchHint();
});
</script>

<table border="0" width="80%">
	<tr>
	<td align="right" valign="middle" style="white-space: nowrap">
		<input id="searchField" style="font-size:large; width: 250px; height: 28px" type="text" onfocus="javascript:removeHint(searchFieldHintText, 'searchField');" onblur="javascript:showHint(searchFieldHintText, 'searchField');"/>
		<label for="searchDate">Month:</label>
    	<input name="searchDate" id="searchDate" style="font-size:large; width: 100px; height: 28px; text-align: center;"/>
	</td>
	<td style="white-space: nowrap" valign="top" align="left">
		&nbsp;
		<input type="image" src="${contextPath}/resources/images/search_button.png" border="0" style="cursor: pointer;">
		<a href="#"><img alt="search all" border="0" src="${contextPath}/resources/images/show_all_button.png"></a>
	</td>
	</tr>

</table>


<script type="text/javascript">
//http://lucianocosta.info/jquery.mtz.monthpicker/
options = {
    pattern: 'mmmm, yyyy', // Default is 'mm/yyyy' and separator char is not mandatory
    startYear: 2008,
    finalYear: 2020,
};
$("#searchDate").monthpicker(options);

$( document ).ready(function() {
	initSearchDate();
});

function initSearchDate() {
	var date=new Date();
	var months=new Array();
	months[0]="Jan";
	months[1]="Feb";
	months[2]="Mar";
	months[3]="Apr";
	months[4]="May";
	months[5]="Jun";
	months[6]="Jul";
	months[7]="Aug";
	months[8]="Sep";
	months[9]="Oct";
	months[10]="Nov";
	months[11]="Dec";
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	var searchDate = document.getElementById("searchDate");
	searchDate.value =  months[date.getMonth()] + ", " + year;
}
</script>


<!-- End search bar -->

<br/>

<!-- Start search grid -->


<!-- Javascript goes in the document HEAD -->
<script type="text/javascript">
function altRows(id){
	if(document.getElementsByTagName){  
		
		var table = document.getElementById(id);  
		var rows = table.getElementsByTagName("tr"); 
		 
		for(i = 0; i < rows.length; i++){          
			if(i % 2 == 0){
				rows[i].className = "evenrowcolor";
			}else{
				rows[i].className = "oddrowcolor";
			}      
		}
	}
}

$( document ).ready(function() {
	altRows('alternatecolor');
});
</script>

<!-- CSS goes in the document HEAD or added to your external stylesheet -->
<style type="text/css">
table.altrowstable {
	font-family: verdana,arial,sans-serif;
	font-size:small;
	color:#333333;
	border-width: 1px;
	border-color: #a9c6c9;
	border-collapse: collapse;
}
table.altrowstable th {
	border-width: 1px;
	padding: 8px;
	color:#ffffff;
	border-style: solid;
	border-color: #437bcf;
	background-color:#437bcf;
}
table.altrowstable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color:#437bcf;
}
.oddrowcolor{
	background-color:#fdfdfd;
}
.evenrowcolor{
	background-color:#f8f8f8;
}
</style>

<!-- Table goes in the document BODY -->
<table class="altrowstable" id="alternatecolor">
<tr>
	<th>Info Header 1</th><th>Info Header 2</th><th>Info Header 3</th>
</tr>
<tr>
	<td>Text 1A</td><td>Text 1B</td><td>Text 1C</td>
</tr>
<tr>
	<td>Text 2A</td><td>Text 2B</td><td>Text 2C</td>
</tr>

<tr>
	<td>Text 3A</td><td>Text 3B</td><td>Text 3C</td>
</tr>
<tr>
	<td>Text 4A</td><td>Text 4B</td><td>Text 4C</td>
</tr>
<tr>
	<td>Text 5A</td><td>Text 5B</td><td>Text 5C</td>
</tr>
</table>
<!--  The table code can be found here: http://www.textfixer/resources/css-tables.php#css-table03 -->




<!-- End search grid -->










		<br/>
		</td>
		<td width="10%">&nbsp;</td>
	</tr>
</table>
<!-- end main content -->


<!-- Start footer -->
<table border="0" width="100%">
	<tr>
	<td align="center" height="2px">
		<table border="0" width="98%"><tr><td bgcolor="#437bcf"></td></tr></table>
	</td>
	</tr>
</table>

<table border="0" width="100%">
	<tr>
	<td align="center">
		Masjid Mariam
		<br/>
		&copy; 2013
	</td>
	</tr>
</table>
<!-- End footer -->

</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>