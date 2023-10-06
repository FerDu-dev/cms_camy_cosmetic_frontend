import { useState, useEffect } from 'react';
import {Table } from 'antd';
import { getBrands } from '../../api/brands&types';
import AddBrand from '../../components/AddBrand/AddBrand';

export const BrandSetting = () => {
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const brandsPerPage = 6;

    const columns = [
        {
          title: 'Foto',
          dataIndex: 'picture_url',
          key: 'picture_url',
          render: picture_url => <img src={picture_url} alt="Brand" style={{width: '50px'}} />,
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
      ];
    
    const fetchBrands = async () => {
        setLoading(true)
        const fetchedBrands = await getBrands(currentPage, brandsPerPage); 
        console.log(fetchedBrands)
        setBrands(fetchedBrands.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchBrands();
    }, [])

    return (
        <div>
          <h2>Brands</h2>
          <AddBrand getBrands={fetchBrands} />
          
            <Table loading={loading} columns={columns} dataSource={brands} rowKey="id" style={{marginTop:"1rem"}} pagination={{current: currentPage, total: brands.length, pageSize: brandsPerPage, onChange: (page) => setCurrentPage(page)}} />          
          
        </div>
      );

}

export default BrandSetting;