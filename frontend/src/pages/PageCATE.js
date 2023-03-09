import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Loading from '../components/loading';
import axios from '../axios';
import ProdPrev from '../components/ProdPrev';
import { useParams } from 'react-router-dom';
import './PageCATE.css';

function PageCATE() {
  const { category } = useParams();
  const [Loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [Term, setTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProduct(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (Loading) {
    <loading />;
  }

  const productsSearch = product.filter((product) =>
    product.name.toLowerCase().includes(Term.toLowerCase())
  );

  return (
    <div className="pageCate">
      <div className={`banner ${category}  banner-category`}>
        <h1
          className="text"
          style={{
            fontSize: '90px',
            fontFamily: 'impact',
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center">
        <input
          style={{
            borderRadius: '10px',
            width: '350px',
            marginTop: '20px',
          }}
          type="search"
          placeholder="Search Products"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      {productsSearch.length === 0 ? (
        <h1
          style={{
            marginTop: '20px',
          }}
        >
          No products to show
        </h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 100 }} style={{ marginTop: '20px' }}>
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                {productsSearch.map((product) => (
                  <ProdPrev {...product} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default PageCATE;
