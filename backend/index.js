const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const stripe = require('stripe')(
  'sk_test_51Mgs4eDtmtlPrNkcXr8toTBN4b7BzbLOcvsRVDp3IsGzQmpYm48IggpaVabyuIh9sI2OQEM16wWsEfT1yKet8H3P00AXgYCGLk'
);
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
});

const main = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(
    'mongodb+srv://progetto:francescovona@cluster0.nzedvca.mongodb.net/project?retryWrites=true&w=majority'
  );
};
const User = require('./models/User');
const Product = require('./models/Product');
const AuthContrUser = require('./controllers/AuthContrUser');
const AuthContrProduct = require('./controllers/AuthContrProduct');
const AuthContrImg = require('./controllers/AuthContrImg');
const AuthContrOrder = require('./controllers/AuthContrOrder');
main();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', AuthContrUser);
app.use('/products', AuthContrProduct);
app.use('/images', AuthContrImg);
app.use('/orders', AuthContrOrder);

app.post('/create-payment', async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: '100',
      currency: 'eur',
      payment_method_types: ['card'],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

server.listen(27017, () => {
  console.log('server running at port', 27017);
});

app.set('socketio', io);
