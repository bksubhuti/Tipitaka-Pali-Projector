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

var gs = function(file) {
    $.ajax({
      url: file,
      dataType: "script",
      type: "GET",
      mimeType: 'text/plain; charset=utf-8',
      contentType: 'text/javascript; charset=UTF-8',
      success: function(data) {
          jQuery.globalEval(data);
      }
    });
}
gs("js/z_english.js");
gs("js/z_grammar.js");
gs("js/z_inflect.js");
//$.getScript("js/z_Pali_Keys.js");
gs("js/z_translit.js");
gs("js/z_tipitaka_Maps.js");
gs("js/pali_sutta_no.js");

var ary = window.location.toString().split('.htm');
var html_file = ary[0].slice(-4) + '.htm';
var html_no = ary[0].slice(-4);

M_LOC = [];
file = 'pali/MyNote/' + html_no + '.js'; 
gs(file); 

M_SCT = [];		// sutta_center;
page3ResultStyle = '';

function Get(val) {
	document.write = localStorage.setItem('tr_id', val);

	h = parseInt(document.getElementById('main_div').style.height) - Math.max(34, parseInt(document.getElementById('main_div').style.top) + parseInt(document.getElementById('main_content').offsetTop));

	document.getElementById('main_content').style.height = h + "px"; 

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
	w2 = screen.width - w1; 

	if (localStorage.getItem('contentposition') == '0') {  // float panel
		document.getElementById('main_td2').style.left = "0px";
		document.getElementById('main_td2').style.top = "0px";
		document.getElementById('main_td2').style.width = screen.width + "px";
		document.getElementById('main_td2').style.height = window.innerHeight+ "px";
		
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
	document.getElementById('main_content').style.height = document.getElementById('main_div').style.height + "px"
}

function MATurlGo(no) {		// id = id number , no=1=mula, 2=att, 3=tika 4= anutika
	var tr_id = localStorage.getItem('tr_id'); 
	tr_id = parseInt(tr_id);

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
	//alert(tr_id + '   ' + para);

    v1 = T_Maps[html_no][no];
	var url = '';
	if (v1.indexOf(',') == -1) {
		url = v1;			// nnnn.htm 8 bytes
	} else {
		var ary = v1.split(',');
		for (i = (ary.length-1); 0 <= i; i--) {
			if (parseInt(T_Maps[ary[i]][5]) <= parseInt(para)) {
			  url = ary[i] ;
			  break;
			}
		}
	}

	url = url + '.htm#R' + para;
	//alert(url);
	document.write = localStorage.setItem('history_pos', url); 
	PaliHistoryGoUrl(url); 
}	

/*
@ CHANGE DEFAULT CSS BACKGROUND COLOR, FONT COLOR, TEXT SIZE
@ WARNING: It shall SLOWDOWN  the page load obviously, so if you know with value is suitable for your device, fix your text-size number in projector_style.css
@ default text-size is delared in the projector_style.css
@ Default values left column text-size: 25pt, right column 20pt;
@ This function help to custom text-size on small-screen devices.
*/
var isPopupMode = localStorage.getItem("popupword");

//---------------------------------
// 1. Left Font-size, Line-Height
var load_size_left = localStorage.getItem('size_left');
if (!load_size_left) { load_size_left = '1.0'; document.write = localStorage.setItem('size_left', load_size_left); }

// 4. Left Font-Family
var load_font_left = localStorage.getItem('font_left');
if (!load_font_left) { load_font_left = 'DejaVuSansCondensed'; document.write = localStorage.setItem('font_left', load_font_left); }

// 6. Background-Color
var load_bg_color = localStorage.getItem('bg_color');
if (!load_bg_color) { load_bg_color = '#f3ddb6'; document.write = localStorage.setItem('bg_color', load_bg_color); }

// 2. Right Font-size, Line-Height
var load_size_right = localStorage.getItem('size_right');
if (!load_size_right) { load_size_right = '1.0'; document.write = localStorage.setItem('size_right', load_size_right); }

// 5. Right Font-Family
var load_font_right = localStorage.getItem('font_right');
if (!load_font_right) { load_font_right = 'DejaVuSansCondensed'; document.write = localStorage.setItem('font_right', load_font_right); }
//---------------------------------

var view_left = localStorage.getItem("view_left");
if (!view_left) { view_left = 'Roman'; document.write = localStorage.setItem('view_left', view_left); }

var view_right = localStorage.getItem("view_right");
if (!view_right) { view_right = 'Space'; document.write = localStorage.setItem('view_right', view_right); }

var newscript = document.createElement('script');
newscript.setAttribute('type', 'text/javascript');
newscript.setAttribute('src', 'pali/' + html_no + '.js');
var head = document.getElementsByTagName('head')[0];
head.appendChild(newscript);

var newscript = document.createElement('script');
newscript.setAttribute('type', 'text/javascript');
newscript.setAttribute('src', 'pali/' + html_no + 'a.js');
var head = document.getElementsByTagName('head')[0];
head.appendChild(newscript);

if (view_right == 'Suttacentral') {
	file = 'pali/Suttacentral/' + html_no + '.js'; 
	$.getScript(file); 	
} 

$(document).ready(function() {
    setTimeout(function() {
        var newscript = document.createElement('script');
        newscript.setAttribute('type', 'text/javascript');
        newscript.setAttribute('src', 'js/final-script.js');
        head.appendChild(newscript);
    }, 1);
})

