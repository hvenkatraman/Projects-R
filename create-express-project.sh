#!/bin/bash

# Prompt user for project name
read -p "Enter project name: " projectName

# Create project folder and navigate into it
mkdir "$projectName"
cd "$projectName"

# Initialize npm project
npm init -y

# Install necessary packages
npm install express cookie-parser body-parser nodemon mongoose

# Create a basic index.js template
cat <<EOL > index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
EOL

# Edit package.json to use nodemon
sed -i 's/"test": "echo \\\"Error: no test specified\\\" && exit 1"/"start": "nodemon index.js"/' package.json

echo "Express project '$projectName' created successfully."
