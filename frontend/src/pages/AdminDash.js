import React from 'react';
import { Container, Nav, Tab, Col } from 'react-bootstrap';
import OrderDash from '../components/OrderDash';
import PageCLIENT from '../components/PageCLIENT';
import ProductDash from '../components/ProductDash';

function AdminDash() {
  return (
    <Container
      style={{
        marginBottom: '100px',
        marginTop: '100px',
      }}
    >
      <Tab.Container defaultActiveKey={'products'}>
        <Col sm={3}>
          <Nav
            variant="pills"
            className="column"
            style={{ margin: '20px', marginTop: '-20px' }}
          >
            <Nav.Item>
              <Nav.Link eventKey="products">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="clients">Clients</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10}>
          <Tab.Content>
            <Tab.Pane eventKey="products">
              <ProductDash />
            </Tab.Pane>
          </Tab.Content>
          <Tab.Content>
            <Tab.Pane eventKey="orders">
              <OrderDash />
            </Tab.Pane>
          </Tab.Content>
          <Tab.Content>
            <Tab.Pane eventKey="clients">
              <PageCLIENT />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Tab.Container>
    </Container>
  );
}

export default AdminDash;
