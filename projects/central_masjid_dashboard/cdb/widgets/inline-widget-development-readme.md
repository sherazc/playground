# Inline Widget Development
This document shows how to develop inline widgets. 
E.g. **prayer-time-widget, rod-widget and jummah-schedule-widget**

## Step 1 - Start API
Under `central_masjid_dashboard/cdb/api` folder run this command to start 
CDB API application.

`java -jar webservices/target/cdb.jar`

## Step 2 - Start UI
Under `central_masjid_dashboard/cdb/ui` folder run this command to start
CDB UI application.

`npm run start`

## Step 3 - Start inline-widget build-watch
E.g. To do development on **prayer-time-widget**.  
Under `central_masjid_dashboard/cdb/widgets/prayer-time-widget` 
folder run this command to start build-watch.

`npm run dev`

## Step 4 - Make code changes
The Above command will use the intake file 
`central_masjid_dashboard/cdb/widgets/prayer-time-widget/src/app.js`
and output it to
`central_masjid_dashboard/cdb/ui/public/static/prayer-time-widget/app.min.js`

While this build-watch process is running, any change to the intake 
file `app.js` will produce `app.min.js`. 


## Step 5 - Tryout code changes
There are two files under 
`central_masjid_dashboard/cdb/ui/public/static/prayer-time-widget/`
- `index-dev.html` - Used to test changes while developing.
- `index.html` - Used in the deployed version.

Use this local development URL to try out changes.
http://localhost:3000/static/prayer-time-widget/index-dev.html?companyId=601178cedc813a7769981d34


## Step 6 - Build project & test the publishable changes
While development if there are any changes made in `index-dev.html` should be duplicated in `index.html`.

> Typically, the only difference between `index-dev.html` and `index.html` should be the base URL.

Shutdown API, UI and inline widget build-watch processes

Under `central_masjid_dashboard/cdb` folder run this command to start
CDB application.

`clean-build-run.sh`

Try final changes by accessing this URL
http://localhost:8085/static/prayer-time-widget/index.html?companyId=601178cedc813a7769981d34