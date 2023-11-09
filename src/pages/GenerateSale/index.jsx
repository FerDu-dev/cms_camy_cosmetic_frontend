import React, { useState, useEffect } from 'react';
import { Card, Input, List, Form, InputNumber, Button, Modal, Select, Collapse } from 'antd';
import ProductsFilter from '../../components/ProductsFilter/products-filter';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getStoreInventory } from '../../api/store';
import { Pagination } from 'antd';
import { generateSale } from '../../api/sales';

const { Option } = Select;

const { Panel } = Collapse;


export const GenerateSaleForm = () => {
    
    const [loading, setLoading] = useState(false);
    const [loadingSale, setLoadingSale] = useState(false)
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [saleDetails, setSaleDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const limit = 10;
    const [changedPage, setChangedPage] = useState(false);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [productTypeFilter, setProductTypeFilter] = useState(null);
    const [brandFilter, setBrandFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState({
        price: null,
        range: 'greater',
    });
    const [totalToPay, setTotalToPay] = useState(0);
    const [discount, setDiscount] = useState(0);


    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);
    const [newPrice, setNewPrice] = useState(0);
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [buyerInstagram, setBuyerInstagram] = useState('');
    const [payType, setPayType] = useState('');

    const selectedStore = localStorage.getItem('selectedStore')? 
    JSON.parse(localStorage.getItem('selectedStore')) 
    : 
    null;

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (changedPage) {
            fetchProducts();
        }
    }, [changedPage]);

    const fetchProducts = async (page) => {  
        setLoading(true)
        const response = await getStoreInventory(currentPage, limit, selectedStore.id)
        setProducts(response.data.map(inventary => (
          { ...inventary.product,quantity: inventary.quantity, key: inventary.id}
        )))
        setTotal(response.total)
        setLoading(false)
    };

    const handleProductAdd = (product) => {
        if (quantityToAdd > product.quantity) {
            Modal.warning({
                title: 'Cantidad no disponible',
                content: 'Estás colocando una cantidad mayor a la disponible para este producto',
            });
        } else {
            setSelectedProducts(prevProducts => [...prevProducts, { ...product, quantity: quantityToAdd }]);
            setTotalToPay(prevTotal => prevTotal + parseFloat(product.price) * quantityToAdd);
            setQuantityToAdd(1);
        }
    };

const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProducts(prevProducts => prevProducts.map(product => {
        if (product.productID === productId) {
            const priceDifference = (newQuantity - product.quantity) * parseFloat(product.price);
            setTotalToPay(prevTotal => prevTotal + priceDifference);
            return { ...product, quantity: newQuantity };
        } else {
            return product;
        }
    }));
};


