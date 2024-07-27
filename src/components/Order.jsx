import React, { useContext, useState } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { PosContext } from '../context/poscontext.jsx';
import TotalCart from './TotalCart';
import CartModal from './CartModal';

const Order = () => {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    placeOrder,
    error,
    loading,
  } = useContext(PosContext);

  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item.name); 
    setModalShow(true); 
  };

  return (
    <>
      <Col
        md={3}
        className="mb-5 pb-5"
        style={{
          padding: '0',
          top: '75px',
          position: 'sticky',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <div className="orderlist">
          <h4>Order List</h4>
          {error && <p>{error}</p>}
          <hr />
          <ListGroup variant="flush">
            {cart.length > 0 ? (
              cart.map((item) => (
                <ListGroup.Item
                  key={item.name}
                  variant="flush"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="fw-bold">{item.name}</div>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="me-auto">
                      <small>
                        ${parseFloat(item.menuPrice).toLocaleString('en-US', 'id-ID')} x {item.quantity}
                      </small>
                      <p>
                        <small>{item.note}</small>
                      </p>
                    </div>
                    <div>
                      <strong>
                        <small>
                          ${' '}
                          {parseFloat(item.total).toLocaleString('en-US', 'id-ID')}
                        </small>
                      </strong>
                    </div>
                  </div>
                </ListGroup.Item>
              ))
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <p>Add Items</p>
            )}
          </ListGroup>
        </div>
        <TotalCart />
      </Col>
      <CartModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={selectedItem} 
      />
    </>
  );
};

export default Order;

