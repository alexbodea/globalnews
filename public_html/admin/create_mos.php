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
    $data = 'msgid ""
msgstr ""
"Project-Id-Version: \n"
"POT-Creation-Date: \n"
"PO-Revision-Date: \n"

"Last-Translator: \n"

"Language-Team: \n"

"MIME-Version: 1.0\n"

"Content-Type: text/plain; charset=iso-8859-1\n"

"Content-Transfer-Encoding: 8bit\n"

"Language: ro_RO\n"

"X-Generator: Poedit 1.6.9\n"

';

    while($row = mysqli_fetch_array($res2)) {
        $data .= 'msgid "'.$row['us'].'"'."\n";
        $data .= 'msgstr "'.$row[$country].'"'."\n";
    }
    $file = M_PATH.'/locale/'.$country.'_'.strtoupper($country).'/LC_MESSAGES/default.po';
    file_put_contents($file, $data);
    phpmo_convert(M_PATH.'/locale/'.$country.'_'.strtoupper($country).'/LC_MESSAGES/default.po');

}
?>
