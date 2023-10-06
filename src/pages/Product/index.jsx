import React, { useState, useEffect} from "react";
import AddProductForm from "../../components/AddProductsForm/add-product-form";
import ProductsFilter from "../../components/ProductsFilter/products-filter";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const Product = () => {

    const location = useLocation();

    return (
        <>
          {location.pathname === '/producto'?
           (
            <>
                <AddProductForm />
                <ProductsFilter />
            </>
           )

           : 

           <Outlet/>}  
        </>
    )

}

export default Product;