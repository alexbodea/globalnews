<?php

    $sql = "SELECT country2,slug FROM slugs ORDER BY CASE 
                                                    WHEN slug='$countryslug' THEN 1 
                                                    ELSE country2
                                                END ASC";
                              
    $res = mysqli_query($con,$sql);
    $array_index = 0;
    $country_menu = array();
    while($row = mysqli_fetch_array($res)) {

        $country_menu[$array_index]['country'] = $row['country2'];
        $country_menu[$array_index]['slug'] = $row['slug'];
        $array_index ++;
    }

    echo $twig->render('includes/header.html', array('theme' => $active_theme , 'country_menu' => $country_menu , 'translations' => $translations));

?>