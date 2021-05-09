function ParagraphAnalysis() { 
	if (typeof P_HTM == 'undefined') { 
		return;
	}
	//BookTipOut();
	var idx = localStorage.getItem('tr_id');
	if ((idx) && (idx != undefined) && (idx != null)) {

		if (typeof P_HTM[idx] != 'undefined') {
			var ParagraphWords = '';
			
			var pali = P_HTM[idx].replace(/\*/g, '');
			pali = pali.split('[');
			//var pali = P_HTM[idx].split('*');
			var Chars = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';

			for (var idy in pali) {
				var pos = pali[idy].indexOf(']');
				pali[idy] = pali[idy].substring(pos+1);

				var word = pali[idy] + ' ';
				var word_str = '';  
				for (var ndx=0; ndx < word.length; ndx ++) { 
					var c1 = word.substr(ndx, 1);
					if (Chars.indexOf(c1) == -1) {		// not in pali range
						if (word_str.length > 1) {
							ParagraphWords = ParagraphWords + word_str.trim().toLowerCase() + ';';
						}
						word_str = '';
					} else {
						word_str = word_str + c1;
					}
				}
			}
			$('#ParagraphWords').val(ParagraphWords.substring(0, ParagraphWords.length-1));
			//change_tab('page3');
			ParagraphDictionary();
		}	
	}	
}

function ParagraphDictionary() {
	if ($('#ParagraphWords').val() != '') {
		// word_hit = 0;
		// word_hit2 = 0;
		ret = '';
		aryParagraph = $('#ParagraphWords').val().split(';');
		for (j in aryParagraph) {
			key = aryParagraph[j]; 

			var get_data = LookupTwoMethod(key, '');	//1 time directly lookup
			if (get_data != '') {		//found in directly or declension table
				ret = ret + get_data + '<hr style="border: 1pt dashed gray;"><br>';
			} else {		// not found
				if (key.slice(-1) == 'ṃ') {		// 2 time lookup
					key2 = key.substring(0, key.length -1);
					var get_data = LookupTwoMethod(key2, 'ṃ');	
				}
				if (get_data != '') {		//found in directly or declension table
					ret = ret + get_data;
				} else {		// not found
					ret = ret + '<div>';
					ret = ret + '<a href="javascript:void(0);" id="G_' + key + '" onClick="OpenOnce(\'' + key + '\')" style="font-weight:900;">' + toTranslate(key) + '&nbsp;</a>&nbsp;&nbsp;';
					ret = ret + DoAnalysis(key) + '</div>';
				}	
				ret = ret + '<hr style="border: 1pt dashed gray;"><br>';
			}
		}	
		$('#page3_desc').html(ret + '<br><br><br>');
	}
}

function OpenOnce(key) {
	var winref = window.open('analysis.htm?k=' + key, 'analysis', '', false); 
}

