import { Button } from "./components/ui/button";
import React, { Suspense } from "react";

import {
  // BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const Home = React.lazy(() => import("./components/home/index"));
const NotFound = React.lazy(() => import("./components/notfound/404page"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
