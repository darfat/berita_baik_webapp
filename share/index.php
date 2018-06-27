<?php
$slug = filter_input(INPUT_GET, 'slug');
$options = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"ApplicationID: BERITABAIK_WEBAPP_V01\r\n" .
              "AnotherHeader: test\r\n"
  ),
  "ssl"=>array(
		"verify_peer"=>false,
		"verify_peer_name"=>false,
  )
);
$context=stream_context_create($options);
$data=file_get_contents('https://beritabaik.id:3001/v1/article-by-slug/'.$slug,false,$context);
$data=json_decode($data,true);

return makePage($data);

function makePage($data) {
//  echo $data["title"];
  // 1. get the page
  $pageUrl = "https://beritabaik.id/home/a/" . $data["editorial"]["slug"] . "/" .$data["slug"];
  $refreshURL = "https://beritabaik.id/home/a/" . $data["editorial"]["slug"] . "/" .$data["slug"];
  if ($data["editorial"]["slug"] == "gallery-foto") {
    $pageUrl = "https://beritabaik.id/home-c/" . $data["editorial"]["slug"] . "/" .$data["slug"];
    $refreshURL = "https://beritabaik.id/home-c/" . $data["editorial"]["slug"] . "/" .$data["slug"];
  } elseif ($data["editorial"]["slug"] == "infografis") {
    $pageUrl = "https://beritabaik.id/home-c/" . $data["editorial"]["slug"] . "/" .$data["slug"];
    $refreshURL = "https://beritabaik.id/home-c/" . $data["editorial"]["slug"] . "/" .$data["slug"];
  }
  $imagePath = str_replace(" ","%20",$data["main_image"]);
  // 2. generate the HTML with open graph tags
  $html  = '<!doctype html>'.PHP_EOL;
  $html .= '<html>'.PHP_EOL;
  $html .= '<head>'.PHP_EOL;
  $html .= '<title>'.$data["title"].'</title>'.PHP_EOL;
  $html .= '<meta name="author" content="'.$data["reporter_name"].'"/>'.PHP_EOL;
  $html .= '<meta name="description" content="'.$data["title"].'"/>'.PHP_EOL;
  $html .= '<meta name="keywords" content="'.$data["article_tags"].'"/>'.PHP_EOL;
  $html .= '<meta property="twitter:card" content="summary_large_image"/>'.PHP_EOL;
  $html .= '<meta property="twitter:site" content="@beritabaik_id"/>'.PHP_EOL;
  $html .= '<meta property="twitter:creator" content="@beritabaik_id"/>'.PHP_EOL;
  $html .= '<meta property="twitter:title" content="'.$data["title"].'"/>'.PHP_EOL;
  $html .= '<meta property="twitter:description" content="'.$data["teaser"].'"/>'.PHP_EOL;
  $html .= '<meta property="twitter:image" content="https://beritabaik.id'.$imagePath.'"/>'.PHP_EOL;
  $html .= '<meta property="og:title" content="'.$data["title"].'"/>'.PHP_EOL;
  $html .= '<meta property="og:url" content="'.$pageUrl.'"/>'.PHP_EOL;
  $html .= '<meta property="fb:app_id" content="1957770944535094"/>'.PHP_EOL;
  $html .= '<meta property="og:type" content="website"/>'.PHP_EOL;
  $html .= '<meta property="og:locale" content="id_ID"/>'.PHP_EOL;
  $html .= '<meta property="og:image:width" content="600"/>'.PHP_EOL;
  $html .= '<meta property="og:image:height" content="315"/>'.PHP_EOL;
  $html .= '<meta property="og:description" content="'.$data["teaser"].'"/>'.PHP_EOL;
  $html .= '<meta property="og:image" content="https://beritabaik.id'.$imagePath.'"/>'.PHP_EOL;
  $html .= '<meta rel="canonical" href="'.$pageUrl.'">'.PHP_EOL;
  $html .= '<meta http-equiv="refresh" content="0;url='.$refreshURL.'">'.PHP_EOL;
  $html .= '</head>'.PHP_EOL;
  $html .= '<body>'.$data["content"].'</body>'.PHP_EOL;
  $html .= '</html>';
  // 3. return the page
  echo $html;
}
?>
