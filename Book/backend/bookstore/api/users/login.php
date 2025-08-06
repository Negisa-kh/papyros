<?php
require_once '../../config/database.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit;
}

error_log("Login attempt: username=$username, password=$password");

try {
    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? AND password = ?');
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(['message' => 'Logged in successfully', 'user_id' => $user['id']]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    error_log("PDOException: " . $e->getMessage());
    echo json_encode(['error' => 'Login failed: ' . $e->getMessage()]);
}
?>