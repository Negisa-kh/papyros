<?php
  require_once '../../config/database.php';
require_once '../../includes/auth.php';
requireAuth();
header('Access-Control-Allow-Origin: *');
  if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
      http_response_code(405);
      echo json_encode(['error' => 'Method not allowed']);
      exit;
  }

  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data['id'] ?? '';
  $title = $data['title'] ?? '';
  $author = $data['author'] ?? '';
  $description = $data['description'] ?? '';
  $cover_image = $data['cover_image'] ?? '';

  if (empty($id) || empty($title) || empty($author)) {
      http_response_code(400);
      echo json_encode(['error' => 'ID, title and author are required']);
      exit;
  }

  try {
      $stmt = $pdo->prepare('UPDATE books SET title = ?, author = ?, description = ?, cover_image = ? WHERE id = ?');
      $stmt->execute([$title, $author, $description, $cover_image, $id]);
      echo json_encode(['message' => 'Book updated successfully']);
  } catch (PDOException $e) {
      http_response_code(500);
      echo json_encode(['error' => 'Failed to update book: ' . $e->getMessage()]);
  }
  ?>