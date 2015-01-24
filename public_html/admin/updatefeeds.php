<?php

	header('Content-Type: text/html; charset=UTF-8');

	include('../config.php');
	include(M_SYSPATH.'db/db.php');
	include('utils/functions.php');

	$hour = date('H');
	$today = date('d M Y');
	$today2 = date('Y.m.d');
	$yesterday = date("Y.m.d", time() - 60 * 60 * 24);
	$yesterday2 = date("Y.m.d", time() - 60 * 60 * 48);

	echo $today;

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
			$author = $xmlfeed->channel->link;
        	$first = strpos($author,'.');
	        $author = substr($author,$first+1);
	        $second = strpos($author,'/');
	        $author = substr($author,0,$second);

			foreach($xmlfeed->channel->item as $entry) {

				if(strpos($entry->pubDate,$today)) {

					$title = mysqli_real_escape_string($con,$entry->title);
					$sql3 = "SELECT id FROM news WHERE title = '$title'";
					$nr = mysqli_num_rows(mysqli_query($con,$sql3));

					if($nr == 0) {

						$link = mysqli_real_escape_string($con,$entry->link);
						$pubDate = mysqli_real_escape_string($con,$entry->pubDate);


						$dates = explode(' ', $pubDate);
				        $date = array(
				            'Jan' => '01',
				            'Feb' => '02',
				            'Mar' => '03',
				            'Apr' => '04',
				            'May' => '05',
				            'Jun' => '06',
				            'Jul' => '07',
				            'Aug' => '08',
				            'Sep' => '09',
				            'Oct' => '10',
				            'Nov' => '11',
				            'Dec' => '12'
				            );
				        $dates[2] = $date[$dates[2]];
				        $date_converted = $dates[3].'.'.$dates[2].'.'.$dates[1];


						$description = mysqli_real_escape_string($con,$entry->description);
						$description = strip_tags_content($description);
						$description = strip_tags($description);
						$description = html_entity_decode($description);
					    $sql4 = "INSERT INTO news (country_id,author,title,description,link,pubdate) VALUES ('$country_id','$author','$title','$description','$link','$date_converted')";
					    $res4 = mysqli_query($con,$sql4);

				    }
				}
			}
		}
	}

	//delete entries older than 2 days
	$sql = "DELETE from news WHERE (pubdate NOT LIKE '%$today2%' AND pubdate NOT LIKE '%$yesterday%' AND pubdate NOT LIKE '%$yesterday2%')";
	$res = mysqli_query($con,$sql);

?>
