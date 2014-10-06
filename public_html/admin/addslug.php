<?php

require_once('../config.php');
include(M_SYSPATH.'/db/db.php');

global $con;

$country = $_POST['country'];
$slug = $_POST['slug'];
$country2 = $_POST['country2'];
$timezone = $_POST['timezone'];

$sql = "INSERT INTO slugs (country,slug,country2,timezone) VALUES ('$country','$slug','$country2','$timezone')";
$res = mysqli_query($con,$sql);
header('Location: index.php?pass=parola123');