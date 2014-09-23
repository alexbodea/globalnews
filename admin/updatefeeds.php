<?php
	header('Content-Type: text/html; charset=UTF-8');

	include('db.php');
	include('functions.php');

	$hour = date('H');
	$today = date('d M Y');
	$yesterday = date("d M Y", time() - 60 * 60 * 24);
	$yesterday2 = date("d M Y", time() - 60 * 60 * 48);

	//update database with today's news with duplicate checking
	$sql = "SELECT id FROM slugs WHERE timezone = '$hour'";
	$res = mysqli_query($con,$sql);
	while($row = mysqli_fetch_array($res)) {

		$country_id = $row['id'];
		$sql2 = "SELECT * FROM rss WHERE country_id = '$country_id' AND active='1'";
		$res2 = mysqli_query($con,$sql2);

		while($row2 = mysqli_fetch_array($res2)) {

			$content = file_get_contents($row2['link']);
			$xmlfeed = new SimpleXmlElement($content);
			$author = $xmlfeed->channel->title;

			foreach($xmlfeed->channel->item as $entry) {

				if(strpos($entry->pubDate,$today)) {

					$title = mysqli_real_escape_string($con,$entry->title);
					$sql3 = "SELECT id FROM news WHERE title = '$title'";
					$nr = mysqli_num_rows(mysqli_query($con,$sql3));

					if($nr == 0) {

						$link = mysqli_real_escape_string($con,$entry->link);
						$pubDate = mysqli_real_escape_string($con,$entry->pubDate);
						$description = mysqli_real_escape_string($con,$entry->description);
					    $sql4 = "INSERT INTO news (country_id,author,title,description,link,pubdate) VALUES ('$country_id','$author','$title','$description','$link','$pubDate')";
					    $res4 = mysqli_query($con,$sql4);

				    }
				}
			}
		}
	}

	//delete entries older than 2 days
	$sql = "DELETE from news WHERE (pubdate NOT LIKE '%$today%' AND pubdate NOT LIKE '%$yesterday%' AND pubdate NOT LIKE '%$yesterday2%')";
	$res = mysqli_query($con,$sql);

?>
