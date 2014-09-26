<?php
 
    require_once (M_SYSPATH.'Twig/lib/Twig/Autoloader.php');

    Twig_Autoloader::register();

    $loader = new Twig_Loader_Filesystem('views/');
    $twig = new Twig_Environment($loader);

    // global database connection //

    global $con;


    include('includes/header.php');


    // generating news //
    $country_id = getcid($countryslug);
    $sql = "SELECT * FROM news WHERE country_id='$country_id' ORDER BY pubdate DESC";
    $res = mysqli_query($con,$sql);
    $articles = [];
    $array_index = 0;
    while($row = mysqli_fetch_array($res)) {

        $articles[$array_index] = $row;
        $articles[$array_index]['link'] = urlencode($row['title']);
        $array_index = $array_index +1;
   
    }
    echo $twig->render('news_item.html', array('articles' => $articles ));


    include('includes/footer.php');

?>

