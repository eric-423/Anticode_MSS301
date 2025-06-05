import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../utils/router";

const Router = () => {
  const generateRoutes = (routes) =>
    routes.map((route) => (
      <Route key={route.path || route.name} path={route.path} element={route.page}>
        {route.subRouter && generateRoutes(route.subRouter)}
      </Route>
    ));
  return (
    <Routes>
      {generateRoutes(ROUTER)}
    </Routes>
  );
};

export default Router;
