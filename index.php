<?php 

include('config.php');
include('modules/translate/translate.php');
include('modules/db/db.php');
include('admin/functions.php');


$json = file_get_contents('http://freegeoip.net/json/gandul.info');
$geoip  = json_decode($json);
$country = $geoip->country_name;

$ext = getslug($country);


$url =$_SERVER['REQUEST_URI'];
$segs = explode('/',$url);
$base = $segs[1];
if ($base == 'admin') 
	include ($_SERVER['REQUEST_URI']);
if(!empty($segs[2]) && ($segs[2] == $SEARCH[$segs[1]] || $segs[2] == $SEARCH[$ext]))
	include('includes/search.php');
else {
	if ($base == '') {

		$countryslug= $ext;
		include('includes/index.php');
	}

	else {
		
		if(empty($segs[2])) {

			$countryslug= $base;

			include('includes/index.php');
		}
		else {

			$article_title = $segs[2];
			$countryslug= $base;

			include('includes/article.php');
		}
	}
}

?>