function ChangeLookupMode() {
	var isPopupMode = localStorage.getItem("popupword");
	document.write.innerHTML = localStorage.removeItem("listparagraph");
	document.write.innerHTML = localStorage.removeItem("popupword");
	if (isPopupMode == 1) {
		document.write.innerHTML = localStorage.setItem('listparagraph', 1);
		document.getElementById('LookupMode').innerHTML = 'List paragraph';
	} else {
		document.write.innerHTML = localStorage.setItem('popupword', 1);
		document.getElementById('LookupMode').innerHTML = 'Pop-up singleWord';
	}
	window.location.reload();  
} 

function goUrl() { 
	var p1 = document.getElementsByName('Reference'); 
	var val = parseInt(document.getElementById('PageNo').value);
	var url;
	
	var old = '@' + localStorage.getItem('history'); 
	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ":"+ ('0' + today.getMinutes()).slice(-2)  + ":"+ ('0' + today.getSeconds()).slice(-2);   
	
	if (p1[1].checked == true) {	// Paragraph 
		url = '#' + P_Par[val];  
		 
		document.write.innerHTML = localStorage.setItem('history', date + '_' + html_file + url + old);
	} else {	// Myanmar Page or PTS Page  
		var url = '';
		if (p1[0].checked == true) { 	// Myanmar Page
			url = '#M' + html_no + '_' + val; 
		} else { 						// PTS Page
			url = '#P' + html_no + '_' + val; 
		}  
		
		document.write.innerHTML = localStorage.setItem('history', date + '_' + html_file + url + old); 
	} 
	sel_off();
	window.location = url; 
}

function goToc() { 
	var val = document.getElementById('Toc').value;  
	var url = '#' + P_Toc[val]; 
	
	var old = '@' + localStorage.getItem('history');
	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ":"+ ('0' + today.getMinutes()).slice(-2)  + ":"+ ('0' + today.getSeconds()).slice(-2); 
	
	document.write.innerHTML = localStorage.setItem('history', date + "_" + html_file + url + old) ;
	
	sel_off();
	window.location = url;
}

var dict_records = 0;

function GetKeys(ary, dname, key, ret_key) {
	this.ary = ary;
	var tag = '@';	// english dictionary;
	if (dname != 'ee1') {	//pali dictionary;
		tag = '!';
	} 
	
	var result = '#';
	var key_len = key.length;
	for (var i in ary) {
		var s1 = '#' + tag + i + '#';
		if ((i.substring(0, key_len) == key) && (ret_key.indexOf(s1) == -1)) {
			result = result + tag + i + '#';
			dict_records = dict_records +1;
			if (200 < dict_records) {
				break;
			}
		}
	} 
	return (result.trim());
}

function GetValues(ary, dname, key) {
	this.ary = ary; 
	var meaning_from_dict = "" + ary[key];
	if (meaning_from_dict != "undefined") {
		if (dname.indexOf('pm') != -1) {	//myanmar class="ZawgyiFont" 
			return ('<b>' + dname + '</b><br><span class="ZawgyiFont">' + meaning_from_dict + '</span><br>');
		} else {
			return ('<b>' + dname + '</b><br>' + meaning_from_dict + '<br>');
		}
	} else {
		return ('');
	} 
}

function Dict_Show(key) {
	var get_data = '';
	for (var i = 0; i<ary_dict.length; i++) {
		var d_name = ary_dict[i].substring(1);
		if (ary_dict[i] == 'hee1') {get_data = get_data + GetValues(ee1, d_name, key);}
		if (ary_dict[i] == 'hpc1') {get_data = get_data + GetValues(pc1, d_name, key);}
		if (ary_dict[i] == 'hpc2') {get_data = get_data + GetValues(pc2, d_name, key);}
		if (ary_dict[i] == 'hpd1') {get_data = get_data + GetValues(pd1, d_name, key);}
		if (ary_dict[i] == 'hpe1') {get_data = get_data + GetValues(pe1, d_name, key);}
		if (ary_dict[i] == 'hpe2') {get_data = get_data + GetValues(pe2, d_name, key);}
		if (ary_dict[i] == 'hpe3') {get_data = get_data + GetValues(pe3, d_name, key);}
		if (ary_dict[i] == 'hpe4') {get_data = get_data + GetValues(pe4, d_name, key);}
		if (ary_dict[i] == 'hpg1') {get_data = get_data + GetValues(pg1, d_name, key);}
		if (ary_dict[i] == 'hpm1') {get_data = get_data + GetValues(pm1, d_name, key);}
		if (ary_dict[i] == 'hpm2') {get_data = get_data + GetValues(pm2, d_name, key);}
		if (ary_dict[i] == 'hpm3') {get_data = get_data + GetValues(pm3, d_name, key);}
		if (ary_dict[i] == 'hpm4') {get_data = get_data + GetValues(pm4, d_name, key);}
		if (ary_dict[i] == 'hpv1') {get_data = get_data + GetValues(pv1, d_name, key);}
		if (ary_dict[i] == 'hpv2') {get_data = get_data + GetValues(pv2, d_name, key);}
		if (ary_dict[i] == 'hpv3') {get_data = get_data + GetValues(pv3, d_name, key);}
	} 	
	Dict_Declension(key);
	document.getElementById("Dict_result").innerHTML = '<span style="color:red;font-size:14pt;">' + key + '</span><br>' + get_data + '<hr>' + document.getElementById("Dict_result").innerHTML;
	
}

