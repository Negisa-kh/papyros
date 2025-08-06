<?php
require_once '../../config/database.php';
require_once '../../includes/auth.php';

// افزودن هدرهای CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// برای تست، احراز هویت را غیرفعال می‌کنیم یا user_id پیش‌فرض را استفاده می‌کنیم
requireAuth();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // پاسخ به درخواست‌های OPTIONS (برای CORS preflight)
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$user_id = $_GET['user_id'] ?? $_SESSION['user_id']; 

if (empty($user_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare('
        SELECT f.*, b.title, b.author, b.description, b.cover_image 
        FROM favorites f 
        JOIN books b ON f.book_id = b.id 
        WHERE f.user_id = ?
    ');
    $stmt->execute([$user_id]);
    $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($favorites, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch favorites: ' . $e->getMessage()]);
}
?>