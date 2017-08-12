<!-- CSS goes in the document HEAD or added to your external stylesheet -->
<style type="text/css">
table.altrowstable {
	font-family: verdana,arial,sans-serif;
	font-size:x-small;
	color:#333333;
	border-width: 1px;
	border-color: #a9c6c9;
	border-collapse: collapse;
}
table.altrowstable th {
	border-width: 1px;
	padding: 5px;
	color:#ffffff;
	border-style: solid;
	border-color: #437bcf;
	background-color:#437bcf;
}
table.altrowstable td {
	border-width: 1px;
	padding: 5px;
	border-style: solid;
	border-color:#437bcf;
}
.oddrowcolor{
	background-color:#fdfdfd;
}
.evenrowcolor{
	background-color:#eeeeee;
}
</style>

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
