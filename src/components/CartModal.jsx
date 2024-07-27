import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { PosContext } from '../context/poscontext.jsx'; 

const CartModal = (props) => {
  const { cart, updateCartItem, removeFromCart } = useContext(PosContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const item = cart.find((item) => item.name === props.item); 
    setData(item || {});
  }, [cart, props.item]);

  const updateData = () => {
    updateCartItem(data);
    props.onHide();
    Swal.fire('Update Success!', '', 'success');
  };

  const deleteData = (name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(name);
        props.onHide();
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit: {data ? data.name : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={data ? data.quantity : 0}
              onChange={(e) => setData({ ...data, quantity: parseInt(e.target.value) })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="note">
            <Form.Label>Note:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data ? data.note : ''}
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            updateData();
          }}
          variant="success"
        >
          Update
        </Button>
        <Button
          onClick={() => {
            deleteData(data.name);
          }}
          variant="danger"
        >
          Delete
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
