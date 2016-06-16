<?php
define('SERVICE_NAME', 'stonehenge');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	header('HTTP/1.1 405 Method Not Allowed');
	die(json_encode(['error' => 'Requests must be sent using the POST method.']));
}

$body = json_decode(file_get_contents('php://input'));

if (!$body) {
	header('HTTP/1.1 406 Not Acceptable');
	die(json_encode(['error' => 'Requests must be sent using a JSON object payload.']));
}

if (!property_exists($body, 'email') || gettype($body->email) !== 'string') {
	header('HTTP/1.1 400 Bad Request');
	die(json_encode(['error' => 'Request must include a string property called `email`.']));
}

if (!filter_var($body->email, FILTER_VALIDATE_EMAIL)) {
	header('HTTP/1.1 400 Bad Request');
	die(json_encode(['error' => '`email` property on request must be a valid RFC 822 email address.']));
}

$config = json_decode(file_get_contents(__DIR__ . '/../.mysqlconfig.json'));
$db = new Mysqli($config->host, $config->username, $config->password, $config->database);

if ($db->connect_error) {
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(['error' => 'Unable to connect to database. #' . $db->connect_errno . ' ' . $db->connect_error]));
}

$stmt = $db->stmt_init();
if (!$stmt->prepare('INSERT INTO `leads` (`service`, `email`, `ip`, `timestamp`) VALUES (?, ?, ?, ?);')) {
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(['error' => 'Unable to prepare query. ' . print_r($stmt->error_list, true)]));
}

$service = SERVICE_NAME;
$email = $body->email;
$ip = $_SERVER['REMOTE_ADDR'];
$timestamp = date('Y-m-d H:i:s');
$stmt->bind_param('ssss', $service, $email, $ip, $timestamp);

if (!$stmt->execute()) {
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(['error' => '#' . $db->errno . ' ' . $db->error]));
}

header('HTTP/1.1 201 Created');
print json_encode([
	'id' => $stmt->insert_id,
	'service' => $service,
	'email' => $email,
	'ip' => $ip,
	'timestamp' => date('c', strtotime($timestamp))
]);

$stmt->close();
