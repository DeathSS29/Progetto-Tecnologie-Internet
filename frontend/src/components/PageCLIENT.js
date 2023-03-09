import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from '../axios';
import Loading from './loading';

function PageCLIENT() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/user')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)
    return (
      <h2
        style={{
          color: 'violet',
          marginTop: '-70px',
          fontSize: '50px',
          fontFamily: 'impact',
        }}
      >
        No users
      </h2>
    );

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>CLIENT ID</th>
          <th>CLIENT NAME</th>
          <th>EMAIL</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PageCLIENT;
