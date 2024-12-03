const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/restaurantDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurantDB';
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));


// Models
const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
  name: String,
  address: String,
  menu: [{ name: String, price: Number }],
}));

// Endpoints

app.get("/", (req, res) => {
  res.send("Welcome to the Restaurant Service!");
});


app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

app.get('/restaurants/:id', async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
});

app.post('/restaurants', async (req, res) => {
  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res.status(201).json(restaurant);
});

app.get('/restaurants/:id/menu', async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant.menu);
});

app.post('/restaurants/:id/menu', async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  restaurant.menu.push(req.body);
  await restaurant.save();
  res.status(201).json(restaurant.menu);
});

// Start Server
app.listen(8001, () => console.log('Restaurant Service running on port 8001'));
