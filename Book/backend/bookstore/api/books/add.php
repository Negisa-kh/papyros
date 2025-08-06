<?php
  require_once '../../config/database.php';
require_once '../../includes/auth.php';
requireAuth();
header('Access-Control-Allow-Origin: *');
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
      http_response_code(405);
      echo json_encode(['error' => 'Method not allowed']);
      exit;
  }

  $data = json_decode(file_get_contents('php://input'), true);
  $title = $data['title'] ?? '';
  $author = $data['author'] ?? '';
  $description = $data['description'] ?? '';
  $cover_image = $data['cover_image'] ?? '';

  if (empty($title) || empty($author)) {
      http_response_code(400);
      echo json_encode(['error' => 'Title and author are required']);
      exit;
  }

  try {
      $stmt = $pdo->prepare('INSERT INTO books (title, author, description, cover_image) VALUES (?, ?, ?, ?)');
      $stmt->execute([$title, $author, $description, $cover_image]);
      echo json_encode(['message' => 'Book added successfully', 'id' => $pdo->lastInsertId()]);
  } catch (PDOException $e) {
      http_response_code(500);
      echo json_encode(['error' => 'Failed to add book: ' . $e->getMessage()]);
  }
  ?>