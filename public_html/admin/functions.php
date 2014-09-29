<?php


function getslug($country) {
	
	global $con;

	$sql = "SELECT slug FROM slugs WHERE country = '$country'";
	$res = mysqli_query($con,$sql);

	while($row = mysqli_fetch_array($res))
		$slug = $row['slug'];

	return $slug;
}

function getcid($country) {

	global $con;

	$sql = "SELECT id FROM slugs WHERE country = '$country' OR slug = '$country'";
	$res = mysqli_query($con,$sql);

	while($row = mysqli_fetch_array($res))
		$cid = $row['id'];

	return $cid;
}

/*function readmore($post,$countryslug,$url) {

	include(M_PATH.'/locale.php');
	$words = explode(' ',$post);
	$post_limited = '';
	for($i=0;$i<25;$i++) {

		if(!empty($words[$i]))
			$post_limited = $post_limited.' '.$words[$i];
	}
	$post_final = $post_limited.'.... <a href="/'.$countryslug.'/'.urlencode($url).'">'.$READMORE[$countryslug].'</a>';
	return $post_final;
}*/

function strip_tags_content($text, $tags = '', $invert = FALSE) {

  preg_match_all('/<(.+?)[\s]*\/?[\s]*>/si', trim($tags), $tags);
  $tags = array_unique($tags[1]);
   
  if(is_array($tags) AND count($tags) > 0) {
    if($invert == FALSE) {
      return preg_replace('@<(?!(?:'. implode('|', $tags) .')\b)(\w+)\b.*?>.*?</\1>@si', '', $text);
    }
    else {
      return preg_replace('@<('. implode('|', $tags) .')\b.*?>.*?</\1>@si', '', $text);
    }
  }
  elseif($invert == FALSE) {
    return preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $text);
  }
  return $text;
} 


/*transform from YYYY.MM.DD -> DD.MM.YYYY*/
function reverse_date($date) {

    $dates = explode('.', $date);
    return $dates[2].'.'.$dates[1].'.'.$dates[0];

}