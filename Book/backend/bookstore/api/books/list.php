<?php
  require_once '../../config/database.php';
require_once '../../includes/auth.php';
// requireAuth();
header('Access-Control-Allow-Origin: *');
  try {
      $stmt = $pdo->query('SELECT * FROM books ORDER BY created_at DESC');
      $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
      header('Content-Type: application/json; charset=utf-8');
      echo json_encode($books, JSON_UNESCAPED_UNICODE);
  } catch (PDOException $e) {
      http_response_code(500);
      echo json_encode(['error' => 'Failed to fetch books: ' . $e->getMessage()]);
  }
?>