<?php

$env = parse_ini_file('.env');
// Database connection
$servername = "localhost";
$username = $env["USERNAME"];
$password = $env["PASSWORD"];
$dbname = $env["DBNAME"];

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get title of the book to be deleted
    $title = $_POST['title'];

    // Prepare SQL statement to delete the book
    $sql = "DELETE FROM BOOKS WHERE title = '$title'";

    // Execute the SQL statement
    if ($conn->query($sql) === TRUE) {
        echo "Book deleted successfully";
    } else {
        echo "Error deleting book: " . $conn->error;
    }
}

// Close the database connection
$conn->close();

?>
