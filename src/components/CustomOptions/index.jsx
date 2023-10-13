import { AutoComplete } from 'antd';
import { useEffect } from 'react';
import AddBrand from "../AddBrand/AddBrand";
import AddProductType from "../AddProductType/AddProductType";

export const CustomOptions = ({ options, type, menu}) => {
  useEffect(() =>{
    console.log(menu)
  },[menu])

  return (
  <div>
    {options.map((option, index) => (
      <AutoComplete.Option key={index} value={option.value}>
        {option.label}
      </AutoComplete.Option>
    ))}
    {type === 'brand' ? <AddBrand /> : <AddProductType />}
  </div>)
};

export default CustomOptions
