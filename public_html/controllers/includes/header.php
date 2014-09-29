<?php

    $home =  translate('Home',$countryslug);
    $country = translate('Country',$countryslug);
    $about = translate('About',$countryslug);

    $sql = "SELECT country2 FROM slugs ORDER BY CASE 
                                                    WHEN slug='$countryslug' THEN 1 
                                                    ELSE country2
                                                END ASC";
                              
    $res = mysqli_query($con,$sql);
    $array_index = 1;
    $countrys = [];
    while($row = mysqli_fetch_array($res)) {

        $countrys[$array_index]['country'] = $row['country2'];
        $array_index = $array_index+1;
    }


    echo $twig->render('header.html', array('theme' => $active_theme , 'home' => $home , 'country' => $country, 'about' => $about , 'countrys' => $countrys));

?>