// Product card for the Products page

import React from "react";
import styled from "styled-components";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Products() {
  const products = [
    { id: 1, name: "Dog Food", stock: 50 },
    { id: 2, name: "Cat Toy", stock: 20 },
  ];

  return (
    <ProductsContainer>
      {products.map((product) => (
        <ProductRow key={product.id}>
          <span>{product.name}</span>
          <span>Stock: {product.stock}</span>
          <button>Update Stock</button>
        </ProductRow>
      ))}
    </ProductsContainer>
  );
}

export default Products;