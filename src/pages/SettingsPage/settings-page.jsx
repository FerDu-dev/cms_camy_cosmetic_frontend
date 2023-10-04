import { AddProductTypeAndBrandForm } from "../../components/AddProductType&Brand/add-product-type-brand-form"

export const SettingsPage = () => {

    return (
        <>
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
                <AddProductTypeAndBrandForm />
            </div>
        </div>
        </>
    )
}