<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}

include('../config/connection.php');

$username = trim($data['username']);
$email = trim(strtolower($data['email']));
$password = trim($data['password']);

if (strlen($username) < 3 || strlen($password) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->execute([
        'username' => $username,
        'email' => $email,
        'password' => $password 
    ]);

    echo json_encode(['success' => true, 'message' => 'Registration successful!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'error']);
}
?>
