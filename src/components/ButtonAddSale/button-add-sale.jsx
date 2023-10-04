import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormAddSale from '../FormAddSale/form-add-sale';

export const AddSaleButton = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
    
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
   
  };

  return (
    <>

      <FormAddSale open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  );
}

export default AddSaleButton;
