<?php
  require_once '../../includes/auth.php';

  session_start();
  session_destroy();
  echo json_encode(['message' => 'Logout successful']);
  ?>