function CheckInUped(key) {
	const len = key.length;
	if (len < 5) {
		return undefined;
	}
	// first try to direct match
	for (let i = 0; i < 5; i++) {
		const word = key.slice(0, len-i);
		const keys = GetKeys(pe8, 'pe8', word, '');
		if (keys.length > 2) {
			const cleanKeys = keys
				.replace(/##/g, '#')
				.split('#')
				.filter(key => key)
				.map(key => key.slice(1));
			return LookupDictionary(cleanKeys[0]);
		}
	}
	return undefined;
}

function LookupTwoMethod(key, tail) {
	var ret = '';
	var get_data = LookupDictionary(key); 
	if (get_data != '') {		// directly search found
		// word_hit = word_hit +1;
		ret = ret + '<div>';
			ret = ret + '<b style="color:#440000;" id="G_' + key + tail + '">';
				ret = ret + toTranslate(key + tail);
				if (tail != '') {
					ret = ret + '&nbsp;=&nbsp;' + toTranslate(key);
				}
			ret = ret + '</b>';
			ret = ret + '<br>';
		ret = ret + get_data + '</div>';
	} 
	// first time use declension table searching again
	declension = wordbreakdata[key + tail];
	if (declension != undefined) {
		get_data = LookupDictionary(declension);
		if (get_data != '') {	// declension search found
			// word_hit2 = word_hit2 +1;
			ret = ret + '<div id="G_' + key + tail + '">';
				ret = ret + '<img src="images/reset.png"><b style="color:#880000;">' + toTranslate(declension) + '</b>';
				ret = ret + '<br>';
			ret = ret + get_data + '</div>';
		}	
	}
	return(ret);
}

function LookupDictionary(key) {
	get_data = '';
	for (var i = 0; i<ary_dict.length; i++) {
		var d_name = ary_dict[i].substring(1);
		if ((ary_dict[i] == 'hee1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(ee1, d_name, key);}
		if ((ary_dict[i] == 'hpc1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pc1, d_name, key);}
		if ((ary_dict[i] == 'hpc2') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pc2, d_name, key);}
		if ((ary_dict[i] == 'hpd1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pd1, d_name, key);}
		if ((ary_dict[i] == 'hpe1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe1, d_name, key);}
		if ((ary_dict[i] == 'hpe2') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe2, d_name, key);}
		if ((ary_dict[i] == 'hpe3') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe3, d_name, key);}
		if ((ary_dict[i] == 'hpe4') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe4, d_name, key);}
		if ((ary_dict[i] == 'hpe5') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe5, d_name, key);}
		if ((ary_dict[i] == 'hpe6') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe6, d_name, key);}
		if ((ary_dict[i] == 'hpe7') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe7, d_name, key);}
		if ((ary_dict[i] == 'hpe8') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pe8, d_name, key);}
		if ((ary_dict[i] == 'hpg1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pg1, d_name, key);}
		if ((ary_dict[i] == 'hpi1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pi1, d_name, key);}
		if ((ary_dict[i] == 'hpm1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pm1, d_name, key);}
		if ((ary_dict[i] == 'hpm2') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pm2, d_name, key);}
		if ((ary_dict[i] == 'hpm3') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pm3, d_name, key);}
		if ((ary_dict[i] == 'hpm4') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pm4, d_name, key);}
		if ((ary_dict[i] == 'hps1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(ps1, d_name, key);}
		if ((ary_dict[i] == 'hps2') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(ps2, d_name, key);}
		if ((ary_dict[i] == 'hpv1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pv1, d_name, key);}
		if ((ary_dict[i] == 'hpv2') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pv2, d_name, key);}
		if ((ary_dict[i] == 'hpv3') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(pv3, d_name, key);}
		if ((ary_dict[i] == 'hse1') && (aryTemp[d_name] == '1')) {get_data = get_data + GetValues(se1, d_name, key);}
	} 
	return(get_data);
}

function DoAnalysis(key) {
	const algo = localStorage.getItem('tpp-breakup-algo') || 'auto';
	if (algo === 'none') {
		return '';
	} else if (algo === 'tpp') {
		return WordAnalysis2(key);
	} else {
		return WordAnalysis3(key, algo === 'auto');
	}
}

function WordAnalysis3(key, fallBackToWordAnalysis2) {
	// the DPR word break up data is based on an algorithm ran on words (tokens) as directly used in the texts, so no
	// additional processing is needed other than making the key lowercase
	// 
	//if (typeof dprBreakup !== 'object') {
	//	$.getScript("dictionary/dpr-breakup.js");
	//}

	const entry = dprBreakup[key.toLowerCase()];
	if (entry) {
		// entries in the dprBreakup data look like this:
		// 'bhikkhu':'bhikkhu (bhikkhu)',
		//
		// or this:
		// 'āyasmā':'āyasmā (āya, āyasmant, āyasmanta)',
		//
		// or this:
		//
		// 'asaṃkiliṭṭhaasaṃkilesiko':'asaṃ-kiliṭṭhā-saṃkilesiko (asa, asā, kiliṭṭha, saṃkilesiko)',
		//
		// - The key of the dprBreakup object is the word being look up here (the "key" parameter of this function)
		// - The format of the break up is as follows:
		//   - the original word broken up with dashes (-) and the components of the breakup as dictionary entries in ()
		//
		const indexOfLeftBracket = entry.indexOf(' (');
		const indexOfRightBracket = entry.indexOf(')');
		let breakupWords = entry.substring(indexOfLeftBracket + 2, indexOfRightBracket).split(', ');

		// cleans up DPR-specific stuff
		//
		breakupWords = breakupWords.map(w => {
			return w.replace('`', '');
		});

		const formattedWords = breakupWords.map(w => `<b style="color:#440000">${w}</b>`).join(' + ');
		let result = `${entry.substr(0, indexOfLeftBracket)} (${formattedWords})\n`;
		let hasAtLeastOneResult = false;
		for (const word of breakupWords) {
			const lookupResult = LookupDictionary(word);
			if (lookupResult) {
				let lookupResultView = '<b style="font-size:13pt;">⮕</b>';
				lookupResultView += `<span style="color:#440000;">${word}</span>&nbsp;&nbsp`;
				lookupResultView += lookupResult;
				hasAtLeastOneResult = true;
				result += '<br>' + lookupResultView
			}
		}
		if (hasAtLeastOneResult) {
			return result;
		}
	}

	if (fallBackToWordAnalysis2) {
		return WordAnalysis2(key);
	} else {
		return '';
	}

}

function WordAnalysis2(key) {
	key = key.replace(/\a/g, 'a*').replace(/\ā/g, 'ā*').replace(/\i/g, 'i*').replace(/\ī/g, 'ī*').replace(/\u/g, 'u*').replace(/\ū/g, 'ū*').replace(/\e/g, 'e*').replace(/\o/g, 'o*').replace(/\*\*/g, '*');

	v1 = key.slice(-1);
	if (v1 == '*') {
		key = key.substring(0, key.length-1);
	}

	var ary = key.split('*');
	lenx = ary.length;
	lenx_1 = lenx -1;
	for (i=0; i<(lenx_1); i++) {
		v1 = ary[i+1].substring(0, 1); 
		if ( v1 == 'ṃ') {
			ary[i] = ary[i] + 'ṃ';
			ary[i+1] = ary[i+1].substring(1);
		}
	}  
	ary[lenx] = ' ';
	ary[lenx +1] = ' '; 
  
  	word_split = '';
  	found = '';

	start = 0;
	end = lenx_1;
	flax = 'run';
	while (flax == 'run') {
		v1 = ary[start].substr(0, 1);
		v2 = ary[start].substr(1, 1);
		if (v1 == v2) {
			v1 = '<b style="color:white;background:black;">' + v1 + '</b>';
			ary[start] = ary[start].substring(1);
		} else {
			v1 = '';
		}

		flag = '0';
		while (flag == '0') {
			key = '';
			for (i=start; i<=end; i++) {
				key = key + ary[i];
			} 

			ret = LookupDictionary(key);
			if (ret != '') {
				//flag = '<img src="images/s_okay.png">';
				flag = '<b style="font-size:13pt;">⮕</b>';
				break;
			} else {
				ret = wordbreakdata[key];			// index into array  
				if (ret != undefined) {
					ret = LookupDictionary(ret);
					//flag = '<img src="images/change.png">';
					flag = '<b style="font-size:13pt;">⇨</b>';
					break;
				}
			}
			end = end -1;
			if ((end <start) || (end < 0)) {
				break;
			}
		}

		if (flag != '0') {
			out = '';
			for (j=start; j<i; j++) {
				out = out + ary[j];
			}
			found = found + flag + '<span style="color:#440000;">' + v1 + out + '</span>&nbsp;&nbsp;' + ret;
			word_split = word_split + ' + <b style="color:#440000">' +v1 + out + '</b>'

			start = i;
			end = lenx_1;
		} else {		// not found, move to next
			if ((ary[start] != '') && (ary[start] != ' ')) {
				//found = found + '<img src="images/s_cancel.png"><span style="color:#aa0000;">' + v1 + ary[start] + '</span><br>';
				found = found + '<b style="font-size:13pt;">⨂</b><span style="color:#aa0000;">' + v1 + ary[start] + '</span><br>';
				word_split = word_split + '+ <b style="color:#880000">' + v1 + ary[start] + '</b>'
			}	

			start = start +1;
			end = lenx_1;
			if (end <start) {
				flax = 'end';
			}
		}
	}
	word_split = word_split.trim();
	if (word_split.substring(0, 1) == '+') {
		word_split = word_split.substring(1);
	}
	return(word_split + '<br>' + found);
}	
