const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/deliveryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Delivery = mongoose.model('Delivery', new mongoose.Schema({
  orderId: String,
  driver: String,
  status: { type: String, default: 'assigned' },
}));

// Endpoints

app.get("/", (req, res) => {
  res.send("Welcome to the Delivery Service!");
});

app.post('/deliveries', async (req, res) => {
  const delivery = new Delivery(req.body);
  await delivery.save();
  res.status(201).json(delivery);
});

app.get('/deliveries/:id', async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  res.json(delivery);
});

app.put('/deliveries/:id/status', async (req, res) => {
  const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(delivery);
});

app.get('/deliveries/order/:orderId', async (req, res) => {
  const delivery = await Delivery.findOne({ orderId: req.params.orderId });
  res.json(delivery);
});

app.get('/deliveries', async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
});

// Start Server
app.listen(8003, () => console.log('Delivery Service running on port 8003'));
