import ProductsTable from "../../components/ProductsTable/products-table";
import AddProductForm from "../../components/AddProductsForm/add-product-form";

export const ProductsTablePage = () => {


   return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      boxShadow: '0px 0px 5px rgba(0,0,0,0.5)', 
      borderRadius: '10px', 
      paddingBlock:"1rem"
    }}>
        <div style={{width:"95%"}}>
        
        <ProductsTable />
        </div>
    </div>
  );
}

export default ProductsTablePage;