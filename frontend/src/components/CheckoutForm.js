import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../service/appApi';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState('');
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [paying, setPaying] = useState(false);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      'http://localhost:27017/create-payment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: user.cart.total }),
      }
    ).then((res) => res.json());
    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      createOrder({ userId: user._id, cart: user.cart, address, country }).then(
        (res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
              // navigate("/orders");
            }, 3000);
          }
        }
      );
    }
  }

  return (
    <Container
      className="cartPayment"
      style={{ marginBottom: '100px', marginTop: '100px' }}
    >
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={4}>
            <Form.Group className="line">
              <Form.Label>FIRST NAME</Form.Label>
              <Form.Control
                type="text"
                style={{ width: '200px' }}
                placeholder="First Name"
                value={user.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="line">
              <Form.Label>ADDRESS</Form.Label>
              <Form.Control
                type="text"
                style={{ width: '200px', marginLeft: '-20px' }}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="line">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="text"
                style={{ width: '200px' }}
                placeholder="Email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="line">
              <Form.Label>COUNTRY</Form.Label>
              <Form.Control
                style={{
                  width: '200px',
                  marginLeft: '-20px',
                }}
                type="text"
                placeholder="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Container
            style={{ width: '500px', marginRight: '90px', marginTop: '-150px' }}
          >
            <label htmlFor="cardElement">CARD</label>
            <CardElement id="cardElement" />
            <Button
              className="pay"
              style={{ marginTop: 50 }}
              type="submit"
              disabled={user.cart.count <= 0 || paying || isSuccess}
            >
              {paying ? 'Processing...' : 'Pay'}
            </Button>
          </Container>
        </Row>
      </Form>
    </Container>
  );
}

export default CheckoutForm;
