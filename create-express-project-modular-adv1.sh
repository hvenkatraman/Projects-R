#!/bin/bash

# Ask for the project name
echo "Enter the project name:"
read project_name

# Create the project directory
mkdir "$project_name"
cd "$project_name" || exit

# Initialize npm and install dependencies
npm init -y
npm install express nodemon ejs moment mongoose body-parser dotenv

# Create the required folder structure
mkdir -p config init modals routes views/partials controllers public/{css,js,pictures,others}

# Create configuration files in the config folder
cat > config/constants.js <<EOF
// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

const { PORT, MONGO_URI, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, POSTGRES_URI } = process.env;

module.exports = {
    PORT,
    MONGO_URI,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,
    POSTGRES_URI,
};
EOF

cat > .env <<EOF
PORT=3000
MONGO_URI=mongodb://localhost:27017/${project_name}
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=${project_name}
POSTGRES_URI=postgres://user:password@localhost:5432/${project_name}
EOF

# Create database files in the init folder
cat > init/mongodb.js <<EOF
// MongoDB configuration
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
EOF

cat > init/mysqldb.js <<EOF
// MySQL configuration
const mysql = require('mysql');

const connectDB = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    });

    connection.connect(err => {
        if (err) throw err;
        console.log('MySQL connected');
    });

    return connection;
};

module.exports = connectDB;
EOF

cat > init/postgresqldb.js <<EOF
// PostgreSQL configuration
const { Pool } = require('pg');

const connectDB = () => {
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URI,
    });

    pool.on('connect', () => {
        console.log('PostgreSQL connected');
    });

    return pool;
};

module.exports = connectDB;
EOF

# Create a model file
cat > modals/${project_name^}.js <<EOF
// ${project_name^} model
const mongoose = require('mongoose');

const ${project_name^}Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('${project_name^}', ${project_name^}Schema);
EOF

# Create a route file
cat > routes/todo.js <<EOF
// Todo routes
const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo');

// Define routes
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
EOF

# Create a controller file
cat > controllers/todo.js <<EOF
// Todo controller
const getTodos = (req, res) => {
    const mockItems = [
        { id: 1, name: 'Task 1', description: 'Description for Task 1' },
        { id: 2, name: 'Task 2', description: 'Description for Task 2' },
    ];
    res.render('index', { title: 'Todo List', items: mockItems });
};

const createTodo = (req, res) => {
    // Add logic to create a new item
    res.redirect('/');
};

const updateTodo = (req, res) => {
    // Add logic to update an item
    res.redirect('/');
};

const deleteTodo = (req, res) => {
    // Add logic to delete an item
    res.redirect('/');
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
EOF

# Create EJS view files
cat > views/index.ejs <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | ${project_name}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <%- include('partials/header') %>
    <%- include('partials/navbar') %>
    <main>
        <h1><%= title %></h1>

        <!-- Form Example -->
        <h2>Create New Item</h2>
        <%- include('partials/form', { action: '/create', buttonLabel: 'Create', data: null }) %>

        <!-- Table Example -->
        <h2>Item List</h2>
        <%- include('partials/table', { data: items }) %>
    </main>
    <%- include('partials/sidebar') %>
    <%- include('partials/footer') %>
</body>
</html>
EOF

cat > views/partials/header.ejs <<EOF
<header>
    <h1>${project_name} Header</h1>
</header>
EOF

cat > views/partials/footer.ejs <<EOF
<footer>
    <p>&copy; 2025 ${project_name}</p>
</footer>
EOF

cat > views/partials/navbar.ejs <<EOF
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
EOF

cat > views/partials/sidebar.ejs <<EOF
<aside>
    <h2>Sidebar</h2>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</aside>
EOF

cat > views/partials/form.ejs <<EOF
<form action="<%= action %>" method="POST">
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="<%= data ? data.name : '' %>" required>
    </div>
    <div>
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="4" required><%= data ? data.description : '' %></textarea>
    </div>
    <button type="submit"><%= buttonLabel %></button>
</form>
EOF

cat > views/partials/table.ejs <<EOF
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <% if (data && data.length > 0) { %>
            <% data.forEach(item => { %>
                <tr>
                    <td><%= item.name %></td>
                    <td><%= item.description %></td>
                    <td>
                        <a href="/edit/<%= item.id %>">Edit</a>
                        <form action="/delete/<%= item.id %>" method="POST" style="display:inline;">
                            <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            <% }) %>
        <% } else { %>
            <tr>
                <td colspan="3">No data available</td>
            </tr>
        <% } %>
    </tbody>
</table>
EOF

# Create CSS file
cat > public/css/style.css <<EOF
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
header, footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1em 0;
}
EOF

# Create app.js for main server logic
cat > app.js <<EOF
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');
const connectDB = require('./init/mongodb'); // Example for MongoDB
const { PORT } = require('./config/constants');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to the database
connectDB();

// Routes
app.use('/', todoRoutes);

module.exports = app;
EOF

# Create index.js as the entry point
cat > index.js <<EOF
const app = require('./app');
const { PORT } = require('./config/constants');

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
EOF

echo "Project '$project_name' created successfully!"
