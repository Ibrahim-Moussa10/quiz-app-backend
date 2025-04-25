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
$data = json_decode(file_get_contents('php://input'), true);

$quizID = $data['quizID'];
$question = $data['question'];
$optionA = $data['optionA'];
$optionB = $data['optionB'];
$optionC = $data['optionC'];
$optionD = $data['optionD'];
$correctOption = $data['correctOption'];

if ($quizID && $question && $optionA && $optionB && $optionC && $optionD && $correctOption) {

    $sqlCheckQuiz = "SELECT * FROM quizzes WHERE id = :quiz_id";
    $stmtCheckQuiz = $pdo->prepare($sqlCheckQuiz);
    $stmtCheckQuiz->execute(['quiz_id' => $quizID]);

    $quiz = $stmtCheckQuiz->fetch(PDO::FETCH_ASSOC);

    if (!$quiz) {
        echo json_encode(['error' => 'Quiz ID does not exist']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) 
                       VALUES (:quiz_id, :question_text, :option_a, :option_b, :option_c, :option_d, :correct_option)");
        $stmt->execute([
            'quiz_id' => $quizID,
            'question_text' => $question,
            'option_a' => $optionA,
            'option_b' => $optionB,
            'option_c' => $optionC,
            'option_d' => $optionD,
            'correct_option' => $correctOption
        ]);
        
        $questionID = $pdo->lastInsertId();
        
        echo json_encode(["success" => true, "message" => "Question created successfully", "questionID" => $questionID]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "All fields are required"]);
}
?>
