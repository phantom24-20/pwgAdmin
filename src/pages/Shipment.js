import React, { useState } from "react";
import styled from "styled-components";

const ShipmentContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;

  h2 {
    font-size: 24px;
    color: #101232;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #101232;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  }

  .status-details {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;

    h3 {
      margin-bottom: 15px;
      font-size: 20px;
      color: #101232;
    }

    p {
      margin: 5px 0;
      color: #495057;
      font-size: 16px;
    }

    .highlight {
      font-weight: bold;
      color: #007bff;
    }

    .delayed {
      color: red;
      font-weight: bold;
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  input {
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: #101232;
      box-shadow: 0 0 5px rgba(16, 18, 50, 0.5);
    }
  }
`;

const Shipment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [delays, setDelays] = useState({});

  const shipments = [
    {
      id: 1,
      order: "ORD001",
      customer: "John Doe",
      number: "987654321",
      status: "Delivered",
      details: {
        ordered: "2025-01-20 10:00 AM",
        shipped: "2025-01-21 02:00 PM",
        outForDelivery: "2025-01-22 08:00 AM",
        arriving: "2025-01-22 12:00 PM",
        delivered: "2025-01-22 03:00 PM",
      },
    },
    {
      id: 2,
      order: "ORD002",
      customer: "Jane Smith",
      number: "987654321",
      status: "In Transit",
      details: {
        ordered: "2025-01-18 09:30 AM",
        shipped: "2025-01-19 11:30 AM",
        outForDelivery: "2025-01-20 07:30 AM",
        arriving: "2025-01-20 01:30 PM",
        delivered: null,
      },
    },
    {
      id: 3,
      order: "ORD003",
      customer: "Paul Wilson",
      number: "9886788888",
      status: "Pending",
      details: {
        ordered: "2025-01-22 03:00 PM",
        shipped: null,
        outForDelivery: null,
        arriving: null,
        delivered: null,
      },
    },
  ];

  const handleTrack = (id) => {
    const shipment = shipments.find((s) => s.id === id);
    setSelectedShipment(shipment);
  };

  const handleDelayChange = (id, delay) => {
    setDelays((prev) => ({ ...prev, [id]: delay }));
  };

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.order.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.number.includes(searchQuery)
  );

  const renderStatusDetails = () => {
    if (!selectedShipment) return null;

    const { details, id } = selectedShipment;
    const delay = delays[id] || 0;

    const delayedMessage =
      delay > 0 ? `This shipment is delayed by ${delay} hour(s).` : "";

    return (
      <div className="status-details">
        <h3>Order Status for Tracking ID: {selectedShipment.order}</h3>
        <p>
          <strong>Ordered:</strong>{" "}
          <span className="highlight">{details.ordered}</span>
        </p>
        <p>
          <strong>Shipped:</strong>{" "}
          {details.shipped ? (
            <span className="highlight">{details.shipped}</span>
          ) : (
            "Not yet shipped"
          )}
        </p>
        <p>
          <strong>Out for Delivery:</strong>{" "}
          {details.outForDelivery ? (
            <span className="highlight">{details.outForDelivery}</span>
          ) : (
            "Not yet out for delivery"
          )}
        </p>
        <p>
          <strong>Arriving:</strong>{" "}
          {details.arriving ? (
            <span className="highlight">{details.arriving}</span>
          ) : (
            "Not yet arriving"
          )}
        </p>
        <p>
          <strong>Delivered:</strong>{" "}
          {details.delivered ? (
            <span className="highlight">{details.delivered}</span>
          ) : (
            "Not yet delivered"
          )}
        </p>
        {delayedMessage && <p className="delayed">{delayedMessage}</p>}
      </div>
    );
  };

  return (
    <ShipmentContainer>
      <SearchBarContainer>
        <input
          type="text"
          placeholder="Search by Order ID, Customer, or Phone Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBarContainer>
      <h2>Shipment Details</h2>
      <table>
        <thead>
          <tr>
            <th>Shipment NO</th>
            <th>Tracking ID</th>
            <th>Customer</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Track</th>
            <th>Delay (Hours)</th>
          </tr>
        </thead>
        <tbody>
          {filteredShipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.order}</td>
              <td>{shipment.customer}</td>
              <td>{shipment.number}</td>
              <td>{shipment.status}</td>
              <td>
                <button onClick={() => handleTrack(shipment.id)}>
                  Track Here
                </button>
              </td>
              <td>
                <input
                  type="number"
                  value={delays[shipment.id] || 0}
                  onChange={(e) =>
                    handleDelayChange(shipment.id, Number(e.target.value))
                  }
                  style={{
                    width: "60px",
                    padding: "5px",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderStatusDetails()}
    </ShipmentContainer>
  );
};

export default Shipment;
