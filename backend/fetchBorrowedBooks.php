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

// Fetch books data from the database based on borrowed book IDs
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $borrowedBookIds = json_decode(file_get_contents("php://input"), true);

    // Create a placeholder string for the prepared statement
    $placeholders = implode(",", array_fill(0, count($borrowedBookIds), "?"));

    // Prepare the SQL statement with placeholders
    $sql = "SELECT * FROM BOOKS WHERE ISBN IN ($placeholders)";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Bind the book IDs to the placeholders
    $stmt->bind_param(str_repeat("s", count($borrowedBookIds)), ...$borrowedBookIds);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Initialize an empty array to store the books data
    $booksData = array();

    // Fetch each row as an associative array
    while ($row = $result->fetch_assoc()) {
        // Convert price to float value
        $price = floatval($row['price']);

        // Add book data to the array
        $booksData[] = array(
            'id' => $row['ISBN'],
            'title' => $row['title'],
            'author' => $row['author'],
            'price' => $price,
            'imageUrl' => $row['imageUrl']
        );
    }

    // Output the books data as JSON
    header('Content-Type: application/json');
    echo json_encode($booksData);
}

// Close the database connection
$conn->close();
?>
