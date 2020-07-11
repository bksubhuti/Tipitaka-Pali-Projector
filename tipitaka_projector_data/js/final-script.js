function registerListeners() {

	$(document.body).on('click', '.r1', function () {
		// copy from stlooku_jquery.js designed by Ven. Paññindriya(Vietnam)
		if (latestElementClickedJqueryObject) {
			$(latestElementClickedJqueryObject).removeClass("recentClickedCSSleft");
			$(latestElementClickedJqueryObject).removeClass("recentClickedCSSright");
		}
		$(this).addClass("recentClickedCSSright");
		latestElementClickedJqueryObject = $(this);

		GetTrId($(this).attr('id').substring(1));

		word_click();
		if (t.length > 0) {
			//lookupCoordinator(t, 0);	//$changecolor = $ns % 2; /
			document.getElementById('main_div').style.display = 'inline';

			if (localStorage.getItem('main_content') == 'page1') {
				DictionaryKeyGo();
			} else {
				if (localStorage.getItem('main_content') == 'page2') {
					change_tab('page2');
				} else {
					if (localStorage.getItem('main_content') == 'page3') {
						ParagraphAnalysis();
						window.location= '#G_' + t;
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
			if (document.getElementById('main_div').style.display == 'none') {
				document.getElementById('main_div').style.display = 'inline';
			} else {
				document.getElementById('main_div').style.display = 'none';
			}
		}

		if (localStorage.getItem('main_content') == 'page3') { // grammer
			ParagraphAnalysis();
		}
	});

	$(document.body).on('click', '.pages', function () {
		word_click();
		if (t.length > 0) {
			DictionaryKeyGo();
			change_tab('page1');

			if ((hee1 ==1) && (localStorage.getItem("speech_repeat") != '0')) {
				for (var idx=1; idx<=localStorage.getItem("speech_repeat"); idx++) {
					speakSynthesis(t);//repeat 2 times
				}
			}
		}
	});

	var QuickJump = document.getElementById("QuickJump");
	// Execute a function when the user releases a key on the keyboard
	QuickJump.addEventListener("keyup", function(event) {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
	  // Cancel the default action, if needed
	  event.preventDefault();
	  // Trigger the button element with a click
	  document.getElementById("QuickJumpBtn").click();
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

var displayBook = function() {

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

		var pali2 = P_HTM[idx].split('*');		// right-side
		var tags2 = P_Tag[idx].split('*');		// right-side

		// get para_no
		//var s0 = 'p' + idx;
		//var s0 = P_Par.findIndex(key => key === s0);
		//if (s0 != -1) {
		//	para_no = s0;
		//}

		//var n1 = '{!@#' + idx + '#@!}';
		var pali = P_HTM[idx].split('*');
		var tags = P_Tag[idx].split('*');

		s1 = '';
		s2 = '';

		for (var idy in pali) {
			if (idy == 999) {
				break;
			}
			//
			pali[idy] = toTranslate(pali[idy]);
			if (Sr_run == '1') {
				for (var Sr_ndx in Sr_ary) {
					pali[idy] = replacei(pali[idy], toTranslate(Sr_ary[Sr_ndx]), sub=> '<span id="Sr' + idx + '" class="Sr_note">' + toTranslate(Sr_ary[Sr_ndx]) + "</span>");
				}
			}
			s1 = s1 + pali[idy] + tags[idy];

			if ((view_right != 'Space') && (view_right != 'MyNote') && (view_right != 'Suttacentral')) {
				pali2[idy] = toTranslateRight(pali2[idy]);
				if (Sr_run == '1') {
					for (var Sr_ndx in Sr_ary) {
						pali2[idy] = replacei(pali2[idy], toTranslateRight(Sr_ary[Sr_ndx]), sub=> '<span class="Sr_note">' + toTranslateRight(Sr_ary[Sr_ndx]) + "</span>");
					}
				}
				s2 = s2 + pali2[idy] + tags2[idy];
			}
		}


		if (view_right == 'MyNote') {
			tmp = localStorage.getItem('n' + html_no + '_'+idx);

			if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
				s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
				M_LOC[idx] = tmp;
			} else {
				tmp = M_LOC[idx];
				if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
					document.write = localStorage.setItem('n' + html_no + '_'+idx, tmp);
					s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
				}
			}
		}

		if (view_right == 'Suttacentral') {
			tmp = M_SCT[idx];
			if ((tmp != null) && (tmp != undefined) && (tmp !='')) {
				s2 = tags2[0].replace('<p class="', '<p class="m1_') + tmp.replace(/\n/g, '<br>'); + '</p>';
			}
		}
		document.getElementById('p' +idx).innerHTML = s1;
		document.getElementById('m' +idx).innerHTML = s2;
	}

	if (Sr_id != null) {
		document.getElementById('Sr_Div').style.visibility = '';
		document.getElementById('Sr_Next').innerHTML = Sr_id.split(';').length - 2;
		if (Sr_id.length < 2) {
			document.getElementById('Sr_Div').style.visibility = 'hidden';
		}
	}
};

if (!SingleLoad) {
	displayBook();
}




if (localStorage.getItem('Pali_note') == 'none') {
	$(".note").css("display", 'none');
} else {
	$(".note").css("display", 'inline');
}


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

document.getElementById('main_div').style.top = '' + t + 'px';
document.getElementById('main_div').style.left = '' + l + 'px';
document.getElementById('main_div').style.height = '' + h + 'px';
document.getElementById('main_div').style.width = '' + w + 'px';
adjustTabContent();

document.getElementById('main_td2').style.width = (document.body.getBoundingClientRect().width - w) + 'px';

window.addEventListener('resize', function() {
	// adjust main_td2 on window resize
	//
	const mtd2 = document.getElementById('main_td2');
	const rect = mtd2.getBoundingClientRect();
	const available = document.body.getBoundingClientRect().width - rect.x;
	mtd2.style.width = `${available}px`;
});

tx = parseInt(document.getElementById('main_div').style.top);
tx2 = document.getElementById('main_content').offsetTop;
// document.getElementById('main_content').style.height = (h - tx2 - tx + 20)+ "px";

if (p == '0') {		// floating
	RedrawTable(0);

//	$('.page4').css('height', '98%');
//	document.getElementById('page4break1').innerHTML = '<br>';

	$('.page5').css('height', '98%');
} else {

	$('#iPadDirection').css('display', 'none');
	$('#iPadH').css('display', 'none');
	$('#iPadHeight').css('display', 'none');

	RedrawTable(parseInt(w));

	//page4 TOC
	document.getElementById('page4break1').innerHTML = '<br>';
	document.getElementById('page4break3').innerHTML = '<br>';

	$('.page5').css('width', '98%');
	$('.page5').css('height', '32%');
	document.getElementById('page5break1').innerHTML = '<br>';
	document.getElementById('page5break2').innerHTML = '<br>';

	document.getElementById('divDragIcon').style.display = "none";
	document.getElementById('ResizeBottom').style.display = "none";
}

k = localStorage.getItem('contentmode');
if (!k) {
	k = 'PC';
	document.write = localStorage.setItem('contentmode', k);
}
if (k == 'iPad') {
	document.getElementById('iPad').style.display = 'inline';
	document.getElementById('PC').style.display = 'none';
} else {
	document.getElementById('iPad').style.display = 'none';
	document.getElementById('PC').style.display = 'inline';
}
e = document.getElementById('iPadWidth');
w1 = window.innerWidth - 25;
for (i=30; i<=100; i=i+5) {
	w2 = parseInt(i * w1/100);
	e.options.add(new Option(i +'%', w2));
}
e = document.getElementById('iPadHeight');
h1 = window.innerHeight - 35;
for (i=30; i<=100; i=i+5) {
	h2 = parseInt(i * h1/100);
	e.options.add(new Option(i +'%', h2));
}


// 6. Background-Color
$('#main_div').css('backgroundColor', localStorage.getItem('bg_color'));


if (localStorage.getItem('contentdisplay') == '0') {
	document.getElementById('main_div').style.display = 'none';
} else {
	document.getElementById('main_div').style.display = 'inline';
}


var panel_bg_color  = localStorage.getItem('panel_bg_color');
if (!panel_bg_color) {
	panel_bg_color = '#f0f0f0';
}
var panel_font_color  = localStorage.getItem('panel_font_color');
if (!panel_font_color) {
	panel_font_color = '#000000';
}


document.getElementById('main_div').style.backgroundColor = panel_bg_color;

var colorobj = new RGBColor(panel_bg_color);
colorobj.r = parseInt(colorobj.r * 0.8);
colorobj.g = parseInt(colorobj.g * 0.8);
colorobj.b = parseInt(colorobj.b * 0.8);
//DictionaryBackground = 'background-color:rgb(' + colorobj.r + ',' + colorobj.g + ',' + colorobj.b + ')';
// removed.. seems to format without it.. and it was going to the anki output


document.getElementById('main_div').style.color= panel_font_color;


// set the font color for the dictionary
r1 = localStorage.getItem("r1");
$('.dict').css('color', r1);
//$('li').css('color', r1);


lineheight = localStorage.getItem('contentlineheight');
if (!lineheight) {
	lineheight = '200';
}
document.getElementById('main_div').style.lineHeight= lineheight + '%';

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
			document.getElementById('Sr_Now').innerHTML = (Number(i));
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

// Turn on/off MAT icons
ary1 = [];
ary1[1] = "Mūla";
ary1[2] = "Aṭṭhakathā";
ary1[3] = "Ṭīkā";
ary2 = [];
ary2[1] = 'M';
ary2[2] = 'A';
ary2[3] = 'T';

const setSelected = (element, name) => {
	element.innerHTML = name;
	element.classList.remove('notselected');
	element.classList.add('selected');
	element.style.color = '#777777';
};
for (i=1; i<=3; i++) {
	const element = document.getElementById('Pali' + i);
	if (T_Maps[html_no] == undefined) {
		setSelected(element, ary2[i]);
	} else {
		if ((html_no.substring(1,1) == i) || (T_Maps[html_no][i] == 'x') || (T_Maps[html_no][i] == '#'))  {
			setSelected(element, ary2[i]);
		}
	}
}

var ShowHideNumbers = function ShowHideNumbers(){
	if (localStorage.getItem('Show_Numbers') == 'true') {
		$('.font10').show();
	}
	if (localStorage.getItem('Show_Numbers') == 'false') {
		$('.font10').hide();
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

	lx = parseInt(document.getElementById('main_div').style.left);
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

	tx = parseInt(document.getElementById('main_div').style.top);
	h = Math.max(100, Math.min(h, window.innerHeight -tx -30));

	omain_div.style.height=h+"px";
	document.write = localStorage.setItem('main_height', h);

	tx2 = document.getElementById('main_content').offsetTop;
	// document.getElementById('main_content').style.height = (h - tx2 - tx + 20)+ "px";

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

	lx = parseInt(document.getElementById('main_div').style.left);
	tx = parseInt(document.getElementById('main_div').style.top);

	w = Math.max(250, Math.min(w, window.innerWidth -lx -20));
	h = Math.max(100, Math.min(h, window.innerHeight -tx -30));

	omain_div.style.width=w+"px";
	omain_div.style.height=h+"px";
	document.write = localStorage.setItem('main_width', w);
	document.write = localStorage.setItem('main_height', h);

	tx2 = document.getElementById('main_content').offsetTop;
	// document.getElementById('main_content').style.height = (h - tx2 - tx + 20)+ "px"

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
		document.removeEventListener("mouseup",stopDrag,true);
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


