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
	document.getElementById('DictionaryKey').value = val;
	DictionaryKeyGo();
	change_tab('page1');
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
