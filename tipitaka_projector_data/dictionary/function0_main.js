// This function( toUniRegEx) is from "Digital Pali Reader (DPR)".
//
// GNU General Public License version 2.0 (GPLv2)
// https://sourceforge.net/projects/digitalpali/
// Related links https://pali.sirimangalo.org/
function toUniRegEx(input) {
	if(!input || input == '') return input;
	var nigahita = 'ṃ';
	var Nigahita = 'Ṃ';
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

function paliGoBack() {
	//document.getElementById('page1_desc').innerHTML = '<span onClick="paliGoBack()">&nbsp;<img src="images/redo.png">&nbsp;</span>' + writeme;

	val = localStorage.getItem('history');
	if ((val != null) && (val != undefined) && (5 < val.length)) { 
		ary = val.split('{!@@!}');
		if (0 < ary.length) {
			document.getElementById('page1_desc').innerHTML = '<span onClick="paliGoBack()">&nbsp;<img src="images/redo.png">&nbsp;</span>' + ary[1];
			val = val.substring(ary[0].length + 6);
			document.write.innerHTML = localStorage.setItem('history', val);
		}		
	}
}

$.getScript("dictionary/z_english.js");
$.getScript("dictionary/z_grammar.js");
$.getScript("dictionary/z_inflect.js");
//$.getScript("dictionary/z_Pali_Keys.js");
$.getScript("dictionary/z_translit.js");
$.getScript("dictionary/z_tipitaka_Maps.js");

var ary = window.location.toString().split('.htm');
var html_file = ary[0].slice(-4) + '.htm';
var html_no = ary[0].slice(-4);

M_LOC = [];
file = 'pali/My_Note/' + html_no + '.js'; 
$.getScript(file); 

M_SCT = [];		// sutta_center;

function Get(val) {
	document.write.innerHTML = localStorage.setItem('tr_id', val);

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
		document.write.innerHTML = localStorage.setItem('contentdisplay', contentdisplay);
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
	sc = document.body.getBoundingClientRect().width;
	w1 = parseInt(w /document.body.getBoundingClientRect().width * 100 +1.5);
	w2 = 99 - w1; 

	document.getElementById('main_td1').style.width= w1 + "%";
	document.getElementById('main_td2').style.width= w2 + "%";

	//alert(document.getElementById('main_td1').style.width + '   ' +document.getElementById('main_td2').style.width);
}

function BookTipRun(no) {		// para = number  of <tr>, no=1=mula, 2=att, 3=tika 4= anutika
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
	url = url + '.htm@#' + para;
	document.write.innerHTML = localStorage.setItem('history_pos', url); 
	PaliHistoryDisplay(url); 
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
if (!load_size_left) { load_size_left = '1.0'; document.write.innerHTML = localStorage.setItem('size_left', load_size_left); }

// 4. Left Font-Family
var load_font_left = localStorage.getItem('font_left');
if (!load_font_left) { load_font_left = 'DejaVuSansCondensed'; document.write.innerHTML = localStorage.setItem('font_left', load_font_left); }

// 6. Background-Color
var load_bg_color = localStorage.getItem('bg_color');
if (!load_bg_color) { load_bg_color = '#f3ddb6'; document.write.innerHTML = localStorage.setItem('bg_color', load_bg_color); }

// 2. Right Font-size, Line-Height
var load_size_right = localStorage.getItem('size_right');
if (!load_size_right) { load_size_right = '1.0'; document.write.innerHTML = localStorage.setItem('size_right', load_size_right); }

// 5. Right Font-Family
var load_font_right = localStorage.getItem('font_right');
if (!load_font_right) { load_font_right = 'DejaVuSansCondensed'; document.write.innerHTML = localStorage.setItem('font_right', load_font_right); }
//---------------------------------

var view_left = localStorage.getItem("view_left");
if (!view_left) { view_left = 'Roman'; document.write.innerHTML = localStorage.setItem('view_left', view_left); }

var view_right = localStorage.getItem("view_right");
if (!view_right) { view_right = 'Space'; document.write.innerHTML = localStorage.setItem('view_right', view_right); }

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

if (view_right == 'SuttaCenter') {
	file = 'pali/SuttaCenter/' + html_no + '.js'; 
	$.getScript(file); 	
} 

$(window).on('load', function () {
	var time_log_end = (Date.now() - time_log_start) / 1e3;
    loader.innerHTML = '<div align="center" style="position:fixed;background:orange;border:2px solid white;top:35%;left:3%;right:3%;font-size:x-large;box-shadow:  -8px -2px 8px 8px white, -8px 8px 8px 8px #D9D9D9, 8px 12px 12px 12px white;"">' + loadmsg + '<hr>Loading time: ' + time_log_end + ' seconds</div>';

	$(".r1").click(function () { 
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)
        if (latestElementClickedJqueryObject) {
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
        }
        $(this).addClass("recentClickedCSSright");
        latestElementClickedJqueryObject = $(this);

		word_click();
		if (t.length > 0) {
			lookupCoordinator(t, 0);//$changecolor = $ns % 2; /

			document.getElementById('main_div').style.display = 'inline';
		} else { 
			//$("popupfix").html(''); 
		}
	});

	$(".pages").click(function () {
		word_click();
		if (t.length > 0) {
			lookupCoordinator(t, 0);//$changecolor = $ns % 2; /
		} else { 
			//$("popupfix").html(''); 
		}
	});

	$(".m1").bind('click', function () {
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)
        if (latestElementClickedJqueryObject) {
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
            $(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
        }
        $(this).addClass("recentClickedCSSleft");
        latestElementClickedJqueryObject = $(this);

		if (localStorage.getItem('contentdisplay') == '0') {
			if (document.getElementById('main_div').style.display == 'none') {
				document.getElementById('main_div').style.display = 'inline';
			} else {	
				document.getElementById('main_div').style.display = 'none';
			}	
		}
	}); 

	//------------
	//------------
	var url;
	var s1 = '';

	var para_no = '1';

	var Sr_key = localStorage.getItem("Sr_key");
	if (Sr_key) {
		var Sr_ary = Sr_key.split(' ');
	}
	var Sr_id = localStorage.getItem('Sr_id'+ html_no);

	if (view_right.substring(0, 3) != 'PTS') {
		for (var idx in P_HTM) {
			var Sr_run = '';
			if (Sr_key) {
				if (Sr_id) {
					if (Sr_id.indexOf(';' + idx + ';') != -1) {
						var Sr_run = '1';
					}
				}
			}

			var pali2 = P_HTM[idx].split('*');
			var tags2 = P_Tag[idx].split('*');

			// get para_no
			var s0 = 'p' + idx;
			var s0 = P_Par.findIndex(key => key === s0);
			if (s0 != -1) {
				para_no = s0;
			}

			var n1 = '{!@#' + idx + '#@!}';
			//url = '<img src="images/b_comment.png" id="note_img' + idx + '" onClick="BookTipOver(this,event,\'' + para_no  + '\');" title="' + html_no + '_' + idx + '">';
			//url = '<img src="images/b_comment.png" id="note_img' + idx + '" onClick="BookTipOver(this,event,\'' + para_no  + '\');" title="' + html_no + '_' + idx + '">';
			var pali = P_HTM[idx].split('*');

			var tags = P_Tag[idx].split('*');
			//tags[0]=  tags[0] + '<b style="color:red;">' + url + '</b>';

			s1 = '';
			s2 = '';

			for (var idy in pali) {
				if (idy == 20) {
					break;
				}
				switch (view_left) {
					case 'Roman' :
						if (Sr_run == '1') {
							for (var Sr_ndx in Sr_ary) {
								pali[idy] = replacei(pali[idy], Sr_ary[Sr_ndx], sub=> '<span class="Sr_note">' + Sr_ary[Sr_ndx] + "</span>");
							}
						}
						//s1 = s1 + pali[idy] + tags[idy];
						break;
					case 'Myanmar' :
						pali[idy] = toMyanmar(pali[idy]);
						if (Sr_run == '1') {
							for (var Sr_ndx in Sr_ary) {
								pali[idy] = replacei(pali[idy], toMyanmar(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toMyanmar(Sr_ary[Sr_ndx]) + "</span>");
							}
						}
						//s1 = s1 + pali[idy] + tags[idy];
						break;
					case 'Sinhala' :
						pali[idy] = toSinhala(pali[idy]);
						if (Sr_run == '1') {
							for (var Sr_ndx in Sr_ary) {
								pali[idy] = replacei(pali[idy], toSinhala(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toSinhala(Sr_ary[Sr_ndx]) + "</span>");
							}
						}
						//s1 = s1 + pali[idy] + tags[idy];
						break;
					case 'Thai' :
						pali[idy] = toThai(pali[idy]);
						if (Sr_run == '1') {
							for (var Sr_ndx in Sr_ary) {
								pali[idy] = replacei(pali[idy], toThai(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toThai(Sr_ary[Sr_ndx]) + "</span>");
							}
						}
						//s1 = s1 + pali[idy] + tags[idy];
						break;
					case 'Devanagari' :
						pali[idy] = toDevar(pali[idy]);
						if (Sr_run == '1') {
							for (var Sr_ndx in Sr_ary) {
								pali[idy] = replacei(pali[idy], toDevar(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toDevar(Sr_ary[Sr_ndx]) + "</span>");
							}
						}
						//s1 = s1 + pali[idy] + tags[idy];
						break;
				}
				s1 = s1 + pali[idy] + tags[idy];

				if ((view_right != 'Space') && (view_right != 'My_Note') && (view_right != 'SuttaCenter')) {
					switch (view_right) {
						case 'Roman' :
							if (Sr_run == '1') {
								for (var Sr_ndx in Sr_ary) {
									pali2[idy] = replacei(pali2[idy], Sr_ary[Sr_ndx], sub=> '<span class="Sr_note">' + Sr_ary[Sr_ndx] + "</span>");
								}
							}
							break;
						case 'Myanmar' :
							pali2[idy] = toMyanmar(pali2[idy]);
							if (Sr_run == '1') {
								for (var Sr_ndx in Sr_ary) {
									pali2[idy] = replacei(pali2[idy], toMyanmar(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toMyanmar(Sr_ary[Sr_ndx]) + "</span>");
								}
							}
							break;
						case 'Sinhala' :
							pali2[idy] = toSinhala(pali2[idy]);
							if (Sr_run == '1') {
								for (var Sr_ndx in Sr_ary) {
									pali2[idy] = replacei(pali2[idy], toSinhala(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toSinhala(Sr_ary[Sr_ndx]) + "</span>");
								}
							}
							break;
						case 'Thai' :
							pali2[idy] = toThai(pali2[idy]);
							if (Sr_run == '1') {
								for (var Sr_ndx in Sr_ary) {
									pali2[idy] = replacei(pali2[idy], toThai(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toThai(Sr_ary[Sr_ndx]) + "</span>");
								}
							}
							break;
						case 'Devanagari' :
							pali2[idy] = toDevar(pali2[idy]);
							if (Sr_run == '1') {
								for (var Sr_ndx in Sr_ary) {
									pali2[idy] = replacei(pali2[idy], toDevar(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toDevar(Sr_ary[Sr_ndx]) + "</span>");
								}
							}
							break;
						default :
							break;
					}
					s2 = s2 + pali2[idy] + tags2[idy].replace('<p class="', '<p class="m1_');
				}
			}

			if (view_right == 'My_Note') {
				tmp = localStorage.getItem('n' + html_no + '_'+idx);

				if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
					s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
					M_LOC[idx] = tmp;
				} else {	
					tmp = M_LOC[idx];
					if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
						document.write.innerHTML = localStorage.setItem('n' + html_no + '_'+idx, tmp);
						s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
					}
				}	
			}

			if (view_right == 'SuttaCenter') {
				tmp = M_SCT[idx];
				if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
					s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
				}	
			}

			document.getElementById('p' +idx).innerHTML = s1;
			document.getElementById('m' +idx).innerHTML = s2;
		}
	} else {

		var PTS = '1';

		var s1 = '';
		var s2 = '';

		for (var idx in P_HTM) {
			//if (view_right != 'x') {
				var pali2 = P_HTM[idx].split('*');
				var tags2 = P_Tag[idx].split('*');
			//}

			// get para_no
			var s0 = 'p' + idx;
			var s0 = P_Par.findIndex(key => key === s0);
			if (s0 != -1) {
				para_no = s0;
			}

			var n1 = '{!@#' + idx + '#@!}';
			//url = '<img src="images/b_comment.png" id="note_img' + idx + '" onClick="BookTipOver(this,event,\'' + para_no  + '\');" title="' + html_no + '_' + idx + '">';
			var pali = P_HTM[idx].split('*');

			var tags = P_Tag[idx].split('*');
			//tags[0]=  tags[0] + '<b style="color:red;">' + url + '</b>';

			for (var idy in pali) {
				switch (view_left) {
					case 'Roman' :
						s1 = s1 + pali[idy] + tags[idy];
						break;
					case 'Myanmar' :
						s1 = s1 + toMyanmar(pali[idy]) + tags[idy];
						break;
					case 'Sinhala' :
						s1 = s1 + toSinhala(pali[idy]) + tags[idy];
						break;
					case 'Thai' :
						s1 = s1 + toThai(pali[idy]) + tags[idy];
						break;
					case 'Devanagari' :
						s1 = s1 + toDevar(pali[idy]) + tags[idy];
						break;
				}
			}

			if (P_Tag[idx].indexOf('[PTS.') != -1) {
				document.getElementById('p' +idx).innerHTML = "<hr>" + s1;
				document.getElementById('m' +idx).innerHTML = '###############';
				s1 = '';
				s2 = '';
				PTS = idx;
			} else {
				document.getElementById('m' +idx).innerHTML = '$$$$$$$$$$$$$$$';
			}
		}
	}

	if (localStorage.getItem('Pali_note') == 'none') {
		$(".note").css("display", 'none');
	} else {
		$(".note").css("display", 'inline');
	}

	if (Sr_id != null) {
		document.getElementById('Sr_Div').style.visibility = '';
		document.getElementById('Sr_Next').innerHTML = Sr_id.split(';').length - 2;
		if (Sr_id.length < 2) {
			document.getElementById('Sr_Div').style.visibility = 'hidden';
		}
	}
    // 1. Left Font-size, Line-Height
	$("select#size_left").val(load_size_left);
	var p24 = parseInt(load_size_left * 24);
	var p30 = parseInt(load_size_left * 30);
	var p33 = parseInt(load_size_left * 33);
	var p36 = parseInt(load_size_left * 36);
	var r1 =  parseInt(load_size_left * 25); 
	$(".r1").css("font-size",	r1  + "pt");	//--------td
	$(".b1").css("font-size",	p24 + "pt");	//bodytext
	$(".b2").css("font-size",	p33 + "pt");	//book
	$(".c3").css("font-size",	p24 + "pt");	//centered
	$(".c4").css("font-size", 	p30 + "pt");	//chapter
	$(".g5").css("font-size", 	p24 + "pt");	//gatha1
	$(".g6").css("font-size", 	p24 + "pt");	//gatha2
	$(".g7").css("font-size", 	p24 + "pt");	//gatha3
	$(".g8").css("font-size",	p24 + "pt");	//gathalast
	$(".h9").css("font-size",	p24 + "pt");	//hangnum
	$(".ia").css("font-size",	p24 + "pt");	//indent
	$(".nb").css("font-size",	p36 + "pt");	//nikaya
	$(".sc").css("font-size", 	p24 + "pt");	//subhead
	$(".sd").css("font-size", 	p24 + "pt");	//subsubhead
	$(".te").css("font-size", 	p24 + "pt");	//title
	$(".uf").css("font-size", 	p24 + "pt");	//unindented
 
    // 2. Right Font-size, Line-Height
	$("select#size_right").val(load_size_right);
	var p24 = parseInt(load_size_right * 24);
	var p30 = parseInt(load_size_right * 30);
	var p33 = parseInt(load_size_right * 33);
	var p36 = parseInt(load_size_right * 36);
	var m1 =  parseInt(load_size_right * 25); 
	$(".m1").css("font-size",	m1  + "pt");	//--------td
	$(".m_b1").css("font-size",	p24 + "pt");	//bodytext
	$(".m_b2").css("font-size",	p33 + "pt");    //book
	$(".m_c3").css("font-size",	p24 + "pt");    //centered
	$(".m_c4").css("font-size",	p30 + "pt");    //chapter
	$(".m_g5").css("font-size",	p24 + "pt");    //gatha1
	$(".m_g6").css("font-size",	p24 + "pt");    //gatha2
	$(".m_g7").css("font-size",	p24 + "pt");    //gatha3
	$(".m_g8").css("font-size",	p24 + "pt");    //gathalast
	$(".m_h9").css("font-size",	p24 + "pt");    //hangnum
	$(".m_ia").css("font-size",	p24 + "pt");    //indent
	$(".m_nb").css("font-size",	p36 + "pt");    //nikaya
	$(".m_sc").css("font-size",	p24 + "pt");    //subhead
	$(".m_sd").css("font-size",	p24 + "pt");    //subsubhead
	$(".m_te").css("font-size",	p24 + "pt");    //title
	$(".m_uf").css("font-size",	p24 + "pt");    //unindented 


	p = localStorage.getItem('contentposition');
	if (!p) {
		p = '0';
		document.write.innerHTML = localStorage.setItem('contentposition', '0'); 
	} 
	if (p == '0') {		// floating
		t = localStorage.getItem('main_top');
		if (!t) {
			document.getElementById('main_div').style.top = '0px';
		} else {
			document.getElementById('main_div').style.top = t + 'px';
		}

		l = localStorage.getItem('main_left');
		if (!t) {
			document.getElementById('main_div').style.left = '0px';
		} else {
			document.getElementById('main_div').style.left = l + 'px';
		}

		w = localStorage.getItem('main_width');
		if (!w) {
			document.getElementById('main_div').style.width = '99%';
		} else {
			document.getElementById('main_div').style.width = w + 'px';
		}
		h = localStorage.getItem('main_height');
		if (!h) {
			document.getElementById('main_div').style.height = '200px';
			// document.getElementById('main_content').style.height = '175px';
		} else {
			document.getElementById('main_div').style.height = h + 'px';
			// document.getElementById('main_content').style.height = (h - 40) + 'px';
		} 
		//w = Number(Number(w)/ screen.width *100 + 1); 
		RedrawTable(0);

		$('.page4').css('height', '98%');
		document.getElementById('page4break1').innerHTML = '<br>';

		$('.page5').css('height', '98%');
	} else {
		document.getElementById('main_div').style.top = '0px';
		document.getElementById('main_div').style.left = '0px';

		w = localStorage.getItem('main_width');
		if (!w) {
			document.getElementById('main_div').style.width = '200px';
		} else {
			document.getElementById('main_div').style.width = w + 'px';
		}

		h = window.innerHeight; 
		document.getElementById('main_div').style.height = h + 'px';
		// document.getElementById('main_content').style.height = (h - 40) + 'px';
  
		//w = Number(Number(w)/ screen.width *100 + 1); 
		RedrawTable(parseInt(w));


		//page2 Declension
		$('.page2Left').css('width', '10%');
		$('.page2Right').css('width', '88%');

		//page4 TOC
		$('.page4').css('width', '98%');
		$('.page4').css('height', '48%');
		document.getElementById('page4break1').innerHTML = '<br>';
		document.getElementById('page4break1').innerHTML = '<br>';
		document.getElementById('page4break2').innerHTML = '<br>'; 

		$('.page5').css('width', '98%');
		$('.page5').css('height', '32%');
		document.getElementById('page5break1').innerHTML = '<br>';
		document.getElementById('page5break2').innerHTML = '<br>';

		document.getElementById('divDragIcon').style.display = "none";

		adjustTabContent();
	}	

	// 3. Left and Right width	p = localStorage.getItem('contentposition');
	if (view_right != 'Space') {
		var width_r1 = localStorage.getItem('width_left');
		var width_m1 = localStorage.getItem('width_right');
	} else {	//else {},  use css default r1 85%, m1 15% (15% width for empty place to click on touch screen)
		width_r1 = 92;
		width_m1 = 8;
	}
	$(".r1").css("width", width_r1 + '%');
	$(".m1").css("width", width_m1 + '%'); 


    // 4. Left Font-Family
	//left font name default = DejaVuSansCondensed (in htm content file)
	$("select#font_left").val(load_font_left);
	$(".r1").css("font-family", load_font_left);

    // 5. Right Font-Family
	$("select#font_right").val(load_font_right);
	$(".m1").css("font-family", load_font_right);

	// 6. Background-Color
	//background, default = #f3ddb6 sepia (named "Classic Reader" in htm content file)
    $("select#bg_color").val(load_bg_color);//reference https://stackoverflow.com/a/16979926
	//$('table').css("background", load_bg_color); 
	document.getElementById('main_table').style.backgroundColor = load_bg_color;
	document.getElementById('main_td1').style.backgroundColor = load_bg_color;
	//-------------------------------------------

	// 7. Font Color
	var font_color = {
	'#f3ddb6':['#000000'],
	'#fff8dc':['#000000'],
	'#1f3763':['#fffffe'],
	'#000001':['#ffffff'],
	'#121212':['#b0b0b0'],
	'#010101':['#937811'],
	'#1e1e1e':['#628754'],
	'#090c11':['#2d3d4a'],
	'#3c3c3c':['#cecece'],
	'#5a5a5a':['#cacaca'],
	'#d7d4cd':['#626262'],
	'#e0e0e0':['#202020'],
	'#f0f0f0':['#008000'],
	'#fefefe':['#000000'],
	'#d8cbab':['#000001'],
	'#e2bdb4':['#010101']}
	var bld_color = {
	'#f3ddb6':['brown'],
	'#fff8dc':['brown'],
	'#1f3763':['#ffff00'],
	'#000001':['brown'],
	'#121212':['brown'],
	'#010101':['brown'],
	'#1e1e1e':['brown'],
	'#090c11':['brown'],
	'#3c3c3c':['brown'],
	'#5a5a5a':['brown'],
	'#d7d4cd':['brown'],
	'#e0e0e0':['brown'],
	'#f0f0f0':['brown'],
	'#fefefe':['brown'],
	'#d8cbab':['brown'],
	'#e2bdb4':['brown']}
	$(".r1").css("color", font_color[load_bg_color]);
	$(".m1").css("color", font_color[load_bg_color]);
	$(".bld").css("color", bld_color[load_bg_color]);

	//===============================================
	// 
 
	if (localStorage.getItem('contentdisplay') == '0') {
		document.getElementById('main_div').style.display = 'none';
	} else {	
		document.getElementById('main_div').style.display = 'inline';
	}

	r = localStorage.getItem('contentbackgroundR');
	if (!r) {
		r = 207;
	}
	g = localStorage.getItem('contentbackgroundG');
	if (!g) {
		g = 255;
	}
	b = localStorage.getItem('contentbackgroundB');
	if (!b) {
		b = 207;
	}
	document.getElementById('main_div').style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';


	//if (localStorage.getItem('topbottom') == 'bottom') {
	//	document.getElementById('main_div').style.bottom = '0px';
	//} else {
	//	document.getElementById('main_div').style.top = '0px';
	//}

	//Changedivheight(localStorage.getItem('divheight'));
	$(".pages").css('font-family', localStorage.getItem('contentfontname'));
	$(".pages").css('font-size', localStorage.getItem('contentfontsize') + 'pt');


	//===============================================

	// go to history position
	if (localStorage.getItem('history_pos') != null) {
		if (localStorage.getItem('history_pos') != '') {
			var pos = localStorage.getItem('history_pos');

			if (pos.indexOf('#') != -1) {	// directly jump
				if (pos.indexOf('@') != -1) {		// from BookTipRun
					pos = '#' + P_Par[parseInt(pos.substring(2))];
					//alert(P_Par[parseInt(pos.substring(2))].substring(1));
					//Message(P_Par[parseInt(pos.substring(2))].substring(1));
				} 
				window.location = pos;
			} else {	// myanmar or PTS page no jump
				var tr = document.getElementsByClassName('r1');
				for (var i=0; i<tr.length; i++) {
					if (tr[i].innerHTML.indexOf(pos) != -1) {
						document.getElementById('p' + (i +1)).scrollIntoView();
						Message(i);
						break;
					}
				}
			}
			document.write.innerHTML = localStorage.setItem('history_pos', ''); 
		}
	} 
	//---------------------------------------------------
	ary1 = [];
	ary1[1] = "Mūla";
	ary1[2] = "Aṭṭhakathā";
	ary1[3] = "Ṭīkā";
	ary2 = [];
	ary2[1] = 'M';
	ary2[2] = 'A';
	ary2[3] = 'T';
	//ary1[4] = "Anuṭīkā";
	for (i=1; i<=3; i++) {
		if ((html_no.substring(1,1) == i) || (T_Maps[html_no][i] == 'x') || (T_Maps[html_no][i] == '#'))  {
			//document.getElementById('Pali' + i).innerHTML = ary1[i];
			document.getElementById('Pali' + i).innerHTML = ary2[i];
			document.getElementById('Pali' + i).style.color = '#777777';
		}
	}	 


	//---------------------------------------------------
      var oDiv=document.getElementById("ResizeDrag");
      var omain_div=document.getElementById("main_div");
      //var h2=omain_div.getElementsByTagName("h2")[0];  
      var ResizeBottom=document.getElementById("ResizeBottom");
      var mouseStart={};
      var divStart={};  
      var bottomStart={}; 
      //往下拽
      ResizeBottom.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        bottomStart.y=ResizeBottom.offsetTop;
        if(ResizeBottom.setCapture){
          ResizeBottom.onmousemove=doResizeBottom;
          ResizeBottom.onmouseup=stopResizeBottom;
          ResizeBottom.setCapture();
        }
        else{
          document.addEventListener("mousemove",doResizeBottom,true);
          document.addEventListener("mouseup",stopResizeBottom,true);
        }
      };
      function doResizeBottom(ev){
        var oEvent=ev||event;
        var t=oEvent.clientY-mouseStart.y+bottomStart.y;
        var h=t+oDiv.offsetHeight;
       
        if(h<oDiv.offsetHeight){
          h=oDiv.offsetHeight;
        }
        else if(h>document.documentElement.clientHeight-omain_div.offsetTop){
          h=document.documentElement.clientHeight-omain_div.offsetTop-2;
        }

        if (localStorage.getItem('contentposition') == '1') {
        	h = window.innerHeight; 
		}

        omain_div.style.height=h+"px";        
		// document.getElementById('main_content').style.height = (h - 40) + 'px';

        document.write.innerHTML = localStorage.setItem('main_height', h);
      };
      function stopResizeBottom(){
        if(ResizeBottom.releaseCapture){
          ResizeBottom.onmousemove=null;
          ResizeBottom.onmouseup=null;
          ResizeBottom.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doResizeBottom,true);
          document.removeEventListener("mouseup",stopResizeBottom,true);
        }
      };
      //往左右同時拽
      oDiv.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        divStart.x=oDiv.offsetLeft;
        divStart.y=oDiv.offsetTop;
        if(oDiv.setCapture){
          oDiv.onmousemove=doDrag;
          oDiv.onmouseup=stopDrag;
          oDiv.setCapture();
        }
        else{
          document.addEventListener("mousemove",doDrag,true);
          document.addEventListener("mouseup",stopDrag,true);
        }
      };
      function doDrag(ev){
        var oEvent=ev||event;
        var l=oEvent.clientX-mouseStart.x+divStart.x;
        var t=oEvent.clientY-mouseStart.y+divStart.y;
       
        var w=l+oDiv.offsetWidth;
        var h=t+oDiv.offsetHeight;
       
        if(w<oDiv.offsetWidth){
          w=oDiv.offsetWidth;
        }
        else if(w>document.documentElement.clientWidth-omain_div.offsetLeft){
          w=document.documentElement.clientWidth-omain_div.offsetLeft-2;
        }
        if(h<oDiv.offsetHeight){
          h=oDiv.offsetHeight;
        }
        else if(h>document.documentElement.clientHeight-omain_div.offsetTop){
          h=document.documentElement.clientHeight-omain_div.offsetTop-2;
        }

        if (localStorage.getItem('contentposition') == '1') {
        	h = window.innerHeight; 
        	RedrawTable(w);
		}

        omain_div.style.width=w+"px";
        omain_div.style.height=h+"px";
		// document.getElementById('main_content').style.height = (h - 40) + 'px';

        document.write.innerHTML = localStorage.setItem('main_width', w);
        document.write.innerHTML = localStorage.setItem('main_height', h);

      };
      function stopDrag(){
        if(oDiv.releaseCapture){
          oDiv.onmousemove=null;
          oDiv.onmouseup=null;
          oDiv.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doDrag,true);
          document.removeEventListener("mouseup",stopDrag,true);
        }
      };
      
      //完美拖拽
      divDragIcon.onmousedown=function(ev){
        var oEvent=ev||event;
        mouseStart.x=oEvent.clientX;
        mouseStart.y=oEvent.clientY;
        divStart.x=omain_div.offsetLeft;
        divStart.y=omain_div.offsetTop;
       
        if(divDragIcon.setCapture){
          divDragIcon.onmousemove=doDrag3;
          divDragIcon.onmouseup=stopDrag3;
          divDragIcon.setCapture();
        }
        else{
          document.addEventListener("mousemove",doDrag3,true);
          document.addEventListener("mouseup",stopDrag3,true);
        }
      };
      function doDrag3(ev){
        var oEvent=ev||event;
        var l=oEvent.clientX-mouseStart.x+divStart.x;
        var t=oEvent.clientY-mouseStart.y+divStart.y;
        if(l<0){
          l=0;
        }
        else if(l>document.documentElement.clientWidth-omain_div.offsetWidth){
          l=document.documentElement.clientWidth-omain_div.offsetWidth;
        }
        if(t<0){
          t=0;
        }
        else if(t>document.documentElement.clientHeight-omain_div.offsetHeight){
          t=document.documentElement.clientHeight-omain_div.offsetHeight;
        }

		if (localStorage.getItem('contentposition') == '1') {
			l = 0;
			t = 0;
		}

        omain_div.style.left=l+"px";
        omain_div.style.top=t+"px";
        document.write.innerHTML = localStorage.setItem('main_left', l);
        document.write.innerHTML = localStorage.setItem('main_top', t);
      };
      function stopDrag3(){
        if(divDragIcon.releaseCapture){
          divDragIcon.onmousemove=null;
          divDragIcon.onmouseup=null;
          divDragIcon.releaseCapture();
        }
        else{
          document.removeEventListener("mousemove",doDrag3,true);
          document.removeEventListener("mouseup",stopDrag3,true);
        }
      }  

});
