<?php

$env = parse_ini_file('.env');
// Database connection
$servername = "localhost";
$username = $env["USERNAME"];
$password = $env["PASSWORD"];
$dbname = $env["DBNAME"];

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetching books data from the database
$sql = "SELECT * FROM BOOKS";
$result = $conn->query($sql);

$booksData = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $price = floatval($row['price']);

        $booksData[] = array(
            'id' => $row['ISBN'],
            'title' => $row['title'],
            'author' => $row['author'],
            'price' => $price,
            'imageUrl' => $row['imageUrl']
        );
    }
}

// Close database connection
$conn->close();

// Outputting books data as JSON
header('Content-Type: application/json');
echo json_encode($booksData);
?>
