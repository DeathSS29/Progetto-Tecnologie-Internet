import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Alert, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../service/appApi';

const stripePromise = loadStripe(
  'pk_test_51Mgs4eDtmtlPrNkcu417opKEzm3ZYIqzMy119F7TeSubPLXSLgcmTsN8rYntda4nwjfIESCIPeNELSvMWV5wHIAx00vicqQS4z'
);

function Cart() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartOBJ = user.cart;
  let cart = products.filter((product) => userCartOBJ[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity === 0)
      return alert("it's impossible, you cannot put -1 products in your cart");
    decreaseCart(product);
  }

  return (
    <div>
      <h1
        className="ShopCart"
        style={{
          fontSize: '70px',
          color: 'blueviolet',
          fontFamily: 'impact',
          marginBottom: '60px',
        }}
      >
        SHOPPING CART
      </h1>

      <Container
        className="container"
        style={{
          width: '1400px',
          margiTop: '-60px',

          borderRadius: '20px',
        }}
      >
        {cart.length > 0 && (
          <>
            <Table className="cart-table" style={{ fontSize: '25px' }}>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {/* loop through cart products */}
                {cart.map((item) => (
                  <tr>
                    <td className="product">
                      {!isLoading && (
                        <i
                          className="fa fa-times"
                          style={{
                            marginLeft: '-100px',

                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            removeFromCart({
                              productId: item._id,
                              price: item.price,
                              userId: user._id,
                            })
                          }
                        ></i>
                      )}
                      <img
                        src={item.pictures[0].url}
                        style={{
                          width: '200px',
                          height: '200px',

                          marginLeft: '50px',
                          objectFit: 'cover',
                        }}
                        alt=""
                      />
                    </td>
                    <td>€{item.price}</td>
                    <td>
                      <span className="quantity">
                        <i
                          className="fa fa-minus-circle"
                          style={{
                            width: '50px',
                          }}
                          onClick={() =>
                            handleDecrease({
                              productId: item._id,
                              price: item.price,
                              userId: user._id,
                            })
                          }
                        ></i>
                        <span>{user.cart[item._id]}</span>
                        <i
                          className="fa fa-plus-circle"
                          style={{
                            width: '50px',
                          }}
                          onClick={() =>
                            increaseCart({
                              productId: item._id,
                              price: item.price,
                              userId: user._id,
                            })
                          }
                        ></i>
                      </span>
                    </td>
                    <td>€{item.price * user.cart[item._id]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <h3 className="totalPrice">Total Price: €{user.cart.total}</h3>
            </div>
          </>
        )}
      </Container>

      {cart.length === 0 ? (
        <Alert
          style={{
            backgroundColor: 'antiquewhite',
            width: '500px',
            marginLeft: '500px',
            alignContent: 'center',
            marginBottom: '200px',
          }}
        >
          Shopping cart is empty. Add product
        </Alert>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Cart;
