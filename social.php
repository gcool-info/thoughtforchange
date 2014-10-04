<html>
    <head>
		<?php
			/*
			Script to set the article's meta information for facebook.
			*/

			/* GET the article ID from the url */
			$articleID = $_GET["article"];

			if($articleID !== "")  {
				$url = 'http://spreadsheets.google.com/feeds/list/1tvA65txvR4oN_MC4MMxtVekjJyGAzCZ5gVuAxDpS6Q0/od6/public/values?alt=json';
				$file= file_get_contents($url);

			 
				$json = json_decode($file);
				$rows = $json->{'feed'}->{'entry'};

				/* Stire the title and content */
				$title = $rows[$articleID - 1]->{'gsx$title'}->{'$t'};
				$text = $rows[$articleID - 1]->{'gsx$text'}->{'$t'};
			}


			/* Function to get the current url */
			function curPageURL() {
				$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
				$host     = $_SERVER['HTTP_HOST'];
				$script = $_SERVER['SCRIPT_NAME'];
				$params = $_SERVER['QUERY_STRING'];
 
				$currentUrl = $protocol . '://' . $host . $script . '?' . $params;
 
				return $currentUrl;

			}	

			/* Function to set the url of the article (to redirect to backbone) */
			function getArticleURL($id) {
				$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
				$host     = $_SERVER['HTTP_HOST'];


				$script = substr($_SERVER['SCRIPT_NAME'],0,strrpos($_SERVER['SCRIPT_NAME'],"/"));

				return  $protocol . '://' . $host . $script . '/#article/'.$id;
			}	 

			/* Function to get the url of the photo (for the moment it's the photo of the main site) */
			function getPhotoURL() {
				$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
				$host     = $_SERVER['HTTP_HOST'];


				$script = substr($_SERVER['SCRIPT_NAME'],0,strrpos($_SERVER['SCRIPT_NAME'],"/"));

				return  $protocol . '://' . $host . $script . '/assets/img/logo_fb1.jpg';
			}
		?>

	<!-- Set the meta info for fb -->
    <meta charset="utf-8">
	<meta property="og:title" content="<?php echo $title; ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="<?php echo curPageURL(); ?>" />
    <meta property="og:image" content="<?php echo getPhotoURL(); ?>" />
    <meta property="og:description" content="<?php echo $text; ?>" />
	</head>
	<body>
		<script type="text/javascript">
			/* Redirect once the user clicks on the link */
			window.location = "<?php echo getArticleURL($articleID); ?>";
		</script>
	</body>
</html>

