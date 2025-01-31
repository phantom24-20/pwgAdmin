// Form for adding products

import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

function AddProduct() {
  const [formData, setFormData] = useState({ name: "", stock: 0 });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Added:", formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
      />
      <Input
        type="number"
        name="stock"
        placeholder="Stock"
        onChange={handleChange}
      />
      <Button type="submit">Add Product</Button>
    </Form>
  );
}

export default AddProduct;
