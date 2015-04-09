<?php

    include_once(BASE_PATH . 'admin/utils/initialize.php');

    if(!empty($_POST)) {

        $db = new db();

        foreach ($_POST as $key => $value) {

            $parts = explode('_', $key);
            $operation = $parts[0];
            $id = $parts[1];
            $slug = $parts[2];

            if($parts[0] == 'update') {

                $value = $db->escape_string($value); 
                $sql = $db->execute("UPDATE locale SET $slug = '$value' WHERE id = '$id'");

            }
        }

        $slugs_string = '';
        $slugs = $db->array_select("SELECT slug FROM slugs");

        foreach ($slugs as $slug) {
            $slugs_string .= $slug['slug'] . ',';
        }

        $slugs_string = substr($slugs_string, 0, -1);

        $index = 0;

        while(!empty($_POST['insert_' . $index . '_us'])) {

            $values_string = '';

            foreach ($slugs as $slug) {
                $values_string .= "'" . $_POST['insert_' . $index . '_' . $slug['slug']] . "',";
            }

            $values_string = substr($values_string, 0, -1);

            $sql = "INSERT INTO locale ($slugs_string) VALUES ($values_string)";

            $db->execute($sql);
            $index ++;
        }  

        create_locales();
    }

    echo $twig->render('add_locale.html', array(
        'active_menu'  => 'add_locale',
        'msg'          => $msg,
        'title_part'   => 'Adăugare traduceri',
        'utils'        => $utils,
        'slugs'        => get_locales()
    ));


?>