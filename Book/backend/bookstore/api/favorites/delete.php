<?php
require_once '../../config/database.php';
require_once '../../includes/auth.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = isset($data['user_id']) ? $data['user_id'] : $_SESSION['user_id'];
$book_id = $data['book_id'] ?? '';

if (empty($user_id) || empty($book_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID and Book ID are required']);
    exit;
}

try {
    $stmt = $pdo->prepare('DELETE FROM favorites WHERE user_id = ? AND book_id = ?');
    $stmt->execute([$user_id, $book_id]);
    echo json_encode(['message' => 'Removed from favorites successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to remove from favorites: ' . $e->getMessage()]);
}
?>