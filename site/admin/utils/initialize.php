<?php

    header('Content-Type:text/html; charset=UTF-8');

    include_once(BASE_PATH . 'admin/utils/functions.php');

    if (session_status() == PHP_SESSION_NONE) {
            session_start();
    }
    if(!isset($_SESSION['admin']) && $_SESSION['admin'] != 'logged') {

        header('Location: /');
        exit();
    }

    $msg         = array();
    $msg['type'] = '';
    $msg['msg']  = '';
    $images      = '';


    require_once (SYS_PATH.'Twig/lib/Twig/Autoloader.php');

    Twig_Autoloader::register();

    $loader = new Twig_Loader_Filesystem(BASE_PATH . 'admin/views/');
    $twig   = new Twig_Environment($loader);

?>
