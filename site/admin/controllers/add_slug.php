<?php

    include_once(BASE_PATH . 'admin/utils/initialize.php');

    if(!empty($_POST)) {

        $db = new db();
        //get data
        $country  = $_POST['country'];
        $slug     = $_POST['slug'];
        $country2 = $_POST['country2'];
        $language = $_POST['language'];
        $timezone = $_POST['timezone'];

        //insert new country in database
        $sql = $db->execute("INSERT INTO slugs (country, slug, country2, language, timezone) VALUES ('$country', '$slug', '$country2', '$language', '$timezone')");

        //create new country in locale table
        $sql = $db->execute("ALTER TABLE locale ADD ".$slug." VARCHAR( 255 )");

    }

    echo $twig->render('add_slug.html', array(
        'active_menu'  => 'add_slug',
        'msg'          => $msg,
        'title_part'   => 'Adăugare ţară',
        'utils'        => $utils
    ));
?>
