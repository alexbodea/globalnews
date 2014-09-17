<?php
	header('Content-Type: text/html; charset=UTF-8');

	include('config.php');
	include('db.php');

	$sql = "SELECT title FROM news";
	$res = mysqli_query($con,$sql);
	$today = date('d M Y');
	$yesterday = date("d M Y", time() - 60 * 60 * 24);
	$yesterday2 = date("d M Y", time() - 60 * 60 * 48);

	//update database with today's news with duplicate checking
	foreach($rss as $countrycode =>$country) {

		foreach ($country as $site => $feed) {

			$content = file_get_contents($feed);
			$xmlfeed = new SimpleXmlElement($content);

			foreach($xmlfeed->channel->item as $entry) {

			   	if(strpos($entry->pubDate,$today)) {

			   		$title = mysqli_real_escape_string($con,$entry->title);
			   		$link = mysqli_real_escape_string($con,$entry->link);
			   		$pubDate = mysqli_real_escape_string($con,$entry->pubDate);
			   		$sql = "SELECT id FROM news WHERE title = '$title'";
			   		$nr = mysqli_num_rows(mysqli_query($con,$sql));

			   		if($nr == 0) {

			    		$sql = "INSERT INTO news (country,site,title,link,pubdate) VALUES ('$countrycode','$site','$title','$link','$pubDate')";
			    		$res = mysqli_query($con,$sql);

		    		}
		    	}
		    }
		}
	}

	//delete entries older than 2 days
	$sql = "DELETE from news WHERE (pubdate NOT LIKE '%$today%' AND pubdate NOT LIKE '%$yesterday%' AND pubdate NOT LIKE '%$yesterday2%')";
	$res = mysqli_query($con,$sql);

?>
