
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
into `cdb/ui/public/static/frame-widget` 

## Step 4 - Modify sourcecode
Widgets sourcecode is combination of typescript/javascript and html files. 
To modify 

give examples

# Widget Building

# Widget Deployment
