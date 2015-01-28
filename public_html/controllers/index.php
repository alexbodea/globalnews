<?php

    require_once (M_SYSPATH.'Twig/lib/Twig/Autoloader.php');

    Twig_Autoloader::register();

    $twig = new Twig_Environment(new Twig_Loader_Filesystem('views/'));

    $country_id  = getcid($base);

    //get language pack
    $sql = "SELECT language FROM slugs WHERE id = '$country_id'";
    $res = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($res))
        $language = $row['language'];
    $translations = json_decode(file_get_contents('locale/translations.'.$language), true);

    include('includes/header.php');
    // getting data
    // $countryslug - from public_html/index.php
    $sql         = "SELECT * FROM news WHERE country_id = '$country_id' ORDER BY pubdate DESC";
    $res         = mysqli_query($con,$sql);
    $articles    = array();
    $array_index = 0;

    while($row = mysqli_fetch_array($res)) {
        $articles[$array_index]                = $row;
        $articles[$array_index]['link']        = $row['site_link'];
        $articles[$array_index]['description'] = html_entity_decode($row['description']);
        $articles[$array_index]['pubdate']     = reverse_date($articles[$array_index]['pubdate']);
        $array_index                          ++;
    }

    $today = date('d.m.Y');
    $yesterday = date("d.m.Y", time() - 60 * 60 * 24);


    // Adding unique news sites
    $sql2        = "SELECT DISTINCT author FROM news WHERE country_id = '$country_id'";
    $res         = mysqli_query($con, $sql2);
    $authors     = array();
    $array_index = 0;

    while($row = mysqli_fetch_array($res)) {
        $authors[$array_index] = strtolower($row['author']);
        $array_index += 1;
    }

        // Twig html generation
    echo $twig->render('index.html', array('articles' => $articles, 'today' => $today, 'yesterday' => $yesterday, 'authors' => $authors, 'translations' => $translations));


    include('includes/footer.php');

?>

