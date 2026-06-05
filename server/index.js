const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Security Middleware
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});

app.use('/api/', apiLimiter);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

// Cached connection promise
let cachedConnection = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  if (!cachedConnection) {
    console.log('Connecting to database...');
    cachedConnection = mongoose.connect(MONGO_URI)
      .then(conn => {
        console.log('MongoDB connected to portfolio_db');
        return conn;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        cachedConnection = null;
        throw err;
      });
  }
  return cachedConnection;
};

// Middleware to ensure DB connection on serverless functions
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
    } catch (err) {
      console.error('DB connection middleware error:', err.message);
    }
  }
  next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');
const copilotRoutes = require('./routes/copilotRoutes');
const guestbookRoutes = require('./routes/guestbookRoutes');
const blogRoutes = require('./routes/blogRoutes');
const botRoutes = require('./routes/botRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/guestbook', guestbookRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/bots', botRoutes);

app.get('/api/health', async (req, res) => {
  let dbStatus = 'OFFLINE';
  let connectionError = null;
  
  try {
    await connectDB();
    dbStatus = mongoose.connection.readyState === 1 ? 'SHARD HEALTHY' : 'OFFLINE';
  } catch (err) {
    dbStatus = 'OFFLINE';
    connectionError = err.message;
  }

  res.json({
    status: 'ONLINE',
    database: dbStatus,
    dbState: mongoose.connection.readyState,
    error: connectionError,
    nodeVersion: process.version,
    envCheck: {
      hasMongoUri: !!process.env.MONGO_URI,
      mongoUriLength: process.env.MONGO_URI ? process.env.MONGO_URI.length : 0,
      mongoUriType: process.env.MONGO_URI ? (process.env.MONGO_URI.startsWith('mongodb+srv://') ? 'SRV' : 'Standard') : 'None'
    }
  });
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
