function afterWordClicked(word, tdr1) {

	if (latestElementClickedJqueryObject) {
		$(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
		$(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
	}
	$(this).addClass("recentClickedCSSright");
	latestElementClickedJqueryObject = $(tdr1);

	GetTrId($(tdr1).attr('id').substring(1));

	word_click(word);
	if (word.length > 0) {
		//lookupCoordinator(t, 0);	//$changecolor = $ns % 2; /
		$('#main_div').css('display', 'inline');
		// test to see if in dictionary mode and call or show whole thing
		if ($('.first-nav').hasClass('hideMe')){
			onHeaderDictionary();
		}
		else{
			onHeaderDropDown();
		}
	
		if (localStorage.getItem('main_content') == 'page1') {
			DictionaryKeyGo();
		} else {
			if (localStorage.getItem('main_content') == 'page2') {
				change_tab('page2');
			} else {
				if (localStorage.getItem('main_content') == 'page3') {
					var Chars = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';
					var p2 = '';
					for (var i in word) {
						var p1 = word[i];
						if (Chars.indexOf(p1) != -1) {
							p2 = p2 + p1;
						} else {
							if (p2 != '') {
								break;
							}
						}
					}
					word = p2;

					ParagraphAnalysis();
					window.location= '#G_' + word.toLowerCase();
				}
			}
		}
	}

	const currentTab = localStorage.getItem('main_content');

	if (['page4', 'page5'].indexOf(currentTab) >= 0) {
		// switch to dictionary
		//
		onTabClick(document.getElementById('page1'));
	}
}
function registerListeners() {

	$(document.body).on('click', '.r1', function () {
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)

	});

	$(document.body).on('click', '.m1', function () {
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)
		if (latestElementClickedJqueryObject) {
			$(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
			$(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
		}
		$(this).addClass("recentClickedCSSleft");
		latestElementClickedJqueryObject = $(this);

		GetTrId($(this).attr('id').substring(1));

		if ((localStorage.getItem('contentdisplay') == '0') && (localStorage.getItem('contentposition') == '0')) {
			if ($('#main_div').css('display') == 'none') {
				$('#main_div').css('display', 'inline');
			} else {
				$('#main_div').css('display', 'none');
			}
		}

		if (localStorage.getItem('main_content') == 'page3') { // grammer
			ParagraphAnalysis();
		}
	});

	$(document.body).on('click', '.pages', function (event) {
		
		if ( document.getSelection() != "") {
			return;  // do nothing if selection.
		}
		if (localStorage.getItem('main_content') <= 'page3') {
			word_click();
			console.log(t);
			if (t.length > 0) {
				DictionaryKeyGo();
				change_tab('page1');
				if ((localStorage.getItem('hee1') != '000') && (localStorage.getItem("speech_repeat") != '0')) {
					for (var idx=1; idx<=localStorage.getItem("speech_repeat"); idx++) {
						speakSynthesis(t);//repeat 2 times
					}
				}
			}
		}	
	});

	$('#QuickJump').on("keypress", function(e) {
			// Number 13 is the "Enter" key on the keyboard
	  if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			$("#QuickJumpBtn").trigger("click");
		}
  	});


	// Execute a function when the user releases a key on the keyboard
	$('#PageNo').on("keypress", function(e) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			$("#PageNoBtn").trigger("click");
		}
	});




}

