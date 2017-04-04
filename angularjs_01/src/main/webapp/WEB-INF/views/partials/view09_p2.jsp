<div>
	<h2>View 2</h2>
	City:
	<br/>
	<input type="text" ng-model="city"/>
	<br/>
	<ul>
		<li ng-repeat="customer in customers | filter:city | orderBy:'name'">
			{{customer.name}} {{customer.city | uppercase}}
		</li>
	</ul>
</div>