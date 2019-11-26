
// TODO convert it to function and pass it companyId and anything else that this script needs.
// TODO These values will be passed from the React Component's Redux Store to this function.
export const widgets = [
    {
        name: "Prayer Time Widget",
        description: `
        Use this widget to show daily Azan and Iqama time on your website. 
        It will also show next iqama time will change`,
        image: "/images/widget/sample_pt.png",
        imageDescription: "This is sample output.",
        script: `<div id="prayerTimeApp"></div>
<script>
var prayerTimeServerUrl = "http://localhost:3000";
var prayerTimeAppDivId = "prayerTimeApp";
var companyId = "5da2632ef2a2337a5fd916d3";
</script>
<script type="application/javascript" src="http://localhost:3000/static/prayer-time-widget/app.min.js"></script>`
        , liveLink: "/static/prayer-time-widget/index.html?companyId=5da2632ef2a2337a5fd916d3"
    },
    {
        name: "Reminder Of The Day",
        description: `Reminder Of The Day widget, will pick new Ayas every day.`,
        image: "/images/widget/sample_rod.png",
        imageDescription: "Above Image is sample output.",
        script: `<div id="rodApp"></div>
<script>
var rodServerUrl = "https://www.masjiddashboard.com";
var rodAppDivId = "rodApp";
</script>
<script type="application/javascript" src="https://www.masjiddashboard.com/static/rod-widget/app.min.js"></script>`
        , liveLink: "/static/rod-widget/index.html"
    }
];