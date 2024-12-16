import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {
  userRoutes,
  productRoutes,
  orderRoutes,
  categoryRoutes,
  cartRoutes,
} from './routes/index.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export { app };