function setTableStyling() {
	//========================================================================================
	// TABLE Start
	// 1. Font-Family

	$(".r1").css("font-family", localStorage.getItem('font_left'));
	$(".m1").css("font-family", localStorage.getItem('font_right'));
	$(".r1").css("line-height", '180%');
	$(".m1").css("line-height", '180%');

	// 2. Font-size,
	var size_left = localStorage.getItem('size_left');
	var PaliFontSize = localStorage.getItem("PaliFontSize");
	var iPaliFontSize = parseInt(PaliFontSize);  // no need to call parseint every time

	var p24 = parseInt(iPaliFontSize);
	var p30 = parseInt(iPaliFontSize + 6);
	var p33 = parseInt(iPaliFontSize + 8);
	var p36 = parseInt(iPaliFontSize + 12);
	var r1 =  parseInt(iPaliFontSize);
	var iLineHeight =  parseFloat(size_left) * 100;
	var strLineHeight = iLineHeight.toString() +"%";

	$(".r1").css("line-height",	strLineHeight);	//--------td


	var size_right = 	localStorage.getItem('size_right');
	var m24 = parseInt(iPaliFontSize);
	var m30 = parseInt(iPaliFontSize + 6);
	var m33 = parseInt(iPaliFontSize + 8);
	var m36 = parseInt(iPaliFontSize + 12);
	var m1 =  parseInt(iPaliFontSize);

	$(".m1").css("line-height",	(parseInt(m1/2) + iPaliFontSize)  + "pt");	//--------td
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

	// 3. Background-Color

	// 4. Font Color
	var font_color = {
		'#f3ddb6':['#000000'], 	'#fff8dc':['#000000'],	'#1f3763':['#fffffe'],	'#000001':['#ffffff'],
		'#121212':['#b0b0b0'],	'#010101':['#937811'],	'#1e1e1e':['#628754'],	'#090c11':['#2d3d4a'],
		'#3c3c3c':['#cecece'],	'#5a5a5a':['#cacaca'],	'#d7d4cd':['#626262'],	'#e0e0e0':['#202020'],
		'#f0f0f0':['#008000'],	'#fefefe':['#000000'],	'#d8cbab':['#000001'],	'#e2bdb4':['#010101']}
	var bld_color = {
		'#f3ddb6':['brown'],	'#fff8dc':['brown'],	'#1f3763':['#ffff00'],	'#000001':['brown'],
		'#121212':['brown'],	'#010101':['brown'],	'#1e1e1e':['brown'],	'#090c11':['brown'],
		'#3c3c3c':['brown'],	'#5a5a5a':['brown'],	'#d7d4cd':['brown'],	'#e0e0e0':['brown'],
		'#f0f0f0':['brown'],	'#fefefe':['brown'],	'#d8cbab':['brown'],	'#e2bdb4':['brown']}

	// 5. Pali Text
	var view_left = localStorage.getItem("view_left");
	var view_right = localStorage.getItem("view_right");

	//-------------------------------------
	// 7. Font Color

	if (view_right != 'Space') {
		var width_r1 = localStorage.getItem('width_left');
		var width_m1 = localStorage.getItem('width_right');
	} else {
		width_r1 = 92;
		width_m1 = 8;
	}
	$(".r1").css("width", width_r1 + '%');
	$(".m1").css("width", width_m1 + '%');
	var color = font_color[localStorage.getItem('bg_color')];
	var bold = bld_color[localStorage.getItem('bg_color')];
	$(".r1").css("color", color);
	$(".b1").css("color", color);
	$(".m1").css("color", color);
	$(".bld").css("color", bold);
	//$('#main_td2').css('backgroundColor', localStorage.getItem('bg_color'));
	$('#main_table').css('background-color', localStorage.getItem('bg_color'));
	//$('#main_td2').css('background-color', localStorage.getItem('bg_color'));


	ShowHideNumbers();
	//console.log(localStorage.getItem('bg_color'));
	// TABLE End
	//========================================================================================
}







registerListeners();
setTableStyling();

//------------
//------------
//var s1 = '';

//var para_no = '1';

var Sr_key = localStorage.getItem("Sr_key");
if (Sr_key) {
	var Sr_ary = Sr_key.split(' ');
}
var Sr_id = localStorage.getItem('Sr_id'+ html_no);

