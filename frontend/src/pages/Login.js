import React, { useState } from 'react';
import { Button, Col, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../service/appApi';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isError, isLoading, error }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <div className="Container1">
      <Col md={6} className="ContainerLog">
        <Form onSubmit={handleLogin}>
          <h1
            style={{
              width: '100%',
              fontFamily: 'impact',
              fontSize: '45px',
              color: 'violet',
            }}
          >
            Login in to your account
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
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
              type="password"
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Button className="btn" type="submit" disabled={isLoading}>
              Login
            </Button>
          </Form.Group>

          <div
            className="createAccount"
            style={{
              fontSize: '25px',
              color: 'black',
            }}
          >
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'red' }}>
              Create account
            </Link>{' '}
          </div>
        </Form>
      </Col>
    </div>
  );
}

export default Login;
