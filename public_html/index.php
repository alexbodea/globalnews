<?php

    include('config.php');
    include(M_SYSPATH.'translate/translate.php');
    include(M_SYSPATH.'db/db.php');
    include('utils/functions.php');


    $country = 'Romania';


    $ext = getslug($country);


    $url  = $_SERVER['REQUEST_URI'];
    $segs = explode('/',$url);
    $base = $segs[1];

    if ($base == 'admin') {
        include ($_SERVER['REQUEST_URI']);
    } elseif ($base == '') {
        $countryslug = $ext;
        header('Location: /'.$countryslug.'/');
    } elseif(empty($segs[2])) {
        $countryslug = $base;
        include('controllers/index.php');
    } else {
        $article_title = $segs[2];
        $countryslug   = $base;
        include('controllers/article.php');
    }

?>