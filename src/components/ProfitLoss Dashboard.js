import React, { useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DatePicker from "react-datepicker"; // Correct import
import "react-datepicker/dist/react-datepicker.css"; // Make sure to include the CSS for styling the DatePicker

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  height: 100vh;
  font-family: Arial, sans-serif;`
;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 500px;`
;

const Title = styled.h1`
  color: #343a40;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;`
;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;`
;

const Stats = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;`
;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f3f5;
  padding: 10px 20px;
  border-radius: 8px;
  width: 30%;`
;

const StatLabel = styled.span`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 5px;`
;

const StatValue = styled.span`
  color: ${(props) => (props.isProfit ? "#28a745" : "#dc3545")};
  font-weight: bold;
  font-size: 16px;`
;

const Footer = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #6c757d;`
;

const COLORS = ["#28a745", "#dc3545", "#ffc107", "#007bff"];

const data = [
  { name: "Daily Sales", value: 400 },
  { name: "Monthly Sales", value: 2000 },
  { name: "Yearly Sales", value: 24000 },
  { name: "Profit", value: 15000 },
  { name: "Loss", value: 5000 },
];

const ProfitLossDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profitOrLoss, setProfitOrLoss] = useState(null);
  const [percentage, setPercentage] = useState({ profitPercentage: null, lossPercentage: null });
  const [profit, setProfit] = useState(data[3].value); // Initial profit value
  const [loss, setLoss] = useState(data[4].value); // Initial loss value

  // Calculate totals for display
  const totalSales = data[0].value + data[1].value + data[2].value;

  // Function to format number as Rupees
 // Function to format number as Rupees
const formatCurrency = (amount) => {
    return `\u20B9${amount.toLocaleString()}`; // Using Unicode for the Rupee symbol
  };
  

  // Calculate percentage of profit and loss
  const calculatePercentage = (profit, loss) => {
    const profitPercentage = (profit / totalSales) * 100 || 0; // Ensure it's a valid number
    const lossPercentage = (loss / totalSales) * 100 || 0; // Ensure it's a valid number
    return { profitPercentage, lossPercentage };
  };

  // Handle date change and calculate the profit or loss percentage for that date
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Simulate varying profit and loss values for each day
    const simulatedProfit = Math.random() * (20000 - 10000) + 10000; // Random profit between 10k and 20k
    const simulatedLoss = Math.random() * (10000 - 5000) + 5000; // Random loss between 5k and 10k

    setProfit(simulatedProfit);
    setLoss(simulatedLoss);

    const { profitPercentage, lossPercentage } = calculatePercentage(simulatedProfit, simulatedLoss);

    setProfitOrLoss(simulatedProfit > simulatedLoss ? "Profit" : "Loss");
    setPercentage({ profitPercentage, lossPercentage });
  };

  return (
    <Container>
      <Card>
        <Title>Profit and Loss Dashboard</Title>

        {/* Date Picker */}
        <div>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>

        <ChartWrapper>
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</ChartWrapper>
        {/* Profit/Loss Stats */}
        <Stats>
          <Stat>
            <StatLabel>Total Sales</StatLabel>
            <StatValue isProfit>{formatCurrency(totalSales)}</StatValue>
          </Stat>
          <Stat>
            <StatLabel>Profit</StatLabel>
            <StatValue isProfit>{formatCurrency(profit)}</StatValue>
          </Stat>
          <Stat>
            <StatLabel>Loss</StatLabel>
            <StatValue>{formatCurrency(loss)}</StatValue>
          </Stat>
        </Stats>

        {/* Profit/Loss on selected date */}
        {profitOrLoss && (
  <div>
    <h3>On {selectedDate.toLocaleDateString()}:</h3>
    <h4
      style={{
        color: profitOrLoss === "Profit" ? "#28a745" : "#dc3545",
      }}
    >
      {profitOrLoss}
    </h4>
    {percentage && (
      <div>
        <p
          style={{
            color: "#28a745",
          }}
        >
          Profit Percentage: {percentage.profitPercentage.toFixed(2)}%
        </p>
        <p
          style={{
            color: "#dc3545",
          }}
        >
          Loss Percentage: {percentage.lossPercentage.toFixed(2)}%
        </p>
      </div>
    )}
  </div>
)}

      </Card>
      <Footer>Data reflects daily, monthly, and yearly sales.</Footer>
    </Container>
  );
};

export default ProfitLossDashboard;