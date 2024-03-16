<?php

$env = parse_ini_file('.env');
// Database connection
$servername = "localhost";
$username = $env["USERNAME"];
$password = $env["PASSWORD"];
$dbname = $env["DBNAME"];

// Read the raw input from the request body
$data = file_get_contents("php://input");
$request = json_decode($data, true);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request contains a 'login' key
if(isset($request['login'])) {
    $email = $request['email'];
    $password = $request['password'];
    
    // Query to fetch user from database
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // User found, login successful
        $row = $result->fetch_assoc();
        echo json_encode(array("success" => true, "message" => "Login successful", "username" => $row['username']));
    } else {
        // User not found or incorrect credentials
        echo json_encode(array("success" => false, "message" => "Invalid email or password"));
    }
}

// Check if the request contains a 'signup' key
if(isset($request['signup'])) {
    $email = $request['email'];
    $username = $request['username'];
    $password = $request['password'];
    
    // Query to check if email already exists
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Email already exists
        echo json_encode(array("success" => false, "message" => "Email already registered"));
    } else {
        // Insert new user into database
        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
        if ($conn->query($sql) === TRUE) {
            // User registration successful
            echo json_encode(array("success" => true, "message" => "User registered successfully"));
        } else {
            // Error occurred while registering user
            echo json_encode(array("success" => false, "message" => "Error registering user"));
        }
    }
}

// Close database connection
$conn->close();
?>
