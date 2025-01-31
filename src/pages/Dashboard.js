import React, { useState, useEffect  } from "react";
import styled from "styled-components";
import SalesChart from "../components/SalesChart";
import { Bell, User, Search, MessageCircle} from "lucide-react";
import PaymentToggle from "../components/PaymentToggle";

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

// const Header = styled.h1`
//   color: #333;
//   font-size: 28px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

const SubHeader = styled.p`
  color: #555;
  font-size: 16px;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const StatsCard = styled.div`
  background: linear-gradient(135deg, #ffffff, #f0f0f5);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: #444;
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
  }
`;

const SalesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;

  h2 {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  color: #777;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? "#2563eb" : "#f0f0f5")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #2563eb;
    color: white;
  }
`;

const DatePicker = styled.input`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  margin-left: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const NotificationBar = styled.div`
  background: #fff5e1;
  padding: 10px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// const SearchBar = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 15px;
//   margin-bottom: 20px;
// `;

const TopSellingContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height:20rem;
  overflow:overlay;
  // max-width: 600px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #343a40;
  }

  .product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #dee2e6;

    &:last-child {
      border-bottom: none;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
    }

    .details {
      flex: 1;
      margin-left: 15px;
      display: flex;
      flex-direction: column;

      span {
        font-size: 0.9rem;
        color: #495057;
        margin-bottom: 4px;
      }

      .price {
        font-weight: bold;
        color: #212529;
      }
    }

    .stock-indicator {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      color: #ffffff;

      &.in-stock {
        background-color: #198754;
      }

      &.out-of-stock {
        background-color: #dc3545;
      }
    }

    .actions {
      display: flex;
      gap: 10px;

      button {
        padding: 5px 10px;
        font-size: 0.8rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &.edit {
          background-color: #0d6efd;
          color: #ffffff;
        }

        &.delete {
          background-color: #dc3545;
          color: #ffffff;
        }
      }
    }
  }
`;

const CustomerSupportContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;

  .message {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .actions {
      display: flex;
      gap: 10px;

      button {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
      }

      .reply {
        background-color: #2563eb;
        color: white;
      }

      .close {
        background-color: #eb2563;
        color: white;
      }
    }
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #ffffff;
//   border: 1px solid #ced4da;
//   border-radius: 4px;
//   padding: 0.5rem;
//   width: 50%;

//   input {
//     border: none;
//     outline: none;
//     flex: 1;
//     margin-left: 0.5rem;
//   }
// `;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #dc3545;
    color: #fff;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 50%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 200px;
  z-index: 10;

  & > div {
    padding: 0.5rem;
    border-bottom: 1px solid #dee2e6;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f1f3f5;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 8px 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    font-size: 14px;
    flex-grow: 1;
  }

  svg {
    color: #6a11cb;
  }
`;

const CategoriesDropdown = styled.div`
  position: relative;
  margin-left: 15px;
