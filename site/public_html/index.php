<?php

    include('../config.php');
    include(BASE_PATH . 'app/utils/functions.php');

    if(!isset($_SESSION['slug'])) {
        if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            $_SESSION['slug'] = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
            if($_SESSION['slug'] == 'en') {
                $_SESSION['slug'] = 'us';
            }
        } else {
            $_SESSION['slug'] = 'us';
        }
    }

    $url  = $_SERVER['REQUEST_URI'];

    $parts = explode('/',$url);
    $first = $parts[1];
    $second = isset($parts[2]) ? $parts[2] : false;

    if ($first == '') {
        header('Location: /' . $_SESSION['slug'] . '/');
    } elseif(is_article($url)) {
        include(BASE_PATH . 'app/controllers/article.php');
    } elseif(is_slug($first) && empty($second)) {
        if(substr($url, -1) == '/') {
            include(BASE_PATH . 'app/controllers/index.php');
        } else {
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: /' . $first . '/');
        }
    }



    elseif (!empty($utils['static_page']) && !empty($utils['static_page'][$url]) && $utils['static_page'][$url]['name'] == $url) {
        if($utils['static_page'][$url]['status'] == 'redirect') {
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: ' . $utils['static_page'][$url]['value']);
        } else {
            include(BASE_PATH . 'app/controllers/' . $utils['static_page'][$url]['value']);
        }
    }


    elseif ($first == 'search') {
        include(BASE_PATH . 'app/controllers/search.php');
    } elseif ($first == 'googlebbef72e175110ad4.html') {
        include('googlebbef72e175110ad4.html');
    } elseif ($first == 'BingSiteAuth.xml') {
        include('BingSiteAuth.xml');
    } elseif ($first == 'sitemap.xml') {
        header('Content-type: text/xml');
        include('sitemap.xml');



    } elseif ($first == 'admin') {
        if (!empty($utils['admin_page']) && !empty($utils['admin_page'][$second]) && $utils['admin_page'][$second]['name'] == $second) {
                include (BASE_PATH . 'admin/controllers/' . $utils['admin_page'][$second]['value']);
            } else {
                include (BASE_PATH . 'admin/controllers/index.php');
            }



    } elseif ($first == 'ajax') {
        if (!empty($utils['ajax']) && !empty($utils['ajax'][$second]) && $utils['ajax'][$second]['name'] == $second) {
                include (BASE_PATH . 'app/utils/ajax/' . $utils['ajax'][$second]['value']);
        }



    } else {
        header('HTTP/1.0 404 Not Found');
        include(BASE_PATH . 'app/controllers/404.php');
    }

?>