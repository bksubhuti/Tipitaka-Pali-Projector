var dict_records = 0;

function GetKeys(ary, dname, key, ret_key) {
	key_x = '0';
	if (key.slice(-1) == '*') {
		key = key.substring(0, key.length-1);
		key_x = '1';
	}
	if (key.substring(0, 1) == '*') {
		key = key.substring(1);
		key_x = '1' + key_x;
	} else {
		key_x = '0' + key_x;
	}

	this.ary = ary;
	var tag = '@';	// english dictionary;
	if (dname != 'ee1') {	//pali dictionary;
		tag = '!';
	}

	var result = '#';
	var key_len = key.length;
	for (var i in ary) {
		var s1 = '#' + tag + i + '#';
		if (ret_key.indexOf(s1) == -1) {
			v1 = i.substring(0, key_len);
			v2 = i.slice(-key_len);
			v3 = i.indexOf(key);

			if (((v1 == key) && (key_x.substring(0, 1) == '0')) || ((v2 == key) && (key_x == '10')) || ((v3 != -1) && (key_x == '11'))) {
				result = result + tag + i + '#';
				dict_records = dict_records +1;
				if (100 < dict_records) {
					break;
				}
			}	
		}
	}
	return (result.trim());
}

function GetValues(aryVal, dname, key) {
	this.aryVal = aryVal;
	var meaning_from_dict = "" + aryVal[key];
	if (meaning_from_dict != "undefined") {
		if (dname.indexOf('pm') != -1) {	//myanmar class="ZawgyiFont"
			return ('<div class="DictionaryClass" style="' + DictionaryBackground + '"><b style="color:#777777">[' + aryAbbr[dname] + ']</b>&nbsp;<span class="ZawgyiFont">' + meaning_from_dict + '</span></div>');
		} else {
			return ('<div class="DictionaryClass" style="' + DictionaryBackground + '"><b style="color:#777777">[' + aryAbbr[dname] + ']</b>&nbsp;' + meaning_from_dict + '</div>');
		}
	} else {
		return ('');
	}
}

function DeclensionShow(key) {
	var get_data = LookupDictionary(key); 
	
	DeclensionTable(key);
	$("#DeclensionResult").html($("#DeclensionResult").html() + get_data) ;
}

function DeclensionSearch() {
	dict_records = 0;
	var key = toUniRegEx($('#DeclensionKey').val().trim().toLowerCase());
	$('#DeclensionKey').val(key);

	if ( 0 < key.length ) {
		var get_keys = '';
		for (var i = 0; i<ary_dict.length; i++) {
			var d_name = ary_dict[i].substring(1);
			if (ary_dict[i] == 'hee1') {get_keys = get_keys + GetKeys(ee1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpc1') {get_keys = get_keys + GetKeys(pc1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpc2') {get_keys = get_keys + GetKeys(pc2, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpd1') {get_keys = get_keys + GetKeys(pd1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe1') {get_keys = get_keys + GetKeys(pe1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe2') {get_keys = get_keys + GetKeys(pe2, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe3') {get_keys = get_keys + GetKeys(pe3, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe4') {get_keys = get_keys + GetKeys(pe4, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe5') {get_keys = get_keys + GetKeys(pe5, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe6') {get_keys = get_keys + GetKeys(pe6, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpe7') {get_keys = get_keys + GetKeys(pe7, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpg1') {get_keys = get_keys + GetKeys(pg1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm1') {get_keys = get_keys + GetKeys(pm1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm2') {get_keys = get_keys + GetKeys(pm2, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm3') {get_keys = get_keys + GetKeys(pm3, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm4') {get_keys = get_keys + GetKeys(pm4, d_name, key, get_keys);}
			if (ary_dict[i] == 'hps1') {get_keys = get_keys + GetKeys(ps1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hps2') {get_keys = get_keys + GetKeys(ps2, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpv1') {get_keys = get_keys + GetKeys(pv1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpv2') {get_keys = get_keys + GetKeys(pv2, d_name, key, get_keys);}			
			if (ary_dict[i] == 'hpv3') {get_keys = get_keys + GetKeys(pv3, d_name, key, get_keys);}
			if (ary_dict[i] == 'hse1') {get_keys = get_keys + GetKeys(se1, d_name, key, get_keys);}
		}

		get_keys = get_keys.replace(/\#\#/g, '#');
		var ary = get_keys.split('#');
		ary.sort();
		lenx = Math.min(200, ary.length);
		out = '';
		for (var i = 1; i<lenx; i++) {
			if (ary[i] != '') {
				out = out + '<a href="javascript:void(0);" onClick="DeclensionShow(\'' + ary[i].substring(1) +'\');document.getElementById(\'DeclensionResult\').scrollIntoView();">' + '. ' + toTranslate(ary[i].substring(1)) + '</a><br>';
			}
		}
		//alert(lenx);
		$('#DeclensionTips2').html(out);
		document.getElementById('DeclensionTips2').scrollIntoView();

	}

	if (dict_records == '1') {
		DeclensionShow(key);
	}
}

function DeclensionTable(val) {
	if (val == '') {		// from Click of .r1
		var key = localStorage.getItem('DeclensionKey');
	} else {
		var key = val;
	}

	//Search the conjugate directly.
	var outx =  conjugate(key, 'x', 'x');
	if (outx != undefined) {
		outx = outx + '<hr>';
	} else {
		outx = '';
	}
	//Search from wordbreakdata
	var outy = "";
	var key2 = wordbreakdata[key];
	if (key2 != undefined) {
		key2 = key2 + '@_@';
		var ary = key2.split('@_@');
		for (var idx in ary) {
			if (ary[idx] != '') {
				var outz = conjugate(ary[idx], 'x', 'x');
				//add red color for key word
				var aryz = outz.split(toTranslate(key));
				outz = '';
				for (idz=0; idz<aryz.length; idz++) {
					var s1 = aryz[idz+1];
					if (s1 != undefined) {
						s1 = toTranslate(s1.substring(0, 1));
					} else {
						s1 = toTranslate('a');
					}
					//if (toTranslate('abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃ').indexOf(s1) == -1) {
					if (' ,<'.indexOf(s1) != -1) {
						outz = outz + aryz[idz] + '<span style="color:red;font-weight:900;">' + toTranslate(key) + '</span>';
					} else {
						outz = outz + aryz[idz] + toTranslate(key);
					}
				}
				outy = outy + outz + '<hr>';
			}
		}
	}
	$("#DeclensionResult").html(outx + outy);


}
