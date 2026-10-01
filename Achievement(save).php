<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$studentName = trim($_POST['student_name'] ?? '');
$rollNumber = trim($_POST['roll_number'] ?? '');
$department = trim($_POST['department'] ?? '');
$category = trim($_POST['category'] ?? '');
$eventName = trim($_POST['event_name'] ?? '');
$level = trim($_POST['level'] ?? '');
$date = trim($_POST['date'] ?? '');
$result = trim($_POST['result'] ?? '');
$description = trim($_POST['description'] ?? '');

if ($studentName === '' || $rollNumber === '' || $department === '' || $category === '' || $eventName === '' || $level === '' || $date === '' || $result === '' || $description === '') {
    header('Location: index.php?error=1');
    exit;
}

$uploadDir = __DIR__ . '/uploads';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileName = '';
if (isset($_FILES['document']) && $_FILES['document']['error'] === UPLOAD_ERR_OK) {
    $tmpName = $_FILES['document']['tmp_name'];
    $originalName = basename($_FILES['document']['name']);
    $fileName = time() . '_' . str_replace(' ', '_', $originalName);
    move_uploaded_file($tmpName, $uploadDir . '/' . $fileName);
}

$dataLine = implode('||', [
    $studentName,
    $rollNumber,
    $department,
    $category,
    $eventName,
    $level,
    $date,
    $result,
    $description,
    $fileName
]);

$dataFile = __DIR__ . '/data/students.txt';
if (!is_dir(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0777, true);
}

file_put_contents($dataFile, $dataLine . PHP_EOL, FILE_APPEND | LOCK_EX);
header('Location: index.php?success=1');
exit;
