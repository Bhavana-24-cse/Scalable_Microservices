const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurantDB';
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// Models
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

// Endpoints

app.get("/", (req, res) => {
    res.send("Welcome to the order Service!");
  });

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.post('/users/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (user) res.json(user);
  else res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/users/:id/orders', async (req, res) => {
  // Mock orders
  const orders = [{ id: 1, items: ['Pizza', 'Pasta'] }];
  res.json(orders);
});

// Start Server
app.listen(8004, () => console.log('User Service running on port 8004'));
