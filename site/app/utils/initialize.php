<?php

    require_once (SYS_PATH . 'Twig/lib/Twig/Autoloader.php');

    $_SESSION['slug'] = $first;

    Twig_Autoloader::register();

    $loader     = new Twig_Loader_Filesystem(BASE_PATH . 'app/views/');
    $twig       = new Twig_Environment($loader);

    if(empty($title_part)) {
        $title_part = get_title_part($url);
    }

    $metakeywords = get_metakeywords($url);
    
    if(empty($metakeywords)) {
        $metakeywords = $utils['default_metakeywords'];
    }

    $metadescription = get_metadescription($url);

    if(empty($metadescription)) {
        $metadescription = $utils['default_metadescription'];
    }

    $today = date('d.m.Y');
    $yesterday = date("d.m.Y", time() - 60 * 60 * 24);

    $canonical =  "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    $data = array(
        'metakeywords'       => $metakeywords,
        'metadescription'    => $metadescription,
        'title_part'         => $title_part,
        'canonical'          => $canonical,
        'today'              => $today,
        'yesterday'          => $yesterday,
        'first'              => $first
    );

?>