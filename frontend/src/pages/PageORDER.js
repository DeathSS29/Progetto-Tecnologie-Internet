import React, { useEffect, useState } from 'react';
import { Badge, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import Loading from '../components/loading';

function PageORDER() {
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/user/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <h1
        style={{
          marginBottom: '300px',
          color: 'violet',
          marginTop: '200px',
          fontSize: '100px',
          fontFamily: 'impact',
        }}
      >
        NO ORDERS
      </h1>
    );
  }

  return (
    <Container style={{ marginBottom: '150px' }}>
      <h1
        style={{
          color: 'violet',
          marginTop: '20px',
          fontSize: '100px',
          fontFamily: 'impact',
        }}
      >
        Your orders
      </h1>
      <Table
        responsive
        striped
        bordered
        hover
        style={{
          marginTop: '50px',
        }}
      >
        <thead>
          <tr>
            <th>ORDER ID</th>

            <th>STATUS</th>
            <th>DATE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>

              <td>
                <Badge
                  bg={`${
                    order.status === 'processing' ? 'warning' : 'success'
                  }`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>

              <td>€{order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PageORDER;
