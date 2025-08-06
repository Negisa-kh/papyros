<?php
require_once '../../config/database.php';
header('Access-Control-Allow-Origin: *');
try {
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Book ID is required and must be a number']);
        exit;
    }

    $id = $_GET['id'];
    $stmt = $pdo->prepare('SELECT * FROM books WHERE id = ?');
    $stmt->execute([$id]);
    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$book) {
        http_response_code(404);
        echo json_encode(['error' => 'Book not found']);
        exit;
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($book, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch book: ' . $e->getMessage()]);
}