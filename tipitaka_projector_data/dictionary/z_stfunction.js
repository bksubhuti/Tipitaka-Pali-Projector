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

$.getScript("dictionary/z_english.js");
$.getScript("dictionary/z_grammar.js");
$.getScript("dictionary/z_inflect.js");
//$.getScript("dictionary/z_Pali_Keys.js");
$.getScript("dictionary/z_translit.js");
$.getScript("dictionary/z_tipitaka_Maps.js");

var ary = window.location.toString().split('.htm');
var html_file = ary[0].slice(-4) + '.htm';
var html_no = ary[0].slice(-4);

function Get(val) {
	localStorage.setItem('tr_id', val);
}

function sel_on() {
	document.getElementById('selectx').style.visibility = '';
}

function sel_off() {
	document.getElementById('selectx').style.visibility = 'hidden';
	document.getElementById('Dict_result').innerHTML = '';
	document.getElementById('history').innerHTML = '';
}

function sel_on_off() {
	//document.getElementById('Copy_Text').value = '';
	if (document.getElementById('selectx').style.visibility == 'hidden') {
		document.getElementById('selectx').style.visibility='';
	} else {

		document.getElementById('selectx').style.visibility='hidden';
		document.getElementById('Dict_result').innerHTML = '';
	}
}

//=============================================================

function BookTipOver(t, e, para_no){
     //参数含义
     //t:指当前对象，即img
     //e:event事件
     //data:要显示的内容
	 var ary = ['', 'Mūla', 'Aṭṭhakathā', 'Ṭīkā', 'Anuṭīkā'];
	 var htm = '';
	 for (var i=1; i<=4; i++) {
		if (T_Maps[html_no] !=  undefined ) {
			if (T_Maps[html_no][i] != '#') {
				if (T_Maps[html_no][i] == 'x') {
					htm = htm + '<img src="images/s_okay.png">&nbsp;' + ary[i] + '<br><br>';
				} else {
					htm = htm + '<label onClick="BookTipOut();BookTipRun(\'' + para_no + '\',' + i + ');" style="color:blue;"><img src="images/reset.png">&nbsp;' + ary[i] + '</label><br><br>';
				}
			}
		}
     }

	  htm = htm + '<label style="color:blue;" onClick="Grammar_Open();"><img src="images/b_ftext.png">&nbsp;Grammar</label><br><br>';

	 htm = htm + '<label style="color:blue;" onClick="Note_Open();document.getElementById(\'note_data\').focus();"><img src="images/b_edit.png">&nbsp;My Notes</label><br><br>';

	 htm = htm + '<label style="color:blue;" onClick="BookTipOut();"><img src="images/b_drop.png">&nbsp;Close</label>';
	 document.getElementById('BookTip').innerHTML = htm;
     $("#BookTip").show(); 
     $("#BookTip").css({
          "top": (e.pageY + 1) + "px",
          "left": (e.pageX +1) + "px"
     }).show("fast"); //设置提示框的坐标，并显示
}

function BookTipOut(){
     $("#BookTip").hide();
}

function BookTipRun(para, no) {		// para =  para number  of <td>, no=1=mula, 2=att, 3=tika 4= anutika
    v1 = T_Maps[html_no][no];
	//alert(para);
	var url = '';
	if (v1.indexOf(',') == -1) {
		url = v1;			// nnnn.htm 8 bytes
	} else {
		var ary = v1.split(',');
		for (i = (ary.length-1); 0 <= i; i--) {
			if (parseInt(T_Maps[ary[i]][5]) <= parseInt(para)) {
			  url = ary[i] ;
				//alert(url + "   " +T_Maps[ary[i]][5] + "   " + parseInt(para));
			  break;
			}
		}
	}
	url = url + '.htm@#' + para;
	localStorage.setItem('history_pos', url);
	History_Go(url);
}

function Note_Cancel() {
	document.getElementById('note_data').value = '';
	document.getElementById('my_note').style.visibility = 'hidden';
}

function Note_Save() {
	var val = document.getElementById('note_data').value.trim();
	var key = '{!@#' + localStorage.getItem('tr_id') + '#@!}';
	var my_note = localStorage.getItem('note' + html_no);
	if (!my_note) { my_note = ''; }

	if (my_note.indexOf(key) == -1)  {
		if (val != '') {
			my_note = my_note + key + val + key;
		} else {
			my_note = '';
		}
	} else {
		var ary = my_note.split(key);
		if (val != '') {
			my_note = ary[0] + key + val + key + ary[2];
		} else {
			my_note = ary[0] + ary[2];
		}
	}
	my_note = my_note.trim();

	localStorage.setItem('note' + html_no, my_note);
	document.getElementById('my_note').style.visibility = 'hidden';

	//alert(view_right + html_no +'  '+my_note);
	if (view_right == 'My_Note') {
		document.getElementById('m' + localStorage.getItem('tr_id')).innerHTML = val;
	}
	//if (my_note.length<1) {
	//	document.getElementById('note_img' + localStorage.getItem('tr_id')).src = "images/add_point_on.png";
	//	document.getElementById('note_img' + localStorage.getItem('tr_id')).reload();
	//} else {
	//	document.getElementById('note_img' + localStorage.getItem('tr_id')).src = "images/b_edit.png";
	//	document.getElementById('note_img' + localStorage.getItem('tr_id')).reload();
	//	//.style.visibility = '';
	//}
	//alert(document.getElementById('note_img' + localStorage.getItem('tr_id')).src);
}

