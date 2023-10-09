import React, { useState, useEffect} from "react";
import AddProductForm from "../../components/AddProductsForm/add-product-form";
import ProductsFilter from "../../components/ProductsFilter/products-filter";
import ProductsTable from "../../components/ProductsTable/products-table";
import { getProducts } from "../../api/products";
import { Table, Pagination } from "antd";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const Product = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [changedPage, setChangedPage] = useState(false);
    const [limit, setLimit] = useState(6);
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const location = useLocation();
    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          
        },
        {
          title: 'Marca',
          dataIndex: 'brand',
          key: 'brand',
          render: brand => <span>{brand.name}</span>
        },
        {
          title: 'Tipo',
          dataIndex: 'productType',
          key: 'productType',
          render: productType => <span>{productType.productTypeName}</span>
        },
        {
          title: 'Precio',
          dataIndex: 'price',
          key: 'price' 
        },
        {
          title: 'Acciones',
          key:'accoiones',
          dataIndex: 'key',
          render: (key) => <span> {key}</span>
        }
      ];

      const fetchProducts = async () => {
        setLoading(true)
        const response = await getProducts(limit, currentPage)
        console.log(response)
        setProducts(response.data.map(product => (
          { ...product, key: product.productID}
        )))
        setTotal(response.total)
        setLoading(false)
      }

      const handlePage = (page) => {
        setCurrentPage(page)
        setChangedPage(true)
      }

      useEffect(() => {
        fetchProducts()
      }, [])

      useEffect(() => {
        if (changedPage) {
          fetchProducts();
          setChangedPage(false)
        }
      }, [changedPage])
    return (
        <>
          {location.pathname === '/producto'?
           (
            <>
                <AddProductForm fetchProducts={fetchProducts} />
                <ProductsFilter />
                <Table loading={loading} dataSource={products} columns={columns} pagination={false} />
                <Pagination total={total} pageSize={limit} current={currentPage} onChange={(handlePage)} />
            </>
           )

           : 

           <Outlet/>}  
        </>
    )

}

export default Product;