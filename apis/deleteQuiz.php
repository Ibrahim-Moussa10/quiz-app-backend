<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

header("Content-Type: application/json");
include('../config/connection.php');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if ($id) {
    try {
        $stmtDeleteQuestions = $pdo->prepare("DELETE FROM questions WHERE quiz_id = :quiz_id");
        $stmtDeleteQuestions->execute(['quiz_id' => $id]);
        $stmt = $pdo->prepare("DELETE FROM quizzes WHERE id = :id");
        $stmt->execute(['id' => $id]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Quiz ID is required"]);
}
?>
