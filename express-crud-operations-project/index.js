const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app= express();

app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8000, () => {
  console.log(`Server is running on port :8000`);
});
