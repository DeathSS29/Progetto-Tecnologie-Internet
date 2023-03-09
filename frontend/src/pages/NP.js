import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../service/appApi';
import { Alert, Col, Form, Button, Row } from 'react-bootstrap';
import './NP.css';
import axios from '../axios';

function NP() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [imgRemove, setImgRemove] = useState(null);

  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert('Please fill out all the fields');
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    );
  }

  function handleRemoveImg(imgObj) {
    setImgRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dpt7imdp1',
        uploadPreset: 'grkjo6pp',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <div className="container_prod">
      <Row>
        <Col md={6} className="new_prod_form">
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <h1
              style={{
                textAlign: 'center',
                color: 'black',
                fontFamily: 'inherit',
                fontSize: 'xxx-large',
                margin: '60px',
                marginBottom: '30px',
              }}
            >
              Create a product
            </h1>
            {isSuccess && (
              <Alert variant="success">Product created with succcess</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="line">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="line">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: '100px' }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="line">
              <Form.Label>Price (€)</Form.Label>
              <Form.Control
                type="price"
                placeholder="Price €"
                value={price}
                required
                onChange={(error) => setPrice(error.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="line"
              type="category"
              onChange={(error) => setCategory(error.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select className="category_1">
                <option disabled selected>
                  {' '}
                  SELECT A CATEGORY
                </option>

                <option value="clothes">Clothes</option>
                <option value="sneakers">Sneakers</option>
                <option value="sunglasses">SunGlasses</option>
                <option value="lp&music">LP&Music</option>
                <option value="arcade&videogame">Arcade&Videogame</option>
                <option value="vintage&retrowatches">
                  Vintage&RetroWatches
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Button className="button1" type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-prevcont">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="" />
                    {imgRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button
                className="btn_prd"
                type="submit"
                disabled={isLoading || isSuccess}
              >
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Col md={6} className="new_prod_image"></Col>
    </div>
  );
}

export default NP;
