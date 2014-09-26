<?php

if(isset($_GET['pass']) && crypt($_GET['pass'], '$6$rounds=5042$542504ba4ace42.9$MfeAfwbJTN/tKYVKqEvQm0M4ICOOAra0O1TFtxAToI33D9T/ACJRnBBs3vPYMgZGT8ZO6Ptck8SqtTw58dI2S/' ) == '$6$rounds=5042$542504ba4ace42.9$MfeAfwbJTN/tKYVKqEvQm0M4ICOOAra0O1TFtxAToI33D9T/ACJRnBBs3vPYMgZGT8ZO6Ptck8SqtTw58dI2S/' ) {
		?>
		<html>
			<head>
			</head>
			<body>
				<h1>Adauga intrare rss</h1>
				<form action="addrss.php" method="post">
					<input type="text" id="rss" name="rss"/>
					<select name="country">
						<?php 
						$sql = "SELECT DISTINCT country FROM slugs";
						$res = mysqli_query($con,$sql);
						while($row = mysqli_fetch_array($res))
							echo '<option value="'.$row['country'].'">'.$row['country'].'</option>';
						?>
					</select>
					<input type="submit" value="Adauga"/>
				</form>
			</body> <?php

} else {
	header('Location: http://localhost');
}