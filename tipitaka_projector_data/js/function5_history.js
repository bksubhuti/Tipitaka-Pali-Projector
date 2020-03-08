function DictHistoryList() {
	var val = localStorage.getItem('dicthistory');
	if ((val != null) && (val != '')) {
		var out = '';
		var url = '';
		var ary = val.split('@');
		for (var i in ary) {
			if ((ary[i] != 'null') && (ary[i] != '')) {
				v1 = ary[i].replace('$', '').replace(',', '',).replace('?', '',).replace('.', '').replace(';', '').replace('’', '');
				url = url + '<span style="color:blue;" onClick="DictHistoryDisplay(\'' + ary[i].split('#')[1].replace('$', '') + '\');">' + v1 + '</span><br>';
				out = out + '@' + v1 + '$';
			}
		}
		url = '<span style="cursor:pointer;color:blue;" onClick="DictHistoryClear()"><img src="images/b_drop.png">Clear All</span>&nbsp;&nbsp;' + '<span style="cursor:pointer;color:blue;" onClick="DictHistoryCopy()"><img src="images/b_browse.png">Copy Text</span><br>' + url;
		document.getElementById('dicthistory').innerHTML = url;
		if (out != '') {
			out = out.substring(1);
		}	
		document.write = localStorage.setItem('dicthistory', out);
	}
}

function DictHistoryClear() {
	document.write = localStorage.setItem('dicthistory', '');
	document.getElementById('dicthistory').innerHTML = '';
}

function DictHistoryDisplay(val) {
	file = val.substring(0,8);
	pos = val.substring(8);

	if (window.location.toString().indexOf(file) != -1) {		// same file
		if (pos.indexOf('#') != -1) {	// directly jump
			window.location = pos;
		} else {	// myanmar or PTS page no jump
			var tr = document.getElementsByClassName('r1');
			for (var i=0; i<tr.length; i++) {
				if (tr[i].innerHTML.indexOf(pos) != -1) {
					document.getElementById('p' + (i +1)).scrollIntoView();
					break;
				}
			}
		}
	} else {
		location.href = file;
	}
}

function DictHistoryCopy() {
	var val = localStorage.getItem('dicthistory');
	var txt = '';
	if ((val != null) && (val != '')) {
		var ary = val.split('@');
		for (var i in ary) {
			if ((ary[i] != 'null') && (ary[i] != '')) {
				ary1 = ary[i].split('#');
				txt = txt + ary1[0] + '\t' + ary1[1].replace('$', '') + '\n';
			}
		}
		document.getElementById('CopyText').value = txt;
	}
	$('#CopyText').select();
	document.execCommand('copy');
}
