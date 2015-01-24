<?php


    function strip_tags_content($text, $tags = '', $invert = FALSE) {
        preg_match_all('/<(.+?)[\s]*\/?[\s]*>/si', trim($tags), $tags);
        $tags = array_unique($tags[1]);

        if(is_array($tags) AND count($tags) > 0) {
            if($invert == FALSE) {
                return preg_replace('@<(?!(?:'. implode('|', $tags) .')\b)(\w+)\b.*?>.*?</\1>@si', '', $text);
            } else {
                return preg_replace('@<('. implode('|', $tags) .')\b.*?>.*?</\1>@si', '', $text);
            }
        } elseif($invert == FALSE) {
            return preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $text);
        }

        return $text;
    }


    function create_locales() {

        global $con;

        //get all slugs
        $sql = "SELECT slug FROM slugs";
        $res = mysqli_query($con,$sql);
        $array_index = 0;
        while($row = mysqli_fetch_array($res)) {
            $slugs[$array_index] = $row['slug'];
            $array_index ++;
        }

        //foreach slug create array
        foreach($slugs as $slug) {
            $value = $_POST[$slug];
            $sql = "SELECT us,$slug FROM locale";
            $res = mysqli_query($con,$sql);
            $translations = array();
            while($row = mysqli_fetch_array($res)) {
                $translations[$row['us']] = $row[$slug];
            }

            file_put_contents('../locale/translations.'.$slug, json_encode($translations));

        }

    }
 ?>