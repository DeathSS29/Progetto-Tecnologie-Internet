import React from 'react';
import Sdata from './Sdata';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlideCard.css';
import { Link } from 'react-router-dom';

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: '0px' }}>{dots}</ul>;
    },
  };
  return (
    <>
      <div className="box d_flex top">
        <Slider {...settings}>
          {Sdata.map((value) => {
            return (
              <>
                <div className="left">
                  <h1>{value.title}</h1>
                  <p>{value.desc}</p>
                  <Link
                    to="/category/all"
                    style={{
                      fontSize: 20,
                      textDecoration: 'none',
                      borderRadius: '5px',
                      backgroundColor: 'blueviolet',
                      color: 'white',
                      marginTop: '-200px',
                      marginRight: '400px',
                    }}
                  >
                    Visit Collections
                  </Link>
                </div>
                <div className="right">
                  <img src={value.cover} alt="" />
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default SlideCard;
