import {add, getAllMasjid, Masjid} from "masjid_lib";


(() => {
    getAllMasjid().forEach(m => console.log(JSON.stringify(m)));
    const result: number = add(1, 2);
    console.log(result);

    const masjid: Masjid = {name: "Masjid A", address: "Address A"}
    console.log(JSON.stringify(masjid));
})();
