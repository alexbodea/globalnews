<?php

    include('config.php');
    include(M_SYSPATH.'db/db.php');
    include('utils/functions.php');


    $country = 'France';


    $ext = getslug($country);

    $url  = $_SERVER['REQUEST_URI'];
    $segs = explode('/',$url);
    $base = $segs[1];

    if ($base == 'admin') {
        include ($_SERVER['REQUEST_URI']);
    } elseif ($base == '') {
        $countryslug = $ext;
        header('Location: /'.$countryslug.'/');
    } elseif(is_slug($base)) {
        $translations = json_decode(file_get_contents('locale/translations.'.$base), true);
        $countryslug = $base;
        include('controllers/index.php');
    } elseif(is_article($url)) {
        include('controllers/article.php');
    }

?>