<div>
	<h2>View 1</h2>
	Name:
	<br/>
	<input type="text" ng-model="filer.name"/>
	<br/>
	<ul>
		<li ng-repeat="customer in customers | filter:filter.name | orderBy:'name'">
			{{customer.name}} {{customer.city | uppercase}}
		</li>
	</ul>
	
	<br/>
	Customer Name:
	<input type="text" ng-model="newCustomer.name"/>
	<br/>
	Customer City:
	<input type="text" ng-model="newCustomer.city"/>
	<br/>
	<button ng-click="addCustomer()">Add Customer</button>
	<br />
	<a href="#/view2">View 2</a>
</div>