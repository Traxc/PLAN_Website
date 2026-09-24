<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, bool $ok, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_THROW_ON_ERROR);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'This endpoint accepts form submissions only.');
}

// Quietly accept bot submissions caught by the hidden field.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, true, 'Thank you. Your inquiry has been received.');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$inquiry = trim((string) ($_POST['inquiry'] ?? ''));
$consent = (string) ($_POST['consent'] ?? '');

if ($name === '' || mb_strlen($name) > 100) {
    respond(422, false, 'Please enter your name.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
    respond(422, false, 'Please enter a valid email address.');
}

if ($inquiry === '' || mb_strlen($inquiry) > 3000) {
    respond(422, false, 'Please enter a short description of your inquiry.');
}

if ($consent !== 'yes') {
    respond(422, false, 'Please acknowledge the form disclaimer.');
}

/*
 * EXTERNAL FORM ADAPTER
 * ---------------------
 * Set ARP_FORM_ENDPOINT in the production environment after the existing form
 * endpoint is known. Update the payload keys below to match that service's
 * field names. No inquiry data is stored by this website.
 */
$externalEndpoint = getenv('ARP_FORM_ENDPOINT') ?: '';

if ($externalEndpoint === '') {
    respond(200, true, 'Prototype received your inquiry. External delivery is not configured yet.');
}

$payload = http_build_query([
    'name' => $name,
    'email' => $email,
    'inquiry' => $inquiry,
]);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\nAccept: application/json\r\n",
        'content' => $payload,
        'timeout' => 10,
        'ignore_errors' => true,
    ],
]);

$result = @file_get_contents($externalEndpoint, false, $context);
$statusLine = $http_response_header[0] ?? '';
$forwarded = $result !== false && preg_match('/\s2\d\d\s/', $statusLine) === 1;

if (!$forwarded) {
    error_log('ARP contact form forwarding failed.');
    respond(502, false, 'Your inquiry could not be delivered. Please call us or try again later.');
}

respond(200, true, 'Thank you. Your inquiry has been received.');
