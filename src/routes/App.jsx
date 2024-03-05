import React from "react";
import { Route, Routes } from "react-router-dom";
import AllRoutes from "./Allroutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
// import Validator from "../Validator";

const App = () => {
  return (
    <>
      {/* <Validator /> */}
      <Routes>
        {AllRoutes.map((item) => {
          return (
            <Route
              key={item.name}
              element={item.private ? <PrivateRoutes /> : <PublicRoutes />}
            >
              <Route
                name={item.name}
                exact={true}
                path={item.path}
                element={<item.element/>}
              />
            </Route>
          );
        })}
      </Routes>
    </>
  );
};

export default App;
