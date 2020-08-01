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
			val = '';
			for (i=s1; i<=s2; i++) { 
				val = val + $('#p' + i).html().replace(/<[^>]+>/gm ,'') + '\n';
				$('#m' + i).html = $('#m' + i).html().replace('<input type="checkbox" checked>', '');
			} 
			val = val.replace(/\&nbsp;/g, '')
			$('#CopyText').val(val);
			CopyText();
		}
		if (key == '3') {
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
				val = val + '		' + $('#p' + i).html() + '\n';
				$('#m' + i).html($('#m' + i).html().replace('<input type="checkbox" checked="">', ''));

			} 
			format = format.replace('{!@#body#@!}', val);
			format = format.replace(/\&nbsp;/g, '') 
			$('#CopyText').val(format)
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

	} 
}
