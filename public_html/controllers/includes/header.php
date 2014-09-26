<?php

    $home =  translate('Home',$countryslug);
    $country = translate('Country',$countryslug);
    $about = translate('About',$countryslug);

    echo $twig->render('header.html', array('theme' => $active_theme , 'home' => $home , 'country' => $country, 'about' => $about));

?>