function  displayBook() {
	const viewLeftConfig = localStorage.getItem("view_left");
	const viewRightConfig = localStorage.getItem("view_right");

	// Clear MyNote
    if (viewRightConfig != 'MyNote') { 
    	M_LOC = [];	 
    } else {//
	    var jMyNoteData = {TrId:"", val:""};
		var MyNoteArray = [];
		var strMyNotes = localStorage.getItem('MyNotes');
		if (strMyNotes!= null){
			MyNoteArray = JSON.parse(strMyNotes);  
			if (MyNoteArray != null){// use JSON objects instead  
				for (i in MyNoteArray) { 
					if (MyNoteArray[i].html_no === html_no){
					M_LOC[MyNoteArray[i].TrId] = MyNoteArray[i].val;
					} 
				} 
			}	
		}
		MyNoteArray = [];  
    }

    if (viewRightConfig != 'Suttacentral') { 
    	M_SCT = [];	
    } else {
	    var jSuttaCentralData = {TrId:"", val:""};
		var SuttaCentralArray = [];
		SuttaCentralArray = JSON.parse(localStorage.getItem('SuttaCentral' + html_no));  
		for (i in SuttaCentralArray) { 
			M_SCT[SuttaCentralArray[i].TrId] = SuttaCentralArray[i].val;
		} 
		SuttaCentralArray = [];
	}

	 

	for (var idx in P_HTM) {
		var Sr_run = '';
		if (Sr_key) {
			if (Sr_id) {
				if (Sr_id.indexOf(';' + idx + ';') != -1) {
					Sr_run = '1';
				}
			}
		}
		if (DEBUG) {
			// console.log(`Displaying book. Sr_key = "${Sr_key}". Sr_run: "${Sr_run}".`);
		}

		var pali = P_HTM[idx].split('*');
		var tags = P_Tag[idx].split('*');

		s1 = '';
		s2 = '';

		for (var idy in pali) {
			if (idy == 999) {
				break;
			}
			//
			var pali_left = toTranslate(pali[idy], viewLeftConfig);
			if (Sr_run == '1') {
				for (const currentSr of Sr_ary) {
					const translated = toTranslate(currentSr, viewLeftConfig);
					pali_left = replacei(pali_left, translated, sub=> '<span id="Sr' + idx + '" class="Sr_note">' + translated + "</span>");
				}
			}
			s1 = s1 + pali_left + tags[idy];

			if ((viewRightConfig != 'Space') && (viewRightConfig != 'MyNote') && (viewRightConfig != 'Suttacentral')) { 
				var pali_right = toTranslateRight(pali[idy], viewRightConfig);
				if (Sr_run == '1') {
					for (const currentSr of Sr_ary) {
						const translated = toTranslateRight(currentSr, viewRightConfig);
						pali_right = replacei(pali_right, translated, sub=> '<span id="Sr' + idx + '" class="Sr_note">' + translated + "</span>");
					}
				} 
				s2 = s2 + pali_right + tags[idy];

			}
		} 

		if (viewRightConfig == 'MyNote') {
			var s21 = '';
			if ((M_LOC[idx] != null) && (M_LOC[idx] != undefined) && (M_LOC[idx] !='')) {
				s21 = s21 + M_LOC[idx].replace(/\n/g, '<br>');

            	var jMyNoteData = {};
				jMyNoteData.TrId = idx; 
				jMyNoteData.val = M_LOC[idx];  
	            MyNoteArray.push(jMyNoteData); 
			}
			s2 = '<p class="b1" id="m1_' + idx + '">' + s21 +'</p>';

			var v1 = Math.max(25, parseInt(P_HTM[idx].length /0.9));
			s2 = s2 + '<textarea id="notes' + idx +'" style="font-size:13.0pt;line-height:170%;width:99%;height:' + v1 + 'pt;color:#000000;background-color:#e0ffff;display:none;">' + s21 + '</textarea>'; 

		} else {
			if (viewRightConfig == 'Suttacentral') {
				if ((M_SCT[idx] != null) && (M_SCT[idx] != undefined) && (M_SCT[idx] !='')) {
					s2 = tags[0].replace('<p class="', '<p class="m1_') + M_SCT[idx].replace(/\n/g, '<br>'); + '</p>';
            		var jSuttaCentralData = {};
					jSuttaCentralData.TrId = idx; 
					jSuttaCentralData.val = M_SCT[idx];  
	           		SuttaCentralArray.push(jSuttaCentralData); 
				}
			}
		}	


		$('#p' +idx).html(s1);

		//if (viewRightConfig != 'Space') {
		$('#m' +idx).html(s2); 
		//}	 
			//document.getElementById('m' +idx).innerHTML = s2; 
	}

/*
	if (viewRightConfig == 'MyNote') {
    	localStorage.setItem('MyNote' + html_no, JSON.stringify(MyNoteArray));
	} 
	if (viewRightConfig == 'Suttacentral') {
    	localStorage.setItem('SuttaCentral' + html_no, JSON.stringify(SuttaCentralArray));
	}	
*/

	if (Sr_id != null) {
		$('#Sr_Div').css('visibility', 'visible');
		$('#Sr_Next').html(TML = Sr_id.split(';').length - 2);
		if (Sr_id.length < 2) {
			$('#Sr_Div').css('visibility', 'hidden');
		}
	}

};

