<?php

    function getslug($country) {

        global $con;

        $sql = "SELECT slug FROM slugs WHERE country = '$country'";
        $res = mysqli_query($con,$sql);

        while($row = mysqli_fetch_array($res))
            $slug = $row['slug'];

        return $slug;
    }

        /*transform from YYYY.MM.DD -> DD.MM.YYYY*/
    function reverse_date($date) {
        $dates = explode('.', $date);
        return $dates[2].'.'.$dates[1].'.'.$dates[0];
    }
?>