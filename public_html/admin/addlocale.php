<?php

    require_once('../config.php');
    include(M_SYSPATH.'db/db.php');
    include('utils/functions.php');


/*    $us = $_POST['us'];

    //create line in locale table
    $sql = "INSERT INTO locale (us) VALUES ('$us')";
    $res = mysqli_query($con,$sql);
    $id = mysqli_insert_id($con);

    //get all slugs
    $sql = "SELECT slug FROM slugs";
    $res = mysqli_query($con,$sql);
    $array_index = 0;
    while($row = mysqli_fetch_array($res)) {
        $slugs[$array_index] = $row['slug'];
        $array_index ++;
    }
    //foreach slug update current line with translation
    foreach($slugs as $slug) {
        $value = $_POST[$slug];
        $sql = "UPDATE locale SET $slug = '$value' WHERE id = '$id'";
        $res = mysqli_query($con,$sql);

    }*/
    create_locales();
/*    header('Location: index.php?pass=parola123');*/

?>