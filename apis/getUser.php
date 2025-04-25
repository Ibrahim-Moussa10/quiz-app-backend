<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include('../config/connection.php');

try {
    $stmt = $pdo->query("SELECT users.id, users.email, users.username, scores.quiz_id, scores.score 
                         FROM users 
                         LEFT JOIN scores ON users.id = scores.user_id");

    $rawResults = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $users = [];

    foreach ($rawResults as $row) {
        $email = $row['email'];
        if (!isset($users[$email])) {
            $users[$email] = [
                'email' => $email,
                'username' => $row['username'],
                'scores' => [],
                'total_score' => 0
            ];
        }

        if ($row['quiz_id'] !== null) {
            $users[$email]['scores'][$row['quiz_id']] = $row['score'];
            $users[$email]['total_score'] += (int)$row['score'];
        }
    }

    echo json_encode(['success' => true, 'users' => array_values($users)]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
