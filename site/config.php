<?php

    if (session_status() == PHP_SESSION_NONE) {
            session_start();
    }

    define ('M_PATH', dirname(__FILE__));

    define ('SYS_PATH', $_SERVER['DOCUMENT_ROOT'].'/../modules/');
    define ('BASE_PATH', $_SERVER['DOCUMENT_ROOT'].'/../');

    $utils['active_theme'] = '/themes/theme1/';

    $utils['db_host'] = 'localhost';
    $utils['db_user'] = 'coffee2news';
    $utils['db_pass'] = 'coffee2news2015';
    $utils['db_database'] = 'news';

    $utils['default_metakeywords'] = 'world news, world events, breaking news, news online, U.S. news, world news, developing story, eather, business, money, politics, law, technology, entertainment, education, travel, health, special reports';

    $utils['default_metadescription'] = 'World news. We keep you up to date with your local news.';

    $utils['allowed_characters']['regex'] = 'ăĂâÂîÎșȘțȚ';
    $utils['allowed_characters']['table'] = array('ă' => 'a', 'Ă' => 'A', 'â' => 'a', 'Â' => 'A', 'î' => 'i', 'Î' => 'I', 'ș' => 's', 'Ș' => 'S', 'ț' => 't', 'Ț' => 'T');

    $utils['site_address'] = 'http://www.coffee2news.com';

    $utils['static_page'] = array(
                        '/contact'     => array('name' => '/contact', 'value' => 'contact.php', 'status' => 'noredirect'),
                        '/contact/'    => array('name' => '/contact/', 'value' => '/contact', 'status' => 'redirect'),

                        '/despre-noi'  => array('name' => '/despre-noi', 'value' => 'about.php', 'status' => 'noredirect'),
                        '/despre-noi/' => array('name' => '/despre-noi/', 'value' => '/despre-noi', 'status' => 'redirect'),
                        );

    $utils['admin_pass'] = 'coffee2015news';
    $utils['admin_page'] = array(

                                'adaugare-traduceri' => array('name' => 'adaugare-traduceri', 'value' => 'add_locale.php'),
                                'adaugare-tara' => array('name' => 'adaugare-tara', 'value' => 'add_slug.php'),
                                'adaugare-rss' => array('name' => 'adaugare-rss', 'value' => 'add_rss.php'),
                                'update-feeds' => array('name' => 'update-feeds', 'value' => 'update_feeds.php'),
                            );
    $utils['ajax'] = array(
                    'interact.php' => array('name' => 'interact.php', 'value' => 'interact.php'),
                            );

    /*  TRANSLATIONS LEGEND

    1   Home   -- header.html
    2   Country -- header.html
    3   Filters -- index.html
    4   Choose a date -- index.html
    5   Today  -- index.html
    6   Yesterday -- index.html
    7   All -- index.html
    8   Choose an author -- index.html
    9   Available countries -- footer.html
    10  Contact  -- footer.html
    11  There are no news under this settings. -- index.html
    12  Propose new countries -- footer.html
    13  Input new rss feed or report bugs or improvements -- footer.html
    14  Interact with us ! -- footer.html
    15  About us -- footer.html
    16  Our mission is to provide news all around the world. -- footer.html
    17  Choose your favourite news sites and enjoy each mo. -- footer.html
    18  Send -- footer.html
    19  Full name -- footer.html
    20  E-mail -- footer.html
    21  Enter text here -- footer.html
    22  Thank you for contacting us -- footer.html
    ..*/
?>
