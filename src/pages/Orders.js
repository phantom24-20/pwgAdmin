import React, { useState } from "react";
import styled from "styled-components";

const OrdersContainer = styled.div`
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
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    font-size: 20px;
    font-weight: bold;
    color: #34495e;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: #7f8c8d;
    margin: 0;
  }
`;

const OrderActions = styled.div`
  display: flex;
  justify-content: flex-end;
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
  background-color: ${(props) =>
    props.danger ? "#e74c3c" : props.confirm ? "#2ecc71" : "#3498db"};
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.danger ? "#c0392b" : props.confirm ? "#27ae60" : "#2980b9"};
    transform: scale(1.05);
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

const AddOrderForm = styled.form`
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

const SearchBar = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  width: 100%;
  margin-bottom: 20px;
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const OrderedItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 14px;
    color: #34495e;
  }
`;

const DelayForm = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TimerInput = styled.input`
  padding: 5px;
  font-size: 14px;
  width: 50px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
  font-weight: bold;
  margin-top: 50px;
`;

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      total: 50.0,
      status: "Pending",
      address: "123 Main St, City",
      phone: "123-456-7890",
      items: [
        { name: "Product A", quantity: 2, brand: "Brand X", mrp: 25.0, delay: null },
        { name: "Product B", quantity: 1, brand: "Brand Y", mrp: 15.0, delay: null },
      ],
    },
    {
      id: 2,
      customer: "Sarah Connor",
      total: 75.5,
      status: "Pending",
      address: "456 Oak Rd, City",
      phone: "987-654-3210",
      items: [
        { name: "Product C", quantity: 1, brand: "Brand Z", mrp: 50.0, delay: null },
        { name: "Product D", quantity: 2, brand: "Brand A", mrp: 12.75, delay: null },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [delayTime, setDelayTime] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm(value);
  };

  const handleDelayChange = (e) => {
    setDelayTime(e.target.value);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    // Logic for adding an order
  };

  const confirmOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
    alert("Order marked as completed.");
  };

  const delayProduct = (id, productIndex, delayTime) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              items: order.items.map((item, index) =>
                index === productIndex ? { ...item, delay: `${delayTime} hours` } : item
              ),
            }
          : order
      )
    );
    alert(`Product "${orders.find(order => order.id === id).items[productIndex].name}" delayed by ${delayTime} hours.`);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)
  );

  // Calculate the total price of the order dynamically
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.mrp, 0);
  };

  return (
    <OrdersContainer>
      <Header>Order Management</Header>

      <SearchBar
        type="text"
        placeholder="Search by customer name or phone"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard key={order.id}>
            <OrderInfo>
              <h4>Order #{order.id}</h4>
              <p>Customer: {order.customer}</p>
              <p>Phone: {order.phone}</p>
              <p>Address: {order.address}</p>
              <p>Total Order Price: ₹{calculateTotal(order.items)}</p>
              <p>
                Status:{" "}
                <span
                  style={{
                    color: order.status === "Pending" ? "#e67e22" : "#27ae60",
                  }}
                >
                  {order.status}
                </span>
              </p>
            </OrderInfo>

            <OrderedItems>
              <h4>Ordered Items:</h4>
              {order.items.map((item, index) => (
                <div key={index}>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Brand: {item.brand}</p>
                  <p>MRP: ₹{item.mrp}</p>
                  <p>Total Price: ₹{item.quantity * item.mrp}</p>
                  {item.delay && <p>Delayed by: {item.delay}</p>}
                  <DelayForm>
                    <label>Delay (hours):</label>
                    <TimerInput
                      type="number"
                      value={delayTime}
                      onChange={handleDelayChange}
                    />
                    <Button onClick={() => delayProduct(order.id, index, delayTime)}>
                      Delay Product
                    </Button>
                  </DelayForm>
                </div>
              ))}
            </OrderedItems>

            <OrderActions>
              <Button confirm onClick={() => confirmOrder(order.id)}>
                Mark as Completed
              </Button>
            </OrderActions>
          </OrderCard>
        ))
      ) : (
        <EmptyState>No orders available or matching your search.</EmptyState>
      )}
    </OrdersContainer>
  );
}

export default Orders;
