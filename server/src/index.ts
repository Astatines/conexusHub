// In index.ts
import express from 'express';
import cors from 'cors';
import shopRoutes from './routes/shopRoutes'; // Use import instead of require

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the routes
app.use('/api/shop', shopRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
