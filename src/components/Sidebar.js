import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 15%;
  background-color: #101232;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

const SidebarHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;

  h3 {
    font-size: 20px;
    margin: 0;
    color: #f1c40f; /* Accent color for the title */
  }

  h4 {
    font-size: 16px;
    margin: 5px 0;
    color: #b2bec3;
  }
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SidebarItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2c3e50;
    color: #f1c40f; /* Accent color for hover */
  }

  &.active {
    background-color: #2c3e50;
    color: #f1c40f;
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  text-align: center;
  font-size: 14px;
  color: #95a5a6;
  border-top: 1px solid #2c3e50;
  padding-top: 15px;

  p {
    margin: 5px 0;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <h3>Pet's World Grooming</h3>
        <h4>Admin Panel</h4>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarItem to="/">Dashboard</SidebarItem>
        <SidebarItem to="/products">Products</SidebarItem>
        <SidebarItem to="/appointments">Appointments</SidebarItem>
        <SidebarItem to="/orders">Orders</SidebarItem>
        <SidebarItem to="/customers">Customers</SidebarItem>
        <SidebarItem to="/payments">Payments</SidebarItem>
        <SidebarItem to="/sales">Sales</SidebarItem>
        <SidebarItem to="/shipment">Shipment</SidebarItem> {/* New Category */}
      </SidebarMenu>
      <SidebarFooter>
        <p>© 2025 Pet's World</p>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;


