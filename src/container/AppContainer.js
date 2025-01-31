// Main entry point: App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "../redux/store";
import GlobalStyles from "../styles/GlobalStyles";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Appointments from "../pages/Appointments";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Sales from "../pages/Sales";
import Shipment from "../pages/Shipment";
import Login from "../components/Login";

const AppContainers = styled.div`
  display: flex;
  background: #f9f9f9;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

function AppContainer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication to true after successful login
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Log out the user
  };

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        {isAuthenticated ? (
          <AppContainers>
            <Sidebar onLogout={handleLogout} />
            <MainContent>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/shipment" element={<Shipment/>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MainContent>
          </AppContainers>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </Provider>
  );
}

export default AppContainer;
