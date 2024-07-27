import { useEffect } from "react";
import { useContext } from 'react';
import { Col, Row } from "react-bootstrap";
import CardComponent from "./CardComponent.jsx";
import { PosContext } from '../context/poscontext.jsx';

const ProductDetail = () => {

  const { error, loading, categoryProducts } = useContext(PosContext);

  return (
    <>
      <Col md={7} className="p-3" style={{ margin: '0px'}}>
        {error ? error : ""}
        <Row className="g-3">
          {categoryProducts ? (
            categoryProducts.map((item) => (
              <CardComponent key={item._id} product={item} />
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>No data</p>
          )}
        </Row>
      </Col>
    </>
  );
};

export default ProductDetail;
