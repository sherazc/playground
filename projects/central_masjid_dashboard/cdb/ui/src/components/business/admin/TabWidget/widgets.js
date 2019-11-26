
// TODO convert it to function and pass it companyId and anything else that this script needs.
// TODO These values will be passed from the React Component's Redux Store to this function.
export const widgets = [
    {
        name: "Prayer Time Widget",
        description: `
        Use this widget to show daily Azan and Iqama time on your website. 
        It will also show next iqama time will change`,
        image: "/images/widget/sample_pt.png",
        imageDescription: "Above Image is sample output.",
        script: `<div>Some script1 Fix ID</div>`,
        liveLink: "/static/prayer-time-widget/index.html?companyId=5da2632ef2a2337a5fd916d3"
    },
    {
        name: "Reminder Of The Day",
        description: "This widget will show new aya every month",
        image: "/images/widget/sample_rod.png",
        imageDescription: "Above Image is sample output.",
        script: `<div>Some script2</div>`,
        liveLink: "/static/rod-widget/index.html"
    }
];