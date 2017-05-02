function stopWords($text, $stopwords) {

  // Remove line breaks and spaces from stopwords
    $stopwords = array_map(function($x){return trim(strtolower($x));}, $stopwords);

  // Replace all non-word chars with comma
  $pattern = '/[0-9\W]/';
  $text = preg_replace($pattern, ',', $text);

  // Create an array from $text
  $text_array = explode(",",$text);

  // remove whitespace and lowercase words in $text
  $text_array = array_map(function($x){return trim(strtolower($x));}, $text_array);

  foreach ($text_array as $term) {
    if (!in_array($term, $stopwords)) {
      $keywords[] = $term;
    }
  };

  return array_filter($keywords);
}

$stopwords = file('stop_words.txt');
$text = "Requirements - Working knowledge, on LAMP Environment using Linux, Apache 2, MySQL 5 and PHP 5, - Knowledge of Web 2.0 Standards - Comfortable with JSON - Hands on Experience on working with Frameworks, Zend, OOPs - Cross Browser Javascripting, JQuery etc. - Knowledge of Version Control Software such as sub-version will be preferable.";

print_r(stopWords($text, $stopwords));