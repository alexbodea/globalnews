<?php

    include('config.php');
    include(M_SYSPATH.'/translate/translate.php');
    include(M_SYSPATH.'/db/db.php');
    include('admin/functions.php');


    $json    = file_get_contents('http://freegeoip.net/json/gandul.info');
    $geoip   = json_decode($json);
    $country = $geoip->country_name;


    $ext = getslug($country);


<<<<<<< HEAD
    $url  = $_SERVER['REQUEST_URI'];
    $segs = explode('/',$url);
    $base = $segs[1];
=======
        $countryslug= $ext;
        header('Location: /'.$countryslug.'/');
    }
    else {

        if(empty($segs[2])) {

            $countryslug= $base;
>>>>>>> FETCH_HEAD

    if ($base == 'admin') {
        include ($_SERVER['REQUEST_URI']);
    } elseif ($base == '') {
        $countryslug = $ext;
        include('controllers/index.php');
    } elseif(empty($segs[2])) {
        $countryslug = $base;
        include('controllers/index.php');
    } else {
        $article_title = $segs[2];
        $countryslug   = $base;
        include('controllers/article.php');
    }
<<<<<<< HEAD

=======
}
>>>>>>> FETCH_HEAD
?>