if (!SingleLoad) {
	displayBook();
}




// if (localStorage.getItem('Pali_note') == 'none') {
// 	$(".note").css("display", 'none');
// } else {
// 	$(".note").css("display", 'inline');
// }


p = localStorage.getItem('contentposition');
if (!p) {
	p = '0';		// floating
	document.write = localStorage.setItem('contentposition', '0');
}

t = localStorage.getItem('main_top');
l = localStorage.getItem('main_left');
w = localStorage.getItem('main_width');
h = localStorage.getItem('main_height');
if (p == '0') {		// floating
	if (!t) {
		t = 0;
	}
	t = parseInt(t);
	t = Math.max(0, Math.min(t, parseInt(window.innerHeight * 0.90)));

	if (!l) {
		l =0;
	}
	l = parseInt(l);
	l = Math.max(0, Math.min(l, parseInt(window.innerWidth * 0.90)));

	if (!w) {
		w = window.innerWidth;
	}
	w = parseInt(w);
	w = Math.max(250, Math.min(w, parseInt(window.innerWidth -l -20)));

	if (!h) {
		h = 150;
	}
	h = parseInt(h);
	h = Math.max(150, Math.min(h, parseInt(window.innerWidth -t -30)));
} else {
	t = '0';
	l = '0';

	w = localStorage.getItem('main_width');
	if (!w) {
		w = parseInt(window.innerWidth * 0.50);
	}
	if ((parseInt(w) < 10) || (parseInt(w)> parseInt(window.innerWidth *0.80))) {
		w = parseInt(window.innerWidth * 0.50);
	}

	h = localStorage.getItem('main_height');
	if (!h) {
		h = parseInt(window.innerHeight * 0.95);
	}
	if ((h < parseInt(window.innerWidth *0.9)) || (parseInt(h)> parseInt(window.innerWidth *0.95))) {
		h = parseInt(window.innerHeight * 0.95);
	}
}

document.write = localStorage.setItem('main_top', t);
document.write = localStorage.setItem('main_left', l);
document.write = localStorage.setItem('main_width', w);
document.write = localStorage.setItem('main_height', h);

$('#main_div').css('top', '' + t + 'px');
$('#main_div').css('left', '' + l + 'px');
$('#main_div').css('height', '' + h + 'px');
$('#main_div').css('width', '' + w + 'px');
adjustTabContent();

$('#main_td2').css('width', (document.body.getBoundingClientRect().width - w) + 'px');

window.addEventListener('resize', function() {
	// adjust main_td2 on window resize
	//
	const mtd2 = document.getElementById('main_td2');
	const rect = mtd2.getBoundingClientRect();
	const available = document.body.getBoundingClientRect().width - rect.x;
	mtd2.style.width = `${available}px`;
});

tx = parseInt($('#main_div').css('top'));
tx2 = $('#main_content').css('offsetTop');

if (p == '0') {		// floating
	RedrawTable(0);

//	$('.page4').css('height', '98%');
//	document.getElementById('page4break1').innerHTML = '<br>';

	$('.page5').css('height', '98%');
} else {

	//$('#iPadDirection').css('display', 'none');
	//$('#iPadH').css('display', 'none');
	//$('#iPadHeight').css('display', 'none');

	RedrawTable(parseInt(w));
 

	$('.page5').css('width', '98%');
	$('.page5').css('height', '32%');  

	$('#divDragIcon').css('display', "none");
	$('#ResizeBottom').css('display', "none");
}


// 6. Background-Color
$('#main_div').css('backgroundColor', localStorage.getItem('bg_color'));

$('#main_div').css('display', 'inline');


var panel_bg_color  = localStorage.getItem('panel_bg_color');
if (!panel_bg_color) {
	panel_bg_color = '#f0f0f0';
}
var panel_font_color  = localStorage.getItem('panel_font_color');
if (!panel_font_color) {
	panel_font_color = '#000000';
}


$('#main_div').css('backgroundColor', panel_bg_color);

var colorobj = new RGBColor(panel_bg_color);
colorobj.r = parseInt(colorobj.r * 0.8);
colorobj.g = parseInt(colorobj.g * 0.8);
colorobj.b = parseInt(colorobj.b * 0.8);
//DictionaryBackground = 'background-color:rgb(' + colorobj.r + ',' + colorobj.g + ',' + colorobj.b + ')';
// removed.. seems to format without it.. and it was going to the anki output

