import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useContext } from "react";
import { PosContext } from "../context/poscontext.jsx";

const CardComponent = ({ product }) => {
  const { addToCart } = useContext(PosContext); 

  return (
    <Col md={3} xs={5} className="mb-4 d-flex align-items-stretch">
      <Card
        className="shadow"
        border="light"
        style={{
          cursor: "pointer",
          fontFamily: "Helvetica, Arial, sans-serif",
          height: "100%",
          width: '100%'
        }}
        onClick={() => addToCart(product)}
      >
        <Card.Img
          variant="top"
          src={`${product.imageUrl}`}
          style={{
            height: "10rem",
            objectFit: "cover",
          }}
        />
        <Card.Body>
          <Card.Title
            className="card-title"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#121B28",
              textAlign: "left",
            }}
          >
            ${product.menuPrice.toLocaleString("en-US", "id-ID")}
          </Card.Title>
          <Card.Text
            style={{
              fontSize: "16px",
              color: "#121B28",
              textAlign: "left",
            }}
          >
            {product.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

CardComponent.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CardComponent;

