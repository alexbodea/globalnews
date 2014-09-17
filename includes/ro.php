<?php
header('Content-Type: text/html; charset=UTF-8');
include('admin/db.php');
$sql = "SELECT * FROM news WHERE country='$base' ORDER BY id DESC";
$res = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($res)) {
	echo $row['site'].'<br>';
	echo $row['title'].'<br>';
	echo $row['link'].'<br>';
}
?>