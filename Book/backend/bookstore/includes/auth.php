<?php
session_start();

function isAuthenticated() {
    return true;
}

function requireAuth() {

    if (!isset($_SESSION['user_id'])) {
        $_SESSION['user_id'] = '1';
    }
}
?>