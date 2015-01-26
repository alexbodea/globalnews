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


    function getcid($country) {
        global $con;

        $sql = "SELECT id FROM slugs WHERE country = '$country' OR slug = '$country'";
        $res = mysqli_query($con,$sql);

        while($row = mysqli_fetch_array($res))
            $cid = $row['id'];

        return $cid;
    }


    function is_slug($slug) {
        global $con;

        $sql = "SELECT id FROM slugs WHERE slug = '$slug'";
        $res = mysqli_query($con,$sql);

        if(mysqli_num_rows($res) != 0)
            return true;
        else
            return false;
    }
?>