// Product management page
// src/pages/Products.js
// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productsSlice";

// const ProductsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const ProductCard = styled.div`
//   background: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// function Products() {
//   const dispatch = useDispatch();
//   const { products, loading } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <ProductsContainer>
//       <h1>Products</h1>
//       {products.map((product) => (
//         <ProductCard key={product.id}>
//           <h3>{product.name}</h3>
//           <p>Price: ${product.price}</p>
//           <p>Stock: {product.stock}</p>
//         </ProductCard>
//       ))}
//     </ProductsContainer>
//   );
// }

// export default Products;


import React, { useState } from "react";
import styled from "styled-components";

const ProductsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.h2`
  color: #2c3e50;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const AddProductForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    flex-basis: 100%;
    color: #3498db;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  padding: 10px;
  flex: 1;
  min-width: 150px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const SuggestionsBox = styled.div`
  position: relative;
  flex: 1;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 10px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #f2f2f2;
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductInfo = styled.div`
  margin-bottom: 15px;

  h4 {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #555;
    margin: 5px 0;
  }
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Dog Food", category: "Dog", price: 2000, stock: 50, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Cat Litter", category: "Cat", price: 1500, stock: 30, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Bird Cage", category: "Bird", price: 5000, stock: 10, image: "https://via.placeholder.com/150" },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "", image: "" });
  const [categorySuggestions] = useState(["Dog", "Cat", "Bird", "Rabbit", "Hamster", "Fish", "Turtle"]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryClick = (category) => {
    setNewProduct({ ...newProduct, category });
    setShowSuggestions(false);
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock || !newProduct.image) {
      alert("Please fill in all fields.");
      return;
    }
    const id = products.length + 1;
    setProducts([
      ...products,
      { id, ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) },
    ]);
    setNewProduct({ name: "", category: "", price: "", stock: "", image: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductsContainer>
      <Header>Product Management</Header>
      <AddProductForm onSubmit={addProduct}>
        <h3>Add New Product</h3>
        
        <SuggestionsBox>
          <Input
            type="text"
            name="category"
            placeholder="Category Name"
            value={newProduct.category}
            onChange={(e) => {
              handleInputChange(e);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && (
            <SuggestionsList>
              {categorySuggestions.map((category) => (
                <li key={category} onClick={() => handleCategoryClick(category)}>
                  {category}
                </li>
              ))}
            </SuggestionsList>
          )}
        </SuggestionsBox>
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
        />
        <Button type="submit">Add Product</Button>
      </AddProductForm>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.stock}</p>
            </ProductInfo>
            <ProductActions>
              <Button danger onClick={() => deleteProduct(product.id)}>
                Delete
              </Button>
            </ProductActions>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
}

export default Products;
