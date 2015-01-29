<meta charset="UTF-8">
<?php

    require_once('../config.php');
    include(M_SYSPATH.'db/db.php');
    include('utils/functions.php');


    foreach ($_POST as $key => $value) {
        $parts = explode('_', $key);
        if($parts[0] == 'update') {
            $sql = "UPDATE locale SET $parts[2] = '$value' WHERE id = '$parts[1]'";
            $res = mysqli_query($con,$sql);
        }
    }
    $sql = "SELECT slug FROM slugs";
    $res = mysqli_query($con,$sql);
    $slugs = array();
    $array_index = 0;
    while ($row = mysqli_fetch_array($res)) {
        $slugs[$array_index] = $row['slug'];
        $array_index ++;
    }
    $slugs_string = implode(',', $slugs);
    $index = 0;
    while(!empty($_POST['insert_' . $index . '_us'])) {
        $values_string = '';
        foreach ($slugs as $slug) {
            $values_string .= "'" . $_POST['insert_' . $index . '_' . $slug] . "'";
            if(end($slugs) != $slug)
                $values_string .= ',';
        }
        $sql = "INSERT INTO locale ($slugs_string) VALUES ($values_string)";
        $res = mysqli_query($con,$sql);
        $index ++;
    }
    create_locales();
    header('Location: index.php?pass=parola123');

?>