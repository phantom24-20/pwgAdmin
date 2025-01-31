import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => (props.enabled ? "#d4edda" : "#f8d7da")};
  border: ${(props) => (props.enabled ? "1px solid #c3e6cb" : "1px solid #f5c6cb")};
  border-radius: 8px;
  padding: 15px 20px;
  width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Status = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.enabled ? "#155724" : "#721c24")};
`;

const ToggleButton = styled.button`
  background: ${(props) => (props.enabled ? "#155724" : "#721c24")};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.enabled ? "#19692c" : "#842029")};
  }
`;

const Footer = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: #6c757d;
`;

const PaymentToggle = () => {
  const [isPaymentEnabled, setPaymentEnabled] = useState(false);

  const handleToggle = () => {
    setPaymentEnabled(!isPaymentEnabled);
  };

  return (
    <Container>
      <Title>Admin Payment Option</Title>
      <ToggleContainer enabled={isPaymentEnabled}>
        <Status enabled={isPaymentEnabled}>
          {isPaymentEnabled ? "Enabled" : "Disabled"}
        </Status>
        <ToggleButton enabled={isPaymentEnabled} onClick={handleToggle}>
          {isPaymentEnabled ? "Turn Off" : "Turn On"}
        </ToggleButton>
      </ToggleContainer>
      <Footer>
        {isPaymentEnabled
          ? "Payments are currently enabled."
          : "Payments are currently disabled."}
      </Footer>
    </Container>
  );
};

export default PaymentToggle;