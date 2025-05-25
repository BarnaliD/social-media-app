// Entry point: sets up Express server and applies middleware & routes
require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api/users', userRoutes); // Register all user-related routes
app.use('/auth', userRoutes);
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });
  
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
