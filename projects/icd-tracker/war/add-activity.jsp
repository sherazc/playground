<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="/layout_top.jsp" />

<jsp:include page="/results.jsp" />


<table class="table4" cellpadding="0" cellspacing="0" width="500">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Create New Event
		
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>

<form action="${application.contextPath}/activities">
<table>
  <tr align="left">
    <th><label for="name"><b>Name</b></label></th>
    <td><input id="name" name="name" type="text" value="${name}"/></td>
  </tr>
  <tr align="left">
    <th valign="top"><label for="name"><b>Desctiption</b></label></th>
    
    <td>
    <textarea rows="5" cols="50" id="description" name="description" type="text" value="${description}"></textarea>
    </td>
  </tr>
  <tr align="left">
    <td colspan="2"><input type="submit" value="Create"/></td>
  </tr>
</table>
<input type="hidden" name="action" value="create-activity"/>
</form>


		</td>
		<td class="table4mr"/>
	</tr>
	<tr>
		<td class="table4bl"/>
		<td class="table4bm"/>
		<td class="table4br"/>
	</tr>
</table>






<jsp:include page="/layout_bottom.jsp" />