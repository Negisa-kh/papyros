<?php
  require_once '../../config/database.php';
require_once '../../includes/auth.php';
requireAuth();
header('Access-Control-Allow-Origin: *');
  if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
      http_response_code(405);
      echo json_encode(['error' => 'Method not allowed']);
      exit;
  }

  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data['id'] ?? '';

  if (empty($id)) {
      http_response_code(400);
      echo json_encode(['error' => 'ID is required']);
      exit;
  }

  try {
      $stmt = $pdo->prepare('DELETE FROM books WHERE id = ?');
      $stmt->execute([$id]);
      echo json_encode(['message' => 'Book deleted successfully']);
  } catch (PDOException $e) {
      http_response_code(500);
echo json_encode(['error' => 'Failed to delete book: ' . $e->getMessage()]);  }
  ?>