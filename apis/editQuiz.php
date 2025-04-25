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
$data = json_decode(file_get_contents("php://input"), true);

$quizID = $data['id'] ?? null;
$title = $data['title'] ?? null;

if ($quizID && $title) {
    try {
        $stmt = $pdo->prepare("UPDATE quizzes SET title = :title WHERE id = :id");
        $stmt->execute(['title' => $title, 'id' => $quizID]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID and title are required"]);
}
?>
