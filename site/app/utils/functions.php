<?php

    include(SYS_PATH . 'db/db.php');

    function get_slug($country) {

        $db = new db();

        $slug = $db->value_select("SELECT slug FROM slugs WHERE country = '$country'");

        return $slug;
    }


    function get_metakeywords($url) {

        $db = new db();

        $metakeywords = $db->value_select("SELECT metakeywords FROM categories WHERE link='$url' UNION SELECT metakeywords FROM products WHERE link='$url' ");

        if(!empty($metakeywords))
            return $metakeywords;
        else 
            return false;
    }


    function get_metadescription($url) {

        $db = new db();

        $metadescription = $db->value_select("SELECT metadescription FROM categories WHERE link='$url' UNION SELECT metadescription FROM products WHERE link='$url'");

        if(!empty($metadescription))
            return $metadescription;
        else 
            return false;
    }

        /*transform from YYYY.MM.DD -> DD.MM.YYYY*/
    function reverse_date($date) {

        $dates = explode('.', $date);
        return $dates[2].'.'.$dates[1].'.'.$dates[0];
    }


    function get_country_id($country) {

        $db = new db();

        $country_id = $db->value_select("SELECT id FROM slugs WHERE country = '$country' OR slug = '$country'");

        return $country_id;
    }


    function get_translations($country_id) {

        $db = new db();

        $language = $db->value_select("SELECT language FROM slugs WHERE id = '$country_id'");

        $translations = json_decode(file_get_contents(SYS_PATH . 'locale/translations.'.$language), true);

        return $translations;
    }


    function get_articles($country_id) {

        $db = new db();

        $articles = $db->array_select("SELECT * FROM news WHERE country_id = '$country_id' ORDER BY pubdate DESC");

        foreach ($articles as $article) {
            $article['pubdate'] = reverse_date($article['pubdate']);
        }

        return $articles;
    }

    
    function get_countries($first) {

    $db = new db();

    $countries = $db->array_select("SELECT country2,slug FROM slugs ORDER BY CASE 
                                                    WHEN slug = '$first' THEN 1 
                                                    ELSE country2
                                                END ASC");

    return $countries;

    }


    function get_article_link($url) {

        $db = new db();

        $link = $db->value_select("SELECT link FROM news WHERE site_link = '$url'");

        return $link;
    }

    
    function get_unique_authors($country_id) {

        $db = new db();

        $authors = $db->array_select("SELECT DISTINCT author FROM news WHERE country_id = '$country_id'");

    
        return $authors;
    }


    function get_title_part($url) {
        $db = new db();

        $title_part = $db->value_select("SELECT title FROM news WHERE site_link = '$url'");

        if(!empty($title_part))
            return $title_part;
        else 
            return false;
    }


    function is_slug($slug) {

        $db = new db();

        $num_rows = $db->num_rows("SELECT id FROM slugs WHERE slug = '$slug'");

        if($num_rows != 0)
            return true;
        else
            return false;
    }


    function is_article($url) {

        $db = new db();

        $num_rows = $db->num_rows("SELECT id FROM news WHERE site_link = '$url'");

        if($num_rows != 0)
            return true;
        else
            return false;
    }
?>