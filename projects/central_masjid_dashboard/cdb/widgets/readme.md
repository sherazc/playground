# Widget
On the client side widget need this code to run.
````
<div id="calendarApp"></div>
<script>
    var calendarServerUrl = "http://localhost:3000";
    var calendarAppDivId = "calendarApp";
    var companyUrl = "hic"
</script>
<script type="application/javascript" src="http://localhost:3000/static/frame-widget/app.min.js"></script>
````
1. It needs a div tag where widget will be built.
1. Some variables to configure base URL, div id where  and if needed
unique company identifies.
1. `app.min.js` script that will build HTML and put it in div

# Widget code
Using `frame-widget` to explain the code structure.

- All widgets code exists under `cdb/widgets/frame-widget` folder.
- To create more widgets, use `cdb/widgets/frame-widget` as reference 
because it uses typescript, and scss. Also use it to convert 
other widgets to typescript.
- webpack builds `app.min.js` under `cdb/ui/public/static/frame-widget`.
This file will be served inside UI (ReactJS app). 
- HTML files under `cdb/ui/public/static/frame-widget` are only there 
for admin users to try out (demo) the widget.
- `cdb/ui/src/components/business/admin/TabWidget/widgets.js` lists
all the widgets.

# Widget development

> [!NOTE]
> Unlike other widgets `cdb/widgets/frame-widget` supports typescript and jest.
> In future use this project as reference to create new widgets.
>


## Step 1 - Start cdb/api
Start cdb/api application in IntelliJ. This will start springboot project on
port __8085__.

Because of spring boot dev tool, any changes to files in the running
local server will be deployed.


## Step 2 - Start cdb/ui 
Start UI under cdb/ui. This will start reactjs project on port __3000__

`$ npm run start`

## Step 3 - Start widget
Start the widget project.

e.g. 
To do development on __calendar-widget__ then under 
`cdb/widgets/frame-widget` folder give this command;

`$ npm run dev`

This command will start webpack watch on the project's
javascript files. Webpack will compile javascript files 
into `cdb/ui/public/static/frame-widget/app.min.js` 

## Step 4 - Modify sourcecode
Widgets sourcecode is combination of typescript/javascript and html files. 
An example to modify frame-widget's HTML, modify 
`cdb/ui/public/static/frame-widget/index-dev.html`. And to modify frame-widget's 
typescript, modify `cdb/widgets/frame-widget/src/app.ts`

## Step 5 - Verifying as modifying
While modifying keep all three application running, `cdb/api/webservice`, 
`cdb/ui`, and `cdb/widgets/frame-widget`. On port `8085` backend apis are 
running and on port `3000`.

Access this URL to view changes:

http://localhost:3000/static/frame-widget/index-dev.html


# Widget Building
TODO: finish it.


# Widget Deployment
TODO: finish it.