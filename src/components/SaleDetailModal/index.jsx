import React, {useState} from 'react';
import { Modal, List, InputNumber, Form, Button, Input } from 'antd';

export const SaleDetailModal = ({ saleDetails, setSaleDetails }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false)

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log('Success:', values);
        generateSale(values, saleDetails);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  

  return (
    <>
     <Button type="primary" onClick={() => setVisible(true)} style={{marginBottom:"0.5rem"}}>
      Generar Venta
    </Button>
    <Modal
      title="Detalle de la Venta"
      open={visible}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      <List
        itemLayout="horizontal"
        dataSource={saleDetails || []}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.image} />}
              title={item.name}
              description={item.variant}
            />
            <InputNumber defaultValue={item.quantity} min={1} max={10} />
            <InputNumber defaultValue={item.price} min={0} />
          </List.Item>
        )}
      />
      <Form form={form} layout="vertical">
        <Form.Item name="buyerName" label="Nombre del comprador" rules={[{ required: true }]}>
          <Input placeholder="Ingrese el nombre del comprador" />
        </Form.Item>
        <Form.Item name="buyerEmail" label="Correo del comprador" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Ingrese el correo del comprador" />
        </Form.Item>
        <Form.Item name="buyerPhone" label="Teléfono del comprador" rules={[{ required: true }]}>
          <Input placeholder="Ingrese el teléfono del comprador" />
        </Form.Item>
      </Form>
    </Modal>
    </>
  );
};

export default SaleDetailModal;
