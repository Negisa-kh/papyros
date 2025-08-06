<?php
require_once '../../config/database.php';
require_once '../../includes/auth.php';
// requireAuth();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

try {
    $query = isset($_GET['query']) ? trim($_GET['query']) : '';
    if (empty($query)) {
        echo json_encode([]);
        exit;
    }

    $stmt = $pdo->prepare('SELECT * FROM books WHERE title LIKE :query ORDER BY created_at DESC');
    $stmt->execute(['query' => '%' . $query . '%']);
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($books, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to search books: ' . $e->getMessage()]);
}
?>