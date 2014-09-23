<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">


    <title>Global news</title>


    <meta name="description" content="you description" />
    <meta name="keywords" content="your keywords" />


    <meta name=viewport content="width=device-width, initial-scale=1" />



    <!--   TO BE FILLED with the proper paths

    <link rel="shortcut icon"    href="img/favicon.png"       type="image/png" />
    <link rel="apple-touch-icon" href="img/favicon_touch.png" type="image/png" />

    <link rel="canonical" href="canonical adress" />
    <link rel="author" href="https://www.google.com/+ClaudiuLimban" />
    <link rel='index' title='Your Site title' href='http://www.yourSite.com/' />

    end of TO BE FILLED -->


    <link href="/css/print.css" rel="stylesheet" media="print" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/style.css" rel='stylesheet' media='screen' />
</head>


<body>

    <header>
        <a class="logo" href="#" title="Keywords for this">World News</a>
        <nav data-role="main_menu">
            <button><span></span><span></span><span></span></button>
            <a href="#" title="keywords for this"><?php echo $MENU[$countryslug][0];?></a>
            <a href="#" title="keywords for this"><?php echo $MENU[$countryslug][1];?></a>
            <a href="#" title="keywords for this"><?php echo $MENU[$countryslug][2];?></a>
        </nav>
    </header>


    <div class="container">
        <div class="row">
            <div class="col-xs-12">
            <?php

			include('admin/db.php');

			$country_id = getcid($countryslug);
			$sql = "SELECT * FROM news WHERE country_id='$country_id' ORDER BY pubdate DESC";
			$res = mysqli_query($con,$sql);
			$html = '';

			while($row = mysqli_fetch_array($res)) {
				
				$html .= '<section class="news">
                    <h2><a href="'.$row["link"].'" title="keywords for this">'.$row["title"].'</a></h2>
                    <i class="fa fa-clock-o"></i><span class="extra">'.$row["pubdate"].'</span>
                    <i class="fa fa-link"></i><a class="extra" href="#" title="keyword for this">'.$row["author"].'</a>
                    <p>'.html_entity_decode(readmore($row["description"],$countryslug,$row["title"])).'</p>
                </section>';
			}

			echo $html;

			?>
		    </div>
        </div>
    </div>


    <footer>
        <div class="row">
            <button class="go_up" data-role="go_up"><i class="fa fa-arrow-up"></i> UP</button>
            <div class="social">
                <a class="fa fa-facebook" href="#" title="Facebook  | keywords for this"></a>
                <a class="fa fa-google-plus" href="#" title="Google Plus  | keywords for this"></a>
            </div>
        </div>
    </footer>


    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
</body>

</html>
