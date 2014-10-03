<?php

    require_once (M_SYSPATH.'Twig/lib/Twig/Autoloader.php');

    Twig_Autoloader::register();

    $loader = new Twig_Loader_Filesystem('views/');
    $twig = new Twig_Environment($loader);

    // global database connection //

    global $con;


    include('includes/header.php');

    $article_title= urldecode($article_title);
    $sql = "SELECT link FROM news WHERE title LIKE '%$article_title%'";
    $res = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($res)){

        $link = $row['link'];

    }
    echo $twig->render('article.html', array('link' => $link ));

    include('includes/footer.php');

?>
