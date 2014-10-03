<?php

    if(!defined('M_PATH')) exit('No direct script access allowed');


    $con = mysqli_connect('localhost','globalnews','globalnews2014','news');
    mysqli_set_charset($con,"UTF8");


    // Checking for errors
    if ($con->connect_error) {
        die('Connect Error (' . $con->connect_errno . ') ' . $con->connect_error);
    }


    // Success connecting to the db
    global $con;

?>