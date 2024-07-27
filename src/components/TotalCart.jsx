import React, { useContext, useEffect } from 'react'
import { Button, Col, Container } from 'react-bootstrap'
import NumericInput from 'react-numeric-input'
import { FaCartArrowDown } from 'react-icons/fa'
import { PosContext } from '../context/poscontext.jsx'

const TotalCart = () => {
  const {
    cart,
    discountRate,
    setDiscountRate,
    taxRate,
    setTaxRate,
    placeOrder,
  } = useContext(PosContext)

  const calculateSum = () => cart.reduce((total, item) => total + item.total, 0)

  const sum = calculateSum()
  const discount = sum * (discountRate / 100)
  const tax = (sum - discount) * (taxRate / 100)
  const totalPayable = sum - discount + tax

  const myFormat = (num) => `${num}%`

  return (
    <div className="px-3">
      <Container fluid className="fixed-bottom">
        <Col md={{ span: 3 }} className="bg-light">
          <div className="px-3">
            <h4>
              Discount:{' '}
              <NumericInput
                min={0}
                max={100}
                value={discountRate}
                format={myFormat}
                step={0.5}
                className="numeric-input"
                onChange={(value) => setDiscountRate(value)}
                style={{
                  wrap: {
                    background: 'E2E2E2',
                    boxShadow: '0 0 1px 1px #fff inset,1px 1px 5px -1px #000',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '6px 3px 3px 6px',
                  },
                  input: {
                    color: '#988869',
                    border: '1px solid #ccc',
                    marginRight: 4,
                    display: 'block',
                    fontWeight: 100,
                    outline: 'none',
                  },
                  arrowUp: {
                    borderBottomColor: 'rgba(66,54,0,0.63)',
                  },
                  arrowDown: {
                    borderTopColor: 'rgba(66,54,0,0.63)',
                  },
                }}
              />{' '}
              <strong className="float-end me-3">${discount.toFixed(2)}</strong>
            </h4>
            <h4>
              Tax:{' '}
              <NumericInput
                min={0}
                max={100}
                value={taxRate}
                format={myFormat}
                step={0.5}
                className="numeric-input"
                onChange={(value) => setTaxRate(value)}
                style={{
                  wrap: {
                    background: 'E2E2E2',
                    boxShadow: '0 0 1px 1px #fff inset,1px 1px 5px -1px #000',
                    padding: '2px 2px 2px 2px',
                    borderRadius: '6px 3px 3px 6px',
                  },
                  input: {
                    color: '#988869',
                    border: '1px solid #ccc',
                    marginRight: 4,
                    display: 'block',
                    fontWeight: 100,
                    outline: 'none',
                  },
                  arrowUp: {
                    borderBottomColor: 'rgba(66,54,0,0.63)',
                  },
                  arrowDown: {
                    borderTopColor: 'rgba(66,54,0,0.63)',
                  },
                }}
              />{' '}
              <strong className="float-end me-3">${tax.toFixed(2)}</strong>
            </h4>
            <h4>
              Total :{' '}
              <strong className="float-end me-3">
                ${totalPayable.toFixed(2)}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="w-100 me-5 mb-3"
              size="lr"
              style={{
                backgroundColor: '#5fe3b3',
                border: 'none',
                color: '#121B28',
              }}
              onClick={placeOrder}
            >
              <FaCartArrowDown /> Place Order
            </Button>
          </div>
        </Col>
      </Container>
    </div>
  )
}

export default TotalCart
