import {
    MdDate,
    Company,
    CompanyDataVersion,
    CompanyListData,
    CompanyListVersion,
    CustomConfiguration,
    ExpirableVersion,
    PrayersDay,
    Tracker
} from "mdb-core-js";

const companyId = "100";

const mockCreateCompany = (): Company => ({
    "id": companyId,
    "name": "Hamzah Islamic Center",
    "url": "hic",
    "website": "https://www.masjidhamzah.com/",
    "address": {
        "street": "665 Tidwell Rd",
        "city": "Alpharetta",
        "state": "GA",
        "zip": "30004",
        "longitude": null,
        "latitude": null
    },
    "active": true
});


const mockCreatePrayer = (): PrayersDay => ({
    "date": new MdDate("2016-02-29T00:00:00.000Z"),
    "hijriString": "",
    "fajr": "06:29",
    "fajrIqama": "06:45",
    "dhuhr": "12:40",
    "dhuhrIqama": "14:00",
    "asr": "15:20",
    "asrIqama": "16:00",
    "maghrib": "17:38",
    "maghribIqama": "5 Mins",
    "isha": "18:52",
    "ishaIqama": "19:30",
    "sunrise": "07:42",
    "fajrChange": "06:30",
    "fajrChangeDate": new MdDate("2020-04-15T00:00:00.000Z"),
    "dhuhrChange": null,
    "dhuhrChangeDate": null,
    "asrChange": "16:30",
    "asrChangeDate": new MdDate("2020-05-01T00:00:00.000Z"),
    "maghribChange": null,
    "maghribChangeDate": null,
    "ishaChange": "19:45",
    "ishaChangeDate": new MdDate("2020-03-15T00:00:00.000Z")
});


const mockCreateConfigurations = (): CustomConfiguration[] => ([{
    "name": "jumah_prayer",
    "value": "Only One Juma' 2:00pm"
}]);


const mockCreateCompanyDataVersion= (): CompanyDataVersion => ({
    "id": "200",
    "companyId": companyId,
    "version": 500
});


const mockCreateCompanyListVersion= ():  CompanyListVersion => ({
    "id": "5f70a08f4f16bc7f7632ee46",
    "version": 42
});


const mockCreateExpirableVersion = (): ExpirableVersion => ({
    expirationDate: new MdDate(new Date(2020, 2, 2)),
    version: 300
});

const mockCreateTracker = (): Tracker => ({
    previousMonth: 1,
    previousDate: 1,
    updateInterval: {} as NodeJS.Timeout,
    expirableVersion: mockCreateExpirableVersion()
});


const mockCreateCompanyListData = (): CompanyListData => ({
    companies: [mockCreateCompany()],
    tracker: mockCreateTracker()
});

export {
    mockCreatePrayer,
    mockCreateConfigurations,
    mockCreateCompany,
    mockCreateCompanyDataVersion,
    mockCreateCompanyListVersion,
    mockCreateTracker,
    mockCreateCompanyListData,
    mockCreateExpirableVersion
}