function Grammar_Open() {
	BookTipOut();
	var idx = localStorage.getItem('tr_id');

	var url;
	var s1 = '';
	var my_note = localStorage.getItem('note'+ html_no);
	if (!my_note) { my_note = ''; }

	var para_no = '1';

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
	url = '<img src="images/b_comment.png" id="note_img' + idx + '" onClick="BookTipOver(this,event,\'' + para_no  + '\');">';
	var pali = P_HTM[idx].split('*');

	var tags = P_Tag[idx].split('*');
	tags[0]=  tags[0] + '<b style="color:red;">' + url + '</b>';

	s1 = '';
	//
	var Chars = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';
	//

	for (var idy in pali) {

		var word = pali[idy] + ' ';
		var word_ret = '';
		var word_str = '';
		for (var ndx=0; ndx < word.length; ndx ++) {
			var c1 = word.substr(ndx, 1);
			if (Chars.indexOf(c1) == -1) {
				if (word_str.length > 1) {
					word_ret = pe5[word_str.toLowerCase()] + " ";
					//alert(word_str);

					switch (view_left) {
						case 'Roman' :
							var ret = word_str;
							break;
						case 'Myanmar' :
							var ret = toMyanmar(word_str);
							break;
						case 'Sinhala' :
							var ret = toSinhala(word_str);
							break;
						case 'Thai' :
							var ret = toThai(word_str);
							break;
						case 'Devanagari' :
							var ret = toDevar(word_str);
							break;
					}

					if (word_ret.indexOf('undefined') == -1) {
	
						if ((word_ret.indexOf('3rd') != -1) || (word_ret.indexOf('2nd') != -1) || (word_ret.indexOf('1st') != -1)) {
							s1 = s1 + '<span style="color:red">' + ret + '</span>';
						} else{
							s1 = s1 + ret;
						}

						var reg1 = /\#/g;
						word_ret = word_ret.replace(reg1, '][');
						//var reg1 = /\[./g;
						//word_ret = word_ret.replace(reg1, '[');

						s1 = s1 + '<span style="color:blue;font-size:10pt;">[' + word_ret + ']</span>';

					} else {
						s1 = s1 + ret;
					}
					s1 = s1 + c1;
				} else {
					s1 = s1 + word_str + c1;
				}
				word_str = '';
			} else {
				word_str = word_str + c1;
			}
		}

		s1 = s1.trim() +  tags[idy];
		document.getElementById('p' +idx).innerHTML = s1;
	}

	if (localStorage.getItem('Pali_note') == 'none') {
		$(".note").css("display", 'none');
	} else {
		$(".note").css("display", 'inline');
	}
}

