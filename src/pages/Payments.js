import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";

const PaymentsContainer = styled.div`
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

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction:column;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const PaymentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 16px;
    color: #34495e;
  }
`;

const Status = styled.span`
  font-weight: bold;
  color: ${(props) => (props.status === "Paid" ? "#2ecc71" : "#e74c3c")};
`;

const ModeOfPayment = styled.span`
  font-size: 16px;
  color: #7f8c8d;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: ${(props) => (props.action === "Pay" ? "#2ecc71" : "#3498db")};
  transition: background-color 0.3s ease, transform 0.2s;
  margin-top: 10px;
  width: 200px;

  &:hover {
    background-color: ${(props) =>
      props.action === "Pay" ? "#27ae60" : "#2980b9"};
    transform: scale(1.05);
  }
`;

const DownloadButton = styled(Button)`
  background-color: #3498db;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

function Payments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      customer: "John Doe",
      amount: "₹100000",
      status: "Paid",
      mode: "Cash",
    },
    {
      id: 2,
      customer: "Jane Smith",
      amount: "₹20000",
      status: "Pending",
      mode: "UPI",
    },
    {
      id: 3,
      customer: "Michael Brown",
      amount: "₹50000",
      status: "Pending",
      mode: "PayPal",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Simulating data fetching
  useEffect(() => {
    // Fetch payment data from an API or mock backend
  }, []);

  const togglePaymentStatus = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id
          ? { ...payment, status: payment.status === "Paid" ? "Pending" : "Paid" }
          : payment
      )
    );
  };

  const markAsCompleted = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status: "Completed" } : payment
      )
    );
  };

  const handleDownloadInvoice = (id) => {
    const payment = payments.find((payment) => payment.id === id);
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Tax Invoice for Order ID: ${payment.id}`, 14, 22);

    // Customer Details
    doc.setFontSize(12);
    doc.text(`Customer: ${payment.customer}`, 14, 30);
    doc.text(`Amount: ${payment.amount}`, 14, 38);
    doc.text(`Mode of Payment: ${payment.mode}`, 14, 46);
    doc.text(`Status: ${payment.status}`, 14, 54);

    // Save the PDF
    doc.save(`Invoice_Order_${id}.pdf`);
  };

  const handleDownloadItems = (id) => {
    const payment = payments.find((payment) => payment.id === id);
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Items List for Order ID: ${payment.id}`, 14, 22);

    // Items List (Dummy content for demonstration)
    doc.text("Ordered Items:", 14, 30);
    doc.text("Product A (Qty: 2) - ₹50", 14, 38);
    doc.text("Product B (Qty: 1) - ₹30", 14, 46);

    // Save the PDF
    doc.save(`Items_Order_${id}.pdf`);
  };

  const sendInvoiceToCustomer = (id) => {
    alert(`Invoice for Order ID ${id} has been sent to the customer.`);
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PaymentsContainer>
      <Header>Payments Management</Header>

      {filteredPayments.map((payment) => (
        <PaymentRow key={payment.id}>
          <PaymentInfo>
            <span>Customer: {payment.customer}</span>
            <span>Amount: {payment.amount}</span>
            <span>
              Mode of Payment: <ModeOfPayment>{payment.mode}</ModeOfPayment>
            </span>
            <span>
              Status:{" "}
              <Status status={payment.status}>{payment.status}</Status>
            </span>
          </PaymentInfo>
          <div style={{display:"flex",    width: "100%",justifyContent:"space-around"
}}>
            <Button style={{width:"18%"}}
              action={payment.status === "Paid" ? "Undo" : "Pay"}
              onClick={() => togglePaymentStatus(payment.id)}
            >
              {payment.status === "Paid" ? "Mark as Pending" : "Mark as Paid"}
            </Button >
            <DownloadButton style={{width:"18%"}} onClick={() => handleDownloadInvoice(payment.id)}>
              Download Tax Invoice
            </DownloadButton>
            <DownloadButton  style={{width:"18%"}} onClick={() => handleDownloadItems(payment.id)}>
              Download Items List PDF
            </DownloadButton>
            <Button  style={{width:"18%"}} action="Completed" onClick={() => markAsCompleted(payment.id)}>
              Mark as Completed
            </Button>
            <Button  style={{width:"18%"}} action="Send" onClick={() => sendInvoiceToCustomer(payment.id)}>
              Send Invoice to Customer
            </Button>
          </div>
        </PaymentRow>
      ))}
    </PaymentsContainer>
  );
}

export default Payments;
