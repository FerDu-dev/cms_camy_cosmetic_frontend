import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Form, Select, Input, InputNumber, Switch, Button} from 'antd';


const { Option } = Select;

export const ProductsFilter = ({  
  areVariantProducts, 
  setAreVariantProducts = () => {},
  search, 
  setSearch = () => {},
  productTypeFilter,
  setProductTypeFilter = () => {},
  brandFilter,
  setBrandFilter = () => {},
  priceFilter = {price: null, range: 'greater'},
  setPriceFilter = () => {},
  fetchProducts = () => {}
}) => {
 
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const layout = {
    labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
}
const tailLayout = {
    wrapperCol: { xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }
};

  const fetchProductTypesAndBrands = async () => {
    const fetchedProductTypes = await getProductTypes(1, 20);
    const fetchedBrands = await getBrands(1, 20);
    console.log('fetched', fetchedProductTypes)
    setProductTypes(fetchedProductTypes.data.map(productType => ({
      value: productType.productTypeID,
      label: productType.productTypeName
    })))
    setBrands(fetchedBrands.data.map(brand => ({
      value: brand.id,
      label: brand.name
    })))
  };
  useEffect(() => {
    fetchProductTypesAndBrands();
  }, []);
  
  const handlePriceRange = (value) => {
    console.log(value)
   setPriceFilter({...priceFilter, price: parseFloat(value)})
    setFilters({ ...filters, priceRange: value });
  };

  return (
    <Form style={{display:"flex", flexDirection:"row", gap:"0.5rem", marginBlock:"2rem"}}>
      <Form.Item label="Search">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      </Form.Item>
      <Form.Item label="Tipo de producto">
        <Select value={productTypeFilter} onChange={setProductTypeFilter}>
          <Option value={null}>
            Escoge un tipo de producto
          </Option>
          {productTypes && productTypes.map((productType) => (
            <Option key={productType.value} value={productType.value}>{productType.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Marca">
        <Select 
          value={brandFilter} 
          onChange={setBrandFilter} 
        >
          <Option value={null}>
            Escoge una marca
          </Option>
          {brands && brands.map((brand) => (
            <Option key={brand.value} value={brand.value}>{brand.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Precio">
        {
          priceFilter.price?
            <Select value={priceFilter.range} onChange={(range) => setPriceFilter({...priceFilter, range})}>
                <Option value={'greater'}>Mayor</Option>
                <Option value={'greaterOrEql'}>Mayor o igual</Option>
                <Option value={'eql'}>igual</Option>
                <Option value={'lessOrEql'}>Menor o igual</Option>
                <Option value={'less'}>Menor</Option>
            </Select>
          :
          null
        }
        <InputNumber value={priceFilter.price} placeholder='precio'  onChange={handlePriceRange} />
      </Form.Item>
      {/* <Form.Item label='Variante de productos'>
        <Switch checked={areVariantProducts} onChange={(checked) => setAreVariantProducts(checked)}/>
      </Form.Item> */}
      <Button onClick = {() => fetchProducts()}>
        Buscar
      </Button>
    </Form> 
  );
};

export default ProductsFilter;
