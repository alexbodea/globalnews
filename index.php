<?php 
$url =$_SERVER['REQUEST_URI'];
$segs = explode('/',$url);
	$base = $segs[1];
	if ($base == '') {
		$cfile = 'index.php';
	}
	else {
		$cfile = $base.'.php';
	}
	if (is_file("includes/$cfile")) {
		include "includes/$cfile";
	}
	else
		include "includes/404.php";

?>