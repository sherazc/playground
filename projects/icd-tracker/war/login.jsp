<jsp:include page="/layout_top.jsp" />
<jsp:include page="/results.jsp" />
<table class="table4" cellpadding="0" cellspacing="0" width="250px">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Sign in
		
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>


<form action="${application.contextPath}/home" method="post">
<table border="0">
  <tr align="left">
    <th><label for="name"><b>Name</b></label></th>
    <td><input id="name" name="name" type="text" value="${name}"/></td>
  </tr>
  <tr align="left">
    <th><label for="password"><b>Password</b></label></th>
    <td><input id="password" name="password" type="password" value="${password}"/></td>
  </tr>
  <tr>
  <td colspan="2" align="left"><input type="submit" value="Login"/></td>
  </tr>
</table>
<input type="hidden" name="action" value="login"/>
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
