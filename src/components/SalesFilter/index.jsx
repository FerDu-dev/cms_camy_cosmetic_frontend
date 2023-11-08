import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Form, Select, Input, InputNumber, Switch, Button, DatePicker} from 'antd';

const { RangePicker } = DatePicker


const { Option } = Select;

export const SalesFilter = ({  
  search, 
  setSearch = () => {},
  justDate,
  setJustDate = () => {},
  startDate,
  setStartDate = () => {},
  endDate,
  setEndDate = () => {},
  fetchSales = () => {},
  filterDates,
  setFilterDates = () => {}
}) => {
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [dateFilterType, setDateFilterType] = useState(null);

  const layout = {
    labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
  }
  const tailLayout = {
    wrapperCol: { xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }
  };

  return (  
    <Form style={{display:"flex", flexDirection:"row", gap:"0.5rem", marginBlock:"2rem"}}>
      <Form.Item label="Search">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      </Form.Item>
      <Form.Item label='Filtrar por fecha'>
        <Switch defaultChecked={filterDates} onChange={(checked) => setFilterDates(checked)} />
      </Form.Item>
     
     
      { filterDates &&    <Form.Item label="Selecciona rango">
            <RangePicker onChange={(dates) => { setStartDate(dates[0].toDate()); setEndDate(dates[1].toDate()); }} />
          </Form.Item>}
      
    
      <Button onClick = {() => fetchSales()}>
        Buscar 
      </Button>
    </Form> 
  );
};

export default SalesFilter;