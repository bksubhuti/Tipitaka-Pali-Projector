function CopyText() {
	var val = document.getElementById('CopyText').value;
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
	document.getElementById('CopyText').value = data;
 
	$('#CopyText').select();
	document.execCommand('copy');
}

function CopyExport(key) { 
	if (key == '1') {	//start
		document.getElementById('CopyText').value = '';
		document.getElementById('copy1').value = '*';
		document.getElementById('copystart').style.display = 'none';
		document.getElementById('copystatus').value = 'fetching';
		document.getElementById('copyunformat').style.display = 'inline';
		document.getElementById('copyformat').style.display = 'inline';
		document.getElementById('copycancel').style.display = 'inline';
	} 
	
	if ((key == '0') || (key == '2') || (key == '3')) {	// cancel unformated formated
		copy1 = Number(document.getElementById('copy1').value);
		if (copy2 == '') {
			copy2 = copy1;
		} else {
			copy2 = Number(document.getElementById('copy2').value);
		}
		var s1 = Math.min(copy1, copy2);
		var s2 = Math.max(copy1, copy2);

		if (key == '2') {
			val = '';
			for (i=s1; i<=s2; i++) { 
				val = val + document.getElementById('p' + i).innerHTML.replace(/<[^>]+>/gm ,'') + '\n';
				document.getElementById('m' + i).innerHTML = document.getElementById('m' + i).innerHTML.replace('<input type="checkbox" checked>', '');
			} 
			document.getElementById('CopyText').value = val;
			CopyText();
		}
		if (key == '3') {
			//document.getElementById('CopyText').value = document.getElementById('main_table').innerHTML;
			format = '<html>\n';
			format = format + '	<head>\n';
			format = format + '		<style>\n';
			format = format + '			.b1	{ font-size: 24pt; text-indent: 2em;}\n';
			format = format + '			.b2	{ font-size: 33pt; text-align:center; font-weight: bold;}\n';
			format = format + '			.c3	{ font-size: 24pt; text-align:center;}\n';
			format = format + '			.c4	{ font-size: 30pt; text-align:center; font-weight: bold;}\n';
			format = format + '			.g5	{ font-size: 24pt; margin-bottom: 0em; margin-left: 4em;}\n';
			format = format + '			.g6	{ font-size: 24pt; margin-bottom: 0em; margin-left: 4em;}\n';
			format = format + '			.g7	{ font-size: 24pt; margin-bottom: 0em; margin-left: 4em;}\n';
			format = format + '			.g8	{ font-size: 24pt; margin-bottom: 0.5cm; margin-left: 4em;}\n';
			format = format + '			.h9	{ font-size: 24pt; text-indent: 2em;}\n';
			format = format + '			.ia	{ font-size: 24pt; text-indent: 2em; margin-left: 3em;}\n';
			format = format + '			.nb	{ font-size: 36pt; text-align:center; font-weight: bold;}\n';
			format = format + '			.sc	{ font-size: 24pt; text-align:center; font-weight: bold;}\n';
			format = format + '			.sd	{ font-size: 24pt; text-align:center; font-weight: bold;}\n';
			format = format + '			.te	{ font-size: 24pt; text-align:center; font-weight: bold;}\n';
			format = format + '			.uf	{ font-size: 24pt;}\n';
			format = format + '		</style>\n';
			format = format + '	</head>\n';
			format = format + '\n';
			format = format + '	<body>\n';
			format = format + '		{!@#body#@!}\n';
			format = format + '	</body>\n';
			format = format + '</html>\n';


			val = '';
			for (i=s1; i<=s2; i++) { 
				val = val + '		' + document.getElementById('p' + i).innerHTML + '\n';
				document.getElementById('m' + i).innerHTML = document.getElementById('m' + i).innerHTML.replace('<input type="checkbox" checked="">', '');

			} 
			format = format.replace('{!@#body#@!}', val);
			document.getElementById('CopyText').value = format;
			CopyText(); 
		}
		if (key == '0') {
			document.getElementById('CopyText').value = '';
		}	
		for (i=s1; i<=s2; i++) { 
			document.getElementById('m' + i).innerHTML = document.getElementById('m' + i).innerHTML.replace('<input type="checkbox" checked="">', '');
		}

		document.getElementById('copy1').value = '';
		document.getElementById('copy2').value = '';
		document.getElementById('copystatus').value = 'stop';
		document.getElementById('copystart').style.display = 'inline';
		document.getElementById('copyunformat').style.display = 'none';
		document.getElementById('copyformat').style.display = 'none';
		document.getElementById('copycancel').style.display = 'none';
	} 
}
