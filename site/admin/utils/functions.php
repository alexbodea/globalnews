<?php


    function get_locales() {

        $db = new db();

        $slugs = $db->array_select("SELECT slug FROM slugs");

        foreach ($slugs as &$slug) {
            
            $name = $slug['slug'];
            $slug['data'] = $db->array_select("SELECT id, $name FROM locale");

        }

        return $slugs;

    }


    function get_slugs() {

        $db = new db();

        $slugs = $db->array_select("SELECT id,country FROM slugs");

        return $slugs;
        
    }


    function prepare_description($string) {

        $string = strip_tags($string);
        $string = preg_replace("/\h\h+/i", " ", $string);
        $string = trim($string);

        return $string;

    }


    function prepare_metakeywords($string) {

        $metakeywords = '';
        $words = explode(' ', $string);
        foreach ($words as $word) {
            if(strlen($word) > 3)
                $metakeywords .= $word . ',';
        }
        $metakeywords = str_replace(".", "", $metakeywords);
        $metakeywords = substr($metakeywords, 0, 130);
        $metakeywords = normalize($metakeywords);
        $metakeywords = strtolower($metakeywords);

        return $metakeywords;
    }


    function prepare_metadescription($string) {

        $string = substr($string, 0, 150);

        return $string;
    }


    function create_locales() {

        $db = new db();

        //get all slugs
        $slugs = $db->array_select("SELECT slug FROM slugs");

        //foreach slug create array
        foreach($slugs as $slug) {

            $name = $slug['slug'];

            $datas = $db->array_select("SELECT id, $name FROM locale");

            $translations = array();

            foreach($datas as $data) {
                $translations[$data['id']] = $data[$name];
            }

            file_put_contents(SYS_PATH . 'locale/translations.'.$name, json_encode($translations));

        }

    }


    function prepare_link($title, $slug) {
        //if not allowed characters
        $link = normalize($title);
        //multiples whitespaces -> single whitespace
        $link = preg_replace("/[^a-zA-Z0-9-\s]+/i", "", $link);
        $link = trim($link);
        $link = strtolower($link);
        //multiples whitespaces -> single minus sign
        $link = preg_replace("/\s\s+/i", " ", $link);
        $link = preg_replace("/--+/i", "-", $link);
        $link = preg_replace("/\s/i", "-", $link);
        $link = '/' . $slug . '/' . $link;

        return $link;
    }


    function normalize ($string){
    
        $table = array('à'=>'a','À'=>'a', 'á'=>'a','Á'=>'a', 'â'=>'a', 'Â'=>'a', 'ã'=>'a', 'Ã'=>'a', 'ä'=>'a', 'Ä'=>'a', 'å'=>'a','Å'=>'a',  'æ'=>'a', 'Æ'=>'a','ă'=>'a', 'Ă'=>'a','þ'=>'b','Þ'=>'b', 'ç'=>'c','Ç'=>'c','č'=>'c',  'Č'=>'c', 'Ć'=>'c', 'ć'=>'c', 'Đ'=>'dj', 'đ'=>'dj', 'è'=>'e','È'=>'e',  'é'=>'e','É'=>'e','ê'=>'e','Ê'=>'e',  'ë'=>'e', 'Ë'=>'e', 'ì'=>'i','Ì'=>'i',  'í'=>'i','Í'=>'i',  'î'=>'i','Î'=>'i',  'ï'=>'i', 'Ï'=>'i','ñ'=>'n','Ñ'=>'n','ò'=>'o', 'Ò'=>'o','ó'=>'o',  'Ó'=>'o','ô'=>'o', 'Ô'=>'o','õ'=>'o','Õ'=>'o','ö'=>'o', 'Ö'=>'o','ø'=>'o','Ø'=>'o','Ŕ'=>'r', 'ŕ'=>'r', 'ß'=>'ss','Š'=>'s', 'š'=>'s', 'ş'=>'s', 'Ş'=>'s', 'ș'=>'s','Ș'=>'s','ţ'=>'t', 'Ţ'=>'t', 'ț'=>'t','Ț'=>'t','ù'=>'u','Ù'=>'u','ú'=>'u', 'Ú'=>'u','û'=>'u', 'Û'=>'u', 'ü'=>'u','Ü'=>'u', 'Ý'=>'y','ý'=>'y', 'ÿ'=>'y',  'Ž'=>'z', 'ž'=>'z');

        foreach($table as $key => $value) {
            $string = str_replace($key, $value, $string);
        }

        return $string;
    } 


    function has_rss($id) {

        $db = new db();

        $num_rows = $db->num_rows("SELECT id FROM rss WHERE country_id = '$id' ");
        if($num_rows != 0) {
            return true;
        } else {
            return false;
        }
    }


    function convert_date($pubDate) {

        $dates = explode(' ', $pubDate);
        $date = array('Jan' => '01','Feb' => '02','Mar' => '03','Apr' => '04',
                      'May' => '05','Jun' => '06','Jul' => '07','Aug' => '08',
                      'Sep' => '09','Oct' => '10','Nov' => '11','Dec' => '12');
        $dates[2] = $date[$dates[2]];
        $date_converted = $dates[3].'.'.$dates[2].'.'.$dates[1];

        return $date_converted;
    }
 ?>