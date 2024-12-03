const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Routes for forwarding requests to other services
app.post('/orders', async (req, res) => {
  try {
    const response = await axios.post('http://order-service:8002/orders', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error processing order' });
  }
});

app.get('/orders/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://order-service:8002/orders/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
});

app.get('/deliveries/order/:orderId', async (req, res) => {
  try {
    const response = await axios.get(`http://delivery-service:8003/deliveries/order/${req.params.orderId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching delivery' });
  }
});

// Start Server
app.listen(8000, () => console.log('API Gateway running on port 8000'));
