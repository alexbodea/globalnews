<?php

    include_once(BASE_PATH . 'admin/utils/initialize.php');

    if(!empty($_POST)) {

        $db         = new db();

        $country_id = $db->escape_string($_POST['country_id']);
        $rss        = $db->escape_string($_POST['rss']);

        $sql        = $db->execute("INSERT INTO rss (country_id, link, active) VALUES ('$country_id', '$rss', '1')");

    }

    echo $twig->render('add_rss.html', array(
        'active_menu'  => 'add_rss',
        'msg'          => $msg,
        'title_part'   => 'Adăugare rss',
        'utils'        => $utils,
        'slugs'        => get_slugs()
    ));
?>