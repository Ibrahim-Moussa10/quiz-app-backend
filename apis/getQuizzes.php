<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
header("Content-Type: application/json");

include('connection.php');

try {
    $stmt = $pdo->query("SELECT id, title FROM quizzes");
    $quizzes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "quizzes" => $quizzes]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>