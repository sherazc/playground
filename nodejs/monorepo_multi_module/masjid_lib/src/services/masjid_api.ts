import {Masjid} from "../types/masjid_types";

export const add = (a: number, b: number): number => {
    return a + b;
}

export const getAllMasjid = ():Array<Masjid> => {
    return [
        {name: "Masjid01", address: "Address01"},
    ]
}