$('#main_div').css('color', panel_font_color);

// set the font color for the dictionary
r1 = localStorage.getItem("r1");
$('.dict').css('color', r1);
//$('li').css('color', r1);


lineheight = localStorage.getItem('contentlineheight');
if (!lineheight) {
	lineheight = '200';
}
$('#main_div').css('lineHeight', lineheight + '%');

fontsize = localStorage.getItem('contentfontsize');
if (!fontsize) {
	fontsize = '12';
}
$(".pages").css('font-size', fontsize + 'pt');
$(".pages2").css('font-size', fontsize + 'pt');
v1 = parseInt(fontsize * 0.9 + 0.5);
//page3ResultStyle = page3ResultStyle + 'font-size:' + v1 + 'pt;';

fontname =  localStorage.getItem('contentfontname');
if (!fontname) {
	fontname = 'Tahoma';
}
$(".pages").css('font-family', fontname);
$(".pages2").css('font-family', fontname);
//page3ResultStyle = page3ResultStyle + 'font-family:"' + fontname +'";';

change_tab('page1');

var setSearchNavigator = function() {
	if (localStorage.getItem('Sr_id'+ html_no)) {

		var ary1 = localStorage.getItem('Sr_id'+ html_no).split(';');
		var n = Number(location.search.split('n=')[1]);
		if (SingleLoad && location.hash.indexOf('#/book/') === 0) {
			const parsedBookInfo = location.hash.match(/#\/book\/(\d+)\/(\d+)/i);
			if (parsedBookInfo.length > 1) {
				n = parseInt(parsedBookInfo[2]);
			}
		}
		if (0 < n) {
			for (i in ary1) {
				if (ary1[i] == n ) {
					break;
				}
			}
			document.getElementById('Sr' + ary1[i]).scrollIntoView();
			$('#Sr_Now').html(Number(i));
		}
	}
};

if (!SingleLoad) {
	setSearchNavigator();
}
/*
function GoToHistoryPosition(){
	// go to history position  ------------------------
	if (localStorage.getItem('history_pos') != null) {
		if (localStorage.getItem('history_pos') != '') {
			var pos = localStorage.getItem('history_pos');	// pos #MP

			if (pos.indexOf('p') != -1) {	// for id
				loc = pos.substring(1);
				document.getElementById(loc).scrollIntoView();
			} else {
				if ((pos.indexOf('M') != -1) || (pos.indexOf('P') != -1)){		// myanmar or PTS page
					loc = pos.substring(1);
					var tr = document.getElementsByClassName('r1');
					for (var i=0; i<tr.length; i++) {
						if (tr[i].innerHTML.indexOf(loc) != -1) {
							document.getElementById('p' + (i +1)).scrollIntoView();
							Get(i+1);
							break;
						}
					}
				} else {			// R= from paragraph number to id
					var tr = document.getElementsByClassName('r1');
					lenx = parseInt(pos.substring(2));
					for (var i=lenx; i<=tr.length; i++) {
						if (P_Par[i] != undefined) {
							window.location = '#' + P_Par[i];
							GetTrId(P_Par[i].substring(1));
							break;
						}
					}


				}
			}
			document.write = localStorage.setItem('history_pos', '');
		}
	}

}

*/

// Change Page4 TOC at none Roman Script
if (view_left != 'Roman') {
	v1 = document.getElementById('Toc');
	try {
		cx = v1.options.length
		for(var i=0; i<cx; i++){
			var e = v1.options[i];
			e.text = toTranslate(e.text);
		}
	} catch(e) {
	}
	if (view_left == 'Myanmar') {
		v1.style.fontfamily = 'Myanmar Text';
	}

}


function ShowHideNumbers(){
	if (localStorage.getItem('Show_Numbers') == 'true') {
		$('.font10').css("display", "inline");
	}
	if (localStorage.getItem('Show_Numbers') == 'false') {
		$('.font10').css("display","none");
	}
}

var gPaliHistoryItem = {date:"", html_no:"0", paraNo:"0", Toc_Name:""};


var setHistoryItemChapterName = function setHistoryItemChapterName() {
	gPaliHistoryItem.Toc_Name = TOC_Dropdown_Items[1];// [0] book name [1] chaptername
};


var PaliHistorySet = function PaliHistorySet() { 

	gPaliHistoryItem.paraNo = 'p1';
	gPaliHistoryItem.html_no = html_no;


	if (!SingleLoad) {
		setHistoryItemChapterName();
	}
	writeHistoryStorage();
};

// ----
// Panel Drag & Resize
var oDiv=document.getElementById("ResizeDrag");
var omain_div=document.getElementById("main_div");
//var h2=omain_div.getElementsByTagName("h2")[0];
var ResizeRight=document.getElementById("ResizeRight");
var ResizeBottom=document.getElementById("ResizeBottom");
var ResizeLeft=document.getElementById("ResizeLeft");
var mouseStart={};
var divStart={};
var rightStart={};
var bottomStart={};

// Resize Right
ResizeRight.onmousedown = ResizeRight.ontouchstart = function(ev){
	var oEvent=ev||event;
	mouseStart.x = clientX(oEvent);
	mouseStart.y = clientY(oEvent);
	rightStart.x = ResizeRight.offsetLeft;

	if(ResizeRight.setCapture){
		ResizeRight.onmousemove = ResizeRight.ontouchmove = doResizeRight;
		ResizeRight.onmouseup = ResizeRight.ontouchend = stopResizeRight;
		ResizeRight.setCapture();
	}
	else{
		document.addEventListener("mousemove",doResizeRight,true);
		document.addEventListener("mouseup",stopResizeRight,true);

		document.addEventListener("touchmove",doResizeRight,true);
		document.addEventListener("touchend",stopResizeRight,true);
	}
};
function doResizeRight(ev){
	var oEvent=ev||event;
	var l = clientX(oEvent) - mouseStart.x + rightStart.x;
	var w = l + oDiv.offsetWidth;

	lx = parseInt($('#main_div').css('left'));
	w = Math.max(250, Math.min(w, window.innerWidth -lx -20));

	omain_div.style.width = w + "px";
	document.write = localStorage.setItem('main_width', w);

	RedrawTable(w);
};
function stopResizeRight(){
	if(ResizeRight.releaseCapture){
		ResizeRight.onmousemove=null;
		ResizeRight.onmouseup=null;

		ResizeRight.ontouchmove=null;
		ResizeRight.ontouchend=null;

		ResizeRight.releaseCapture();
	}
	else{
		document.removeEventListener("mousemove",doResizeRight,true);
		document.removeEventListener("mouseup",stopResizeRight,true);

		document.removeEventListener("touchmove",doResizeRight,true);
		document.removeEventListener("touchend",stopResizeRight,true);
	}
};

// Resize Down
ResizeBottom.onmousedown = ResizeBottom.ontouchstart = function(ev){
	var oEvent=ev||event;
	mouseStart.x= clientX(oEvent);
	mouseStart.y = clientY(oEvent);
	bottomStart.y = ResizeBottom.offsetTop;

	if(ResizeBottom.setCapture){
		ResizeBottom.onmousemove=doResizeBottom;
		ResizeBottom.onmouseup=stopResizeBottom;

		ResizeBottom.ontouchmove=doResizeBottom;
		ResizeBottom.ontouchend=stopResizeBottom;
		ResizeBottom.setCapture();
	}
	else{
		document.addEventListener("mousemove",doResizeBottom,true);
		document.addEventListener("mouseup",stopResizeBottom,true);

		document.addEventListener("touchmove",doResizeBottom,true);
		document.addEventListener("touchend",stopResizeBottom,true);
	}
};
function doResizeBottom(ev){
	var oEvent=ev||event;
	var t = clientY(oEvent) - mouseStart.y + bottomStart.y;
	var h = t + oDiv.offsetHeight;

	tx = parseInt($('#main_div').css('top'));
	h = Math.max(100, Math.min(h, window.innerHeight -tx -30));

	omain_div.style.height=h+"px";
	document.write = localStorage.setItem('main_height', h);

	tx2 = document.getElementById('main_content').offsetTop; 

	RedrawTable(0);
};
function stopResizeBottom(){
	if(ResizeBottom.releaseCapture){
		ResizeBottom.onmousemove=null;
		ResizeBottom.onmouseup=null;

		ResizeBottom.ontouchmove=null;
		ResizeBottom.ontouchend=null;

		ResizeBottom.releaseCapture();
	}
	else{
		document.removeEventListener("mousemove",doResizeBottom,true);
		document.removeEventListener("mouseup",stopResizeBottom,true);

		document.removeEventListener("touchmove",doResizeBottom,true);
		document.removeEventListener("touchend",stopResizeBottom,true);
	}
};

var client = function(event, which) {
	return event[which] || (event.touches && event.touches[0][which]);
};

var clientX = function(event) {
	return client(event, 'clientX');
};
var clientY = function(event) {
	return client(event, 'clientY');
};


// Resize All
oDiv.onmousedown = oDiv.ontouchstart = function(ev){
	var oEvent=ev||event;

	mouseStart.x = clientX(oEvent);
	mouseStart.y = clientY(oEvent);

	divStart.x=oDiv.offsetLeft;
	divStart.y=oDiv.offsetTop;
	if(oDiv.setCapture){
		oDiv.onmousemove = oDiv.ontouchmove = doDrag;
		oDiv.onmouseup = oDiv.ontouchend = stopDrag;
		oDiv.setCapture();
	}
	else{
		document.addEventListener("mousemove", doDrag,true);
		document.addEventListener("touchmove", doDrag,true);

		document.addEventListener("mouseup", stopDrag,true);
		document.addEventListener("touchend", stopDrag,true);
	}
};
function doDrag(ev){
	var oEvent=ev||event;
	var l= clientX(oEvent) -mouseStart.x + divStart.x;
	var t= clientY(oEvent) - mouseStart.y + divStart.y;

	var w=l+oDiv.offsetWidth;
	var h=t+oDiv.offsetHeight;

	lx = parseInt($('#main_div').css('left'));
	tx = parseInt($('#main_div').css('top'));

	w = Math.max(250, Math.min(w, window.innerWidth -lx -20));
	h = Math.max(100, Math.min(h, window.innerHeight -tx -30));

	omain_div.style.width=w+"px";
	omain_div.style.height=h+"px";
	document.write = localStorage.setItem('main_width', w);
	document.write = localStorage.setItem('main_height', h);

	tx2 = document.getElementById('main_content').offsetTop; 

	RedrawTable(w);
};
function stopDrag(){
	if(oDiv.releaseCapture){
		oDiv.onmousemove=null;
		oDiv.onmouseup=null;
		oDiv.releaseCapture();
	}
	else{
		document.removeEventListener("mousemove",doDrag,true);
		document.removeEventListener("touchmove", doDrag,true);

		document.removeEventListener("mouseup",stopDrag,true);
		document.removeEventListener("touchend",stopDrag,true);
	}
};

// Drag
divDragIcon.onmousedown = divDragIcon.ontouchstart = function(ev){
	var oEvent=ev||event;
	mouseStart.x = clientX(oEvent);
	mouseStart.y = clientY(oEvent);
	divStart.x=omain_div.offsetLeft;
	divStart.y=omain_div.offsetTop;

	if(divDragIcon.setCapture){
		divDragIcon.onmousemove = divDragIcon.ontouchmove = doDrag3;
		divDragIcon.onmouseup = divDragIcon.ontouchend = stopDrag3;
		divDragIcon.setCapture();
	}
	else{
		document.addEventListener("mousemove",doDrag3,true);
		document.addEventListener("touchmove",doDrag3,true);

		document.addEventListener("mouseup",stopDrag3,true);
		document.addEventListener("touchend",stopDrag3,true);
	}
};
function doDrag3(ev){
	var oEvent=ev||event;
	var l = clientX(oEvent) - mouseStart.x + divStart.x;
	var t = clientY(oEvent) - mouseStart.y + divStart.y;
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
	document.write = localStorage.setItem('main_left', l);
	document.write = localStorage.setItem('main_top', t);
};
function stopDrag3(){
	if(divDragIcon.releaseCapture){
		divDragIcon.onmousemove = null;
		divDragIcon.onmouseup = null;
		divDragIcon.ontouchmove = null;
		divDragIcon.ontouchend = null;
		divDragIcon.releaseCapture();
	}
	else{
		document.removeEventListener("mousemove",doDrag3,true);
		document.removeEventListener("mouseup",stopDrag3,true);

		document.removeEventListener("touchmove",doDrag3,true);
		document.removeEventListener("touchend",stopDrag3,true);
	}
}


setupHome();
