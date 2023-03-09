import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../service/appApi';

function ProductDash() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  function handleDeletePROD(id) {
    if (window.confirm('Sure?'))
      deleteProduct({ product_id: id, user_id: user._id });
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>PRODUCT ID</th>
          <th> NAME</th>
          <th> PRICE</th>
        </tr>
      </thead>
      <tbody>
        {products.map((products) => (
          <tr>
            <td>
              <img
                src={products.pictures[0].url}
                className="DashProd"
                alt=""
                style={{ width: 100 }}
              />
            </td>
            <td>{products._id}</td>
            <td>{products.name}</td>
            <td>€{products.price}</td>
            <td>
              <Button
                onClick={() => handleDeletePROD(products._id, user._id)}
                className="btnDelete"
                style={{ backgroundColor: 'red' }}
                disable={isLoading}
              >
                DELETE
              </Button>
              <Link
                to={`/product/${products._id}/edit`}
                className="btn btn-primary"
              >
                EDIT
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductDash;
