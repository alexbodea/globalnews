<?php

$json = file_get_contents('http://freegeoip.net/json/gandul.info');
$geoip  = json_decode($json);
$country = $geoip->country_name; 
include('db.php');


?>
<html>
	<head>
	</head>
	<body>
		<h1>Adauga intrare rss</h1>
		<form action="addrss.php" method="post">
			<input type="text" id="rss" name="rss"/>
			<select name="country">
				<?php 
				$sql = "SELECT DISTINCT country FROM slugs";
				$res = mysqli_query($con,$sql);
				while($row = mysqli_fetch_array($res))
					echo '<option value="'.$row['country'].'">'.$row['country'].'</option>';
				?>
			</select>
			<input type="submit" value="Adauga"/>
		</form>
	</body>