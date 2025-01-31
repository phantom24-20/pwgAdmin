 // Customers management page

//  import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCustomers } from "../redux/slices/customersSlice";
// import styled from "styled-components";

// const CustomersContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const CustomerCard = styled.div`
//   padding: 15px;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// function Customers() {
//   const dispatch = useDispatch();
//   const { customers, loading } = useSelector((state) => state.customers);

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <CustomersContainer>
//       {customers.map((customer) => (
//         <CustomerCard key={customer.id}>
//           <h4>{customer.name}</h4>
//           <p>Email: {customer.email}</p>
//           <p>Phone: {customer.phone}</p>
//           <p>Total Orders: {customer.totalOrders}</p>
//         </CustomerCard>
//       ))}
//     </CustomersContainer>
//   );
// }

// export default Customers;

import React, { useState } from "react";
import styled from "styled-components";

const CustomersContainer = styled.div`
  padding: 20px;
  background: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.h2`
  font-size: 32px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const CustomerCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const CustomerInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 20px;
    color: #34495e;
    margin: 0;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    color: #7f8c8d;
    margin: 5px 0;
  }
`;

const CustomerActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#3498db")};
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c0392b" : "#2980b9")};
    transform: scale(1.05);
  }
`;

const AddCustomerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 24px;
    color: #34495e;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  background-color: #2ecc71;

  &:hover {
    background-color: #27ae60;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
  font-weight: bold;
  margin-top: 50px;
`;

function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
    { id: 2, name: "Sarah Connor", email: "sarah@example.com", phone: "0987654321" },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      alert("Please fill in all fields.");
      return;
    }
    const id = customers.length + 1;
    setCustomers([...customers, { id, ...newCustomer }]);
    setNewCustomer({ name: "", email: "", phone: "" });
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <CustomersContainer>
      <Header>Customer Management</Header>
      <AddCustomerForm onSubmit={addCustomer}>
        <h4>Add New Customer</h4>
        <Input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleInputChange}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={newCustomer.phone}
          onChange={handleInputChange}
        />
        <SubmitButton type="submit">Add Customer</SubmitButton>
      </AddCustomerForm>
      {customers.length > 0 ? (
        customers.map((customer) => (
          <CustomerCard key={customer.id}>
            <CustomerInfo>
              <h4>{customer.name}</h4>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </CustomerInfo>
            <CustomerActions>
              <Button danger onClick={() => deleteCustomer(customer.id)}>
                Delete
              </Button>
            </CustomerActions>
          </CustomerCard>
        ))
      ) : (
        <EmptyState>No customers available.</EmptyState>
      )}
    </CustomersContainer>
  );
}

export default Customers;