function Dict_search() { 
	dict_records = 0;
	var key = toUniRegEx(document.getElementById('Dict_key').value.trim().toLowerCase()); 
	document.getElementById('Dict_key').value = key;   
	
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
			if (ary_dict[i] == 'hpg1') {get_keys = get_keys + GetKeys(pg1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm1') {get_keys = get_keys + GetKeys(pm1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm2') {get_keys = get_keys + GetKeys(pm2, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm3') {get_keys = get_keys + GetKeys(pm3, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpm4') {get_keys = get_keys + GetKeys(pm4, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpv1') {get_keys = get_keys + GetKeys(pv1, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpv2') {get_keys = get_keys + GetKeys(pv2, d_name, key, get_keys);}
			if (ary_dict[i] == 'hpv3') {get_keys = get_keys + GetKeys(pv3, d_name, key, get_keys);}
		} 
		
		get_keys = get_keys.replace(/\#\#/g, '#');
		var ary = get_keys.split('#');
		ary.sort(); 
		get_keys = ''; 
		for (var i = 0; i<ary.length; i++) {
			if (ary[i] != '') {
				switch (view_left) {
					case 'Roman' :
						get_keys = get_keys + '<label onClick="Dict_Show(\'' + ary[i].substring(1) + '\')" style="Color:blue;">' + ary[i].substring(1) + '</label><br>'; 
						break;
					case 'Myanmar' : 
						get_keys = get_keys + '<label onClick="Dict_Show(\'' + ary[i].substring(1) + '\')" style="Color:blue;">' + toMyanmar(ary[i].substring(1)) + '</label><br>';
						break;
					case 'Sinhala' : 
						get_keys = get_keys + '<label onClick="Dict_Show(\'' + ary[i].substring(1) + '\')" style="Color:blue;">' + toSinhala(ary[i].substring(1)) + '</label><br>';
						break;
					case 'Thai' : 
						get_keys = get_keys + '<label onClick="Dict_Show(\'' + ary[i].substring(1) + '\')" style="Color:blue;">' + toThai(ary[i].substring(1)) + '</label><br>';
						break;
					case 'Devanagari' : 
						get_keys = get_keys + '<label onClick="Dict_Show(\'' + ary[i].substring(1) + '\')" style="Color:blue;">' + toDevar(ary[i].substring(1)) + '</label><br>';
						break;
				}
			}  
		} 
		if (200 < dict_records) { 
			document.getElementById('Dict_Tips').innerHTML = get_keys + '<br>.. More 200 Records..'; 
		} else {
			document.getElementById('Dict_Tips').innerHTML = get_keys; 
		}
	} 
}


function Dict_Declension(val) { 
	if (val == '') {		// from Click of .r1
		var key = localStorage.getItem('Dict_key'); 
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
				var aryz = outz.split(key);
				outz = '';
				for (idz=0; idz<aryz.length; idz++) { 
					var s1 = aryz[idz+1];
					if (s1 != undefined) {
						s1 = s1.substring(0, 1);
					} else {
						s1 = 'a';
					}
					if ('abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃ'.indexOf(s1) == -1) { 
						outz = outz + aryz[idz] + '<span style="color:red;font-weight:900;">' + key + '</span>';
					} else {  
						outz = outz + aryz[idz] + key; 
					} 
				}   
				outy = outy + outz + '<hr>'; 
			}
		}
	} 
	document.getElementById("Dict_result").innerHTML = outx + outy;  
}
