// https://lodash.com/
// http://underscorejs.org/
var _ = require("lodash");
var $ = require("jquery");

console.log("Module 2 stuff");

// Data below is generated using https://www.mockaroo.com/
var people = [{"id":1,"first_name":"Gregory","last_name":"Griffin","email":"ggriffin0@ed.gov","gender":"Male","ip_address":"190.244.147.10"},
    {"id":2,"first_name":"Jack","last_name":"Montgomery","email":"jmontgomery1@uiuc.edu","gender":"Male","ip_address":"212.59.1.190"},
    {"id":3,"first_name":"Howard","last_name":"Rogers","email":"hrogers2@mediafire.com","gender":"Male","ip_address":"178.152.24.212"},
    {"id":4,"first_name":"Joyce","last_name":"Gilbert","email":"jgilbert3@goo.ne.jp","gender":"Female","ip_address":"97.217.41.59"},
    {"id":5,"first_name":"Jack","last_name":"Williamson","email":"jwilliamson4@usa.gov","gender":"Male","ip_address":"8.103.218.220"},
    {"id":6,"first_name":"Harry","last_name":"Alvarez","email":"halvarez5@reuters.com","gender":"Male","ip_address":"129.112.68.123"},
    {"id":7,"first_name":"Samuel","last_name":"Webb","email":"swebb6@odnoklassniki.ru","gender":"Male","ip_address":"16.198.59.60"},
    {"id":8,"first_name":"Marie","last_name":"Rogers","email":"mrogers7@constantcontact.com","gender":"Female","ip_address":"12.122.216.58"},
    {"id":9,"first_name":"Todd","last_name":"Wood","email":"twood8@moonfruit.com","gender":"Male","ip_address":"140.162.217.233"},
    {"id":10,"first_name":"Ronald","last_name":"Duncan","email":"rduncan9@studiopress.com","gender":"Male","ip_address":"43.19.186.135"}];

var femaleCount = _.filter(people, {"gender": "Female"}).length;
var femaleCountResult = "Female Count: " + femaleCount;
console.log(femaleCountResult);
$("#female_count").html("lodash + jquery: " + femaleCountResult);

