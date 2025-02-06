#!/bin/bash

# Prompt user for folder name
read -p "Enter project folder name: " folder_name

# Validate input
if [ -z "$folder_name" ]; then
    echo "Error: Folder name cannot be empty!"
    exit 1
fi

# Check if folder exists
if [ -d "$folder_name" ]; then
    echo "Error: Folder '$folder_name' already exists!"
    exit 1
fi

# Create folder
mkdir -p "$folder_name" || { echo "Failed to create directory"; exit 1; }

# Create HTML/CSS/JS files with boilerplate (same as before)
cat > "$folder_name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to Index Page</h1>
    <script src="index.js"></script>
</body>
</html>
EOF

cat > "$folder_name/app.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to App Page</h1>
    <script src="app.js"></script>
</body>
</html>
EOF

cat > "$folder_name/styles.css" << EOF
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    padding: 20px;
}
EOF

touch "$folder_name/index.js" "$folder_name/app.js"

# ==== Key Fix: Directory Navigation ====
# After creating files, navigate to the folder
cd "$folder_name" || exit

# Final message
echo "Project '$folder_name' created! You are now in: $(pwd)"
