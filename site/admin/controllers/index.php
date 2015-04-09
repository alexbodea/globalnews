<?php

    if (session_status() == PHP_SESSION_NONE) {
            session_start();
    }

    if(!isset($_SESSION['admin'])) {

        if(isset($_GET['pass'])) {

            if($_GET['pass'] == $utils['admin_pass']) {

                $_SESSION['admin'] = 'logged';
            }

        } else {

            header('Location: /');
            exit();
        }

    } elseif ($_SESSION['admin'] == 'logged') {

        include_once(BASE_PATH . 'admin/utils/initialize.php');

        echo $twig->render('index.html', array(
            'active_menu'  => '',
            'title_part'   => 'Panou administrare',
            'utils'        => $utils
        ));

    }

?>