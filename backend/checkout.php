<?php

$env = parse_ini_file('.env');
// Database connection
$servername = "localhost";
$username = $env["USERNAME"];
$password = $env["PASSWORD"];
$dbname = $env["DBNAME"];

$data = file_get_contents("php://input");
$request = json_decode($data, true);

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user's ID and cart items
    $userID = $request['userID'];
    $cartItems = $request['cartItems'];
    $date = date('Y-m-d');

    var_dump($userID);
    // Insert each book in the cart into the BORROWED_BOOKS table
    foreach ($cartItems as $ISBN) {
        $sql = "INSERT INTO BORROWED_BOOKS (user_id, ISBN, borrowed_date) 
            VALUES ('$userID', '$ISBN', '$date')";
        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
            // If an error occurs, you may choose to break the loop or handle the error differently
        }
        echo "looped";
    }
    echo "no loop";

} else {
    echo "Invalid request method";
}

// Close the database connection
$conn->close();

?>