
<?php

try{
// на какие данные рассчитан этот скрипт
header("Content-Type: application/json");
// 1. Получаем данные от страницы
$data = json_decode(file_get_contents("php://input"),true);
// Параметры подключения к базе данных
$servername = "localhost"; // Имя сервера базы данных
$username = "host1340522_4557"; // Имя пользователя базы данных
$password = "123456"; // Пароль пользователя базы данных
$dbname = "host1340522_score"; // Имя базы данных

// Создание подключения к базе данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения на ошибки
if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}

// Проверка данных
if (!isset($data['lastName']) || !isset($data['firstName']) || !isset($data['startTime']) || !isset($data['finishTime']) || !isset($data['ball']) || !isset($data['errors']) || !isset($data['scoreMaxTotal']) || !isset($data['percent']) || !isset($data['testName'])) {
    http_response_code(401);
    echo "Bad Request: Missing required fields";
    exit;
}


$lastName = $data[lastName];
$firstName = $data[firstName];
$startTime = date("Y-m-d H:i:s",strtotime($data[startTime]));
//echo $begin_time;
$finishTime = date("Y-m-d H:i:s",strtotime($data[finishTime]));
$balls=intval($data[ball]);
$errors = intval($data[errors]);
$scoreMaxTotal=intval($data[scoreMaxTotal]);
$percent=floatval($data[percent]);
$testName = $data[testName];


// SQL-запрос для вставки данных в таблицу
$sql = "INSERT INTO tests_results (testName, firstName, lastName,  startTime, finishTime, scoreMaxTotal, balls, errors, percent) VALUES ('$testName','$firstName', '$lastName','$startTime','$finishTime','$scoreMaxTotal','$balls','$errors','$percent')";

// Выполнение запроса
if ($conn->query($sql) === TRUE) {
    echo "Данные успешно сохранены в базе данных.".$startTime;
} else {
    echo "Ошибка при сохранении данных: " . $conn->error;
}

// Закрытие соединения с базой данных
$conn->close();
}
catch(Exception $e)
{
    http_response_code(500);    
    echo "Error:".$e->getMessage();
}

?>