import DetailSales from "../../components/DetailSales/detail-sales"

export const SalesPage = () => {


    return (
        <>
         <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', 
            borderRadius: '10px', 
            }}>
                <div style={{width:"95%"}}>
                
                <DetailSales />
                </div>
        </div>
        </>
    )
}