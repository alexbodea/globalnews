<?php
    require_once('../config.php');
    include('../../modules/db/db.php');
    include('functions.php');


    $country = $_POST['country'];
    $rss = $_POST['rss'];

    $country_id = getcid($country);

    $sql = "INSERT INTO rss (country_id, link, active) VALUES ('$country_id', '$rss', '1')";
    $res = mysqli_query($con,$sql);

    header('Location: index.php?pass=parola123');
?>