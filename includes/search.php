<?php
echo "aaaa".$segs[3];

$a = 'Programul prelungit de munca secatuieste pe multi dintre noi, motiv pentru care nu mai avem energie si nici timp sa ne ocupam cum trebuie de propria sanatate, de propriul corp. <br /><a href="http://www.realitatea.net/cum-sa-ti-intri-in-forma-atunci-cand-ai-un-job-care-ti-mananca-tot-timpul_1529292.html" title="Stiri, REALITATEA.NET">Cite&#537;te mai departe...</a><img width="1" height="1" src="http://realitatea.feedsportal.com/c/32533/f/501838/s/3ea6bae3/mf.gif" border="0"/><br clear="all"/><br/><br/><a href="http://da.feedsportal.com/r/204367941546/u/0/f/501838/c/32533/s/3ea6bae3/a2.htm"><img src="http://da.feedsportal.com/r/204367941546/u/0/f/501838/c/32533/s/3ea6bae3/a2.img" border="0"/></a><img width="1" height="1" src="http://pi.feedsportal.com/r/204367941546/u/0/f/501838/c/32533/s/3ea6bae3/a2t.img" border="0">';
var_dump($a);


$a = strip_tags_content($a);
$a = strip_tags($a);
var_dump($a);