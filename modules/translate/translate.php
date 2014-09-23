<?php 

function translate($word,$countryslug) {

	global $con;

	$sql = "SELECT * FROM locale WHERE us='$word'";
	$res = mysqli_query($con,$sql);
	while($row = mysqli_fetch_array($res)) {

		$word_t = $row[$countryslug];
	}

	return $word_t;
}