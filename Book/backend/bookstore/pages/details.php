<?php
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$conn = new mysqli("localhost", "root", "", "bookstore"); 
if ($conn->connect_error) {
    die("اتصال به دیتابیس ناموفق بود: " . $conn->connect_error);
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');

error_log("Connected to database. Requested ID: " . $id);

$sql = "SELECT * FROM books WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Prepare failed: " . $conn->error); 
    die("خطا در آماده‌سازی کوئری: " . $conn->error);
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$book = $result->fetch_assoc();

if (!$book) {
    error_log("No book found for ID: " . $id);
}

if ($book) {
    echo "<!DOCTYPE html>";
    echo "<html lang='fa'>";
    echo "<head>";
    echo "<meta charset='UTF-8'>";
    echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    echo "<title>جزئیات کتاب: " . htmlspecialchars($book['title']) . "</title>";
    echo "<style>";
    echo "body { font-family: Arial, sans-serif; direction: rtl; margin: 20px; background-color: #f9f9f9; }";
    echo "h1 { color: #4B0082; margin-bottom: 10px; }";
    echo "p { margin: 5px 0; color: #333; }";
    echo "img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }";
    echo "</style>";
    echo "</head>";
    echo "<body>";
    echo "<h1>" . htmlspecialchars($book['title']) . "</h1>";
    echo "<p><strong>نویسنده:</strong> " . htmlspecialchars($book['author']) . "</p>";
    echo "<p>" . htmlspecialchars($book['description']) . "</p>";
    echo "<img src='" . htmlspecialchars($book['cover_image']) . "' alt='" . htmlspecialchars($book['title']) . "'>";
    echo "</body>";
    echo "</html>";
} else {
    echo "<!DOCTYPE html>";
    echo "<html lang='fa'>";
    echo "<head>";
    echo "<meta charset='UTF-8'>";
    echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    echo "<title>خطا</title>";
    echo "<style>";
    echo "body { font-family: Arial, sans-serif; direction: rtl; margin: 20px; color: red; background-color: #f9f9f9; }";
    echo "</style>";
    echo "</head>";
    echo "<body>";
    echo "کتابی با این شناسه یافت نشد!";
    echo "</body>";
    echo "</html>";
}

$stmt->close();
$conn->close();
?>