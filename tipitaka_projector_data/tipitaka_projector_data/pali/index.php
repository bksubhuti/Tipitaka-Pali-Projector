<!DOCTYPE HTML PUBLIC "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>index.php</title>

	<meta http-equiv="content-type" content="text/html; charset=UTF-8"> 
	 
</head>
<body>
<div style="font-family:Tahoma;font-size:13pt;">
<?php 
	$link = mysqli_connect("localhost", "root", "rootroot", "tipitaka"); 
	mysqli_set_charset($link, 'utf8');
	if (mysqli_connect_error()) {
		die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
	}   
	
	$xd_old = "x";
	$han = fopen($xd_old . '.js', 'w');
	
	$han_a = fopen($xd_old . 'a.js', 'w');
	
	$j = -1;
	$sql = 'select xd, sHTML, sTags from sutta where left(xd,4)="6102" order by xd';
	$sql = 'select xd, sHTML, sTags from sutta order by xd';
	$result = mysqli_query($link, $sql);
	while ($row = mysqli_fetch_array($result)) {
		if ($xd_old != substr($row['xd'], 0, 4)) {
			fclose($han);
			fclose($han_a);
			
			//
			$data = file_get_contents($xd_old . '.js');
			$data = str_replace('<p class="bodytext">', 	'<p class="b1">', $data);
			$data = str_replace('<p class="book">', 		'<p class="b2">', $data);
			$data = str_replace('<p class="centered">', 	'<p class="c3">', $data);
			$data = str_replace('<p class="chapter">', 		'<p class="c4">', $data);
			$data = str_replace('<p class="gatha1">', 		'<p class="g5">', $data);
			$data = str_replace('<p class="gatha2">', 		'<p class="g6">', $data);
			$data = str_replace('<p class="gatha3">', 		'<p class="g7">', $data);
			$data = str_replace('<p class="gathalast">',	'<p class="g8">', $data);
			$data = str_replace('<p class="hangnum">', 		'<p class="h9">', $data);
			$data = str_replace('<p class="indent">', 		'<p class="ia">', $data);
			$data = str_replace('<p class="nikaya">', 		'<p class="nb">', $data);
			$data = str_replace('<p class="subhead">', 		'<p class="sc">', $data);
			$data = str_replace('<p class="subsubhead">',	'<p class="sd">', $data);
			$data = str_replace('<p class="title">',	 	'<p class="te">', $data);
			$data = str_replace('<p class="unindented">',	'<p class="uf">', $data); 
			file_put_contents($xd_old . '.js', $data);
			
			//
			
			$xd_old = substr($row['xd'], 0, 4);
			
			$han = fopen($xd_old . '.js', 'w');
			$han_a = fopen($xd_old . 'a.js', 'w');
			
			echo $xd_old . ', ';
			//echo '(' . $han . ', ' . $han_a . '), ';
			if (substr($xd_old, -1) == '9') {
				echo '<br>';
			}
			
			fwrite($han_a, 'var P_HTM = [];' . chr(10));
			//fwrite($han, 'var P_HTM = [];' . chr(10));
			fwrite($han, 'var P_Tag = [];' . chr(10));  
			fwrite($han, 'var P_Par = [];' . chr(10));   
			fwrite($han, 'var P_Toc = [];' . chr(10));  
			$Toc = 0;
		}	
		
		$s1 = trim(str_replace('*', '', $row['sHTML']));
		if ($s1 != '') { 
			$ary1 = explode('*', trim($row['sHTML']));	
			$ary2 = explode(chr(10), trim($row['sTags']));
			$s1 = '';
			$s2 = '';
			
			$j = floor(substr($row['xd'], 5));
			 
			for ($i=0; $i<count($ary1); $i++) { 
				if ((strpos($ary2[$i], '<a name="V') !== false) or (strpos($ary2[$i], '<a name="T') !== false)) {  
					$i = $i+2;
				} else {
					while (($pos1 = strpos($ary2[$i], '<a name="M')) !== false) {
						$Page = floor(substr($ary2[$i], $pos1 + 10 + 2));		//   < name="M0.
						$Myn = '<span class="font10">{!@#M#@!}' . $xd_old . '_' . $Page . '"></a>[Pg.' . $Page . ']</span>';		// 10 2 1234></a>
						$ary2[$i] = substr($ary2[$i], 0, $pos1) . $Myn . substr($ary2[$i], $pos1 + 10 +2 + 9);  
					}
					while (($pos1 = strpos($ary2[$i], '<a name="P')) !== false) {
						$Page = floor(substr($ary2[$i], $pos1 + 10 + 2));
						$PTS = '<span class="font10">{!@#P#@!}' . $xd_old . '_' . $Page . '"></a>[PTS.' . $Page . ']</span>';		// 10 2 1234></a>
						$ary2[$i] = substr($ary2[$i], 0, $pos1) . $PTS . substr($ary2[$i], $pos1 + 10 +2 + 9);  
					} 
					// remove <a name="para 
					//while (strpos($ary2[$i], '<a name="para') !== false) {
					//	fwrite($han2, $ary2[$i] . chr(10));
					//	$i = $i +2;
					//}  
					//if ($ary1[$i] == '') {
					//	$s1 = $s1 . $ary1[$i];
					//	$s2 = $s2 . $ary2[$i];
					//} else {
						if (strpos($ary2[$i], '<') !== false) {
							$s1 = $s1 . $ary1[$i] . '*';
							$s2 = $s2 . $ary2[$i] . '*'; 
						} else {
							$s1 = $s1 . $ary1[$i] . $ary2[$i]; 
						}  
					//}
				}
			} 
			$s1 = str_replace('{!@#M#@!}', '<a name="M', $s1);
			$s2 = str_replace('{!@#M#@!}', '<a name="M', $s2);
			$s1 = str_replace('{!@#P#@!}', '<a name="P', $s1);
			$s2 = str_replace('{!@#P#@!}', '<a name="P', $s2);
			fwrite($han_a, 'P_HTM[' . $j . "]='" . str_replace("'", "\'", $s1) . "';" . chr(10));
			//fwrite($han, 'P_HTM[' . $j . "]='" . str_replace("'", "\'", $s1) . "';" . chr(10));
			fwrite($han, 'P_Tag[' . $j . "]='" . str_replace("'", "\'", $s2) . "';". chr(10));
			
			if ((strpos($row['sTags'],'<p class="chapter">') !== false) or (strpos($row['sTags'],'<p class="title">') !== false) or (strpos($row['sTags'],'<p class="subhead">') !== false)) { 
				fwrite($han, 'P_Toc[' . $Toc . "]='p" . $j . "';". chr(10)); 
				$Toc = $Toc +1; 
			} 
			
			//if (strpos($row['sTags'],'<span class="paranum">') !== false) {  
			//	$aryx = explode('<span class="paranum">' . chr(10), $row['sTags']);
			//	$s2 = '';
			//	for ($idx=1; $idx<=4; $idx++) {
			//		$s1 = trim($aryx[$idx]);
			//		$s1 = str_replace(chr(10), '', $s1);  
			//		$s2 = $s2 . $s1; 
			//	} 
			//	$Par = '';
			//	for ($idx=0; $idx<=3; $idx++) {
			//		if (('0'<=substr($s2, $idx, 1)) and (substr($s2, $idx, 1)<='9')) {
			//			$Par = $Par . substr($s2, $idx, 1);
			//		}
			//	} 
			//	fwrite($han, 'P_Par[' . $Par . "]='p" . $j . "';". chr(10)); 
			//} 
			
			if (strpos($row['sTags'],'<a name="para') !== false) {  
				$aryx = explode('<a name="para', $row['sTags']);
				$aryx = explode('"', $aryx[1]);
				list($no1, $no2) = explode('-', $aryx[0]); 
				$no1 = floor($no1);
				$no2 = floor($no2);
				if ($no2 == 0) {
					fwrite($han, 'P_Par[' . $no1 . "]='p" . $j . "';". chr(10)); 
				} else {
					if ($no2 < $no1) {	//special process
						$no1_len = strlen($no1);
						$no2_len = strlen($no2);
						if (($no1_len != $no2_len) and ($no2_len <=2)) {	//correct
							if ($no2_len == 1) { 
								$no2 = floor($no1/10) * 10 + $no2;
							} else {
								$no2 = floor($no1/100) * 100 + $no2;
							}
							for ($idx=$no1; $idx<=$no2; $idx++) {
								fwrite($han, 'P_Par[' . $idx . "]='p" . $j . "';". chr(10));
							}
						} else {
							$no2 = floor($no1/100) * 100 + floor(substr($no2, -1)); 
							for ($idx=$no1; $idx<=$no2; $idx++) {
								fwrite($han, 'P_Par[' . $idx . "]='p" . $j . "';". chr(10));
							}
							fwrite($han, '//{!@#Error P_Par ' . $no1 . ' ' . $no2 . '#@!}' . chr(10));
						}
					} else {
						for ($idx=$no1; $idx<=$no2; $idx++) {
							fwrite($han, 'P_Par[' . $idx . "]='p" . $j . "';". chr(10));
						}
					}  
				} 
			} 
						
			//fwrite($han, chr(10));
		} 
	}
	fclose($han); 
	unlink('x.js');
	
	fclose($han_a); 
	unlink('xa.js');
		 
 
?> 
</div>
</body>
</head>
