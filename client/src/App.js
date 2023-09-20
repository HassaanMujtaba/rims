import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import queryString from "query-string";
import { Header } from "./components";
import {
  Dashboard,
  ErrorPage,
  Inventory,
  Login,
  Orders,
  Portfolio,
  ShowAll,
} from "./pages";

function App() {
  const [login, setLogin] = useState(null);
  const [username, setUsername] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const pages = ["dashboard", "orders", "inventory", "show-all", "portfolio"];
  const [clients, setClients] = useState([]);
  const updateClients = async () => {
    const res = await fetch("http://localhost:5000/clients").then((res) =>
      res.json()
    );
    setClients(res?.data);
  };

  useEffect(() => {
    updateClients();
  }, []);

  const [showProductModal, setShowProductModal] = useState(false);
  const [vendorsList, setVendorsList] = useState([]);
  const [addUser, setAddUser] = useState(false);

  const updateVendorList = async () => {
    const res = await fetch("http://localhost:5000/vendors").then((res) =>
      res.json()
    );
    setVendorsList(res?.data);
  };
  useEffect(() => {
    if (localStorage.getItem("@token")) {
      setLogin(localStorage.getItem("@token"));
      setUsername(localStorage.getItem("@username"));
    }
  }, []);
  
  useEffect(() => {
    const { view } = queryString.parse(window.location.search);
    updateVendorList();
    if (view) setCurrentView(view);
    // eslint-disable-next-line
  }, [window.location]);

  return (
    <div className="App">
      {!login ? (
        <Routes>
          <Route
            exact
            path="/"
            element={<Login setLogin={setLogin} setUsername={setUsername} />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      ) : (
        <React.Fragment>
          <Header
            setView={setCurrentView}
            view={currentView}
            setLogin={setLogin}
            username={username}
            setAddUser={setAddUser}
          />
          {!pages.includes(currentView) && <ErrorPage code={"404"} />}
          {!currentView && <ErrorPage code={"500"} />}
          {currentView === "dashboard" && (
            <Dashboard
              showProductModal={showProductModal}
              setShowProductModal={setShowProductModal}
              setAddUser={setAddUser}
              addUser={addUser}
              clients={clients}
              vendorsList={vendorsList}
              setVendorsList={setVendorsList}
              updateVendorList={updateVendorList}
            />
          )}
          {currentView === "orders" && <Orders setView={setCurrentView} />}
          {currentView === "inventory" && (
            <Inventory setShowProductModal={setShowProductModal} vendorsList={vendorsList} updateVendorList={updateVendorList} />
          )}
          {currentView === "show-all" && <ShowAll />}
          {currentView === "portfolio" && <Portfolio />}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
