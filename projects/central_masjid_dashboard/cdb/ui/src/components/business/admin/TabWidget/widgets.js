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
<script type="application/javascript" src="${baseUrl}/static/prayer-time-widget/app.min.js"></script>`
            , liveLink: `/static/prayer-time-widget/index.html?companyId=${company.id}`
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
        }
    ];
};