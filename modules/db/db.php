<?php

    if(!defined('M_PATH')) exit('No direct script access allowed');


    $con = mysqli_connect($db_host, $db_username, $db_pass, $db_database);
    mysqli_set_charset($con,"UTF8");


    // Checking for errors
    if ($con->connect_error) {
        die('Connect Error');
    }


    // Success connecting to the db
    global $con;

?>