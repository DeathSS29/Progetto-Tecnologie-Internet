import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import category from '../category';
import './Home.css';
import { useDispatch } from 'react-redux';
import axios from '../axios';
import { UpdateProducts } from '../features/productSlice';
import SlideCard from './SlideCard';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(UpdateProducts(data)));
  }, []);

  return (
    <div className="Home">
      <div className="home-photo"></div>
      <section className="section">
        <div className="container d_flex">
          <SlideCard />
        </div>
      </section>
      <div>
        <Link
          to="/category/all"
          style={{
            textAlign: 'right',

            marginLeft: '1200px',
          }}
        >
          SEE MORE{'>>'}
        </Link>
      </div>
      {/*sales banner*/}

      <div className="sale_banner ">
        <img src="/banner.png " alt="" />
      </div>
      <div className="recent-products">
        <h2
          style={{
            textAlign: 'center',
            color: 'blueviolet',
            fontFamily: 'impact',
            fontSize: '60px',
            margin: '60px',
            marginRight: '1200px',
            marginBottom: '30px',
            marginTop: '-500px',
          }}
        >
          Categories
        </h2>
        <Row>
          {category.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.7)),url(${category.img})`,
                    gap: '10px',
                    marginBottom: '50px',
                  }}
                  className="category-title"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
