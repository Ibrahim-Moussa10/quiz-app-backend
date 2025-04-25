<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include('connection.php');

$data = json_decode(file_get_contents("php://input"));

$userId = $data->user_id ?? null;
$quizId = $data->quiz_id ?? null;
$score = $data->score ?? null;

if ($userId && $quizId && $score !== null) {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE id = :user_id");
    $stmt->execute(['user_id' => $userId]);
    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT * FROM scores WHERE user_id = :user_id AND quiz_id = :quiz_id");
    $stmt->execute([
        'user_id' => $userId,
        'quiz_id' => $quizId
    ]);

    if ($stmt->rowCount() > 0) {
        $stmt = $pdo->prepare("UPDATE scores SET score = :score WHERE user_id = :user_id AND quiz_id = :quiz_id");
        $stmt->execute([
            'user_id' => $userId,
            'quiz_id' => $quizId,
            'score' => $score
        ]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO scores (user_id, quiz_id, score) VALUES (:user_id, :quiz_id, :score)");
        $stmt->execute([
            'user_id' => $userId,
            'quiz_id' => $quizId,
            'score' => $score
        ]);
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
}
