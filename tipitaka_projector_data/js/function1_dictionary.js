//global variable ; 
var gbJustLookingBack = false;

function paliGoBack() { 

	var strDictInfoArr = localStorage.getItem('DictInfoArr');
	var DictInfoArr = [];
	if (strDictInfoArr){
		DictInfoArr = JSON.parse(strDictInfoArr);
		var key= $('#DictionaryKey').val();
		var x = 0;
		var oneahead = 0;
		// look for the first item to match the array then use the next one in the list if it exist
		for (x=0; x < DictInfoArr.length; x++){

			oneahead = x+1;
			if (DictInfoArr[x].key == key && (oneahead < DictInfoArr.length )){
				x++; 
				$('#DictionaryKey').val(DictInfoArr[x].key);
				gbJustLookingBack = true;
				DictionaryKeyGo();
				gbJustLookingBack = false;
				break;
			}
		}
	}

// this code is broken because history is not written anymore.. need to use the 
// new pali history and also can delete this old code elsewhere.

	/*
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
	*/
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
	$('#lookup-results').empty();




	SetDictionaryClassColor();


	var jDictInfo = {key:"", source:"", def:""};
	//preserve original for searching... 
	//var strOrigKey = this.dataset.wordvalue.trim();

	var key = $('#DictionaryKey').val().toLowerCase().trim();

	jDictInfo.key = key;


	if (key == '') { return(''); } 
	key = key.replace('…', '');
	$('#DictionaryKey').val(toTranslate(key));


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
			DictionaryRet = DictionaryRet + '<div class="DictionaryClass" >';
			DictionaryRet = DictionaryRet + '<a href="javascript:void(0);" id="G_' + key + '" onClick="OpenOnce(\'' + key + '\')" style="font-weight:900;" >' + toTranslate(key) + '&nbsp;</a>&nbsp;&nbsp;';
			DictionaryRet = DictionaryRet + DoAnalysis(key) + '</div>';
		}	
	}

	const peuIsSelected = $('#jpe8:checked').length > 0;
	let inUpedKey = undefined;
	if (peuIsSelected) {
		inUpedKey = CheckInUped(key);
		if (inUpedKey) {
			DictionaryRet = inUpedKey + DictionaryRet;
		}
	}

	if (2 <= key.length) { 
		var rawFile = new XMLHttpRequest(); 
		rawFile.open("GET", 'dictionary/search/xx_search_' + key.substr(0, 2) + '.js', false);
		rawFile.overrideMimeType("text/html"); 
		rawFile.onreadystatechange = function () { 
			if (rawFile.readyState === 4) { 
				if (rawFile.status === 200 || rawFile.status == 0) { 
					var data = ' ' + rawFile.responseText.trim(); 

					if (data.indexOf("'" + key + "':'") != -1) {
						var paliCount = data.split("'" + key + "':'")[1];
						paliCount = paliCount.split("'")[0];
						paliCount = paliCount.split("#")[0]; 

						for (var i=65; i<=87; i++) {
							var v2 = String.fromCharCode(i);
							var v3 = ';' + ary[v2] + ';';
							paliCount = paliCount.replace(v2, v3);
						}
						ary2 = paliCount.split(';');
						var newtotal = 0 ;
						for (i=1; i<ary2.length; i=i+2) { 
							newtotal = newtotal + parseInt(ary2[i +1]); 
						}

 						//1111
						if (DictionaryRet.indexOf('</b><br>') != -1) {
							DictionaryRet = DictionaryRet.replace('</b><br>', '</b>&nbsp;<span onClick="OpenSearchDlg()">🔍 ' + newtotal +'</span><br>')
						} else {
							DictionaryRet = DictionaryRet.replace('</a>&nbsp;&nbsp;', '</a>&nbsp;<span onClick="OpenSearchDlg()">🔍 ' + newtotal +'</span>&nbsp;&nbsp;')	
						}
					}
				}
			}
		}
		rawFile.send(null);
	}

	$('#page1_desc').html(DictionaryRet);

	// now write the jDictInfo to the localStorage and create an array to do so.
	// This will be used for anki later on.
	var DictInfoArr = [];
	var strDictInfoArr = localStorage.getItem("DictInfoArr");
	if (strDictInfoArr){
		DictInfoArr= JSON.parse(strDictInfoArr);
	}
	if (!gbJustLookingBack){

		//write to the anki structure
		jDictInfo.def = DoAnalysis(key);
		var tr_id = localStorage.getItem('tr_id');
		//
		// if you loaded TPP but haven't loaded any text P_HTM would not exist yet
		// it only gets defined after loading a text
		// 
		if (tr_id && typeof P_HTM !== 'undefined'){
			jDictInfo.source = getAnkiSentence(key, P_HTM[tr_id]);
		}
	
		if (DictInfoArr){
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
			localStorage.setItem("DictInfoArr", JSON.stringify(DictInfoArr));
		}

	}
}

