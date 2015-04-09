<?php

    include (BASE_PATH . 'app/utils/initialize.php');

    $country_id  = get_country_id($first);

    echo $twig->render('article.html', array(
        'data' => $data,
        'utils' => $utils,
        'link' => get_article_link($url),
        'countries' => get_countries($first),
        'translations' => get_translations($country_id)
    ));

?>
