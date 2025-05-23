import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../utils/router";

const Router = () => {
  const generateRoutes = (routes) => {
    return routes.map((route) => (
      <Route path={route.path}>
        <Route index element={route.page} />
        {route.subRouter && generateRoutes(route.subRouter)}
      </Route>
    ));
  };
  return (
    <Routes>
      {generateRoutes(ROUTER)}
    </Routes>
  );
};

export default Router;
