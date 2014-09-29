   <?php

        $date = 'Mon, 29 Sep 2014 00:01:43 EDT';
        $dates = explode(' ', $date);
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
        /*if($dates[2] == 'Jan')
            $dates[2] = '01';
        if($dates[2] == 'Feb')
            $dates[2] = '02';
        if($dates[2] == 'Mar')
            $dates[2] = '03';
        if($dates[2] == 'Apr')
            $dates[2] = '04';
        if($dates[2] == 'May')
            $dates[2] = '05';
        if($dates[2] == 'Jun')
            $dates[2] = '06';
        if($dates[2] == 'Jul')
            $dates[2] = '07';
        if($dates[2] == 'Aug')
            $dates[2] = '08';
        if($dates[2] == 'Sep')
            $dates[2] = '09';
        if($dates[2] == 'Oct')
            $dates[2] = '10';
        if($dates[2] == 'Nov')
            $dates[2] = '11';
        if($dates[2] == 'Dec')
            $dates[2] = '12';*/
        $date_converted = $dates[1].'.'.$dates[2].'.'.$dates[3];

        echo $date_converted;


    ?>