<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
include('connection.php');

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'] ?? '';

if ($title) {
    try {
        $stmt = $pdo->prepare("INSERT INTO quizzes (title) VALUES (:title)");
        $stmt->execute(['title' => $title]);
        echo json_encode(["success" => true, "quiz_id" => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Title is required"]);
}
?>