`;

const DropdownButton = styled.button`
  background-color: #6a11cb;
  color: white;
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #2575fc;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  list-style: none;
  margin: 5px 0 0;
  padding: 0;

  li {
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

const DetailsDisplay = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

function Dashboard(onEdit, onDelete) {
  const [filter, setFilter] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(5);
  const [queries, setQueries] = useState([
    { text: "Query 1", resolved: false },
    { text: "Query 2", resolved: false },
  ]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQueries, setShowQueries] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Beauty Products",
    "Sports",
    "Toys",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleReply = (index) => {
    console.log(`Replying to: ${queries[index].text}`);
  };

  const handleResolve = (index) => {
    const updatedQueries = [...queries];
    updatedQueries[index].resolved = true;
    setQueries(updatedQueries);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => prev + 1); // Simulate notifications
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value);
    setSelectedDate("");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const products = [
    {
      id: 1,
      name: "Dog Food - Premium",
      price: "2500",
      sales: "500",
      stock: 20,
      image: "https://via.placeholder.com/50", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Cat Scratching Post",
      price: "350",
      sales: "150",
      stock: 5,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Bird Cage - Medium",
      price: "6000",
      sales: "75",
      stock: 0,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Aquarium Cleaning Kit",
      price: "250",
      sales: "200",
      stock: 12,
      image: "https://via.placeholder.com/50",
    },
  ];
  const supportMessages = [
    { id: 1, message: "Issue with product delivery", status: "open" },
    { id: 2, message: "Request for refund", status: "open" },
  ];

  return (
    <DashboardContainer>
      <Header>Dashboard Overview</Header>
      <SubHeader>Quick insights into your business performance</SubHeader>
      <Container>
        <div style={{ display:"flex"}}>
      <SearchBar>
          <Search size={20} />
          <input type="text" placeholder="Search..." />
        </SearchBar> 

        <CategoriesDropdown>
          <DropdownButton onClick={() => setShowDropdown((prev) => !prev)}>
            Categories
          </DropdownButton>
          {showDropdown && (
            <DropdownList>
              {categories.map((category) => (
                <li key={category} onClick={() => handleCategoryClick(category)}>
                  {category}
                </li>
              ))}
            </DropdownList>
          )}
        </CategoriesDropdown>
        </div>
      <IconContainer>
        {/* Notifications */}
        <IconWrapper onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={24} />
          {notifications > 0 && <span className="badge">{notifications}</span>}
          {showNotifications && (
            <Dropdown>
              <div>New login detected</div>
              <div>System update completed</div>
              <div>5 new user sign-ups</div>
              <div>Mark all as read</div>
            </Dropdown>
          )}
        </IconWrapper>

        {/* Customer Queries */}
        <IconWrapper onClick={() => setShowQueries(!showQueries)}>
          <MessageCircle size={24} />
          {queries.filter((q) => !q.resolved).length > 0 && (
            <span className="badge">
              {queries.filter((q) => !q.resolved).length}
            </span>
          )}
          {showQueries && (
            <Dropdown>
              {queries.map((query, index) => (
                <div key={index}>
                  {query.text} {query.resolved && <span>(Resolved)</span>}
                  {!query.resolved && (
                    <>
                      <button
                        onClick={() => handleReply(index)}
                        style={{
                          marginLeft: "10px",
                          padding: "2px 6px",
                          backgroundColor: "#198754",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleResolve(index)}
                        style={{
                          marginLeft: "10px",
                          padding: "2px 6px",
                          backgroundColor: "#ffc107",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Resolve
                      </button>
                    </>
                  )}
                </div>
              ))}
            </Dropdown>
          )}
        </IconWrapper>

        {/* Profile */}
        <IconWrapper onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <User size={24} />
          {showProfileMenu && (
            <Dropdown>
              <div>Account</div>
              <div>Settings</div>
              <div>Logout</div>
            </Dropdown>
          )}
        </IconWrapper>
      </IconContainer>
    </Container>

      {/* <NotificationBar>New updates in your orders and products!</NotificationBar> */}

      {/* <SearchBar
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={handleSearchChange}
      /> */}

      {/* Filter Section */}
      <PaymentToggle/>
      <FilterContainer>
        <FilterButton active={filter === "daily"} onClick={() => handleFilterChange("daily")}>Daily</FilterButton>
        <FilterButton active={filter === "monthly"} onClick={() => handleFilterChange("monthly")}>Monthly</FilterButton>
        <FilterButton active={filter === "yearly"} onClick={() => handleFilterChange("yearly")}>Yearly</FilterButton>
        <DatePicker
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </FilterContainer>

      {/* Stats Section */}
      <StatsGrid>
        <StatsCard>
          <h3>Total Sales</h3>
          <p>₹37,890.580</p>
        </StatsCard>
        <StatsCard>
          <h3>Total Revenue</h3>
          <p>₹12,890.570</p>
        </StatsCard>
        <StatsCard>
          <h3>Total Profit</h3>
          <p>₹15,190.590</p>
        </StatsCard>
        <StatsCard>
          <h3>Orders</h3>
          <p>120</p>
        </StatsCard>
        <StatsCard>
          <h3>Orders Received</h3>
          <p>200</p>
        </StatsCard>
        <StatsCard>
          <h3>Orders Pending</h3>
          <p>50</p>
        </StatsCard>
        <StatsCard>
          <h3>Orders Completed</h3>
          <p>150</p>
        </StatsCard>
        <StatsCard>
          <h3>Average Reviews</h3>
          <p>4.2/5 (84%)</p>
        </StatsCard>
      </StatsGrid>

      

      {/* Customer Support Section */}
      {/* <CustomerSupportContainer>
        <h2>Customer Support</h2>
        {supportMessages.map((msg) => (
          <div key={msg.id} className="message">
            <span>{msg.message}</span>
            <div className="actions">
              <button className="reply">Reply</button>
              <button className="close">Close</button>
            </div>
          </div>
        ))}
      </CustomerSupportContainer> */}

      {/* Sales Chart Section */}
      <SalesContainer>
        <h2>Sales Overview ({filter} {selectedDate && `- ${selectedDate}`})</h2>
        <SalesChart filter={filter} date={selectedDate} />
      </SalesContainer>

      {/* Top Selling Products */}
      <TopSellingContainer>
      <h2>Top Selling Pets & Supplies</h2>
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <div className="details">
            <span>{product.name}</span>
            <span className="price">₹{product.price}</span>
            {/* <span className={`stock-indicator ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
              {product.stock > 0 ? "In Stock" : "No Stock"}
            </span> */}
          </div>
          <div className="actions">
            {/* <button className="edit" onClick={() => onEdit(product.id)}>
              Edit
            </button>
            <button className="delete" onClick={() => onDelete(product.id)}>
              Delete
            </button> */}
            <span className={`stock-indicator ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
              {product.stock > 0 ? "In Stock" : "No Stock"}
            </span>
          </div>
        </div>
      ))}
    </TopSellingContainer>

      {/* Footer */}
      <Footer>© 2025 eShop. All Rights Reserved.</Footer>
    </DashboardContainer>
  );
}

export default Dashboard;
