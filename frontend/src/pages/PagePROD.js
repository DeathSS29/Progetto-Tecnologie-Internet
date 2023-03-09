import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../axios';
import AliceCarousel from 'react-alice-carousel';
import { Badge, Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../components/loading';
import 'react-alice-carousel/lib/alice-carousel.css';
import './pagePROD.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useAddToCartMutation } from '../service/appApi';
import Toast from '../components/Toast';

function PagePROD() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const img = product.pictures.map((picture) => (
    <img
      className="product-image"
      src={picture.url}
      onDragStart={handleDragStart}
      alt=""
    />
  ));

  return (
    <div className="pageProd">
      <Row>
        <Col
          lg={6}
          style={{
            marginTop: '100px',
          }}
        >
          <AliceCarousel
            mouseTracking
            items={img}
            controlsStrategy="alternative"
          ></AliceCarousel>
        </Col>
        <Col lg={6} className="Title">
          <h2
            style={{
              position: 'start',
              fontSize: '70px',
              marginBottom: '50px',
            }}
          >
            {product.name}
          </h2>

          <Badge
            style={{
              width: 'auto',
              height: 'auto',

              marginBottom: '0px',
              fontSize: 'x-large',
            }}
            bg="danger"
          >
            {product.category}
          </Badge>

          <p
            style={{
              textAlign: 'justify',
              fontSize: '25px',
              marginRight: '50px',
              marginTop: '25px',
            }}
            className="Description"
          >
            <strong>Description:</strong> {product.description}
          </p>
          <p
            className="Price"
            style={{
              fontSize: '40px',
              marginRight: '700px',
            }}
          >
            €{product.price}
          </p>
          {user && !user.isAdmin && (
            <Button
              style={{
                height: '100px',
                width: '300px',
                borderRadius: '5px',
                marginTop: '90px',
                fontSize: '30px',
              }}
              onClick={() =>
                addToCart({
                  userId: user._id,
                  productId: id,
                  price: product.price,
                  image: product.pictures[0].url,
                })
              }
            >
              ADD TO CART
            </Button>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <Toast
              title="ADDED TO CART"
              body={`${product.name} is in your cart`}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default PagePROD;
