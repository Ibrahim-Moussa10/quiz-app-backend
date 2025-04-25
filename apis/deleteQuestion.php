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
$questionID = $data['questionID'] ?? null;

if ($questionID) {
    try {
        $stmt = $pdo->prepare("DELETE FROM questions WHERE id = :question_id");
        $stmt->execute(['question_id' => $questionID]);
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Question deleted successfully"]);
        } else {
            echo json_encode(["error" => "No question found with the given ID"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Question ID is required"]);
}
?>
