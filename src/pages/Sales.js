// import React, { useState } from "react";
// import styled from "styled-components";
// import SalesChart from "../components/SalesChart"; // Make sure you have this component
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ProfitLossDashboard from "../components/ProfitLoss Dashboard"; // Make sure this import is correct

// // Styled-components
// const SalesContainer = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
//   background-color: #f9f9f9;
//   min-height: 100vh;
// `;

// const Header = styled.h1`
//   color: #333;
//   font-size: 28px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const StatsSummary = styled.div`
//   display: flex;
//   justify-content: space-between;
//   background: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

//   div {
//     text-align: center;

//     h3 {
//       font-size: 18px;
//       color: #333;
//       margin-bottom: 10px;
//     }

//     p {
//       font-size: 24px;
//       font-weight: bold;
//       color: #2563eb;
//     }
//   }
// `;

// const SalesListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const SaleRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 15px;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//   span {
//     font-size: 16px;
//     color: #555;
//   }
// `;

// const TargetSummary = styled.div`
//   display: flex;
//   justify-content: space-between;
//   background: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const TargetCard = styled.div`
//   text-align: center;
//   padding: 10px;
//   width: 30%;
//   background-color: #f3f4f6;
//   border-radius: 8px;

//   h3 {
//     font-size: 18px;
//     color: #333;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 24px;
//     font-weight: bold;
//     color: #2ecc71;
//   }
// `;

// const ProfitLoss = styled.div`
//   margin-top: 20px;
//   background: white;
//   padding: 15px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//   h4 {
//     font-size: 18px;
//     font-weight: bold;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 16px;
//     color: ${(props) => (props.isProfit ? "#27ae60" : "#e74c3c")};
//     font-weight: bold;
//     padding: 10px;
//     border-radius: 5px;
//     background-color: ${(props) => (props.isProfit ? "#e8f7e6" : "#fbe4e4")};
//   }

//   .percentage {
//     font-size: 14px;
//     font-weight: normal;
//     color: ${(props) => (props.isProfit ? "#2ecc71" : "#e74c3c")};
//   }
// `;

// const DateButtonGroup = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   padding: 10px 15px;
//   background-color: ${(props) => (props.active ? "#2ecc71" : "#3498db")};
//   color: white;
//   font-weight: bold;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => (props.active ? "#27ae60" : "#2980b9")};
//   }
// `;

// function Sales() {
//   const [sales, setSales] = useState([
//     { id: 1, date: "2025-01-10", amount: 100000, items: 3 },
//     { id: 2, date: "2025-01-11", amount: 20000, items: 5 },
//     { id: 3, date: "2025-01-12", amount: 50000, items: 4 },
//     { id: 4, date: "2025-01-13", amount: 75000, items: 6 },
//     { id: 5, date: "2025-01-14", amount: 90000, items: 7 },
//   ]);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [totalTarget, setTotalTarget] = useState(150001);
//   const [targetAchieved, setTargetAchieved] = useState(150000);
//   const [targetRemaining, setTargetRemaining] = useState(totalTarget - targetAchieved);
//   const [viewPeriod, setViewPeriod] = useState("daily");

//   const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
//   const totalItems = sales.reduce((acc, sale) => acc + sale.items, 0);

//   const getTargetForPeriod = () => {
//     let targetAchievedForPeriod = 0;

//     switch (viewPeriod) {
//       case "daily":
//         const selectedSalesDay = sales.filter((sale) => sale.date === selectedDate.toLocaleDateString());
//         targetAchievedForPeriod = selectedSalesDay.reduce((acc, sale) => acc + sale.amount, 0);
//         break;
//       case "monthly":
//         const selectedSalesMonth = sales.filter(
//           (sale) => new Date(sale.date).getMonth() === selectedDate.getMonth() && new Date(sale.date).getFullYear() === selectedDate.getFullYear()
//         );
//         targetAchievedForPeriod = selectedSalesMonth.reduce((acc, sale) => acc + sale.amount, 0);
//         break;
//       case "yearly":
//         const selectedSalesYear = sales.filter(
//           (sale) => new Date(sale.date).getFullYear() === selectedDate.getFullYear()
//         );
//         targetAchievedForPeriod = selectedSalesYear.reduce((acc, sale) => acc + sale.amount, 0);
//         break;
//       default:
//         return 0;
//     }

