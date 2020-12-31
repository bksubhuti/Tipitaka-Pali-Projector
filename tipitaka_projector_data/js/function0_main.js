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

function toRoman(input) {
	// this ensures the input text is always converted to roman
	//
	const view_left = localStorage.getItem("view_left");
	var out = '';
	var input = '' + input;
	var selectedScript = Script.RO;

	const sinhStr = TextProcessor.convertFromMixed(input);
	out = TextProcessor.convert(sinhStr, selectedScript);
	return (out.toLowerCase());
}

function toTranslate(input, viewLeftConfig) {
	//const view_left = viewLeftConfig || localStorage.getItem("view_left");
	const view_left = localStorage.getItem("view_left");
	var out = '';
	input = '' + input;
	switch (view_left) {
		case 'Roman' :
			out = input;
			break;
		case 'Myanmar' :
			out = toMyanmar(input);
			break;
		case 'Sinhala' :
			// this is the proper one to use and fixes one issue
			// however, cannot use for other scripts because it is slow.
			var selectedScript = Script.SI;
			const sinhStr = TextProcessor.convertFromMixed(input);
			out = TextProcessor.convert(sinhStr, selectedScript);
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

function toTranslateRight(input, viewRightConfig) {
	const view_right = localStorage.getItem("view_right");
	var out = '';
	input = '' + input;
	switch (view_right) {
		case 'Roman' :
			out = input;
			break;
		case 'Myanmar' :
			out = toMyanmar(input);
			break;
		case 'Sinhala' :
			// this is the proper one to use and fixes one issue
			// however, cannot use for other scripts because it is slow.
			var selectedScript = Script.SI;
			const sinhStr = TextProcessor.convertFromMixed(input);
			out = TextProcessor.convert(sinhStr, selectedScript);
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
	if (id.indexOf('pg4_') == -1) {
		document.write = localStorage.setItem('main_content', id);
		for (var i =1; i<=5; i++) {
			$("#page" + i +"_desc").css('display', "none");
			document.getElementById("page" + i).className="notselected";
		}
		document.getElementById(id).className="selected";
		$('#' + id + "_desc").css('display', "inline");

		if (id == "page2") {    // declension 
			$('#DictionaryKey').css('display', 'none');
			$('#GoDictionary').css('display', 'none');
			$('#DeclensionKey').css('display', 'inline');
			$('#GoDeclension').css('display ', 'inline');

			var val = $('#DeclensionKey').val().trim();
			$('#DeclensionKey').val(val);

			DeclensionSearch();
			DeclensionTable(val);
			// document.getElementById('DeclensionKey').focus();
		} else {
			$('#DictionaryKey').css('display', 'inline');
			$('#GoDictionary').css('display', 'inline');
			$('#DeclensionKey').css('display', 'none');
			$('#GoDeclension').css('display', 'none');
		}

		if (id == "page4") {    // TOC
			PaliHistoryList();
		}
		if (id == "page5") {    // history
			DictHistoryList();
		}
	} else {
		for (var i =1; i<=3; i++) {
			$("#pg4_page" + i +"_desc").css('display', "none");
			document.getElementById("pg4_page" + i).className="notselected";
		}
		document.getElementById(id).className="selected";
		$('#' + id + "_desc").css('display', "inline");
	}	
}

$.getScript("js/z_english.js");
$.getScript("js/z_grammar.js");
$.getScript("js/z_inflect.js");
$.getScript("js/z_translit.js");
$.getScript("js/z_tipitaka_Maps.js");

var _ary = window.location.toString().split('.htm');
var html_file = _ary[0].slice(-4) + '.htm';
var html_no = _ary[0].slice(-4);

M_FNOTE = [];
M_LOC = [];
M_QUE = [];
M_RANGE = []; 


function GetTrId(val) {
	val = Math.max(1, val);
	document.write = localStorage.setItem('tr_id', val);
	document.write = localStorage.setItem('LastHistory', html_no + val);

	h = parseInt($('#main_div').css('height')) - Math.max(34, parseInt($('#main_div').css('top'))) + parseInt($('#main_content').css('offsetTop'));

	Message(val);		// put message

	copystatus = $('#copystatus').val();
	if (copystatus == 'fetching') {
		copy1 = $('#copy1').val();
		copy2 = $('#copy2').val();
		if (copy1 == '*') {	// start
			$('#copy1').val(val);
			$('#copystatus').val('fetching');
			$('#m' + val).html('<input type="checkbox" checked="">' + $('#m' + val).html());
		} else {
			if (copy2 == '') {
				copy2 = val;
			}
			var s1 = Math.min(Number(val), Math.min(Number(copy1), Number(copy2)));
			var s2 = Math.max(Number(val), Math.max(Number(copy1), Number(copy2)));
			for (i=s1; i<=s2; i++) {
				if (P_HTM[i] != undefined) {
					$('#m' + i).html($('#m' + i).html().replace('<input type="checkbox" checked="">', ''));
				}
			}

			var s1 = Math.min(Number(copy1), Number(val));
			var s2 = Math.max(Number(copy1), Number(val));
			for (i=s1; i<=s2; i++) {
				if (P_HTM[i] != undefined) {
					$('#m' + i).html('<input type="checkbox" checked="">' + $('#m' + i).html());
				}
			}
			$('#copy2').val(val);
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
		if ($('#main_div').css('display') == 'none') {
			$('#main_div').css('display', 'inline');
		} else {
			$('#main_div').css('display', 'none');
		}
	}
}

function RedrawTable(w) {
	//sc = screen.width;
	w1 = w;		//parseInt(w /screen.width * 100);
	w2 = document.body.getBoundingClientRect().width - w1; 	// class="main_td2" margin-left:15px;

	if (localStorage.getItem('contentposition') == '0') {  // float panel
		$('#main_td2').css('left', '0px');
		$('#main_td2').css('top', '0px');
		$('#main_td2').css('width', document.body.getBoundingClientRect().width + "px");
		$('#main_td2').css('height', window.innerHeight+ "px");
		$('.main_td2').css('margin-left', '0px');

		w1 = parseInt($('#main_div').css('width')) + parseInt($('#main_div').css('height'));
		if (w1 < 600) {
			$('#main_div').css('width', '300px');
			$('#main_div').css('height', '300px');
		}
	} else {	// fixed panel
		$('#main_div').css('left', "0px");
		$('#main_div').css('top', "0px");
		$('#main_div').css('width', w1 + "px");
		$('#main_div').css('height', (window.innerHeight) + "px");

		$('#main_td2').css('left', (w1 + 25)+ "px");
		$('#main_td2').css('width', (w2 - 25)+ "px");
		$('#main_td2').css('height', (window.innerHeight) + "px");

	} 

	adjustTabContent();
}

function MATurlGo(no) {		// id = id number , no=1=mula, 2=att, 3=tika 4= anutika
	var strpara= "";
	var para=0;
	// no book is loaded yet
	if ( typeof(P_HTM) == 'undefined' ) {
		return;
	}

	tr_id = localStorage.getItem("tr_id");
	var strpara = localStorage.getItem("MyanmarParNum");


	// if it is blank that means the user jumped to a location but did not click
	// clicking will set tr_id
	// jump calls set tr_id to zero and set myanmarParaNum in storage. (or should)
/*
	if (tr_id !=""){
		 strpara = GetMyanmarParaNo();
	}
	else{
		strpara = localStorage.getItem("MyanmarParaNum");
	}
*/
	strpara = strpara.match(/\d+/)+"";

	para = parseInt(strpara);
	// get the right matching book from maps of books
	v1 = T_Maps[html_no][no];
	if (v1.length > 4) {		// multi volumn
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
	url = v1 + '#para' + para.toString();
	PaliHistoryGoUrl(url);
	/*

	if (v1 != 'x') { 
 


		var ary = [];
		for (var i=1; i<=3; i++) {
			if ($('#MAT_table3' + i).css('display') == 'inline-flex') {
				ary[i] = 1;
			} else {
				ary[i] = 0;
			}
		}



		for (var i=1; i<=3; i++) {
			if (ary[i] == 0) {

			}
			if ($('#MAT_table3' + i).css('display') == 'inline-flex') {
				ary[i] = 1;
			} else {
				ary[i] = 0;
			}
		}
		


		var wA = '0';
		if (no == "2") {
			if ($('#MAT_table2').css('display') == 'inline-flex') {
				$('#MAT_table2').css('display', 'none');
			} else {
				$('#MAT_table2').css('display', 'inline-flex');
			}
		}
		if ($('#MAT_table2').css('display') == 'inline-flex') {
			wA = '1';
		}

		var wT = '0';
		if (no == "3") {
			if ($('#MAT_table3').css('display') == 'inline-flex') {
				$('#MAT_table3').css('display', 'none');
			} else {
				$('#MAT_table3').css('display', 'inline-flex');
			}
		}
		if ($('#MAT_table3').css('display') == 'inline-flex') {
			wT = '1';
		}

		if ((wA == '0') && (wT == '0')) {
			$('#MAT_table1').css('width', '100%');
			$('#MAT_table2').css('width', '0%');
			$('#MAT_table3').css('width', '0%');
		}

		if ((wA == '1') && (wT == '0')) {
			$('#MAT_table1').css('width', '59%');
			$('#MAT_table2').css('width', '40.5%');
			$('#MAT_table3').css('width', '0%');
		}

		if ((wA == '0') && (wT == '1')) {
			$('#MAT_table1').css('width', '59%');
			$('#MAT_table2').css('width', '0%');
			$('#MAT_table3').css('width', '40.5%');
		}

		if ((wA == '1') && (wT == '1')) {
			$('#MAT_table1').css('width', '39%');
			$('#MAT_table2').css('width', '30.1%');
			$('#MAT_table3').css('width', '30%');
		}
		if (((no == '2') && (wA == '1')) || ((no == '3') && (wT == '1'))) {
*/  /*
			var p_tag = '';
			var file = 'pali/' + url.substr(0, 4) + '.js';
			console.log(url.substr(0, 4));
			const tableId = 'main_table' + no;
			console.log(tableId, 'tableId');
			var pa2= '#' + P_Par[parseInt(para)];
			element =  $('#MAT_table1 ' + pa2)[0];
			if (element) { element.scrollIntoView();}
			loadBook(parseInt(url.substr(0, 4)), () => {
				var pa2= '#' + P_Par[parseInt(para)];
				var element = $('#MAT_table2 ' + pa2)[0];
				if (element) { element.scrollIntoView();
				}
	
			}, tableId);
*/
			// var rawFile = new XMLHttpRequest();
			// rawFile.open("GET", file, false);
			// rawFile.onreadystatechange = function () {
			// 	if (rawFile.readyState === 4) {
			// 		if (rawFile.status === 200 || rawFile.status == 0) {
			// 			var data = ' ' +  rawFile.responseText + ' ';
			// 			p_tag = data.split("P_Tag[");
			//
			// 			for(index= 1; index < p_tag.length; index++) {
			// 				var tmp = p_tag[index].split("]='")[1].split("';\n")[0];
			// 				p_tag[index] = tmp;
			// 			}
			// 		}
			// 	}
			// }
			// rawFile.send(null);
			//
			// var file = 'pali/' + url.substr(0, 4) + 'a.js';
			// //**********
			// // read file
			// //**********
            // var $table = $('#main_table' + no);
            // $table.empty();
            // var rows = '';
			//
			//
			// var rawFile = new XMLHttpRequest();
			// rawFile.open("GET", file, false);
			// rawFile.onreadystatechange = function () {
			// 	if (rawFile.readyState === 4) {
			// 		if (rawFile.status === 200 || rawFile.status == 0) {
			// 			//diffrent here
			// 			var data = ' ' +  rawFile.responseText + ' ';
			// 			var p_htm = data.split("P_HTM[");
			//
			// 			//rows = rows + '<table id="main_table' + no + '" width=100% border=0 align="left" cellspacing=3 cellpadding=7 style="padding-left: 5px;">';
			//
			// 			for(index= 1; index < p_htm.length; index++) {
			// 				var tmp = p_htm[index].split("]='")[1].split("';\n")[0];
			// 				if (tmp != '') {
			// 					var ary1 = tmp.split('*');
			// 					var ary2 = p_tag[index].split('*');
			// 					rows = rows + '<tr><td class="AT">';
			// 					rows = rows + ary2[0];
			// 					for (j=1; j<ary1.length; j++) {
	        //        					rows = rows + ary1[j] + ary2[j];
	        //        				}
	        //        				rows = rows + '</td></tr>';
			// 				}
			// 			}
			// 			//rows = rows + '</table>';
			// 		}
			// 	}
			// }
			// rawFile.send(null);
			//
            // $table.html(rows);
            // setTableStyling();
            //$('#MAT_table' + no).html(rows);
	//	}
//	}

}	


function GetMyanmarParaNo(){
	var tr_id = localStorage.getItem('tr_id');
	tr_id = 'p' + tr_id;

	for (var para in P_Par) {
		if (P_Par[para] == tr_id) {
			break;
		}
	}
 
	para = parseInt(para);
	return "para" + para.toString();
}




function SetMATButtons(){

	
	
	$("#Pali1").removeClass("selected");	
	$("#Pali2").removeClass("selected");
	$("#Pali3").removeClass("selected");
	
	

	booktype = html_no.toString().substring(1,2);
	switch (booktype){
		case "1":
			$('#Pali1').addClass("selected");
			break;
		case "2":
			$("#Pali2").addClass("selected");
			break;
		case "3":
			$("#Pali3").addClass("selected");
			break;
	}


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




function onHeaderDropUp(){
	$("#main_div").css('visibility', "hidden");
	$("#panel-header").css('visibility', "visible").addClass('stand-alone');
	doAdjustTabContent();
}


function onHeaderDropDown(){
	$("#main_div").css('visibility', "visible");
	$('.tabs').removeClass('hideMe');
	$('.first-nav').removeClass('hideMe');
	$('.dict').removeClass('hideMe');
	$('.helpers').removeClass('hideMe');
	$('#tab-content').css('margin-top', '');
	$("#panel-header").removeClass('stand-alone');
	doAdjustTabContent();
}

function onHeaderDictionary(){
	$("#main_div").css('visibility', "visible");
	$('.tabs').addClass('hideMe');
	$('.first-nav').addClass('hideMe');
	$('.dict').addClass('hideMe');
	$('.helpers').addClass('hideMe');
	$('#tab-content').css("margin-top", "3px");
	$("#panel-header").removeClass('stand-alone');
	doAdjustTabContent();

}

function goConfirmGoToLatest(){

	var strLastHistory = localStorage.getItem('LastHistory');
	var strPromptConfirm = localStorage.getItem('PromptConfirm');
	var strAutoRestore = localStorage.getItem('AutoRestore');

	if (strLastHistory){
		if (strPromptConfirm == "on"){

				$.confirm({
					title: 'Tpp',
					content: 'Reload Session?',
					boxWidth: '30%',
					escapeKey: true,
					escapeKey: 'cancel',
					buttons: {
						Resume: function () {
							PaliHistoryGoUrl(strLastHistory);
						},
						cancel: function () {
							;
						}
					}
				});
			}else{
				if (strAutoRestore == "on" ){
					PaliHistoryGoUrl(strLastHistory);
				}
			}
		}
	
}
