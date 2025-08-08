import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
 import employeeRoutes from './routes/employeeRoutes.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes


app.use('/api/employee', employeeRoutes);


// Health check
app.get('/', (req, res) => {
  res.send('Fleet Management Backend is Live 🚚');
});

export default app;
