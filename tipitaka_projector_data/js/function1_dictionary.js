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
	var jDictInfo = {key:"", source:"", def:""};
	//preserve original for searching... 
	//var strOrigKey = this.dataset.wordvalue.trim();

	key = toUniRegEx(document.getElementById('DictionaryKey').value.toLowerCase().trim());

	jDictInfo.key = key;

	var tr_id = localStorage.getItem('tr_id');
	if (tr_id){
		jDictInfo.source = getAnkiSentence(key, P_HTM[tr_id]);
	}
 
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
			DictionaryRet = DictionaryRet + DoAnalysis(key) + '</div>';
		}	
	}

	//write to the anki structure
	jDictInfo.def = DoAnalysis(key);

	document.getElementById('page1_desc').innerHTML = DictionaryRet;

	// now write the jDictInfo to the localStorage and create an array to do so.
	// This will be used for anki later on.
	var DictInfoArr = [];
	var strDictInfoArr = localStorage.getItem("DictInfoArr");
	if (strDictInfoArr){
		DictInfoArr= JSON.parse(strDictInfoArr);

		if (DictInfoArr)
			var i=0;
			// Check to see if it exists already.. if so we need to shift it up top  shift/push
			for (i in  DictInfoArr){
				if ( (DictInfoArr[i].key == jDictInfo.key) ) {
					//found.. take it out and push to beginning later. 
					DictInfoArr.splice(i,1);	
				} 
			}
			// found and taken out to be added later or new item goes to beginning
			DictInfoArr.unshift(jDictInfo);
	}


	localStorage.setItem("DictInfoArr", JSON.stringify(DictInfoArr));
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


function dictionaryMap() {
	return {
		hee1: ee1,
		hpc1: pc1,
		hpc2: pc2,
		hpd1: pd1,
		hpe1: pe1,
		hpe2: pe2,
		hpe3: pe3,
		hpe4: pe4,
		hpe5: pe5,
		hpe6: pe6,
		hpg1: pg1,
		hpm1: pm1,
		hpm2: pm2,
		hpm3: pm3,
		hpm4: pm4,
		hpv1: pv1,
		hpv2: pv2,
		hpv3: pv3,
		hse1: se1
	};
}


function WordListLookup(target) {
	const key = toUniRegEx(document.getElementById('DictionaryKey').value.toLowerCase().trim());
	document.getElementById('DictionaryKey').value = key;
	if (!key) { return [] }

	dict_records = 0;
	let currentKeys = '';
	const dictionaries = dictionaryMap();

	for (const dictionary of ary_dict) {
		if (!dictionary) {
			continue;
		}
		const dictionaryName = dictionary.substring(1);
		const actualDictionary = dictionaries[dictionary];
		if (actualDictionary) {
			currentKeys += GetKeys(actualDictionary, dictionaryName, key, '');
		}
	}

	const cleanKeys = currentKeys
		.replace(/##/g, '#')
		.split('#')
		.filter(key => key)
		.map(key => key.slice(1));

	const uniqueKeys = [...new Set(cleanKeys)];
	uniqueKeys.sort();

	const usableKeys = uniqueKeys.slice(0, 20);
	return usableKeys;
};

 function getAnkiSentence(key, strPara){
	var strResult = "";
	var rx = new RegExp (`(${key})`,"i");

	var sentencesArr = strPara.match( /[^\.!\?]+[\.!\?]+/g );

	for (i in sentencesArr){
		if (rx.test(sentencesArr[i])){
			// replace the key with <B>key</B>
			strResult = sentencesArr[i].replace(rx, "<b>$1</b>");
			return strResult;
		}
	}
	// nothing found
	return null;
}


