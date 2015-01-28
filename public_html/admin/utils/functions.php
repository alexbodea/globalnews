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


    function prepare_link($name) {
        //if not allowed characters
        $name = preg_replace("/[^a-zA-Z0-9_()\'\s]+/i", "", $name);
        //multiples whitespaces -> single whitespace
        $name = preg_replace("/\s\s+/i", " ", $name);
        $name = trim($name);
        $name = strtolower($name);
        $name = str_replace('\'', '', $name);
        $name = str_replace(' ','-',$name);

        return $name;
    }


    function normalize ($string){
    
        $table = array('à'=>'a','À'=>'A', 'á'=>'a','Á'=>'A', 'â'=>'a', 'Â'=>'A', 'ã'=>'a', 'Ã'=>'A', 'ä'=>'a', 'Ä'=>'A', 'å'=>'a','Å'=>'A',  'æ'=>'a', 'Æ'=>'A','ă'=>'a', 'Ă'=>'A','þ'=>'b','Þ'=>'B', 'ç'=>'c','Ç'=>'C','č'=>'c',  'Č'=>'C', 'Ć'=>'C', 'ć'=>'c', 'Đ'=>'Dj', 'đ'=>'dj', 'è'=>'e','È'=>'E',  'é'=>'e','É'=>'E','ê'=>'e','Ê'=>'E',  'ë'=>'e', 'Ë'=>'E', 'ì'=>'i','Ì'=>'I',  'í'=>'i','Í'=>'I',  'î'=>'i','Î'=>'I',  'ï'=>'i', 'Ï'=>'I','ñ'=>'n','Ñ'=>'N','ò'=>'o', 'Ò'=>'O','ó'=>'o',  'Ó'=>'O','ô'=>'o', 'Ô'=>'O','õ'=>'o','Õ'=>'O','ö'=>'o', 'Ö'=>'O','ø'=>'o','Ø'=>'O','Ŕ'=>'R', 'ŕ'=>'r', 'ß'=>'Ss','Š'=>'S', 'š'=>'s', 'ş'=>'s', 'Ş'=>'S', 'ș'=>'s','Ș'=>'s','ţ'=>'t', 'Ţ'=>'T', 'ț'=>'t','Ț'=>'T','ù'=>'u','Ù'=>'U','ú'=>'u', 'Ú'=>'U','û'=>'u', 'Û'=>'U', 'ü'=>'u','Ü'=>'U', 'Ý'=>'Y','ý'=>'y', 'ÿ'=>'y',  'Ž'=>'Z', 'ž'=>'z');

        foreach($table as $key => $value) {
            $string = str_replace($key, $value, $string);
        }


        return $string;
    } 
 ?>