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

$quizID = $data['quizID'] ?? null;
$questionID = $data['questionID'] ?? null;
$question = $data['question'] ?? null;
$optionA = $data['optionA'] ?? null;
$optionB = $data['optionB'] ?? null;
$optionC = $data['optionC'] ?? null;
$optionD = $data['optionD'] ?? null;
$correctOption = $data['correctOption'] ?? null;
if ($quizID && $questionID && $question && $optionA && $optionB && $optionC && $optionD && $correctOption) {
    $sqlCheckQuiz = "SELECT * FROM quizzes WHERE id = :quiz_id";
    $stmtCheckQuiz = $pdo->prepare($sqlCheckQuiz);
    $stmtCheckQuiz->execute(['quiz_id' => $quizID]);

    $quiz = $stmtCheckQuiz->fetch(PDO::FETCH_ASSOC);

    if (!$quiz) {
        echo json_encode(['error' => 'Quiz ID does not exist']);
        exit;
    }
    try {
        $stmt = $pdo->prepare("UPDATE questions SET 
                               question_text = :question_text,
                               option_a = :option_a,
                               option_b = :option_b,
                               option_c = :option_c,
                               option_d = :option_d,
                               correct_option = :correct_option
                               WHERE id = :question_id AND quiz_id = :quiz_id");

        $stmt->execute([
            'question_text' => $question,
            'option_a' => $optionA,
            'option_b' => $optionB,
            'option_c' => $optionC,
            'option_d' => $optionD,
            'correct_option' => $correctOption,
            'question_id' => $questionID,
            'quiz_id' => $quizID
        ]);

        echo json_encode(["success" => true, "message" => "Question updated successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "All fields are required"]);
}
?>
