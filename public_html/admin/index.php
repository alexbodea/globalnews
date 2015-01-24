    <meta charset="UTF-8">
<?php
    include('../config.php');
    include(M_SYSPATH.'db/db.php');
    if(isset($_GET['pass']) && crypt($_GET['pass'], '$6$rounds=5042$542504ba4ace42.9$MfeAfwbJTN/tKYVKqEvQm0M4ICOOAra0O1TFtxAToI33D9T/ACJRnBBs3vPYMgZGT8ZO6Ptck8SqtTw58dI2S/' ) == '$6$rounds=5042$542504ba4ace42.9$MfeAfwbJTN/tKYVKqEvQm0M4ICOOAra0O1TFtxAToI33D9T/ACJRnBBs3vPYMgZGT8ZO6Ptck8SqtTw58dI2S/' ) {
    		?>
    		<html>
    			<head>
    			</head>
    			<body>
                    <p>---------------------------------</p>
    				<h1>Adauga intrare rss</h1>
    				<form action="addrss.php" method="post">
    					<label>Rss</label><input type="text" id="rss" name="rss"/><br>
    					<select name="country_id">
    						<?php
                            global $con;

    						$sql = "SELECT id,country FROM slugs";
    						$res = mysqli_query($con,$sql);
    						while($row = mysqli_fetch_array($res))
    							echo '<option value="' . $row['id'] . '">' . $row['country'] . '</option>';
    						?>
    					</select><br>
    					<input type="submit" value="Adauga"/>
    				</form>
                    <p>---------------------------------</p>
                    <p>---------------------------------</p>
    				<h1>Adauga tara</h1>
    				<form action="addslug.php" method="post">
                        <p>DATE GENERALE</p>
    					<label>Nume (engleza)</label><input type="text" id="country" name="country"/><br>
    					<label>Prescurtare</label><input type="text" id="slug" name="slug"/><br>
    					<label>Nume limba lor</label><input type="text" id="country2" name="country2"/><br>
    					<label>Timezone</label><input id="timezone" name="timezone"/><br>
                        <p>INSERARE TRADUCERI PENTRU A FI LA ZI</p>
                        <?php 
                            $sql = "SELECT id,us FROM locale";
                            $res = mysqli_query($con,$sql);
                            while($row = mysqli_fetch_array($res)) {
                                echo 'Traducerea pentru '.$row['us'].'<input type="text" name="locale_'.$row['id'].'"><br>';
                            }
                        ?>
    					<input type="submit" value="Adauga"/>
    				</form>
                    <p>---------------------------------</p>
                    <p>---------------------------------</p>
                    <h1>Adauga cuvant nou in locale</h1>
                    <form action="addlocale.php" method="post">
                        <?php 

                        $sql = "SELECT country2,slug FROM slugs";
                        $res = mysqli_query($con,$sql);
                        while ($row = mysqli_fetch_array($res)) {
                            echo '<label>'.$row['country2'].'</label><input type="text" id="'.$row['slug'].'" name="'.$row['slug'].'"><br>';

                            } ?>
                        <input type="submit" value="Adauga"/>
    			</body> <?php

    } else {
    	header('Location: http://localhost');
    }
?>