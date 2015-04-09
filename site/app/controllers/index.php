<?php

    include (BASE_PATH . 'app/utils/initialize.php');

    $country_id = get_country_id($first);

    echo $twig->render('index.html', array(
        'data' => $data,
        'utils' => $utils,
        'countries' => get_countries($first),
        'articles' => get_articles($country_id),
        'authors' => get_unique_authors($country_id),
        'translations' => get_translations($country_id)
    ));

?>

