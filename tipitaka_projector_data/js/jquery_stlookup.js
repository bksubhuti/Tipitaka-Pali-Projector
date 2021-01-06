/* 
@ Pali Tipitaka Projector v180601
@ Last Modified: 20180630
@ Filename: stlookup_jquery.js
@ Functions: to load dictionaries and perform look up, bind many click events into the text file
*/

/*
@ ajaxSetup Cache = true so that it just needs to load dictionaries 1 time
@ References https://api.jquery.com/jquery.getscript/
*/

$.ajaxSetup({
	crossDomain: true,
	cache: true
});

var dict_in_use = 0; //count dict in use
var word;
var latestElementClickedJqueryObject = '';
/*
@ var keepChars is used to break a paragraph into words and trim punctuation, non-word chars etc
*/
var keepChars = /[^a-zA-Zāīūṇṅñṃṁḷḍṭśṣḥḷṛṝáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđंअआइईउऊएओकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवसहािीुूेो्ංඅආඉඊඋඌඑඔකඛගඝඞඟචඡජඣඤඤ්ජඥඦටඨඩඪණණ්ඩඬතථදධනන්දඳපඵබභමම්බඹයරලවසහළ්්රාිීුූෙොกขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลวสหฬอาิีึฺุูเโํကခဂဃငင္င်္စဆဇဈဉဉ္ဉညဋဌဍဎဏတထဒဓနပဖဗဘမယရလဝသသ္သဟဠအအာဣဤဥဦဧဩါာိီုူေေါောံ္္ယ္ရ္ဝ္ဟျြွှဿ]/;
//var rex = /([a-zA-Zāīūṇṅñṃṁḷḍṭáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ]+)/gim; //add <span> to click for buttom para
var deleChars = /[\[\]01234567890.,-;\+\"\’\?_]/;

/*
@ Display random message while loading
*/ 
var loader = document.getElementById("loader");

// loader.innerHTML = `
// <div align="center" style="
// 	z-index: 9999;
// 	padding-top: 30px;
// 	padding-bottom: 15px;
// 	position: absolute;
// 	background: orange;
// 	border: 2px solid white;
// 	top: 35%;
// 	left: 3%;
// 	right: 3%;
// 	font-size: x-large;
// 	box-shadow: -8px -2px 8px 8px white, -8px 8px 8px 8px #D9D9D9, 8px 12px 12px 12px white;">
//
// 	<strong style="display: block; margin-bottom: 10px; font-weight: bolder">
// 		"vayadhammā saṅkhārā appamādena sampādethā"
// 	</strong>
//
// 	<i>~  mahāparinibbāna sutta (par.218) ~</i></p>
// 	<hr>
// 	<i style="margin-top: 10px; display: block">Starting...</i>
// </div>`;

var divheight = localStorage.getItem("divheight");


/******** English Dictionary ***********
* English dictionary (to support non-english speakers)
to add:
* ee1 dictionary file: ee1_Eng_Eng_Dictionary_WordNet_3.0.js
***************************************/
//var ee1 = ""; //The dictionary code must be always declared before loading the script
//var hee1 = localStorage.getItem("hee1"); //Check setting: enabled this dictionary or not
//if ((hee1 == 1)) { 
//	dict_in_use++; 
//	$.getScript("dictionary/ee1_Eng_Eng_Dictionary_WordNet_3.0_.js")
//};

/******** Auto including wordbreakdata *********
* THIS DATA FILE IS VERY IMPORTANT (It helps to recognize compound words)
* wordbreakdata dictionary file: pe0_grammar_wordbreakdata_Pali_English_Dictionary_extract_DPR_2018.js
* wordbreakdata dictionary file: wordbreakdata_Pali_Pali_grammar_Dictionary_extract_DPR_2018.js
***************************************/
var wordbreakdata = "";
$.getScript("dictionary/000_wordbreakdata_Pali_Pali_grammar_Dictionary_extract_DPR_2018.js");
$.getScript("dictionary/dpr-breakup.js");
//dprBreakup = '';


// this var declaration has lines by language..
var pc1 = ''; var pc2 = '';
var pd1 = '';
var pe1 = ''; var pe2 = ''; var pe3 = ''; var pe4 = ''; var pe5 = ''; var pe6 = ''; var pe7 = ''; var pe8 = '';
var pg1 = '';
var pi1 = '';
var pm1 = ''; var pm2 = ''; var pm3 = ''; var pm4 = '';
var ps1 = ''; var ps2 = '';
var pv1 = ''; var pv2 = ''; var pv3 = '';
var se1 = '';
var ee1 = '';


var ary_dict = ';'.repeat(20).split(';');
 

var aryAbbr = []; aryTemp = [];
var tmpDictionary = '';

initDictionaries();

function initDictionaries(){

	tmpDictionary = "";

	var DictData = [];  
	var strDictData = localStorage.getItem("DictData"); 
	DictData = JSON.parse(strDictData);  

	ary = [];
	for (j in DictData) { 
		ary.push(DictData[j].order + 'h' + DictData[j].key); 
		aryAbbr[DictData[j].key] = DictData[j].abbr;

	}
	ary.sort();  

	dict_in_use = 0;
	for (var i in ary) {
		var val = ary[i].substring(0, 3);
		var name = ary[i].substring(3);	
			
		v0 = name.substring(1, 4); 
		aryTemp[v0] = '1';		// 1 = ON
	
		//alert(name);
		if ((val != '000') && (val != 'nul')) {
			tmpDictionary += '<span class="dictionary-item">';
			tmpDictionary = tmpDictionary + '<input id="j' + v0 + '" type="checkbox" onclick="TmpDictionarySave(\'' + v0 + '\');" checked></input>'; 
			tmpDictionary = tmpDictionary + '<label for="j' + v0 + '" style="font-size:12pt;">&nbsp;' + aryAbbr[v0] + '&nbsp;</label>&nbsp;&nbsp;';
			tmpDictionary += '</span>';
	
			dict_in_use++;
			ary_dict[dict_in_use] = name;
			
			if ( name == 'hpc1') {$.getScript("dictionary/pc1_Pali_Zh_sc2016_pi2zh-maindata-v1.js"); }
			if ( name == 'hpc2') {$.getScript("dictionary/pc2_Pali_Zh_12_in_1@2018.js"); }
			if ( name == 'hpd1') {$.getScript("dictionary/pd1_Pali_Indo_sc2016_pi2id-maindata-v1.js"); }
			if ( name == 'hpe1') {$.getScript("dictionary/pe1_Pali_English_sc2016_pi2en-maindata-v1.2.js"); }
			if ( name == 'hpe2') {$.getScript("dictionary/pe2_Pali_English_Dictionary_extract_DPR_2018.js"); }
			if ( name == 'hpe3') {$.getScript("dictionary/pe3_Pali_English_Dictionary_by_PaliTextSociety.js"); }
			if ( name == 'hpe4') {$.getScript("dictionary/pe4_Pali_English_Declension_Dict_@DPR_2018.js"); }
			if ( name == 'hpe5') {$.getScript("dictionary/pe5_Pali_Grammar_Dictionary@DPR_2018.js"); }
			if ( name == 'hpe6') {$.getScript("dictionary/pe6_Pali_Proper_Names_G_P_Malalasekera@2018.js"); }
			if ( name == 'hpe7') {$.getScript("dictionary/pe7_Pali_English_Dictionary_extract@Janaka_2020.js"); }
			if ( name == 'hpe8') {$.getScript("dictionary/pe8_uped.js"); }
			if ( name == 'hpg1') {$.getScript("dictionary/pg1_Pali_Germany_sc2016_pi2de-maindata-v1.2.js"); }
			if ( name == 'hpi1') {$.getScript("dictionary/pi1_Pali_India_Dictionary@Janaka_2020.js"); }
			if ( name == 'hpm1') {$.getScript("dictionary/pm1_Pali_Word_Grammar_@2018.js"); }
			if ( name == 'hpm2') {$.getScript("dictionary/pm2_Tipitaka_Pali_Myanmar_@2018.js"); }
			if ( name == 'hpm3') {$.getScript("dictionary/pm3_Pali_Myanmar_Dictionary_@U_Hau_Sein_2018.js"); }
			if ( name == 'hpm4') {$.getScript("dictionary/pm4_Pali_Roots_Dictionary_@2018.js"); }
			if ( name == 'hps1') {$.getScript("dictionary/ps1_Pali_Sinhala_by_Buddhadatta@Janaka_2020.js"); }
			if ( name == 'hps2') {$.getScript("dictionary/ps2_Pali_Sinhala_by_Sumanagala@Janaka_2020.js"); }
			if ( name == 'hpv1') {$.getScript("dictionary/pv1_Pali_Viet_Dictionary_by_ngaiBuuChon_stardict.js"); }
			if ( name == 'hpv2') {$.getScript("dictionary/pv2_Pali_Viet_Abhi-Terms_by_ngaiTinhSu_Stardict.js"); }
			if ( name == 'hpv3') {$.getScript("dictionary/pv3_Pali_Viet_Vinaya-Terms_by_VenGiacNguyenBhikkhu.js"); }
			if ( name == 'hse1') {$.getScript("dictionary/se1_A_Sanskrit_English_Dictionary_Monier_Williams@1899.js"); }
			if ( name == 'hee1') {$.getScript("dictionary/wn-Eng-Eng-Dictionary_WordNet_3.0_.js"); }
			
		} else {
			aryTemp[v0] = '0';
		}
	}
	$('#TmpDictionary').html(tmpDictionary);
}

function cleanSelectedWord(t) {
	t = t.toLowerCase();

	/* Remove @begining: like "Katha... */
	var te = t.substring(0, 1);
	var f = keepChars.test(te); //chars is not included in var keepChars, it will be removed
	if (f) {
		t = t.substring(1, t.length);
		//2 times to remove punctuation.
		var te = t.substring(0, 1);
		var f = keepChars.test(te);
		if (f) {
			t = t.substring(1, t.length);
		}
	}

	/* Remove @ending: like: kiṃ’’? (3 times)*/
	var te = t.substring(0, 1);
	var f = keepChars.test(te); //chars is not included in var keepChars, it will be removed
	if (f) {
		t = t.substring(1, t.length);
		//2 times to remove punctuation.
		var te = t.substring(0, 1);
		var f = keepChars.test(te);
		if (f) {
			t = t.substring(1, t.length);
		}
	}

	for (var i=1; i<=10; i++) {
		var te = t.substring(0, 1);
		var f = deleChars.test(te); //chars is not included in var keepChars, it will be removed
		if (f) {
			t = t.substring(1, t.length);
		}
	}

	t = t.replace(/\(/g, ' ').replace(/\)/g, ' ').replace(/\[/g, ' ').replace(/\]/g, ' ').replace(/\,/g, ' ').replace(/\-/g, ' ').replace(/\./g, ' ').replace(/;/g, ' ').replace(/\+/g, ' ').replace(/\‘/g, ' ').replace(/\’/g, ' ').replace(/\  /g, ' ').replace(/\ \ /g, ' ');

	t = t.trim();

	if (t.length > 512) {
		t = t.substring(0, 512);
	}
	//**************************

	const view_left = localStorage.getItem("view_left");
	if (view_left !== 'Roman' && typeof(P_HTM) !== 'undefined') {
		var id = parseInt(localStorage.getItem('tr_id'));
		var data = P_HTM[id].toLowerCase();

		var reg1 = /\ /g;
		data = data.replace(reg1, '*');
		var reg1 = /\./g;
		data = data.replace(reg1, '*');
		var reg1 = /\;/g;
		data = data.replace(reg1, '*');
		var reg1 = /\-/g;
		data = data.replace(reg1, '*');
		var reg1 = /\‘/g;
		data = data.replace(reg1, '*');
		var reg1 = /\’/g;
		data = data.replace(reg1, '*');
		var ary = data.split('*');

		for (var i in ary) {
			switch (view_left) {
				case 'Myanmar' :
					if (toMyanmar(ary[i]).trim() == t) {
						t = ary[i].trim();
						break;
					}
				case 'Sinhala' :
					if (romanToSinhala(ary[i]).trim() == t) {
						t = ary[i].trim();
						break;
					}
				case 'Thai' :
					if (toThai(ary[i]).trim() == t) {
						t = ary[i].trim();
						break;
					}
				case 'Devanagari' :
					if (toDevar(ary[i]).trim() == t) {
						t = ary[i].trim();
						break;
					}
			}
		}
	}
	return t;
}

function onWordSelected(t) {
	var tdict = t;
	var n = tdict.indexOf(' ');
	if (n != -1) {
		tdict = tdict.substring(0, n);
	}

	for (i=0; i<=5; i++) {
		var n = tdict.length - 1;
		var f = tdict.substr(n, 1);
		if (',.?’[ '.indexOf(f) != -1) {
			tdict = tdict.substr(0, n);
		}
	}

	pos = (t + ' ').indexOf(' ');
	k1 = t.substring(0, pos);
	$("#DictionaryKey").val(tdict);
	document.write = localStorage.se
	localStorage.setItem('DictionaryKey', tdict);
	$("#DeclensionKey").val(tdict);
	document.write = localStorage.setItem('DeclensionKey', tdict);
	//DictionaryGo();

	return t;
}

function selectWord(word) {
	if (word) {
		return onWordSelected(cleanSelectedWord(word));
	} else {
		return word_click2();
	}
}

function word_click(word) {

	if (word) {
		selectWord(word);
	} else {
		const selection = window.getSelection();
		if (selection) {
			selectWord(selection.toString().trim());
		} else {
			word_click2();
		}
	}
}

function word_click2() {
	/*
	References:
	@ https://developer.mozilla.org/en-US/docs/Web/API/Selection
	@ https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify
	@ https://developer.mozilla.org/en-US/docs/Web/API/Selection/isCollapsed
	@ https://stackoverflow.com/questions/7563169/detect-which-word-has-been-clicked-on-within-a-text
	@ http://jsfiddle.net/Vap7C/80/ <--this link was posted on https://stackoverflow.com/ by user stevendaniels (https://stackoverflow.com/users/515674/stevendaniels)
	*/

	var sel_object = window.getSelection(); //it will return an object

	//isCollapsed return boolen whether there is any text currently selected
	if (!(sel_object.isCollapsed)) {
		//make priority to select text multi word first
		t = sel_object.toString().trim(); //get word directly if currently having selection = select many words at once.
	} else {

		var view_left = localStorage.getItem('view_left');
		//move = move cursor //extend = extend selection
		//direction can be: left right backward forward
		//how far: can be character word paragraph line ...
		//https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify
		
        //***************************************************************
        // start of fixing bugs 2020.07.24
        //
        sel_object.modify("extend","forward","word");
        var t_forward = sel_object.toString();

		// Fixing selection on MacOS
		//

		if (navigator.platform.toLowerCase().indexOf('mac') === 0) {
			sel_object.collapseToStart();
		}

        sel_object.modify("extend","backward","word");
        var t_backward = sel_object.toString();

        var t0 = (t_backward + t_forward).trim();

        var ary_tmp = t0.split(' '); 
        t = ary_tmp[ary_tmp.length -1];

        //if (ary_tmp.length != 1) {
        //	console.log(t_backward + '  ' + t_forward);
        //	console.log('*** t ***  ' + t);
        //}	

		// Selection so far:
		//
		// - The user clicks 'samayena', at the position between y and e:
		// - samay|ena
		// - at this point the browser would select [samay]ena
		// - this is because of .modify("extend","backward","word")
		//
		if (view_left == 'Roman') {
	        if (ary_tmp.length == 1) {
	        	// Collapsing to the start of the selection means the selection position would be at the start of the word,
				// in the above example this means:
				// |samayena
				//
				sel_object.collapseToStart();
				for (var i=0; i<t.length; i++) {
					var te = t.substr(i, 1);
					var f = keepChars.test(te); //chars is not included in var keepChars, it will be removed 
					if (f) {
						break;
					} 
					sel_object.modify("extend","forward","character"); 
				}
	        } else {       
	    		for (var i=0; i<(t0.length -1); i++) {
	    			var v1 = t0.substr(i);
	    			sel_object.modify("move","forward","character"); 
	    			if (v1.indexOf(' ') == -1) {
	    				break;
	    			}
	    		}
	   			sel_object.modify("extend","forward","word");  
	        } 
	    } else {   // Myanmar, Sinhala
	    	if (ary_tmp.length == 1) {
				for (var i=0; i<t_forward.length; i++) {
					var te = t_forward.substr(i, 1);
					var f = keepChars.test(te);
					if (f) {
						break;
					} 
					sel_object.modify("extend","forward","character"); 
				}  
				sel_object.modify("move","backward","word"); 
				//
				sel_object.modify("move","backward","character"); 
				sel_object.modify("move","forward","character"); 
				sel_object.modify("extend","forward","word"); 
			} else {
				for (var i=1; i<=(ary_tmp.length -1); i++) {
					sel_object.modify("move","forward","word"); 
					sel_object.modify("extend","forward","word"); 
				}	
			}	
	    }

        // end of fixing bugs
        //***************************************************************
		t = cleanSelectedWord(t);

		sel_object = "";
	}


	t = onWordSelected(t);

	return t; 
}//function word_click
  
/*
SPEECH SYNTHESIS FUNCTION
Note: on Android, tested with Firefox Nightly (Developer version) and Chrome only.
@ Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
*/
function speakSynthesis (sayme) {
	if (localStorage.getItem("speech_repeat") != '0') {
		this.sayme = sayme;

		var synthCall = window.speechSynthesis;
		var speakThis = new SpeechSynthesisUtterance(sayme);

		speakThis.lang ='en-GB';
		speakThis.pitch = 1;
		speakThis.rate = localStorage.getItem("speech_speed"); //speak quickly or slowly
		speakThis.volume = 1;

		synthCall.speak(speakThis);
	}
}//end function speakSynthesis(sayme)
 
/*
@ THESE FUNCTIONs: function toMyanmar(k) function toSinhala(l) function toDevar(l) function toThai(m)
@ TO CONVERT Pali Roman TO pali MYANMAR, SINHALA, DEVAR AND THAI
@ THEY ARE extracted (and slightly modified) FROM a js file in Suttacentral Offline Website (2016)
@ THE JS FILEPATH is: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)].
@ For details, check the credit_license.html
*/

/*
LICENSE.txt  CONTENTS:

SuttaCentral Copyright
======================

<http://suttacentral.net/copyright>

Material on SuttaCentral falls in three distinct categories in relation to
copyright, which are detailed below. If you wish to assert copyright over any
material on SuttaCentral, or wish to discuss copyright on SuttaCentral, please
do not hesitate to contact us.

1. Original material created by SuttaCentral
--------------------------------------------

All original material created by SuttaCentral is dedicated to the Public Domain
as per Creative Commons Zero (CC0 1.0 Universal).

This includes all text, design, software, and images created by SuttaCentral or
persons working for SuttaCentral, on the domain suttacentral.net, or any
domains or subdomains owned or managed by SuttaCentral, unless otherwise
specified.

You are invited to copy, alter, redistribute, present, perform, convey or make
use of any or all of this material in any way you wish. We would appreciate a
notice of attribution, but this is not necessary. Please let us know if you
would like any assistance in making use of our materials.

2. Material created by others and made available for SuttaCentral
-----------------------------------------------------------------

For certain of the material on SuttaCentral the copyright has been asserted by
third parties. This includes most of the translated texts. In such cases the
terms of the copyright are specified by the copyright asserter, who is usually
the translator or original publisher. Such material is used by permission. The
relevant copyright notices as specified by the asserter of copyright are
included with the material.

3. Public domain material
-------------------------

The original texts of Buddhism in Pali, Chinese, Sanskrit, Tibetan, and other
languages, are in the public domain. We believe that copyright assertions
regarding such material have no legal basis. Nevertheless, we endeavor to use
all materials with permission.

In addition, the reference data, including information on parallels, is not an
"original creation" and as such does not fall within the scope of copyright.

*/

//Retrieved from: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)]
// Suttacentral's toMyanmar have 2 bugs :
// 	1. whene there are 2 vowels connected togeter.
//  2. where the ṃ is in the words(not at ending). 
// modified at 20180521
function toMyanmar(k) { k = k.toLowerCase() + " "; var m = { a: "အ", i: "ဣ", u: "ဥ", "ā": "အာ", "ī": "ဤ", "ū": "ဦ", e: "ဧ", o: "ဩ" }; var l = { i: "ိ", "ī": "ီ", u: "ု", "ū": "ူ", e: "ေ", "ṃ": "ံ", k: "က", kh: "ခ", g: "ဂ", gh: "ဃ", "ṅ": "င", c: "စ", ch: "ဆ", j: "ဇ", jh: "ဈ", "ñ": "ဉ", "ṭ": "ဋ", "ṭh": "ဌ", "ḍ": "ဍ", "ḍh": "ဎ", "ṇ": "ဏ", t: "တ", th: "ထ", d: "ဒ", dh: "ဓ", n: "န", p: "ပ", ph: "ဖ", b: "ဗ", bh: "ဘ", m: "မ", y: "ယ", r: "ရ", l: "လ", "ḷ": "ဠ", v: "ဝ", s: "သ", h: "ဟ" }; var a = { k: "က", g: "ဂ", "ṅ": "င", c: "စ", j: "ဇ", "ñ": "ဉ", "ṭ": "ဋ", "ḍ": "ဍ", "ṇ": "ဏ", t: "တ", d: "ဒ", n: "န", p: "ပ", b: "ဗ", m: "မ", y: "ယ", r: "ရ", l: "လ", "ḷ": "ဠ", v: "ဝ", s: "သ", h: "ဟ" }; var n = { kh: "1", g: "1", d: "1", dh: "1", p: "1", v: "1" }; var j, f, e, d, c; var b = ""; var g = 0; k = k.replace(/\&quot;/g, "`"); var h = false; while (g < k.length) { j = k.charAt(g - 2); f = k.charAt(g - 1); e = k.charAt(g); d = k.charAt(g + 1); c = k.charAt(g + 2); if ((f == "ṃ") || (m[f] != undefined)) { h='';f='';j=''; } if (m[e]) { if ((g == 0 || f == "a") || (m[e] != undefined && f == "")) { b += m[e] } else { if (e == "ā") { if (n[h]) { b += "ါ" } else { b += "ာ" } } else { if (e == "o") { if (n[h]) { b += "ေါ" } else { b += "ော" } } else { if (e != "a") { b += l[e] } } } } g++; h = false } else { if (l[e + d] && d == "h") { b += l[e + d]; if (c != "y" && !h) { h = e + d } if (a[c]) { b += "္" } g += 2 } else { if (l[e] && e != "a") { b += l[e]; g++; if (d != "y" && !h) { h = e } if (a[d] && e != "ṃ") { b += "္" } } else { if (!l[e]) { b += e; g++; if (m[d]) { if (m[d + c]) { b += m[d + c]; g += 2 } else { b += m[d]; g++ } } h = false } else { h = false; g++ } } } } } b = b.replace(/ဉ္ဉ/g, "ည"); b = b.replace(/္ယ/g, "ျ"); b = b.replace(/္ရ/g, "ြ"); b = b.replace(/္ဝ/g, "ွ"); b = b.replace(/္ဟ/g, "ှ"); b = b.replace(/သ္သ/g, "ဿ"); b = b.replace(/င္/g, "င်္"); return b.slice(0, -1) }
 
//Retrieved from: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)]
function toDevar(l) { l = l.toLowerCase() + " "; var m = { a: " अ", i: " इ", u: " उ", "ā": " आ", "ī": " ई", "ū": " ऊ", e: " ए", o: " ओ" }; var n = { "ā": "ा", i: "ि", "ī": "ी", u: "ु", "ū": "ू", e: "े", o: "ो", "ṃ": "ं", k: "क", kh: "ख", g: "ग", gh: "घ", "ṅ": "ङ", c: "च", ch: "छ", j: "ज", jh: "झ", "ñ": "ञ", "ṭ": "ट", "ṭh": "ठ", "ḍ": "ड", "ḍh": "ढ", "ṇ": "ण", t: "त", th: "थ", d: "द", dh: "ध", n: "न", p: "प", ph: "फ", b: "ब", bh: "भ", m: "म", y: "य", r: "र", l: "ल", "ḷ": "ळ", v: "व", s: "स", h: "ह" }; var k, h, g, f, e, d, b; var c = ""; var a = 0; var j = 0; l = l.replace(/\&quot;/g, "`"); while (j < l.length) { k = l.charAt(j - 2); h = l.charAt(j - 1); g = l.charAt(j); f = l.charAt(j + 1); e = l.charAt(j + 2); d = l.charAt(j + 3); b = l.charAt(j + 4); if (j == 0 && m[g]) { c += m[g]; j += 1 } else { if (f == "h" && n[g + f]) { c += n[g + f]; if (e && !m[e] && f != "ṃ") { c += "्" } j += 2 } else { if (n[g]) { c += n[g]; if (f && !m[f] && !m[g] && g != "ṃ") { c += "्" } j++ } else { if (g != "a") { if (a[h] || (h == "h" && a[k])) { c += "्" } c += g; j++; if (m[f]) { c += m[f]; j++ } } else { j++ } } } } } if (a[g]) { c += "्" } c = c.replace(/\`+/g, '"'); pdevar = c.slice(0, -1); return c.slice(0, -1) }

//Retrieved from: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)]
// modify errers @ 20180516
function toThai(m) { m = m.toLowerCase() + " "; var n = { a: "1", "ā": "1", i: "1", "ī": "1", "iṃ": "1", u: "1", "ū": "1", e: "2", o: "2" }; var j = { a: "อ", "ā": "า", i: "ิ", "ī": "ี", "iṃ": "ึ", u: "ุ", "ū": "ู", e: "เ", o: "โ", "ṃ": "ํ", k: "ก", kh: "ข", g: "ค", gh: "ฆ", "ṅ": "ง", c: "จ", ch: "ฉ", j: "ช", jh: "ฌ", "ñ": "ญ", "ṭ": "ฏ", "ṭh": "ฐ", "ḍ": "ฑ", "ḍh": "ฒ", "ṇ": "ณ", t: "ต", th: "ถ", d: "ท", dh: "ธ", n: "น", p: "ป", ph: "ผ", b: "พ", bh: "ภ", m: "ม", y: "ย", r: "ร", l: "ล", "ḷ": "ฬ", v: "ว", s: "ส", h: "ห" }; var a = { k: "1", g: "1", "ṅ": "1", c: "1", j: "1", "ñ": "1", "ṭ": "1", "ḍ": "1", "ṇ": "1", t: "1", d: "1", n: "1", p: "1", b: "1", m: "1", y: "1", r: "1", l: "1", "ḷ": "1", v: "1", s: "1", h: "1" }; var l, h, g, f, e, d, b; var c = ""; var k = 0; m = m.replace(/\&quot;/g, "`"); while (k < m.length) { l = m.charAt(k - 2); h = m.charAt(k - 1); g = m.charAt(k); f = m.charAt(k + 1); e = m.charAt(k + 2); d = m.charAt(k + 3); b = m.charAt(k + 4); if (n[g]) { if (g == "o" || g == "e") { c += j[g] + j.a; k++ } else { if (k == 0) { c += j.a } if (g == "i" && f == "ṃ") { c += j[g + f]; k++ } else { if (g != "a") { c += j[g] } } k++ } } else { if (j[g + f] && f == "h") { if (e == "o" || e == "e") { c += j[e]; k++ } c += j[g + f]; if (a[e]) { c += "ฺ" } k = k + 2 } else { if (j[g] && g != "a") { if (f == "o" || f == "e") { c += j[f]; k++ } c += j[g]; if (a[f] && g != "ṃ") { c += "ฺ" } k++ } else { if (!j[g]) { c += g; if (a[h] || (h == "h" && a[l])) { c += "ฺ" } k++; if (f == "o" || f == "e") { c += j[f]; k++ } if (n[f]) { c += j.a } } else { k++ } } } } } if (a[g]) { c += "ฺ" } c = c.replace(/\`+/g, '"'); pthai = c.slice(0, -1); return c.slice(0, -1); };
  
//$(document).ready(function () = when DOM & all images are rendered. So it seems better than $(window).on('load',function ()
const hideLoader = () => {
	$('.loader-content').addClass('fade-out');
	setTimeout(() => {
		$('body').removeClass('loading');
		$('#welcome').css('opacity', 1);
		$('.loader').remove();
		goConfirmGoToLatest();
	}, 2500);
}
