export const createWidgets = (baseUrl, company) => {
    return [
        {
            name: "Dashboard",
            description: `
Dashboard widget shows azan and iqamah times, expenses summary, and daily reminders. 
You can use it to show masjid dashboard on big screen display by opening the web-page on which you placed its script.  
You can also distribute its link among your community members.`,
            image: "/images/widget/sample_dashboard_tv_display.png",
            imageDescription: "This is sample output.",
            script: `<div id="dashboardApp"></div>
<script>
var dashboardServerUrl = "${baseUrl}";
var dashboardAppDivId = "dashboardApp";
var companyUrl = "${company.url}";
</script>
<script type="application/javascript" src="${baseUrl}/static/dashboard-widget/app.min.js"></script>`
            , liveLink: `/static/dashboard-widget/index.html?companyUrl=${company.url}`
        },
        {
            name: "Prayer Time Widget",
            description: `
Use this widget to show daily Azan, Iqama and next Iqama time change.`,
            image: "/images/widget/sample_pt.png",
            imageDescription: "This is sample output.",
            script: `<div id="prayerTimeApp"></div>
<script>
var prayerTimeServerUrl = "${baseUrl}";
var prayerTimeAppDivId = "prayerTimeApp";
var companyId = "${company.id}";
</script>
<script type="application/javascript" src="${baseUrl}/static/prayer-time-widget/app.min.js"></script>
<style>
    .ptContainer {
        /*width: 100%*/
    }
    .ptHeader {
        background-color: #3b90cf;
        font-size: x-large;
        padding: 20px;
    }
    .ptTableContainer {}
    .ptTable {}
</style>`
            , liveLink: `/static/prayer-time-widget/index.html?companyId=${company.id}`
        },
        {
            name: "Calendar",
            description: `
Yearly and monthly calendar.`,
            image: "/images/widget/sample_calendar.png",
            imageDescription: "This is sample output.",
            script: `<div id="calendarApp"></div>
<script>
var calendarServerUrl = "${baseUrl}";
var calendarAppDivId = "calendarApp";
var companyUrl = "${company.url}";
</script>
<script type="application/javascript" src="${baseUrl}/static/calendar-widget/app.min.js"></script>`
            , liveLink: `/static/calendar-widget/index.html?companyUrl=${company.url}`
        },
        {
            name: "Jummah Schedule",
            description: `Shows up coming Jummah Khateeb schedule.`,
            image: "/images/widget/sample_jummah_schedule.png",
            imageDescription: "Above Image is sample output.",
            script: `<div id="jummahScheduleApp"></div>
<script>
var jummahScheduleServerUrl = "${baseUrl}";
var jummahScheduleAppDivId = "jummahScheduleApp";
var companyId = "${company.id}";
</script>
<script type="application/javascript" src="${baseUrl}/static/jummah-schedule-widget/app.min.js"></script>
<style>
    .jsContainer {
        /*width: 100%*/
    }
    .jsHeader {
        background-color: #3b90cf;
        font-size: x-large;
        padding: 20px;
    }
    .jsTableContainer {}
    .jsTable {}
</style>`
            , liveLink: `/static/jummah-schedule-widget/index.html?companyId=${company.id}`
        },
        {
            name: "Reminder Of The Day",
            description: `Reminder Of The Day widget, will pick new Ayas every day.`,
            image: "/images/widget/sample_rod.png",
            imageDescription: "Above Image is sample output.",
            script: `<div id="rodApp"></div>
<script>
var rodServerUrl = "${baseUrl}";
var rodAppDivId = "rodApp";
</script>
<script type="application/javascript" src="${baseUrl}/static/rod-widget/app.min.js"></script>`
            , liveLink: "/static/rod-widget/index.html"
        },
        {
            name: "Expenses",
            description: `Show as many expense sheet as you want.`,
            image: "/images/widget/expenses_demo.png",
            imageDescription: "Above Image is sample output.",
            script: `<script>
var appNamePrefix = "frameWidget01";
var frameWidget01ServerUrl = "${baseUrl}";
var frameWidget01AppUrl = "expense/${company.url}";
</script>
<script type="application/javascript" src="${baseUrl}/static/frame-widget/app.min.js"></script>
`
            , liveLink: `/static/frame-widget/index.html?url=expense/${company.url}`
        }
    ];
};
