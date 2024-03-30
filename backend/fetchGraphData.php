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

// Fetch ISBN and borrowed_date from BORROWED_BOOKS table
$sql = "SELECT ISBN, borrowed_date FROM BORROWED_BOOKS";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $borrowedData = array();
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $borrowedData[] = array(
            'ISBN' => $row['ISBN'],
            'date' => $row['borrowed_date']
        );
    }
    // Convert the array to JSON and output
    echo json_encode($borrowedData);
} else {
    echo "0 results";
}

// Close the database connection
$conn->close();

?>