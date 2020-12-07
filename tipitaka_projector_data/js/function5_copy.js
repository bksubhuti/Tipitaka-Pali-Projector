function CopyText() {
	var val = $('#CopyText').val();

	var ary = val.split('[');
	var data = '';
	for (i in ary) {
		var idx = ary[i].indexOf(']');
		if (idx == -1) {
			data = data + ary[i];
		} else {
			data = data + ary[i].substring(idx+1);
		}

		idx = data.indexOf('	');
		if (idx != -1) {
			data = data.substring(0, idx) + data.substring(idx+1);
		}

		idx = data.indexOf('  ');
		if (idx != -1) {
			data = data.substring(0, idx) + data.substring(idx+1);
		}
	}

	ary = data.split(String.fromCharCode(10));
	data = '';
	for (i in ary) {
		val = ary[i].trim();
		if (val != '') {
			data = data + val + String.fromCharCode(10);
		}
	}
	data = data.trim();
	$('#CopyText').val(data);
 
	$('#CopyText').select();
	document.execCommand('copy');
}

function CopyExport(key) { 
	if (key == '1') {	//start
		$('#CopyText').val('');
		$('#copy1').val('*');
		$('#copystatus').val('fetching');
		$('#copystart').css('display', 'none');
		$('#copyunformat').css('display','inline');
		$('#copyformat').css('display','inline');
		$('#copycancel').css('display','inline');
	} 
	
	if ((key == '0') || (key == '2') || (key == '3')) {	// cancel unformated formated
		copy1 = Number($('#copy1').val());
		if (copy2 == '') {
			copy2 = copy1;
		} else {
			copy2 = Number($('#copy2').val());
		}
		var s1 = Math.min(copy1, copy2);
		var s2 = Math.max(copy1, copy2);

		if (key == '2') {
			txt = '';
			for (i=s1; i<=s2; i++) { 
				txt = txt + $('#p' + i).html().replace(/<[^>]+>/gm ,'') + '\n';
				$('#m' + i).html = $('#m' + i).html().replace('<input type="checkbox" checked>', '');
			} 
			txt = txt.replace(/\&nbsp;/g, '')
			$('#CopyText').val(txt);
			CopyText();
		}
		if (key == '3') {
			doc = '<html>\n';
			doc = doc + '	<head>\n';
			doc = doc + '		<meta charset="utf-8">\n';
			doc = doc + '		<style>\n';
			doc = doc + '			.b1	{ font-size: 24pt; text-indent: 2em;}\n';
			doc = doc + '			.b2	{ font-size: 33pt; text-align:center; font-weight: bold;}\n';
			doc = doc + '			.c3	{ font-size: 24pt; text-align:center;}\n';
			doc = doc + '			.c4	{ font-size: 30pt; text-align:center; font-weight: bold;}\n';
			doc = doc + '			.g5	{ font-size: 24pt; margin-bottom: 0em; margin-left: 4em;}\n';
			doc = doc + '			.g6	{ font-size: 24pt; margin-bottom: 0em; margin-left: 4em;}\n';
			doc = doc + '			.g7	{ font-size: 24pt; margin-bottom: 0em; margin-left: 4em;}\n';
			doc = doc + '			.g8	{ font-size: 24pt; margin-bottom: 0.5cm; margin-left: 4em;}\n';
			doc = doc + '			.h9	{ font-size: 24pt; text-indent: 2em;}\n';
			doc = doc + '			.ia	{ font-size: 24pt; text-indent: 2em; margin-left: 3em;}\n';
			doc = doc + '			.nb	{ font-size: 36pt; text-align:center; font-weight: bold;}\n';
			doc = doc + '			.sc	{ font-size: 24pt; text-align:center; font-weight: bold;}\n';
			doc = doc + '			.sd	{ font-size: 24pt; text-align:center; font-weight: bold;}\n';
			doc = doc + '			.te	{ font-size: 24pt; text-align:center; font-weight: bold;}\n';
			doc = doc + '			.uf	{ font-size: 24pt;}\n';
			doc = doc + '		</style>\n';
			doc = doc + '	</head>\n';
			doc = doc + '\n';
			doc = doc + '	<body>\n';
			doc = doc + '		{!@#body#@!}\n';
			doc = doc + '	</body>\n';
			doc = doc + '</html>\n';


			val = '';
			for (i=s1; i<=s2; i++) { 
				val = val + '		' + $('#p' + i).html() + '\n';
				$('#m' + i).html($('#m' + i).html().replace('<input type="checkbox" checked="">', ''));

			} 
			doc = doc.replace('{!@#body#@!}', val);
			doc = doc.replace(/\&nbsp;/g, '') 
			$('#CopyText').val(doc)
			CopyText(); 
		}
		if (key == '0') { 
			$('#CopyText').val('');
		}	
		for (i=s1; i<=s2; i++) { 
			$('#m' + i).html($('#m' + i).html().replace('<input type="checkbox" checked="">', ''));
		}

		$('#copy1').val('');
		$('#copy1').val('stop');
		$('#copystatus').val(''); 
 
		$('#copystart').css('display', 'inline');
		$('#copyunformat').css('display','none');
		$('#copyformat').css('display','none');
		$('#copycancel').css('display','none');

		if (key == '2') {
			var blob = new Blob([txt], {type: "text/plain;charset=utf-8"});
			saveAs(blob, html_no + '.txt');
		}

		if (key == '3') {
			var blob = new Blob([doc], {type: "text/plain;charset=utf-8"});
			saveAs(blob, html_no + '.doc');
		}

	} 
}