const handleProductRemove = (productId) => {
    setSelectedProducts(prevProducts => prevProducts.filter(product => product.productID !== productId));
    let productToRemove = selectedProducts.find(product => product.productID === productId);
    if (productToRemove) {
        let newTotalToPay = totalToPay - (productToRemove.price * productToRemove.quantity);
        setTotalToPay(newTotalToPay);
    }
};

 
const showModal = (product) => {
    setCurrentProduct(product);
    setNewQuantity(product.quantity);  
    setNewPrice(product.price); 
    setIsModalVisible(true);
};

  
  const handleOk = () => {
    setIsModalVisible(false);

   
    setSelectedProducts(prevProducts =>
      prevProducts.map(p =>
        p.productID === currentProduct.productID ? { ...p, quantity: newQuantity, price: newPrice } : p
      )
    );

    
    let oldTotalForCurrentProduct =
      currentProduct.price * selectedProducts.find(p => p.productID === currentProduct.productID).quantity;
    let newTotalForCurrentProduct = newPrice * newQuantity;

    setTotalToPay(prevTotalToPay => prevTotalToPay - oldTotalForCurrentProduct + newTotalForCurrentProduct);
  };

  
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleNewQuantityChange = value => {
    setNewQuantity(value);
  };


  const handleNewPriceChange = value => {
    setNewPrice(value);
  };
  
  const handleQuantityToAdd = (value, maximumQuantity) => {

  }
  
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setChangedPage(true);
  };

  const handleGenerateSale = async () => {
    setLoadingSale(true)
    const sale = {
        storeID: selectedStore.id,
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerInstagram,
        payType,
        amount: totalToPay - discount,
        discount: discount,
        itemSales: selectedProducts.map(product => ({
            productID: product.productID,
            quantity: product.quantity,
            priceAtMoment: product.price
        }))
    };

    console.log(sale);
    await generateSale(sale)
    navigate('/tienda/ventas')
    setLoadingSale(false)
};

  return (
    <>
    {location.pathname === '/tienda/generar-venta'? (
        <Card title='Generar Venta'>
        <div style={{display:"flex", flexDirection:"row", gap:'1rem'}}>
        <div style={{width:"75%"}}>
        <Collapse defaultActiveKey={['1']}>
    <Panel header="Datos del comprador" key="1">
        <Input placeholder="Nombre" style={{marginBlock:"10px"}} onChange={e => setBuyerName(e.target.value)}/>
        <Input placeholder="Correo" style={{marginBlock:"10px"}} onChange={e => setBuyerEmail(e.target.value)}/>
        <Input placeholder="Teléfono" style={{marginBlock:"10px"}} onChange={e => setBuyerPhone(e.target.value)}/>
        <Input placeholder="Instagram" style={{marginBlock:"10px"}} onChange={e => setBuyerInstagram(e.target.value)}/>
        <div style={{display:"flex", flexDirection:"column"}}>
            <span style={{marginBlock:"0.5rem"}}>Metodo de pago</span>
            <Select defaultValue="" style={{ width: 120 }} onChange={setPayType}>
                <Option value="efectivo">Efectivo</Option>
                <Option value="transferencia">Transferencia</Option>
                <Option value="zelle">Zelle</Option>
                <Option value="pago_movil">Pago Móvil</Option>
            </Select>
        </div>
    </Panel>
</Collapse>
            {/* <ProductsFilter 
                search={search}
                setSearch={setSearch}
                productTypeFilter={productTypeFilter}
                setProductTypeFilter={setProductTypeFilter}
                brandFilter={brandFilter}
                setBrandFilter={setBrandFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                fetchProducts={fetchProducts}
            /> */}
        <List
            itemLayout="horizontal"
            dataSource={products}
            renderItem={item => (
            <>
            <List.Item>
            <List.Item.Meta
                title={`Nombre: ${item.name}`}
                description={`Precio: ${item.price}, Cantidad disponible: ${item.quantity}`}
            />
            <div style={{display:"flex", gap:"10px"}}>
            <Form.Item label="Cantidad" style={{marginRight:"1rem"}}>
                <InputNumber 
                    min={1}  
                    onChange={(value) => setQuantityToAdd(value)} />
            </Form.Item>
            <Form.Item label="Precio">
                <InputNumber 
                    defaultValue={item.price} 
                    min={1} 
                    onChange={(value) => {
                        if (!Number.isInteger(value)) {
                            message.error('Por favor, introduce solo números');
                        }
                    }}
                    />
            </Form.Item>
            <Button type="primary" onClick={() => handleProductAdd(item)}>Agregar</Button>

            </div>
            </List.Item>
            </>
        )}
        />
            <Pagination current={currentPage} total={total} pageSize={limit} onChange={fetchProducts} />

        </div>
        <div style={{width:"25%"}}>

        <Card title="Detalle de la venta">
            <List
            itemLayout="horizontal"
            dataSource={selectedProducts}
            renderItem={product => (
                <List.Item>
                <List.Item.Meta
                    title={product.name}
                    description={`Cantidad: ${product.quantity}, Precio: ${product.price}`}
                />
                <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                    <Button danger onClick={() => handleProductRemove(product.productID)}>Eliminar</Button>
                    <Button onClick={() => showModal(product)}>Editar</Button>
                </div>
                </List.Item>
            )}
            />
            <Form.Item label="Descuento">
                <InputNumber min={0} max={totalToPay} onChange={value => setDiscount(value)} />
            </Form.Item>

            <p>Monto a pagar: {totalToPay}</p>
            <p>TOTAL: {totalToPay - discount}</p>
            <Button 
                type="primary" 
                style={{marginBlock:"1rem"}}
                onClick={handleGenerateSale}
                disabled={selectedProducts.length === 0 || !buyerName || !buyerEmail || !buyerPhone || !buyerInstagram || !payType || loadingSale}
                >
                Finalizar venta
                </Button>
        </Card>
        </div>
        </div>

        </Card>

    ):
    <Outlet/>}

   
    <Modal title="Editar producto" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <Form.Item label="Cantidad">
        <InputNumber min={1}  value={newQuantity} onChange={handleNewQuantityChange} />
    </Form.Item>
    <Form.Item label="Precio">
        <InputNumber min={0} value={newPrice} onChange={handleNewPriceChange} />
    </Form.Item>
    </Modal>

    </>
  );
};

export default GenerateSaleForm;