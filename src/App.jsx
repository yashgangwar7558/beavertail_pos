import { Row } from 'react-bootstrap'
import NavbarComponent from './components/NavbarComponent.jsx'
import Category from './components/Category.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Order from './components/Order.jsx'
import React, { useState } from 'react'

function App() {
  return (
    <>
      <NavbarComponent />
      <div
        className="container-fluid"
        style={{
          marginTop: '65px',
        }}
      >
        <Row>
          <Category />
          <ProductDetail />
          <Order />
        </Row>
      </div>
    </>
  )
}

export default App
