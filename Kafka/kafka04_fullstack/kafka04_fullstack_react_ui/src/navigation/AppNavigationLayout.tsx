import React from "react";

import { Outlet } from "react-router";
import { AppNavigation } from "./AppNavigation";

interface Props {}

export const AppNavigationLayout:React.FC<Props> = () => {

  return (
    <div>
      <AppNavigation/>
      <hr/>
      <Outlet/>
    </div>
  );
}
