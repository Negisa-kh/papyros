<?php
require_once '../../config/database.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['username'], $input['email'], $input['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Username, email, and password are required']);
        exit;
    }

    $username = trim($input['username']);
    $email = trim($input['email']);
    $password = $input['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $checkStmt = $pdo->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
    $checkStmt->execute([$username, $email]);
    if ($checkStmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'Username or email already exists']);
        exit;
    }

    $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$username, $email, $passwordHash]);

    $user_id = $pdo->lastInsertId();
    echo json_encode(['message' => 'User registered', 'user_id' => $user_id], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to register user']);
}
?>