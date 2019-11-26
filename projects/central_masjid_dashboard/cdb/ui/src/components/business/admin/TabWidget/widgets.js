export const createWidgets = (baseUrl, companyId) => {
    return [
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
var companyId = "${companyId}";
</script>
<script type="application/javascript" src="${baseUrl}/static/prayer-time-widget/app.min.js"></script>`
            , liveLink: `/static/prayer-time-widget/index.html?companyId=${companyId}`
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