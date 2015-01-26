<?php
    require_once('../config.php');
    include(M_SYSPATH.'db/db.php');

    global $con;
    //get data
    $country  = $_POST['country'];
    $slug     = $_POST['slug'];
    $country2 = $_POST['country2'];
    $timezone = $_POST['timezone'];

    //insert new country in database
    $sql = "INSERT INTO slugs (country, slug, country2, timezone) VALUES ('$country', '$slug', '$country2', '$timezone')";
    $res = mysqli_query($con,$sql);

    //create new country in locale table
    $sql = "ALTER TABLE locale ADD ".$slug." VARCHAR( 255 )";
    $res = mysqli_query($con,$sql);

    //insert "to date" translations in locale table 
    $i = 1;
    while(!empty($_POST['locale_'.$i])) {
        $value = $_POST['locale_'.$i];
        $id = $i;
        $sql = "UPDATE locale SET $slug = '$value' WHERE id = '$id'";
        $res = mysqli_query($con,$sql);
        echo $sql;
        $i++;
    }
    header('Location: index.php?pass=parola123');
?>