<meta charset="UTF-8">
<?php

    require_once('../config.php');
    include(M_SYSPATH.'db/db.php');
    include('utils/functions.php');


    foreach ($_POST as $key => $value) {
        $parts = explode('_', $key);
        if($parts[0] == 'update')
            echo 'update pe id: '.$parts[1].' tara :'.$parts[2].' valoarea'.$value ;
        else
            echo 'insert';
    }
    /*create_locales();*/
/*    header('Location: index.php?pass=parola123');*/

?>