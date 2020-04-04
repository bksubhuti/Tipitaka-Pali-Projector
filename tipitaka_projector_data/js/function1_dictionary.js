function paliGoBack() {
	val = localStorage.getItem('history');
	if ((val != null) && (val != undefined) && (5 < val.length)) {  
		ary = val.split('{!@@!}');
		if (0 < ary.length) {
			document.getElementById('page1_desc').innerHTML =  ary[1];
			val = val.substring(ary[0].length + 6);
			document.write = localStorage.setItem('history', val);
		}		
		if (localStorage.getItem('main_content') != 'page1') {
			change_tab('page1');
		}
	}
}

function TmpDictionarySave(id) {
	val = document.getElementById('j' + id).checked;
	if (val == true) {
		aryTemp[id] = '1';
	} else {
		aryTemp[id] = '0';
	}

	var p1 = localStorage.getItem('main_content')
	if (p1 == 'page1') {
		DictionaryKeyGo();
		change_tab(p1);
	} 
	if (p1 == 'page3') {
		ParagraphAnalysis()
	} 
}

function DictionaryGo() {
	key = toUniRegEx(document.getElementById('DictionaryKey').value.toLowerCase().trim());
	if (key == '') { return(''); }
	document.getElementById('DictionaryKey').value = key;

	var DictionaryRet = '';
	var get_data = LookupTwoMethod(key, '');	//1 time directly lookup
	if (get_data != '') {		//found in directly or declension table
		DictionaryRet = DictionaryRet + get_data;
	} else {		// not found
		if (key.slice(-1) == 'ṃ') {		// 2 time lookup
			key2 = key.substring(0, key.length -1);
			var get_data = LookupTwoMethod(key2, 'ṃ');	
		}
		if (get_data != '') {		//found in directly or declension table
			DictionaryRet = DictionaryRet + get_data;
		} else {		// not found
			DictionaryRet = DictionaryRet + '<div class="DictionaryClass" style="' + DictionaryBackground + '">';
			DictionaryRet = DictionaryRet + '<b style="color:#ff0000;" id="G_' + key + '" onClick="OpenOnce(\'' + key + '\')">' + toTranslate(key) + '&nbsp;</b>&nbsp;&nbsp;';
			DictionaryRet = DictionaryRet + WordAnalysis3(key) + '</div>';
		}	
	}
	document.getElementById('page1_desc').innerHTML = DictionaryRet;

	// put in history
	val = localStorage.getItem('history');
	if ((val == null) || (val == undefined)) {
		val = '';
	}
	val = val.replace('-', '');
	val = val.replace('.', '');
	val = val.replace(DictionaryRet + '{!@@!}', '');
	val = DictionaryRet + '{!@@!}' + val;
	document.write = localStorage.setItem('history', val);
}

function DictionaryKeyGo() {
	if (localStorage.getItem('main_content') == 'page2') {
		key = toUniRegEx(document.getElementById('DictionaryKey').value.toLowerCase().trim());
		document.getElementById('DictionaryKey').value = key;
		DeclensionShow(key);
	} else {
		DictionaryGo();
		if (localStorage.getItem('main_content') != 'page1') {
			change_tab('page1');
		}
	}
}

