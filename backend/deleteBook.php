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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get title of the book to be deleted
    $isbn = $request['ISBN'];

    var_dump($title);
    // Prepare SQL statement to delete the book
    $sql1 = "DELETE FROM BORROWED_BOOKS WHERE ISBN = '$isbn'";
    if ($conn->query($sql1) === TRUE) {
        echo "Record deleted from BORROWED_BOOKS successfully";
    } else {
        echo "Error deleting record from BORROWED_BOOKS: " . $conn->error;
    }

    // Then, delete from the BOOKS table
    $sql2 = "DELETE FROM BOOKS WHERE ISBN = '$isbn'";
    if ($conn->query($sql2) === TRUE) {
        echo "Record deleted from BOOKS successfully";
    } else {
        echo "Error deleting record from BOOKS: " . $conn->error;
    }
}

// Close the database connection
$conn->close();

?>
