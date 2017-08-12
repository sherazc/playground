<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<!-- Start search bar -->

<table border="0">
	<tr>
	<td width="75%" align="right" class="nowrap" style="vertical-align: middle;height: 10px;">
		
		<label for="searchDate">Month:</label>
    	
    	<input name="searchDate" id="searchDate" style="font-size:large; width: 100px; height: 28px; text-align: center; vertical-align: middle;"/>
    	<select name="paidType" id="paidType" style="font-size: large; height: 34px; text-align: center; vertical-align: middle; text-align: center;">
    		<option value="all">All</option>
    		<option value="paid">Paid</option>
    		<option value="unpaid">Unpaid</option>
    	</select>
		<input id="searchField" style="font-size:large; width: 250px; height: 28px; vertical-align: middle;" type="text" 
			onfocus="javascript:removeHint(searchFieldHintText, 'searchField');" 
			onblur="javascript:showHint(searchFieldHintText, 'searchField');"
			onkeyup="javascript:incrementalSearch()" />
		<input type="hidden" id="sortField" name="sortField" value="${sortField}"/>
		<input type="hidden" id="sortOrder" name="sortOrder" value="${sortOrder}"/>	
	</td>
	<td width="25%" class="nowrap" valign="top" align="left" style="vertical-align: middle;">
		<a id="searchLInk" style="vertical-align: middle;" href="javascript:resetSortAndRedirectSearch()"><img alt="search" border="0" src="${contextPath}/resources/images/search_button.png"></a>
	</td>
	</tr>

</table>


<script type="text/javascript">
//http://lucianocosta.info/jquery.mtz.monthpicker/
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

var options = {
    pattern: 'mmmm, yyyy', // Default is 'mm/yyyy' and separator char is not mandatory
    startYear: 2008,
    finalYear: 2020
};
$("#searchDate").monthpicker(options);

//page functions;
var searchFieldHintText = "Search...";

$( document ).ready(function() {
	initSearchHint();
	initSearchDate();
	initPaidType();
});


function initSearchHint() {
	var searchField = document.getElementById("searchField");
	<c:choose> 
		<c:when test="${empty searchQuery || searchQuery == 'searchany'}">
			searchField.value = searchFieldHintText; 
			searchField.style.color="#888888";
		</c:when>
		<c:otherwise>
			searchField.value = "${searchQuery}";
		</c:otherwise>
	</c:choose>
	
}

function initSearchDate() {
	var searchDate = document.getElementById("searchDate");
	var date=new Date();
	<c:choose> 
		<c:when test="${empty selectedYear}">
			var yy = date.getYear();
			var year = (yy < 1000) ? yy + 1900 : yy;
		</c:when>
		<c:otherwise>
			var year = "${selectedYear}";
		</c:otherwise>
	</c:choose>

	<c:choose> 
		<c:when test="${empty selectedMonth}">
			var monthString =  months[date.getMonth()];
		</c:when>
		<c:otherwise>
			var monthString =  months["${selectedMonth}"];
		</c:otherwise>
	</c:choose>

	searchDate.value =  monthString + ", " + year;
}

function initPaidType() {
	<c:if test="${not empty selectedPaidType}">
		var paidType = document.getElementById("paidType");
		for (var i = 0, optionsLength = paidType.options.length; i < optionsLength; i++) {
	        if (paidType.options[i].value == "${selectedPaidType}") {
	        	paidType.selectedIndex = i;
	            break;
	        }
	    }
	</c:if>
}

function resetSortAndRedirectSearch() {
	resetSort();
	redirectSearchURL(0);
}

function redirectSearchURL(pageNumber) {
	var redirectURL = getRedirectSearchURL(pageNumber);
	window.location.href = redirectURL;
}

function getRedirectSearchURL(pageNumber) {
	return getRedirectSearchURL(pageNumber, false);
}

function getRedirectSearchURL(pageNumber, ajaxFlag) {
	var link = "${contextPath}/search/" + getSelectedPaidType() + "/" + getSelectedYear() + "/" + getSelectedMonth();
	var searchQuery = getSearchQuery();

	if (searchQuery != "") {
		link += "/" + searchQuery;
	}

	if (pageNumber != null && pageNumber != "" && pageNumber > 0) {
		link += "/" + pageNumber;
	} else {
		link += "/0";
	}

	var sortField = document.getElementById("sortField");
	var sortOrder = document.getElementById("sortOrder");
	var buildSortLink = sortField != null && sortField.value != null && (sortField.value != "none" && sortField.value != "");
	
	if (buildSortLink && ajaxFlag == null) {
		link += "/false";
	} 
	
	if (ajaxFlag != null){
		link += "/" + ajaxFlag;
	}
	
	if (buildSortLink) {
		link += "/" + sortField.value;
		if (sortOrder != null && sortOrder.value != null) {
			link += "/" + sortOrder.value;
		} else {
			link += "/asc";
		}
	}
	return link;
}

function getSearchQuery() {
	var result = "";
	var searchField = document.getElementById("searchField");
	if (searchField != null && searchField.value != null && searchField.value != searchFieldHintText && searchField.value != "") {
		result = searchField.value;
	} else {
		result = "searchany"
	}
	return result;
}

function getSelectedPaidType() {
	var paidType = document.getElementById("paidType");
	return paidType.options[paidType.selectedIndex].value
}

function getSelectedMonth() {
	var searchDate = document.getElementById("searchDate");
	var monthString = searchDate.value.substring(0, 3); 
	//var month = months.indexOf(monthString);
	var month = jQuery.inArray(monthString, months);
	return month;
}

function getSelectedYear() {
	var searchDate = document.getElementById("searchDate");
	return searchDate.value.substring(5, 9);
}

function incrementalSearch() {
	resetSort();
	var searchField = document.getElementById("searchField");
	var searchValue = searchField.value;
	if (searchValue.length > 2) {
		var searchURL = getRedirectSearchURL(0, true);
		$.ajaxSetup ({  
	        cache: false  
	    });
		var ajax_load = "<img alt='loading...' src='${contextPath}/resources/images/loading.gif'/> loading...";
		$("#searchResults").html(ajax_load).load(searchURL);
	}
	
}

function sort(field, order) {
	var sortField = document.getElementById("sortField");
	var sortOrder = document.getElementById("sortOrder");
	if (sortField != null && field != null) {
		sortField.value = field;
	}
	if (sortOrder != null && order != null) {
		sortOrder.value = order;
	}
	var redirectURL = getRedirectSearchURL(0, false)
	window.location.href = redirectURL;
	
}


function resetSort() {
	var sortField = document.getElementById("sortField");
	var sortOrder = document.getElementById("sortOrder");
	if (sortField != null) {
		sortField.value = "";
	}
	if (sortOrder != null) {
		sortOrder.value = "";
	}
}
</script>

<!-- End search bar -->