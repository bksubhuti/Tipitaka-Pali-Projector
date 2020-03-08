

function Copy_Text() {
	var val = document.getElementById('Copy_Text').value;
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
	document.getElementById('Copy_Text').value = data;

	//$('#Copy_Text').focus();
	$('#Copy_Text').select();
}

