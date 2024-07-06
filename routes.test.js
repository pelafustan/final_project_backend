const request = require('supertest');
const express = require('express');
const { routes } = require('./routes/routes'); 
const { requireUser } = require('./middlewares/requireUser'); 

const app = express();
app.use(express.json());
routes(app);

describe('API Routes', () => {
  // Test para obtener todos los productos
  test('GET /productos should return 200 and an array of products', async () => {
    const response = await request(app).get('/productos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test para obtener detalles de un producto por ID
  test('GET /productos/:id should return 200 and a product object if the product exists', async () => {
    const productId = 1; 
    const response = await request(app).get(`/productos/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', productId);
  });

  // Test para registrar un nuevo usuario
  test('POST /registro should return 201 when a user is registered', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'testpassword',
    };
    const response = await request(app)
      .post('/registro')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Test para crear una nueva sesión (login)
  test('POST /sesion should return 200 and a session object', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword',
    };
    const response = await request(app)
      .post('/sesion')
      .send(loginData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
