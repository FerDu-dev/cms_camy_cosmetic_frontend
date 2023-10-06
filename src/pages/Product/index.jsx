import React, { useState, useEffect} from "react";
import AddProductForm from "../../components/AddProductsForm/add-product-form";
import ProductsFilter from "../../components/ProductsFilter/products-filter";
import { getProducts } from "../../api/products";
import { Table } from "antd";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const Product = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [loading, setLoading] = useState(false)
    const location = useLocation();
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

      const fetchProducts = async () => {
        const response = await getProducts({})
      }
    return (
        <>
          {location.pathname === '/producto'?
           (
            <>
                <AddProductForm />
                <ProductsFilter />
                <Table dataSource={products} columns={columns} loading={loading} />
            </>
           )

           : 

           <Outlet/>}  
        </>
    )

}

export default Product;