<meta charset="UTF-8">
<?php

	include(BASE_PATH .'admin/utils/functions.php');

	$db = new db();
	$hour = date('H');
	$today = date('d M Y');
	$today2 = date('Y.m.d');
	$yesterday = date("Y.m.d", time() - 60 * 60 * 24);
	$yesterday2 = date("Y.m.d", time() - 60 * 60 * 48);

	//update database with today's news with duplicate checking

	$slugs = $db->array_select("SELECT id,slug FROM slugs WHERE timezone = '1'");

	foreach($slugs as $slug) {

		if(has_rss($slug['id'])) {

			$country_id = $slug['id'];
			$country_slug = $slug['slug'];
			$rsss = $db->array_select("SELECT * FROM rss WHERE country_id = '$country_id' AND active='1'");

			foreach ($rsss as $rss) {

				$content = file_get_contents($rss['link']);
				$xmlfeed = new SimpleXmlElement($content);
				$author = $xmlfeed->channel->link;
	        	$first  = strpos($author,'.');
		        $author = substr($author,$first+1);
		        $second = strpos($author,'/');
		        $author = substr($author,0,$second);

		        foreach($xmlfeed->channel->item as $entry) {

					if(strpos($entry->pubDate,$today)) {

						$title = $db->escape_string($entry->title);
						$double = $db->num_rows("SELECT id FROM news WHERE title = '$title'");

						if($double == 0) {

							$link = $db->escape_string($entry->link);
							$pubDate = $entry->pubDate;
							$date = convert_date($pubDate);


							$description = prepare_description($entry->description);

							$site_link = prepare_link($title,$country_slug);

							$sql = $db->execute("INSERT INTO news (country_id, author, title, description, site_link, link, pubdate) VALUES ('$country_id', '$author', '$title', '$description', '$site_link','$link', '$date')");
					    }
					}
				}
			}	

		}

	}


	//delete entries older than 2 days
	$sql = $db->execute("DELETE from news WHERE (pubdate NOT LIKE '%$today2%' AND pubdate NOT LIKE '%$yesterday%' AND pubdate NOT LIKE '%$yesterday2%')");

?>
