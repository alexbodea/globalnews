   <meta charset="UTF-8">
   <?php
   include('../config.php');
   include(M_SYSPATH.'db/db.php');
/*   $a = 'Monica Macovei: Dacă aș fi judecător CCR, aș refuza să mai judec alături de Toni Greblă';
   $b = 'Monica Macovei: Daca as fi judecător CCR, as refuza sa mai judec alaturi de Toni Grebla';*/
$content = file_get_contents('http://feeds.feedburner.com/gandul/Mjcu');
            $xmlfeed = new SimpleXmlElement($content);
    function normalize ($string){
    
        $table = array('à'=>'a','À'=>'A', 'á'=>'a','Á'=>'A', 'â'=>'a', 'Â'=>'A', 'ã'=>'a', 'Ã'=>'A', 'ä'=>'a', 'Ä'=>'A', 'å'=>'a','Å'=>'A',  'æ'=>'a', 'Æ'=>'A','ă'=>'a', 'Ă'=>'A','þ'=>'b','Þ'=>'B', 'ç'=>'c','Ç'=>'C','č'=>'c',  'Č'=>'C', 'Ć'=>'C', 'ć'=>'c', 'Đ'=>'Dj', 'đ'=>'dj', 'è'=>'e','È'=>'E',  'é'=>'e','É'=>'E','ê'=>'e','Ê'=>'E',  'ë'=>'e', 'Ë'=>'E', 'ì'=>'i','Ì'=>'I',  'í'=>'i','Í'=>'I',  'î'=>'i','Î'=>'I',  'ï'=>'i', 'Ï'=>'I','ñ'=>'n','Ñ'=>'N','ò'=>'o', 'Ò'=>'O','ó'=>'o',  'Ó'=>'O','ô'=>'o', 'Ô'=>'O','õ'=>'o','Õ'=>'O','ö'=>'o', 'Ö'=>'O','ø'=>'o','Ø'=>'O','Ŕ'=>'R', 'ŕ'=>'r', 'ß'=>'Ss','Š'=>'S', 'š'=>'s', 'ş'=>'s', 'Ş'=>'S', 'ș'=>'s','Ș'=>'s','ţ'=>'t', 'Ţ'=>'T', 'ț'=>'t','Ț'=>'T','ù'=>'u','Ù'=>'U','ú'=>'u', 'Ú'=>'U','û'=>'u', 'Û'=>'U', 'ü'=>'u','Ü'=>'U', 'Ý'=>'Y','ý'=>'y', 'ÿ'=>'y',  'Ž'=>'Z', 'ž'=>'z');

        foreach($table as $key => $value) {
            $string = str_replace($key, $value, $string);
        }


        return $string;
    } 

    function prepare_link($name) {
        //if not allowed characters
        $name = preg_replace("/[^a-zA-Z0-9_()\'\s]+/i", "", $name);
        //multiples whitespaces -> single whitespace
        $name = preg_replace("/\s\s+/i", " ", $name);
        $name = trim($name);
        $name = strtolower($name);
        $name = str_replace('\'', '', $name);
        $name = str_replace(' ','-',$name);

        return $name;
    }
    $a = $xmlfeed->channel->item[66]->title;
    var_dump($a);
    $a = mysqli_real_escape_string($con,$a);
    $c = normalize($a);
    $c = prepare_link($c);
    var_dump($a);
    var_dump($c);
    var_dump($a == $c);

    ?>