function OpenSearchDlg() {
	var key = $('#DictionaryKey').val().toLowerCase().trim();

	showDialog('#search');
	Clear();
	$('#key').val(key);
	$('#key').focus(); 

	var rawFile = new XMLHttpRequest(); 
	rawFile.open("GET", 'dictionary/search/xx_search_' + key.substr(0, 2) + '.js', false);
	rawFile.overrideMimeType("text/html"); 
	rawFile.onreadystatechange = function () { 
		if (rawFile.readyState === 4) { 
			if (rawFile.status === 200 || rawFile.status == 0) { 
				var data = ' ' + rawFile.responseText.trim(); 

				var ary = data.split("'" + key); 
				var ary2 = ';'.split(';');
				var ary3 = ';'.split(';');
				var ary4 = ';'.split(';');
				result = '';
				cx = 0;
				for (i=1; i<ary.length; i++) {
					var ary2 = ary[i].split("':'");
					tail = ary2[0];
					tmp = ary2[1].split("'")[0];

					//
					for (var j=65; j<=87; j++) {
						var v2 = String.fromCharCode(j);
						var v3 = ';'
						tmp = tmp.replace(v2, v3);
						tmp = tmp.replace(v2, v3);
					} 

					ary3[0] = ';0' + tmp.split('#')[0];
					ary3[1] = '' + tmp.split('#')[1];
					if (ary3[1] == 'undefined') { 
						ary3[1] = ';0'; 
					}

					for (j=0; j<=1; j++) { 
						ary4 = ary3[j].split(';');
						var newtotal = 0 ;
						for (k=1; k<ary4.length; k++) { 
							newtotal = newtotal + parseInt(ary4[k]); 
						}
						ary2[j] = newtotal;
					}
					paliCount = ary2[0];
					boldCount = ary2[1]; 

					result = result + '<a hef="javascript:void(0)" style="color:blue;" onclick="Put(\'' + key + tail + '\');">';
					result = result + key + tail;
					result = result + '</a>&nbsp;';

					if (ary2[0] != 0) {
						result = result + '<span style="font-size:9.5pt;color:#800080;">';
						result = result + ary2[0];
						result = result + '</span>,'; 
					} 
					if (ary2[1] != 0) {
						result = result + '<b style="font-size:10pt;background-color:black;color:white;">';
						result = result + '&nbsp;' + ary2[1] + '&nbsp;';
						result = result + '</b>,';  
					} 
					result = result + '&nbsp;&nbsp;&nbsp;';
					cx = cx +1;
					if (cx > 99) {
						result += " <span style='font-size:12pt;color:red;'>> 99...</span>";
						break;
					} 
				} 
		        $('#out').html(result); 
			}
		}
	}
	rawFile.send(null); 
}

function DictionaryKeyGo() {
	if (localStorage.getItem('main_content') == 'page2') {
		key = toUniRegEx($('#DictionaryKey').val().toLowerCase().trim()); 
		$('#DictionaryKey').val(toTranslate(key));
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
		hpe7: pe7,
		hpe8: pe8,
		hpe9: pe9,
		hpg1: pg1,
		hpi1: pi1,
		hpm1: pm1,
		hpm2: pm2,
		hpm3: pm3,
		hpm4: pm4,
		hps1: ps1,
		hps2: ps2,
		hpv1: pv1,
		hpv2: pv2,
		hpv3: pv3,
		hse1: se1
	};
}


function WordListLookup(target) {
	var key = toUniRegEx($('#DictionaryKey').val().toLowerCase().trim()); 
	$('#DictionaryKey').val(key);
	if (!key) { return [] }

	key =toRoman(key);

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
			const keys = GetKeys(actualDictionary, dictionaryName, key, '');
			currentKeys += keys;
		}
	} 

	const cleanKeys = currentKeys
		.replace(/##/g, '#')
		.split('#')
		.filter(key => key)
		.map(key => key.slice(1));

	const uniqueKeys = [...new Set(cleanKeys)];
	uniqueKeys.sort();

	const usableKeys = uniqueKeys.slice(0, 500);
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


const variations = { 
	'a': '[aā]',
	'u': '[uū]',
	't': '[tṭ]',
	'n': '[nñṇṅ]',
	'i': '[iī]',
	'd': '[dḍ]',
	'l': '[lḷ]',
	'm': '[mṁṃ]',
}
/*usage
const str = key.replace(/[atnidlm]/g, (m) => variations[m])
const filterRegex = new RegExp(str)
something.match(filterRegex)==null;
*/

/**
 * Checks if one properly spelled Pali word contains another (if the target contains the source) and returns the index
 * where the source is contained within the target. The source word can contain spelling mistakes whereas the target
 * word is considered to be spelled properly. Comparison is done via 'fuzzy letter search'. Here's an example which will
 * return 6:
 * -> Source: 'sankhara'
 * -> Target: 'sabbe saṅkhārā aniccā'
 *
 * @param source {string} a pali word to be compared
 * @param target {string} a properly spelled Pali word to compare the source to
 * @returns {number}
 */
const fuzzyLetterIndexOf = (target, source) => {
	const fuzzySource =  source.replace(/[autnidlm]/gi, (m) => variations[m]);
	const fuzzySourceRegExp = new RegExp(fuzzySource);
	return target.search(fuzzySourceRegExp);
}


const fuzzyLetterContains = (target, source) => {
	return fuzzyLetterIndexOf(target, source) >= 0;
}

const fuzzyLetterStartsWith = (target, source) => {
	return fuzzyLetterIndexOf(target, source) === 0;
}

function SetDictionaryClassColor(){
	var panel_dict_bg_color =     localStorage.getItem('panel_dict_bg_color');
    $('.DictionaryClass').css('background-color',panel_dict_bg_color);
}
