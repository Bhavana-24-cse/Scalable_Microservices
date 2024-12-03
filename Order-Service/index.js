const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/orderDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-db:27017/restaurantDB';
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));


// Models
const Order = mongoose.model('Order', new mongoose.Schema({
  userId: String,
  restaurantId: String,
  items: [{ name: String, quantity: Number }],
  status: { type: String, default: 'pending' },
}));

// Endpoints

app.get("/", (req, res) => {
  res.send("Welcome to the Order Service!");
});

app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

app.put('/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.get('/orders/user/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

// Start Server
app.listen(8002, () => console.log('Order Service running on port 8002'));
