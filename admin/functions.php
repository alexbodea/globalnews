<?php


function getslug($country) {
	include(M_PATH.'/admin/db.php');

	$sql = "SELECT slug FROM slugs WHERE country = '$country'";
	$res = mysqli_query($con,$sql);

	while($row = mysqli_fetch_array($res))
		$slug = $row['slug'];

	return $slug;
}

function getcid($country) {

	include(M_PATH.'/admin/db.php');

	$sql = "SELECT id FROM slugs WHERE country = '$country' OR slug = '$country'";
	$res = mysqli_query($con,$sql);

	while($row = mysqli_fetch_array($res))
		$cid = $row['id'];

	return $cid;
}

function readmore($post,$countryslug,$url) {

	include(M_PATH.'/locale.php');
	$words = explode(' ',$post);
	$post_limited = '';
	for($i=0;$i<25;$i++) {

		if(!empty($words[$i]))
			$post_limited = $post_limited.' '.$words[$i];
	}
	$post_final = $post_limited.'.... <a href="/'.$countryslug.'/'.urlencode($url).'">'.$READMORE[$countryslug].'</a>';
	return $post_final;
}