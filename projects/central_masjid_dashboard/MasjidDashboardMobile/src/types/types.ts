export interface ExpirableVersion {
	expirationDate?: Date;
	version?: number;
}

export interface Prayer {
    date: Date ;
    hijrahDate: string; // HijrahDate
    hijriString: string;
    fajr: string;
    fajrIqama: string;
    dhuhr: string;
    dhuhrIqama: string;
    asr: string;
    asrIqama: string;
    maghrib: string;
    maghribIqama: string;
    isha: string;
    ishaIqama: string;
    sunrise: string;
    fajrChange: string;
    fajrChangeDate: Date;
    dhuhrChange: string;
    dhuhrChangeDate: Date;
    asrChange: string;
    asrChangeDate: Date;
    maghribChange: string;
    maghribChangeDate: Date;
    ishaChange: string;
    ishaChangeDate: Date;
}

export interface Masjid {
    id: string;
    url: string;
    name: string;
    city: string;
    state: string;
}

export interface MasjidListData extends ExpirableVersion {
	masjidList: Array<Masjid>;
}

export interface MasjidData extends ExpirableVersion {
    masjid: Masjid;
    prayer: Prayer;
}

export interface SettingData {
	azanAlert: boolean;
	iqamaAlert: boolean;
	iqamaChangeAlert: boolean;
}
