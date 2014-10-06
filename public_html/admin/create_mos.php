<?php
header('Content-Type: text/html; charset=utf-8');

require('../config.php');
include (M_SYSPATH.'/db/db.php');
include (M_SYSPATH.'/potomo/potomo.php');


$countrys = [];
$index = 0;

$sql = "SELECT slug FROM slugs WHERE NOT slug='us'";
$res = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($res)) {
    $countrys[$index] = $row['slug'];
    $index += 1;
}

foreach ($countrys as $country) {

    $sql2= "SELECT `us`,`$country` FROM locale WHERE 1";
    $res2 = mysqli_query($con,$sql2);
    $data = 'msgid ""'."\r\n".
            'msgstr ""'."\r\n".
            'Content-Type: text/plain; charset=UTF-8"'."\r\n";
    while($row = mysqli_fetch_array($res2)) {
        $data .= 'msgid "'.$row['us'].'"'."\r\n";
        $data .= 'msgstr "'.$row[$country].'"'."\r\n";
    }
    $file = M_PATH.'/locale/'.$country.'_'.strtoupper($country).'/LC_MESSAGES/default.po';
    file_put_contents($file, $data);
    phpmo_convert(M_PATH.'/locale/'.$country.'_'.strtoupper($country).'/LC_MESSAGES/default.po');
}

