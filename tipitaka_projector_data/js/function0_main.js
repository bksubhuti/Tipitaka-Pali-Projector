var SingleLoad = typeof UseSinglePageLoading !== "undefined" && UseSinglePageLoading === true;

// This function( toUniRegEx) is from "Digital Pali Reader (DPR)".
//
// GNU General Public License version 2.0 (GPLv2)
// https://sourceforge.net/projects/digitalpali/
// Related links https://pali.sirimangalo.org/
function toUniRegEx(input) {
	if(!input || input == '') return input;
	var nigahita = 'ṃ';
	var Nigahita = 'Ṃ';

	input = input.replace(/\-.r/g, 'ṝ').replace(/\.r/g, 'ṛ').replace(/\.R/g, 'Ṛ');
	input = input.replace(/\-.l/g, 'ḹ').replace(/\.h/g, 'ḥ');
	input = input.replace(/\"S/g, 'Ś').replace(/\"s/g, 'ś').replace(/\.S/g, 'Ṣ').replace(/\.s/g, 'ṣ');
	input = input.replace(/ee/g, 'ē').replace(/oo/g, 'ō');

	input = input.replace(/aa/g, 'ā').replace(/ii/g, 'ī').replace(/uu/g, 'ū').replace(/\.t/g, 'ṭ').replace(/\.d/g, 'ḍ').replace(/\"nk/g, 'ṅk').replace(/\"ng/g, 'ṅg').replace(/\.n/g, 'ṇ').replace(/\.m/g, nigahita).replace(/\u1E41/g, nigahita).replace(/\~n/g, 'ñ').replace(/\.l/g, 'ḷ').replace(/AA/g, 'Ā').replace(/II/g, 'Ī').replace(/UU/g, 'Ū').replace(/\.T/g, 'Ṭ').replace(/\.D/g, 'Ḍ').replace(/\"N/g, 'Ṅ').replace(/\.N/g, 'Ṇ').replace(/\.M/g, Nigahita).replace(/\~N/g, 'Ñ').replace(/\.L/g, 'Ḷ').replace(/\"n/g, 'ṅ');
	return input;
}

function replacei(str, sub, f){
	let A = str.toLowerCase().split(sub.toLowerCase());
	let B = [];
	let x = 0;
	for (let i = 0; i < A.length; i++) {
		let n = A[i].length;
		B.push(str.substr(x, n));
		if (i < A.length-1)
			B.push(f(str.substr(x + n, sub.length)));
		x += n + sub.length;
	}
	return B.join('');
}

var view_left = localStorage.getItem("view_left");
var view_right = localStorage.getItem("view_right");
function toTranslate(input) {
	out = '';
	input = '' + input;
	switch (view_left) {
		case 'Roman' :
			out = input;
			break;
		case 'Myanmar' :
			out = toMyanmar(input);
			break;
		case 'Sinhala' :
			out = toSinhala(input);
			break;
		case 'Thai' :
			out = toThai(input);
			break;
		case 'Devanagari' :
			out = toDevar(input);
			break;
	}
	return(out);
}

function toTranslateRight(input) {
	out = '';
	input = '' + input;
	switch (view_right) {
		case 'Roman' :
			out = input;
			break;
		case 'Myanmar' :
			out = toMyanmar(input);
			break;
		case 'Sinhala' :
			out = toSinhala(input);
			break;
		case 'Thai' :
			out = toThai(input);
			break;
		case 'Devanagari' :
			out = toDevar(input);
			break;
	}
	return(out);
}

function change_tab(id) {
	document.write = localStorage.setItem('main_content', id);
	for (var i =1; i<=5; i++) {
		document.getElementById("page" + i +"_desc").style.display = "none";
		document.getElementById("page" + i).className="notselected";
	}
	document.getElementById(id).className="selected";
	document.getElementById(id + "_desc").style.display = "inline";

	if (id == "page2") {    // declension 
		document.getElementById('DictionaryKey').style.display = 'none';
		document.getElementById('GoDictionary').style.display = 'none';
		document.getElementById('DeclensionKey').style.display = 'inline';
		document.getElementById('GoDeclension').style.display = 'inline';

		var val = document.getElementById('DeclensionKey').value.trim();
		document.getElementById('DeclensionKey').value = val;

		DeclensionSearch();
		DeclensionTable(val);
		// document.getElementById('DeclensionKey').focus();
	} else {
		document.getElementById('DictionaryKey').style.display = 'inline';
		document.getElementById('GoDictionary').style.display = 'inline';
		document.getElementById('DeclensionKey').style.display = 'none';
		document.getElementById('GoDeclension').style.display = 'none';
	}

	if (id == "page4") {    // TOC
		PaliHistoryList();
	}
	if (id == "page5") {    // history
		DictHistoryList();
	}
}

$.getScript("js/z_english.js");
$.getScript("js/z_grammar.js");
$.getScript("js/z_inflect.js");
$.getScript("js/z_translit.js");
$.getScript("js/z_tipitaka_Maps.js");
$.getScript("js/pali_sutta_no.js");

var _ary = window.location.toString().split('.htm');
var html_file = _ary[0].slice(-4) + '.htm';
var html_no = _ary[0].slice(-4);

M_LOC = [];
file = 'pali/MyNote/' + html_no + '.js';
$.getScript(file);

M_SCT = [];		// sutta_center;
DictionaryBackground = '';

function GetTrId(val) {
	document.write = localStorage.setItem('tr_id', val);

	h = parseInt(document.getElementById('main_div').style.height) - Math.max(34, parseInt(document.getElementById('main_div').style.top) + parseInt(document.getElementById('main_content').offsetTop));

	// document.getElementById('main_content').style.height = h + "px";

	Message(val);		// put message

	copystatus = document.getElementById('copystatus').value;
	if (copystatus == 'fetching') {
		copy1 = document.getElementById('copy1').value;
		copy2 = document.getElementById('copy2').value;
		if (copy1 == '*') {	// start
			document.getElementById('copy1').value = val;
			document.getElementById('copystatus').value = 'fetching';
			document.getElementById('m' + val).innerHTML = '<input type="checkbox" checked="">' + document.getElementById('m' + val).innerHTML;
		} else {
			if (copy2 == '') {
				copy2 = val;
			}
			var s1 = Math.min(Number(val), Math.min(Number(copy1), Number(copy2)));
			var s2 = Math.max(Number(val), Math.max(Number(copy1), Number(copy2)));
			for (i=s1; i<=s2; i++) {
				if (P_HTM[i] != undefined) {
					document.getElementById('m' + i).innerHTML = document.getElementById('m' + i).innerHTML.replace('<input type="checkbox" checked="">', '');
				}
			}

			var s1 = Math.min(Number(copy1), Number(val));
			var s2 = Math.max(Number(copy1), Number(val));
			for (i=s1; i<=s2; i++) {
				if (P_HTM[i] != undefined) {
					document.getElementById('m' + i).innerHTML = '<input type="checkbox" checked="">' + document.getElementById('m' + i).innerHTML;
				}
			}
			document.getElementById('copy2').value = val;
		}
	}
}

//=============================================================
function sel_on_off() {
	contentdisplay = localStorage.getItem('contentdisplay');
	if (!contentdisplay) {
		contentdisplay = '0';
		document.write = localStorage.setItem('contentdisplay', contentdisplay);
	}

	if (localStorage.getItem('contentdisplay') == '0') {
		if (document.getElementById('main_div').style.display == 'none') {
			document.getElementById('main_div').style.display = 'inline';
		} else {
			document.getElementById('main_div').style.display = 'none';
		}
	}
}

function RedrawTable(w) {
	//sc = screen.width;
	w1 = w;		//parseInt(w /screen.width * 100);
	w2 = document.body.getBoundingClientRect().width - w1 - 15; 	// class="main_td2" margin-left:15px;

	if (localStorage.getItem('contentposition') == '0') {  // float panel
		document.getElementById('main_td2').style.left = "0px";
		document.getElementById('main_td2').style.top = "0px";
		document.getElementById('main_td2').style.width = document.body.getBoundingClientRect().width + "px";
		document.getElementById('main_td2').style.height = window.innerHeight+ "px";
		$('.main_td2').css('margin-left', '0px');

		w1 = parseInt(document.getElementById('main_div').style.width) + parseInt(document.getElementById('main_div').style.height);
		if (w1 < 600) {
			document.getElementById('main_div').style.width = '300px';
			document.getElementById('main_div').style.height = '300px';
		}
	} else {	// fixed panel
		document.getElementById('main_div').style.left = "0px";
		document.getElementById('main_div').style.top = "0px";
		document.getElementById('main_div').style.width= w1 + "px";
		document.getElementById('main_div').style.height= (window.innerHeight -30) + "px";
		document.getElementById('main_td2').style.left= w1 + "px";
		document.getElementById('main_td2').style.width= w2 + "px";
	}
	// document.getElementById('main_content').style.height = document.getElementById('main_div').style.height + "px"

	adjustTabContent();

	console.log(document.body.getBoundingClientRect().width + '  ' + window.innerWidth +'  '+ main_div.style.width+ '  '+main_td2.style.width);
}

function MATurlGo(no) {		// id = id number , no=1=mula, 2=att, 3=tika 4= anutika
	var para= "";

	tr_id = localStorage.getItem("tr_id");

	if (tr_id !=""){
		 para = GetMyanmarParaNo();

	}
	else{
		para = localStorage.getItem("MyanmarParaNum");
	}



	v1 = T_Maps[html_no][no];
	if (v1.length != 4) {		// multi volumn
		var v2 = T_Mapx[html_no][no];
		ary1 = v2.split(';');
		for (i in ary1) {
			ary2 = ary1[i].split('=');
			p1 = parseInt(ary2[1]);
			if (para <= p1) {
				v1 = ary2[0];
				break;
			}
		}
	}

	url = v1 + '#para' + para;
	//document.write = localStorage.setItem('history_pos', url); 
	PaliHistoryGoUrl(url); 
}	


function GetMyanmarParaNo(){
	var tr_id = localStorage.getItem('tr_id'); 
	tr_id = parseInt(tr_id)+2;

	// tr_id convert into Myanmar paragraph no.
	var para = 1;
	for (para=(P_Par.length-1); 0<para; para--) {
		if (P_Par[para] != null) {
			v1 = parseInt(P_Par[para].substring(1));
			if (v1<=  tr_id) {
				break;
			}
		}	
	} 	 
	para = parseInt(para);
	return para;

}






/*
@ CHANGE DEFAULT CSS BACKGROUND COLOR, FONT COLOR, TEXT SIZE
@ WARNING: It shall SLOWDOWN  the page load obviously, so if you know with value is suitable for your device, fix your text-size number in projector_style.css
@ default text-size is delared in the projector_style.css
@ Default values left column text-size: 25pt, right column 20pt;
@ This function help to custom text-size on small-screen devices.
*/

//---------------------------------
// 1. Left Font-size, Line-Height

var addScript = function addScript(path, opts) {
    var options = opts || {body: false};
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', path);
    if (options.onload) {
        scriptTag.onload = options.onload;
    }
    if (options.body === true) {
        document.body.appendChild(scriptTag);
    } else {
        document.head.appendChild(scriptTag);
    }
    
};
document.head.addEventListener("load", function(event) {
     console.log('event.target.src', event.target.src);
});

var loadInSequence = function loadInSequence(scripts, onDone) {
    if (!scripts || scripts.length === 0) {
    	if (onDone) {
    		onDone();
		}
        return;
    }
    var current = scripts.shift();
    addScript(current, {onload: function() {
        loadInSequence(scripts, onDone);
    }});
};

if (localStorage.getItem("view_right") == 'Suttacentral') {
    $.getScript('pali/SuttaCentral/' + html_no + '.js');
}
// Script load order is VERY important
// stuff in final-script uses stuff in the others
var toLoad = [];
if (SingleLoad) {
	toLoad = [
		'js/final-script.js'
	]
} else {
	toLoad = [
		'pali/' + html_no + '.js',
		'pali/' + html_no + 'a.js',
		'js/final-script.js'
	]
}

loadInSequence(toLoad);
