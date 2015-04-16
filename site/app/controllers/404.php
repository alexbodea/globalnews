<?php

    include (BASE_PATH . 'app/utils/initialize.php');

    $data['title_part'] = '404 - Nu s-a găsit pagina';
    $data['metakeywords'] = '404,' . $data['metakeywords'];
    $data['metadescription'] = '404 - ' . $data['metadescription'];

    echo $twig->render('404.html', array(
        'utils' => $utils,
        'data'  => $data,
    ));
    
    session_destroy();
?>
