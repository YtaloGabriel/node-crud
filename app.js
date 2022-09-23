const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());

// Array to store products
const products = [];

// POST Method
app.post('/products', (request, response) => {
  const { name, price } = request.body;
  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);
  return response.json(product);
});

// GET Method - All products
app.get('/products', (request, response) => {
  return response.json(products);
});

// GET Method - Product by id
app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);

  return response.json(product);
});

// PUT Method = Create or update product
app.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  return response.json({ message: 'Product successfully updated' });
});

// DELETE Method
app.delete('/products/:id', (request, response) => {
  const { id } = request.params;
  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  return response.json({ message: 'Product successfully removed.' });
});

app.listen(4002, () => console.log('Server  running on port 4002'));
