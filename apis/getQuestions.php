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
$quiz_id = $_GET['quiz_id'] ?? null;

if (!$quiz_id) {
    echo json_encode(['success' => false, 'error' => 'Quiz ID is required']);
    exit;
}

try {
    $sql = "SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option 
            FROM questions 
            WHERE quiz_id = :quiz_id AND question_text != ''";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['quiz_id' => $quiz_id]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $questions = [];

    foreach ($rows as $row) {
        $questions[] = [
            'id' => $row['id'],
            'question_text' => $row['question_text'],
            'options' => [
                $row['option_a'],
                $row['option_b'],
                $row['option_c'],
                $row['option_d']
            ],
            'correct_option' => $row['correct_option']
        ];
    }

    echo json_encode(['success' => true, 'questions' => $questions]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
