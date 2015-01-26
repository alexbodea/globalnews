<?php
    require_once('../config.php');
    include(M_SYSPATH.'db/db.php');


    $country_id = $_POST['country_id'];
    $rss = $_POST['rss'];

    $sql = "INSERT INTO rss (country_id, link, active) VALUES ('$country_id', '$rss', '1')";
    $res = mysqli_query($con,$sql);

    header('Location: index.php?pass=parola123');
?>