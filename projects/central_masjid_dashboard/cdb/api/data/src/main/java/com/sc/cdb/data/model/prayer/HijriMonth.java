package com.sc.cdb.data.model.prayer;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum HijriMonth {
    Muharram("Muharram"),
    Safar("Safar"),
    RabiAlAwwal("Rabi' al-awwal"),
    RabiAlThani("Rabi' al-thani"),
    JumadaAlAwwal("Jumada al-awwal"),
    JumadaAlThani("Jumada al-thani"),
    Rajab("Rajab"),
    Shaban("Sha'ban"),
    Ramadan("Ramadan"),
    Shawwal("Shawwal"),
    DhuAlQidah("Dhu al-Qi'dah"),
    DhuAlHijjah("Dhu al-Hijjah");

    @Getter
    private String displayName;
}
