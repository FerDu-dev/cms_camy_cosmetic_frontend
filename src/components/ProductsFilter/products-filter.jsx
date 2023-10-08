import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Form, Row, Col, Select, Input, Slider, InputNumber } from 'antd';


const { Option } = Select;

export const ProductsFilter = ({ handleSearch }) => {
 
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const fetchProductTypesAndBrands = async () => {
    const fetchedProductTypes = await getProductTypes();
    const fetchedBrands = await getBrands();
    setProductTypes(fetchedProductTypes);
    setBrands(fetchedBrands);
  };
  useEffect(() => {
    // fetchProductTypesAndBrands();
  }, []);
  
  const handlePriceRange = (value) => {
    setPriceRange(value);
    setFilters({ ...filters, priceRange: value });
  };

  return (
    <Form layout="inline">
      <Form.Item label="Search">
        <Input onChange={handleSearch} />
      </Form.Item>
      <Form.Item label="Type">
        <Select placeholder="Select a type">
          {productTypes && productTypes.map((type) => (
            <Option key={type.id} value={type.id}>{type.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Brand">
        <Select placeholder="Select a brand">
          {brands && brands.map((brand) => (
            <Option key={brand.id} value={brand.id}>{brand.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Price Range">
        <InputNumber min={0} max={100} onChange={handlePriceRange} />
      </Form.Item>
    </Form> 
  );
};

export default ProductsFilter;
