<!doctype html>
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
            <a href="#" title="keywords for this"><?php echo translate('Home',$countryslug);?></a>
            <a href="#" title="keywords for this"><?php echo translate('Country',$countryslug);?></a>
            <a href="#" title="keywords for this"><?php echo translate('About',$countryslug);?></a>
        </nav>
    </header>
<?php

$article_title= urldecode($article_title);
$sql = "SELECT link FROM news WHERE title = '$article_title'";
$res = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($res)){

    /*echo 'linkul pentru iframe este:'.$row['link'];*/
}
?>

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
    <script src="/js/script.js"></script>
</body>

</html>
