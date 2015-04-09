<?php

include(SYS_PATH . 'mailer/PHPMailerAutoload.php');

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

$email = new PHPMailer();
$email->IsHTML(true);
$email->From      = 'contact@coffee2news.com';
$email->FromName  = 'Coffee 2 News';
$email->Subject   = 'New request from' . $name;
$email->AddAddress('alexbodea90@gmail.com','Alexandru Bodea');

$email->Body = "Email : ".$email . '<br>Text : ' . $text; 
echo $name.$email.$text;
/*$email->Send();*/

                