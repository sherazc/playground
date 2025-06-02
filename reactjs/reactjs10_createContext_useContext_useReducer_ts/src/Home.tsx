import { useState } from "react";
import { Component01 } from "./component/Component01";
import { Component02 } from "./component/Component02";
import { Component03 } from "./component/Component03";

export const Home = () => {
  const [page, setPage] = useState<string>("component01");
  return (
    <div style={{textAlign: "center"}}>
      <div>
        <button onClick={() => setPage("component01")}>Component01</button>
        <button onClick={() => setPage("component02")}>Component02</button>
        <button onClick={() => setPage("component03")}>Component03</button>
      </div>
      <hr />
      <div>
        {page === "component01" && <Component01 />}
        {page === "component02" && <Component02 />}
        {page === "component03" && <Component03 />}
      </div>
    </div>
  )
}