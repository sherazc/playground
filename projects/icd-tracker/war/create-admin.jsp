<jsp:include page="/layout_top.jsp" />


<jsp:include page="/results.jsp" />


<table class="table4" cellpadding="0" cellspacing="0" width="250px">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Register User
		
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>
		
<form action="${application.contextPath}/adminuser" method="get">
<table>
  <tr align="left">
    <th><label for="name"><b>Name</b></label></th>
    <td><input id="name" name="name" type="text" value="${name}"/></td>
  </tr>
  <tr align="left">
    <th><label for="password"><b>Password</b></label></th>
    <td><input id="password" name="password" type="password" value="${password}"/></td>
  </tr>
  <tr align="left">
    <th><label for="admin"><b>Admin</b></label></th>
    <td align="left"><input id="admin" name="admin" value="yes" type="checkbox" style="width: 20px; border: 0px;"/></td>
  </tr>
  <tr>
	  <td colspan="2" align="left">
	  &nbsp;<br/>
	  <input type="submit" value="Create User"/>
	  </td>
  </tr>
</table>
<input type="hidden" name="action" value="create-user"/>

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