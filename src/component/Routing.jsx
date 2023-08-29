import React from "react";
import { Routes, Route } from "react-router-dom";
import Wizard from "./Wizard";
import Table from "./Table";
import Query from "./Query";
import Forms from "./Form";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import NavBar from "../Pages/Navbar";
import Privateroute from "../ProtectedRoutes/privateroute";
import Publicroutes from "../ProtectedRoutes/Publicroutes";
import Login from "../Pages/Login";
import ClassComponent from "./Class";
import FunctionalComponent from "./Fuctional";
import AuseState from "../Hooks/AuseState";
import BuseEffect from "../Hooks/BuseEffect";
import CuseContext from "../Hooks/CuseContext";
import DuseRef from "../Hooks/DuseRef";
import EuseMemo from "../Hooks/EuseMemo";
import FuseReducer from "../Hooks/FuseReducer";
import GuseCallback from "../Hooks/GuseCallback";
import Counter from "../Redux/displayRedux/Counter";


function Routing() {
  return (
    <div>
      <NavBar />
      
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<Publicroutes />}>
          <Route  path="/login" element={<Login />} />
         
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<Privateroute />}>
          <Route path="/"            element={<Home />}/>
          {/* LifeCycle */}
          <Route path="/class"       element={<ClassComponent />} />
          <Route path="/functional"  element={<FunctionalComponent />} />
          {/* Hooks */}
          <Route path="/useState"    element={<AuseState/>} />
          <Route path="/useEffect"   element={<BuseEffect />} />
          <Route path="/useContext"  element={<CuseContext />} />
          <Route path="/useRef"      element={<DuseRef />} />
          <Route path="/useMemo"     element={<EuseMemo />} />
          <Route path="/useReducer"  element={<FuseReducer />} />
          <Route path="/useCallback" element={<GuseCallback />} />
          {/* React-FinalForm and React-Select */}
          <Route path="/form"        element={<Forms />} />
          <Route path="/wizard"      element={<Wizard />} />
          {/* TanStack */}
          <Route path="/table"       element={<Table />} />
          <Route path="/query"       element={<Query />} />
          {/* Redux */}
          <Route path="/redux"       element={<Counter />} />
        </Route>
        <Route path="*"              element={<Error />}  />
      </Routes>
    </div>
  );
}

export default Routing;

