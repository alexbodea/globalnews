<?php

    require_once (M_SYSPATH.'Twig/lib/Twig/Autoloader.php');

    Twig_Autoloader::register();

    $loader = new Twig_Loader_Filesystem('views/');
    $twig = new Twig_Environment($loader);

    // global database connection //

    global $con;
    $country_id  = getcid($base);
    //get language pack
    $sql = "SELECT language FROM slugs WHERE id = '$country_id'";
    $res = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($res))
        $language = $row['language'];
    $translations = json_decode(file_get_contents('locale/translations.'.$language), true);

    include('includes/header.php');

    $sql = "SELECT link FROM news WHERE site_link = '$url'";
    $res = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($res)){

        $link = $row['link'];

    }
    echo $twig->render('article.html', array('link' => $link ));

    include('includes/footer.php');

?>
