ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$data = json_decode(file_get_contents("php://input"), true);

// Match the React form keys
$name  = $data['fullName'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$offer = $data['offer'] ?? '';
$notes = $data['notes'] ?? '';
$ready = isset($data['readyToPurchase']) && $data['readyToPurchase'] ? 'Yes' : 'No';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'sckhan014@gmail.com';
    $mail->Password   = 'arjz wjpf vdpj dgt'; // Gmail App Password
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->setFrom('sckhan014@gmail.com', 'Website Offer Form');
    $mail->addAddress('sckhan014@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'New Artwork Offer Submission';
    $mail->Body    = "
        <h2>New Artwork Offer</h2>
        <p><b>Name:</b> {$name}</p>
        <p><b>Email:</b> {$email}</p>
        <p><b>Phone:</b> {$phone}</p>
        <p><b>Offer (AUD):</b> {$offer}</p>
        <p><b>Ready to Purchase:</b> {$ready}</p>
        <p><b>Notes:</b> {$notes}</p>
    ";

    $mail->send();
    echo json_encode(["status" => "success"]);
} catch (Exception $e) {
echo json_encode([
    "status" => "error",
    "message" => $mail->ErrorInfo,
    "php_error" => error_get_last()
]);
}
