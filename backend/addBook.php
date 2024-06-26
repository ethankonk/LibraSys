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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $title = $_POST['title'];
    $author = $_POST['author'];
    $price = $_POST['price'];
    $isbn = $_POST['isbn'];

    // Upload cover image
    $targetDir = __DIR__ . "/../build/static/media/";
    $targetFile = $targetDir . basename($_FILES["coverImage"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["coverImage"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // Check file size
    if ($_FILES["coverImage"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
        $fileName = basename($_FILES["coverImage"]["name"]);
        if (move_uploaded_file($_FILES["coverImage"]["tmp_name"], $targetDir . $fileName)) {
            // Insert book data into database
            $sql = "INSERT INTO BOOKS (ISBN, title, author, price, imageUrl) 
            VALUES ('$isbn', '$title', '$author', '$price', '$fileName')";

            if ($conn->query($sql) === TRUE) {
                // Book inserted successfully
                echo json_encode(array("success" => true));
            } else {
                // Error inserting book
                echo json_encode(array("success" => false, "error" => "Error inserting book"));
            }
        } else {
            echo json_encode(array("success" => false, "error" => "Sorry, there was an error uploading your file."));
        }
    }
}

// Close the database connection
$conn->close();
?>
