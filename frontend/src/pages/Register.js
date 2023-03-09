import React, { useState } from 'react';
import { Button, Col, Form, Alert } from 'react-bootstrap';
import './Register.css';
import { useRegisterMutation } from '../service/appApi';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [register, { error, isLoading, isError }] = useRegisterMutation();

  function handleRegister(e) {
    e.preventDefault();
    register({ name, email, password });
  }

  return (
    <div className="Container2">
      <Col md={6} className="register_form-container">
        <Form onSubmit={handleRegister}>
          <h1
            style={{
              width: '100%',
              fontFamily: 'impact',
              fontSize: '50px',
              color: 'black',
            }}
          >
            Create a new Account
          </h1>
          {isError && <Alert variant="danger">{error.data}</Alert>}
          <Form.Group>
            <Form.Label
              style={{
                width: '100%',
                fontFamily: 'impact',
                fontSize: '25px',
                color: 'yellow',
              }}
            >
              Name
            </Form.Label>
            <Form.Control
              className="line"
              type="text"
              placeholder="Your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              style={{
                width: '100%',
                fontFamily: 'impact',
                fontSize: '25px',
                color: 'yellow',
              }}
            >
              Email Adress
            </Form.Label>
            <Form.Control
              className="line"
              type="email"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              style={{
                width: '100%',
                fontFamily: 'impact',
                fontSize: '25px',
                color: 'yellow',
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              className="line"
              type="password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Button className="btn1" type="submit" disabled={isLoading}>
              Create a new account
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </div>
  );
}

export default Register;
