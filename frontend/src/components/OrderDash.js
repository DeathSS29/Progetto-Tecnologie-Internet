import React, { useEffect, useState } from 'react';
import { Badge, Modal, Button, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import Loading from './loading';

function OrderDash() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  function signShip(orderId, ownerId) {
    axios
      .patch(`/orders/${orderId}/sign`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    console.log(productsToShow);
    setShow(true);
    setOrderToShow(productsToShow);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get('/orders')
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  const handleClose = () => setShow(false);

  if (loading) {
    return <Loading />;
  }
  if (orders.length === 0) {
    return <h1 className="text-center">NO ORDERS </h1>;
  }
  return (
    <Container style={{ marginBottom: '150px' }}>
      <h1
        style={{
          color: 'violet',
          marginTop: '-70px',
          fontSize: '50px',
          fontFamily: 'impact',
        }}
      >
        Orders
      </h1>
      <Table
        responsive
        striped
        bordered
        hover
        style={{
          marginTop: '50px',
          width: '1000px',
          height: '500px',
        }}
      >
        <thead>
          <tr>
            <th>CLIENT NAME</th>
            <th>ORDER ID</th>
            <th>STATUS</th>
            <th>ADDRESS</th>
            <th>COUNTRY</th>
            <th>DATE</th>
            <th>ORDER TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.owner?.name}</td>
              <td>{order._id}</td>
              <td>{order.count}</td>
              <td>{order.address}</td>
              <td>{order.country}</td>
              <td>{order.date}</td>
              <td>€{order.total}</td>
              <td>
                {order.status === 'processing' ? (
                  <Button
                    style={{ width: '150px', marginBottom: '10px' }}
                    onClick={() => signShip(order._id, order.owner?._id)}
                  >
                    Sign shipping
                  </Button>
                ) : (
                  <Badge
                    style={{
                      width: '120px',
                      height: '30px',
                      marginTop: '30px',
                      fontSize: '16px',
                    }}
                  >
                    Shipped
                  </Badge>
                )}
              </td>
              <td>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => showOrder(order.products)}
                >
                  View order <i className="fa fa-eye"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>order details</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div className="orderDetails">
            <img
              src={order.pictures[0].url}
              style={{ width: '100px', height: '100px', margin: '20px' }}
              alt=""
            />
            <p>
              <span style={{ margin: 20 }}>
                {order.count} x {order.name}
              </span>
              <p style={{ margin: 20 }}>
                Price: €{Number(order.price) * order.count}
              </p>
            </p>
          </div>
        ))}
      </Modal>
    </Container>
  );
}

export default OrderDash;
