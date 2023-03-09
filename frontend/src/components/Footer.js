import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <div
            className="box"
            style={{
              marginBottom: '10px',
              marginRight: '1000px',
            }}
          >
            <img src="logo.png" alt="" />
            <p>"Find new life for pre-loved items"</p>
          </div>

          <div
            className="box1"
            style={{ width: '200px', marginLeft: '350px', marginTop: '-90px' }}
          >
            <div className="icon d_flex">
              <div className="img d_flex">
                <i className="fa-brands fa-google-play"></i>
                <span>Google Play</span>
              </div>
              <div
                className="img d_flex"
                style={{
                  width: '200px',
                  marginLeft: '205px',
                  marginTop: '-60px ',
                }}
              >
                <i class="fa-brands fa-app-store-ios"></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div
            className="box"
            style={{
              width: '260px',
              marginLeft: '1100px',
              marginTop: '-100px',
            }}
          >
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div
            className="box"
            style={{
              width: '260px',
              marginLeft: '800px',
              marginTop: '-230px',
            }}
          >
            <h2>Contact Us</h2>
            <ul>
              <li> Italia,Via Roma 10, Roma (RM) CAP 00100</li>
              <li>Email: exemple@gmail.com</li>
              <li>Phone: +22 222 2222 222</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