//     return targetAchievedForPeriod;
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleViewPeriodChange = (period) => {
//     setViewPeriod(period);
//   };

//   const getProfitOrLoss = () => {
//     const targetForPeriod = getTargetForPeriod();
//     return targetForPeriod - totalTarget;
//   };

//   const calculatePercentage = (amount) => {
//     return (Math.abs(amount) / totalTarget) * 100;
//   };

//   const isProfit = getProfitOrLoss() >= 0;
//   const profitPercentage = calculatePercentage(getProfitOrLoss());

//   return (
//     <SalesContainer>
//       <Header>Sales Analytics</Header>

//       {/* Summary Section */}
//       <StatsSummary>
//         <div>
//           <h3>Total Sales</h3>
//           <p>₹{totalSales.toLocaleString()}</p>
//         </div>
//         <div>
//           <h3>Total Items Sold</h3>
//           <p>{totalItems} items</p>
//         </div>
//         <div>
//           <h3>Total Transactions</h3>
//           <p>{sales.length}</p>
//         </div>
//       </StatsSummary>

//       {/* Target Section */}
//       <TargetSummary>
//         <TargetCard>
//           <h3>Total Target</h3>
//           <p>₹{totalTarget.toLocaleString()}</p>
//         </TargetCard>
//         <TargetCard>
//           <h3>Target Achieved</h3>
//           <p>₹{getTargetForPeriod().toLocaleString()}</p>
//         </TargetCard>
//         <TargetCard>
//           <h3>Target Remaining</h3>
//           <p>₹{(totalTarget - getTargetForPeriod()).toLocaleString()}</p>
//         </TargetCard>
//       </TargetSummary>

//       {/* Profit or Loss Section */}
//       <ProfitLoss isProfit={isProfit}>
//         <h4>{isProfit ? "Profit" : "Loss"} for {viewPeriod.charAt(0).toUpperCase() + viewPeriod.slice(1)}</h4>
//         <p>
//           ₹{Math.abs(getProfitOrLoss()).toLocaleString()}{" "}
//           {isProfit ? "(Profit)" : "(Loss)"}
//         </p>
//         <p className="percentage">
//           {isProfit ? "+" : "-"}{profitPercentage.toFixed(2)}% {isProfit ? "Profit" : "Loss"}
//         </p>
//       </ProfitLoss>
//       <ProfitLossDashboard/>

//       {/* View Period Buttons */}
//       <DateButtonGroup>
//         <Button active={viewPeriod === "daily"} onClick={() => handleViewPeriodChange("daily")}>
//           Daily
//         </Button>
//         <Button active={viewPeriod === "monthly"} onClick={() => handleViewPeriodChange("monthly")}>
//           Monthly
//         </Button>
//         <Button active={viewPeriod === "yearly"} onClick={() => handleViewPeriodChange("yearly")}>
//           Yearly
//         </Button>
//       </DateButtonGroup>

//       {/* Sales Chart Section */}
//       <SalesChart />

//       {/* Sales List */}
//       <SalesListContainer>
//         <h2>Recent Sales</h2>
//         {sales.map((sale) => (
//           <SaleRow key={sale.id}>
//             <span>{sale.date}</span>
//             <span>₹{sale.amount.toLocaleString()}</span>
//             <span>{sale.items} items</span>
//           </SaleRow>
//         ))}
//       </SalesListContainer>
//     </SalesContainer>
//   );
// }

// export default Sales;


import React, { useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SalesContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #eef2f7;
  min-height: 100vh;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  color: #333;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    border-color: #0056b3;
  }
`;

const StatsSummary = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 1000px;
  flex-wrap: wrap;
  gap: 15px;

  div {
    text-align: center;
    flex: 1;
    min-width: 150px;
    background: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 18px;
    color: #555;
    margin-bottom: 5px;
  }

  p {
    font-size: 22px;
    font-weight: bold;
    color: #007bff;
  }
`;

const SalesPieChart = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <PieChart width={600} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={160}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

function Sales() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sales, setSales] = useState([
    { id: 1, date: "2025-01-10", amount: 120000, items: 10 },
    { id: 2, date: "2025-01-11", amount: 30000, items: 5 },
    { id: 3, date: "2025-01-12", amount: 70000, items: 8 },
    { id: 4, date: "2025-01-13", amount: 95000, items: 12 },
    { id: 5, date: "2025-01-14", amount: 110000, items: 15 },
  ]);
  
  const totalTarget = 250000;
  const targetAchieved = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const targetRemaining = totalTarget - targetAchieved;
  const totalItemsSold = sales.reduce((acc, sale) => acc + sale.items, 0);
  const totalTransactions = sales.length;
  const profitOrLoss = targetAchieved - totalTarget;
  const profitPercentage = ((profitOrLoss / totalTarget) * 100).toFixed(2);

  const pieData = [
    { name: "Target Achieved", value: targetAchieved },
    { name: "Target Remaining", value: targetRemaining < 0 ? 0 : targetRemaining },
    { name: "Total Items Sold", value: totalItemsSold * 1000 },
    { name: "Total Transactions", value: totalTransactions * 5000 },
    { name: "Profit/Loss", value: Math.abs(profitOrLoss), fill: profitOrLoss >= 0 ? "#27ae60" : "#e74c3c" }
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSales(sales.map(sale => ({ ...sale, amount: Math.floor(sale.amount * (Math.random() * 0.5 + 0.75)) })))
  };

  return (
    <SalesContainer>
      <Header>Sales Analytics</Header>
      <StyledDatePicker selected={selectedDate} onChange={handleDateChange} />
      
      <StatsSummary>
        <div>
          <h3>Total Sales</h3>
          <p>₹{targetAchieved.toLocaleString()}</p>
        </div>
        <div>
          <h3>Total Target</h3>
          <p>₹{totalTarget.toLocaleString()}</p>
        </div>
        <div>
          <h3>Target Remaining</h3>
          <p>₹{targetRemaining.toLocaleString()}</p>
        </div>
        <div>
          <h3>Total Items Sold</h3>
          <p>{totalItemsSold} items</p>
        </div>
        <div>
          <h3>Total Transactions</h3>
          <p>{totalTransactions}</p>
        </div>
        <div>
          <h3>Profit/Loss Percentage</h3>
          <p style={{ color: profitOrLoss >= 0 ? "#27ae60" : "#e74c3c" }}>
            {profitPercentage}% {profitOrLoss >= 0 ? "Profit" : "Loss"}
          </p>
        </div>
      </StatsSummary>
      
      <SalesPieChart data={pieData} />
    </SalesContainer>
  );
}

export default Sales;