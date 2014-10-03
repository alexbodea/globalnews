<?php

    require_once (M_SYSPATH.'Twig/lib/Twig/Autoloader.php');

    Twig_Autoloader::register();

    $loader = new Twig_Loader_Filesystem('views/');
    $twig   = new Twig_Environment($loader);


    // global database connection //
    global $con;


    include('includes/header.php');


    // getting data
    // $countryslug - from public_html/index.php
    $country_id  = getcid($countryslug);
    $sql         = "SELECT * FROM news WHERE country_id='$country_id' ORDER BY pubdate DESC";
    $res         = mysqli_query($con,$sql);
    $articles    = [];
    $array_index = 0;

    while($row = mysqli_fetch_array($res)) {
        $articles[$array_index]                = $row;
        $articles[$array_index]['link']        = urlencode($row['title']);
        $articles[$array_index]['description'] = html_entity_decode($row['description']);
        $articles[$array_index]['pubdate']     = reverse_date($articles[$array_index]['pubdate']);
        $array_index                          += 1;
    }

    $today = date('d.m.Y');
    $yesterday = date("d.m.Y", time() - 60 * 60 * 24);


    // Adding unique news sites
    $sql2        = "SELECT DISTINCT author FROM news WHERE country_id = '$country_id'";
    $res         = mysqli_query($con, $sql2);
    $authors     = [];
    $array_index = 0;

    while($row = mysqli_fetch_array($res)) {
        $authors[$array_index] = $row['author'];
        $array_index += 1;
    }


    // Twig html generation
    echo $twig->render('news_item.html', array('articles' => $articles, 'today' => $today, 'yesterday' => $yesterday, 'authors' => $authors));


    include('includes/footer.php');

?>