function Note_Open() {
	BookTipOut();

	var key = '{!@#' + localStorage.getItem('tr_id') + '#@!}';
	var my_note = localStorage.getItem('note' + html_no);
	if (!my_note) { my_note = ''; };

	if (my_note.indexOf(key) == -1) {
		document.getElementById('note_data').value = '';
	} else {
		var ary = my_note.split(key);
		document.getElementById('note_data').value = ary[1];
	}
	document.getElementById('my_note').style.visibility = '';
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

$(window).on('load', function () {

	if (isPopupMode == 1) {
		document.getElementById('LookupMode').innerHTML = 'Pop-up singleWord';
	} else {
		document.getElementById('LookupMode').innerHTML = 'List paragraph';
	}

	var url;
	var s1 = '';
	var my_note = localStorage.getItem('note'+ html_no);
	if (!my_note) { my_note = ''; }

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
						//alert(Sr_run);
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
			url = '<img src="images/b_comment.png" id="note_img' + idx + '" onClick="BookTipOver(this,event,\'' + para_no  + '\');">';
			var pali = P_HTM[idx].split('*');

			var tags = P_Tag[idx].split('*');
			tags[0]=  tags[0] + '<b style="color:red;">' + url + '</b>';

			s1 = '';
			s2 = '';

			for (var idy in pali) {
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

				if ((view_right != 'Space') && (view_right != 'My_Note')) {
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

			if ((view_right == 'My_Note') && (my_note.indexOf(n1) != -1)) {
				var ary = my_note.split(n1);
				s2 = tags2[0].replace('<p class="', '<p class="m1_') + ary[1].replace(/\n/g, '<br>'); + '</p>';
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
			url = '<img src="images/b_comment.png" id="note_img' + idx + '" onClick="BookTipOver(this,event,\'' + para_no  + '\');" title="' + html_no + '_' + idx + '">';
			var pali = P_HTM[idx].split('*');

			var tags = P_Tag[idx].split('*');
			tags[0]=  tags[0] + '<b style="color:red;">' + url + '</b>';

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

	if ((view_left == 'Roman') || (view_left == 'Notes')) {
      var h24 = parseInt(p24 * 1.4);
	  var h30 = parseInt(p30 * 1.4);
	  var h33 = parseInt(p33 * 1.4);
	  var h36 = parseInt(p36 * 1.4);
	} else {
	  var h24 = parseInt(p24 * 1.8);
	  var h30 = parseInt(p30 * 1.8);
	  var h33 = parseInt(p33 * 1.8);
	  var h36 = parseInt(p36 * 1.8);
	}
	$(".b1").css("line-height",	h24 + "pt");
	$(".b2").css("line-height",	h33 + "pt");
	$(".c3").css("line-height",	h24 + "pt");
	$(".c4").css("line-height", h30 + "pt");
	$(".g5").css("line-height", h24 + "pt");
	$(".g6").css("line-height", h24 + "pt");
	$(".g7").css("line-height", h24 + "pt");
	$(".g8").css("line-height",	h24 + "pt");
	$(".h9").css("line-height",	h24 + "pt");
	$(".ia").css("line-height",	h24 + "pt");
	$(".nb").css("line-height",	h36 + "pt");
	$(".sc").css("line-height", h24 + "pt");
	$(".sd").css("line-height", h24 + "pt");
	$(".te").css("line-height", h24 + "pt");
	$(".uf").css("line-height", h24 + "pt");

    // 2. Right Font-size, Line-Height
	$("select#size_right").val(load_size_right);
	var p24 = parseInt(load_size_right * 24);
	var p30 = parseInt(load_size_right * 30);
	var p33 = parseInt(load_size_right * 33);
	var p36 = parseInt(load_size_right * 36);
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
	if (view_right == 'Roman') {
      var h24 = parseInt(p24 * 1.4);
	  var h30 = parseInt(p30 * 1.4);
	  var h33 = parseInt(p33 * 1.4);
	  var h36 = parseInt(p36 * 1.4);
	} else {
	  var h24 = parseInt(p24 * 1.8);
	  var h30 = parseInt(p30 * 1.8);
	  var h33 = parseInt(p33 * 1.8);
	  var h36 = parseInt(p36 * 1.8);
	}
	$(".m_b1").css("line-height", h24 + "pt");
	$(".m_b2").css("line-height", h33 + "pt");
	$(".m_c3").css("line-height", h24 + "pt");
	$(".m_c4").css("line-height", h30 + "pt");
	$(".m_g5").css("line-height", h24 + "pt");
	$(".m_g6").css("line-height", h24 + "pt");
	$(".m_g7").css("line-height", h24 + "pt");
	$(".m_g8").css("line-height", h24 + "pt");
	$(".m_h9").css("line-height", h24 + "pt");
	$(".m_ia").css("line-height", h24 + "pt");
	$(".m_nb").css("line-height", h36 + "pt");
	$(".m_sc").css("line-height", h24 + "pt");
	$(".m_sd").css("line-height", h24 + "pt");
	$(".m_te").css("line-height", h24 + "pt");
	$(".m_uf").css("line-height", h24 + "pt");

	// 3. Left and Right width
	if (view_right != 'Space') {
		var width_r1 = parseInt(100 * Number(load_size_left) / (Number(load_size_left) + Number(load_size_right)));
		var width_m1 = parseInt(100 * Number(load_size_right) / (Number(load_size_left) + Number(load_size_right)));
	} else {	//else {},  use css default r1 85%, m1 15% (15% width for empty place to click on touch screen)
		width_r1 = 90;
		width_m1 = 10;
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
	$('table').css("background", load_bg_color);
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

	// go to history postition
	if (localStorage.getItem('history_pos') != null) {
		if (localStorage.getItem('history_pos') != '') {
			var pos = localStorage.getItem('history_pos');

			if (pos.indexOf('#') != -1) {	// directly jump
				document.getElementById('history').innerHTML = '';
				if (pos.indexOf('@') != -1) {		// from BookTipRun
					pos = '#' + P_Par[parseInt(pos.substring(2))];
				}

				window.location = pos;
			} else {	// myanmar or PTS page no jump
				var tr = document.getElementsByClassName('r1');
				for (var i=0; i<tr.length; i++) {
					if (tr[i].innerHTML.indexOf(pos) != -1) {
						document.getElementById('p' + (i +1)).scrollIntoView();
						break;
					}
				}
			}
			document.write.innerHTML = localStorage.setItem('history_pos', ''); 
		}
	}

});
