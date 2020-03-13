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
var keepChars = /[^a-zA-Zāīūṇṅñṃṁḷḍṭáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđंअआइईउऊएओकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवसहािीुूेो्ංඅආඉඊඋඌඑඔකඛගඝඞඟචඡජඣඤඤ්ජඥඦටඨඩඪණණ්ඩඬතථදධනන්දඳපඵබභමම්බඹයරලවසහළ්්රාිීුූෙොกขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลวสหฬอาิีึฺุูเโํကခဂဃငင္င်္စဆဇဈဉဉ္ဉညဋဌဍဎဏတထဒဓနပဖဗဘမယရလဝသသ္သဟဠအအာဣဤဥဦဧဩါာိီုူေေါောံ္္ယ္ရ္ဝ္ဟျြွှဿ]/;
//var rex = /([a-zA-Zāīūṇṅñṃṁḷḍṭáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ]+)/gim; //add <span> to click for buttom para
var deleChars = /[\[\]01234567890.,-;\"\’\?_]/;

/*
@ Display random message while loading
*/
var checkloadeddata = "";
var loader = document.getElementById("loader");

loader.innerHTML = '<div align="center" style="z-index:9999;position:fixed;background:orange;border:2px solid white;top:35%;left:3%;right:3%;font-size:x-large;box-shadow:  -8px -2px 8px 8px white, -8px 8px 8px 8px #D9D9D9, 8px 12px 12px 12px white;"">' + '<strong><p>"vayadhammā saṅkhārā appamādena sampādethā"</strong><br> <i>~  mahāparinibbāna sutta (par.218) ~</i></p>' + '<hr><i>Starting...</i></div>';

var divheight = localStorage.getItem("divheight");

/*
@ DICTIONARY VARIABLES AND PERFORM LOADING
*/

/******** English Dictionary ***********
* English dictionary (to support non-english speakers)
to add:
* ee1 dictionary file: ee1_Eng_Eng_Dictionary_WordNet_3.0.js
***************************************/
var ee1 = ""; //The dictionary code must be always declared before loading the script
//var path = window.location.pathname();
var hee1 = localStorage.getItem("hee1"); //Check setting: enabled this dictionary or not
if ((hee1 == 1)) { 
	dict_in_use++; 
	$.getScript("dictionary/ee1_Eng_Eng_Dictionary_WordNet_3.0_.js")
};

var wordbreakdata = "";

/******** Auto including wordbreakdata *********
* THIS DATA FILE IS VERY IMPORTANT (It helps to recognize compound words)
* wordbreakdata dictionary file: pe0_grammar_wordbreakdata_Pali_English_Dictionary_extract_DPR_2018.js
* wordbreakdata dictionary file: wordbreakdata_Pali_Pali_grammar_Dictionary_extract_DPR_2018.js
***************************************/
$.getScript("dictionary/000_wordbreakdata_Pali_Pali_grammar_Dictionary_extract_DPR_2018.js");

var pc1 = ''; var pc2 = '';
var pd1 = '';
var pe1 = ''; var pe2 = ''; var pe3 = ''; var pe4 = ''; var pe5 = ''; var pe6 = '';
var pg1 = '';
var pm1 = ''; var pm2 = ''; var pm3 = ''; var pm4 = '';
var pv1 = ''; var pv2 = ''; var pv3 = '';
var se1 = '';

var ary_dict = '                '.split(' ');

var val =
  localStorage.getItem('hpc1') + 'hpc1' + '@' + 
  localStorage.getItem('hpc2') + 'hpc2' + '@' +
  localStorage.getItem('hpd1') + 'hpd1' + '@' +
  localStorage.getItem('hpe1') + 'hpe1' + '@' + 
  localStorage.getItem('hpe2') + 'hpe2' + '@' +
  localStorage.getItem('hpe3') + 'hpe3' + '@' + 
  localStorage.getItem('hpe4') + 'hpe4' + '@' +
  localStorage.getItem('hpe6') + 'hpe6' + '@' +
  localStorage.getItem('hpg1') + 'hpg1' + '@' +
  localStorage.getItem('hpm1') + 'hpm1' + '@' + 
  localStorage.getItem('hpm2') + 'hpm2' + '@' +
  localStorage.getItem('hpm3') + 'hpm3' + '@' + 
  localStorage.getItem('hpm4') + 'hpm4' + '@' +
  localStorage.getItem('hpv1') + 'hpv1' + '@' + 
  localStorage.getItem('hpv2') + 'hpv2' + '@' +
  localStorage.getItem('hpv3') + 'hpv3' + '@' +
  localStorage.getItem('hse1') + 'hse1';
var ary = val.split('@');

ary.sort();

var aryAbbr = []; aryTemp = [];
var tmpDictionary = '';
dict_in_use = 0;
for (var i in ary) {
	var val = ary[i].substring(0, 3);
	var name = ary[i].substring(3);

	v1 = localStorage.getItem(name);
	if (!v1) {
		document.write = localStorage.setItem(name, '000'); 	
		val = '000';
	}

	v0 = name.substring(1, 4);
	v1 = localStorage.getItem('i' + v0);
	if (!v1) {
		v1 = v0;
		document.write = localStorage.setItem('i' + v0, v1); 	
	}
	aryAbbr[v0] = v1;		// v0=pc1,pc2.. v1=Abbr. Name
	aryTemp[v0] = '1';		// 1 = ON

	//alert(name);
	if ((val != '000') && (val != 'nul')) {
		tmpDictionary = tmpDictionary + '<input id="j' + v0 + '" type="checkbox" onclick="TmpDictionarySave(\'' + v0 + '\');" checked></input>'; 
		tmpDictionary = tmpDictionary + '<label for="j' + v0 + '" style="font-size:12pt;">&nbsp;' + aryAbbr[v0] + '&nbsp;</label>&nbsp;&nbsp;';

		dict_in_use++;
		ary_dict[dict_in_use] = name;
		if ( name == 'hpc1') {$.getScript("dictionary/pc1_Pali_Zh_sc2016_pi2zh-maindata-v1.js"); }
		if ( name == 'hpc2') {$.getScript("dictionary/pc2_Pali_Zh_12_in_1@2018.js"); }
		if ( name == 'hpd1') {$.getScript("dictionary/pd1_Pali_Indo_sc2016_pi2id-maindata-v1.js"); }
		if ( name == 'hpe1') {$.getScript("dictionary/pe1_Pali_English_sc2016_pi2en-maindata-v1.2.js"); }
		if ( name == 'hpe2') {$.getScript("dictionary/pe2_Pali_English_Dictionary_extract_DPR_2018.js"); }
		if ( name == 'hpe3') {$.getScript("dictionary/pe3_Pali_English_Dictionary_by_PaliTextSociety.js"); }
		if ( name == 'hpe4') {$.getScript("dictionary/pe4_Pali_English_Declension_Dict_@DPR_2018.js"); }
		if ( name == 'hpe6') {$.getScript("dictionary/pe6_Pali_Proper_Names_G_P_Malalasekera@2018.js"); }
		if ( name == 'hpg1') {$.getScript("dictionary/pg1_Pali_Germany_sc2016_pi2de-maindata-v1.2.js"); }
		if ( name == 'hpm1') {$.getScript("dictionary/pm1_Pali_Word_Grammar_@2018.js"); }
		if ( name == 'hpm2') {$.getScript("dictionary/pm2_Tipitaka_Pali_Myanmar_@2018.js"); }
		if ( name == 'hpm3') {$.getScript("dictionary/pm3_Pali_Myanmar_Dictionary_@U_Hau_Sein_2018.js"); }
		if ( name == 'hpm4') {$.getScript("dictionary/pm4_Pali_Roots_Dictionary_@2018.js"); }
		if ( name == 'hpv1') {$.getScript("dictionary/pv1_Pali_Viet_Dictionary_by_ngaiBuuChon_stardict.js"); }
		if ( name == 'hpv2') {$.getScript("dictionary/pv2_Pali_Viet_Abhi-Terms_by_ngaiTinhSu_Stardict.js"); }
		if ( name == 'hpv3') {$.getScript("dictionary/pv3_Pali_Viet_Vinaya-Terms_by_VenGiacNguyenBhikkhu.js"); }
		if ( name == 'hse1') {$.getScript("dictionary/se1_A_Sanskrit_English_Dictionary_Monier_Williams@1899.js"); }
	} else {
		aryTemp[v0] = '0';
	}
}
document.getElementById('TmpDictionary').innerHTML = tmpDictionary;

if (dict_in_use == 0) {		//pe4
	dict_in_use = 1;
	$.getScript("dictionary/pe4_Pali_English_Declension_Dict_@DPR_2018.js");
	ary_dict[dict_in_use] = 'hpe4';
	document.write = localStorage.setItem('hpe4', '010'); 
}


if ((hee1 == 1)) { 
	ary_dict[0] = 'hee1';
}	// English - English Dictionary

$.getScript("dictionary/pe5_Pali_Grammar_Dict_@DPR_2018.js");


var voca_lowercase = "";
var t = '';
var writeme = "";
var writemefinal = "";

var para_text = "";
var para_text_click = "";
var scroll_up = "";
var totalword_parag;
var found_count = 0;
var known_totalword_parag = 0;
var pclicktime = "";
var singlewordclicktime = "";
var knownwp_nolink = '';
var knownwp = '';

var dualtext = '   Dual-[yes]';
var dualclick = 1;


/*
@ Fuzzy Mode: Try fuzzy-in-word search or not
@ It is not reliable yet. Sometimes it splits word wrongly
@ Can switch enable/disable anytime onclick
*/

var fuzzySearchinword; //value depending on user setting from the index files
var getsettingfuzzy = localStorage.getItem("enablefuzzyinword");
if (!(getsettingfuzzy)) { 
	fuzzySearchinword = 0; 
} else { 
	fuzzySearchinword = getsettingfuzzy; 
}


function word_click() {
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
		//move = move cursor //extend = extend selection
		//direction can be: left right backward forward
		//how far: can be character word paragraph line ...
		//https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify

		sel_object.modify("move","forward","character");
		//alert(sel_object.toString().trim());
		sel_object.modify("extend","backward","word");
		sel_object.modify("move","backward","character");
		sel_object.modify("extend","forward","word");
		//sel_object.modify("move","forward","character");
		//sel_object.modify("extend","backward","character");

		t = sel_object.toString().trim();

		if (view_left != 'Roman') {
			var id = parseInt(localStorage.getItem('tr_id'));
			var data = P_HTM[id];

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
						if (toSinhala(ary[i]).trim() == t) {
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

		sel_object = "";
	}

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

	t = t.replace(/\,/g, ' ').replace(/\-/g, ' ').replace(/\./g, ' ').replace(/\;/g, ' ').replace(/\‘/g, ' ').replace(/\’/g, ' ').replace(/\  /g, ' ').replace(/\ \ /g, ' ');

	t = t.trim(); 
	//console.log('--'+ t + '--'+t.length);

	if (t.length > 512) { 
		t = t.substring(0, 512);
	}

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

	//
	pos = (t + ' ').indexOf(' ');
	k1 = t.substring(0, pos);

	val = localStorage.getItem('dicthistory');
	if ((val != null) && (val != undefined) && (2 < val.length)) { 
		var ary = val.split('@');
		flag = '0';
		for (var i in ary) {
			if ((ary[i] != 'null') && (ary[i] != '')) {
				if (ary[i].indexOf('#' + k1 + '$') != -1) {
					k1 = parseInt(ary[i].substring(0, 3)) +1;
					ary[i] = ('00' + k1).slice(-3) + ary[i].substring(3);
					flag = '1';
					break;
				}
			}
		}
		if (flag == '0') {
			ary[i+1] = '@001#' + k1 + '$';; 
		}
		ary.sort().reverse();

		val = '';
		for (var i in ary) {
			val = val + '@' + ary[i];
		}
	} else {
		val = '@001#' + t + '$';
	}	
	document.write = localStorage.setItem('dicthistory', val); 

	//
	document.getElementById("DictionaryKey").value = tdict;
	document.write = localStorage.setItem('DictionaryKey', tdict); 
	document.getElementById("DeclensionKey").value = tdict;
	document.write = localStorage.setItem('DeclensionKey', tdict); 
	//console.log(t);
	return t; 
}//function word_click

//function closepopup to close the top poup in dual mode
function closepopup() {
	$("popupfix").html('');
	window.location.assign("#" + singlewordclicktime);//return to the last word entry
}

var para_text2 = "";
/*
@ DICTIONARY MODE (SHOW MEANINGS FOR WHOLE PARAGRAPH | SINGLE WORD)
@ Default Dictionary mode is listing paragraph
*/


//$(window).on('load', function () {  
// move to function0_main.js 
//}); //Onload

var all_better_meaning = "";
var all_guess_meaning = "";
var final_display_meaning = "";
var better_meaning_grammar = "";

var voca_lowercase = t.toLowerCase();

var cee1; var m_ee1 = ""; var m_ee1s = "";

found_count = 0;
	/*
	@ Function breakParagraph2Word to break paragraph text in to word by word
	*/
	function breakParagraph2Word(breakintoword) {
		var para_text = breakintoword;

		var regex_r = new RegExp("[^a-zA-Zāīūṇṅñṃṁḷḍṭáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ]", "gi"); //VIET TOTAL 67 SPECIAL CHARS áàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ
		var para_text_wordarr = para_text.split(regex_r);
		totalword_parag = 0;
		for (var i = 0; i < para_text_wordarr.length; i++) {
			var word1 = para_text_wordarr[i];
			if (word1.length > 0) {
				var p_word = para_text_wordarr[i];
				var p_words = p_word.toLowerCase();
				if ((p_words != 'pg') &&  (p_words != 'pts')) {
					totalword_parag += 1;
					lookupCoordinator(p_words, 0);
				}
			}
		} //for loop
	} //function breakParagraph2Word

/*
@ Function lookupDict to search each dictionary STARTS
@ lookupDict (dictarr,voca,guess_meaning,better_meaning,dictname);
@ For example: lookupEachDict(pv1,t,"m_pv1","u_pv1","PV1","specialoption");
@ specialoption: optional. Use this parameter to tell the app to apply a custom fon/function etc  to display your dictionary.
*/

function lookupEachDict(dictarr, voca, guess_meaning, better_meaning, dictname, specialoption) {
	this.dictarr = dictarr;
	this.voca = voca;
	this.guess_meaning = guess_meaning;
	this.better_meaning = better_meaning;
	this.dictname = dictname;
	this.specialoption = specialoption; //optional to apply custom font like ZawgyiFont/or spercific function; default = apply DejavuSansCondensed

	//Refresh meanings
	guess_meaning = "";
	better_meaning = "";
	better_meaning_grammar = "";

	// DICTIONARY HAS THIS WORD; EXACTLY FOUND  MEANINGS
	//@ Try 1
	var meaning_from_dict = "" + dictarr[voca];
	if (meaning_from_dict != "undefined") {
		better_meaning = "<br><font color='#004400'><strong style='font-size:110%'>" + aryAbbr[dictname] + ": </strong></font>" + "<font color='#004400'>" + meaning_from_dict + "</font><span>";
		found_count++;
		guess_meaning = "";
	}
	//EXACTLY FOUND MEANINGS FINISHED

	//TRY TO GUESS MEANINGS/OR USE GRAMMAR BASE WORD BANK  IF NO EXACTLY FOUND
	if ((meaning_from_dict == "undefined") && (cee1 == "undefined")) {
		//var tinword = "<font color='grey'>[fuzzy-notSure] </font><font color='brown'><strong>" + voca + ": </strong></font> ?~ ";
		var tinword = "<font color='grey'>[fuzzy] </font><font color='brown'><strong>" + voca + ": </strong></font> ?~ ";
		var wo = voca;
		var wlen = voca.length;
		var isFoundInDictionary = "";
		var wr = "";
		var new_voca_by_wordbreakdata = "";
		var w_a = "";

		var dsd_deep = "";
		var wbreak = "";
		var dsd_deep_a = "";
		var wbreak_a = "";
		var wbreak_grammar = "";

		var wnow = "";

		/*
		@ Try 2
		@ Now using breakbank to search for the current dictionary
		@ If false = dsd_deep_a.length < 1 then try other methods.
		@
		*/

		var foundsthing ="";
		new_voca_by_wordbreakdata = "" + wordbreakdata[wo];
		if (!(new_voca_by_wordbreakdata == "undefined")) {
			//try to search with new voca
			new_voca_by_wordbreakdata = new_voca_by_wordbreakdata.trim() + "@_@";
			var ary = new_voca_by_wordbreakdata.split("@_@");
			for (i in ary) {
				if (ary[i] != "" ) {
					isFoundInDictionary = "" + dictarr[ary[i]];
					if (!(isFoundInDictionary == "undefined")) {
					foundsthing = 1;

					if (i==0){
						wbreak_grammar = "<font color='grey'>: [d] </font><font color='brown'><strong>" + wo + "</strong></font> => <font color='blue'><strong>" + ary[i] + "</strong></font>";
						better_meaning_grammar += "<br><font color='green'><strong style='font-size:110%'>" + aryAbbr[dictname] + wbreak_grammar + ": </strong></font>" + "<font color='green'>" + dictarr[ary[i]] + "</font>";
					} else {
						wbreak_grammar = "<font color='grey'>"+"<span style='visibility:hidden;'>"+aryAbbr[dictname]+":</span>"+" [d] </font><font color='brown'><strong>" + wo + "</strong></font>"+"<font color='grey'><sup>("+ (Number(i)+1) +")</sup></font>"+" => <font color='blue'><strong>" + ary[i] + "</strong></font>";
						better_meaning_grammar += "<br><font color='green'><strong style='font-size:110%'>" + wbreak_grammar + ": </strong></font>" + "<font color='green'>" + dictarr[ary[i]] + "</font>";

						}

					} //Break bank has meanings
				}
			}

		if (foundsthing==1) {found_count++;foundsthing="";}

		}
		/*
		@ FUZZY IN WORD SEARCH / WORD-BREAK FUNCTION/ OTHER GUESSING methods
		@ THERE ARE A LOT OF THINGS TO DO FOR THIS
		*/
		if (better_meaning_grammar.length < 1) {
			//@ Try 3
			//  look up pali ending with =a, so check whole word but ending with a

			if (wlen > 1) {
			w_a = wo.substring(0, (wlen - 1)) + "a";

			isFoundInDictionary = "" + dictarr[w_a];

			if (!(isFoundInDictionary == "undefined")) {
				wbreak_a += "<font color='grey'><strong>[a] </strong></font><font color='brown'><strong>" + wo + "</strong></font> = <font color='blue'><strong>" + w_a + "</strong></font><br>";

				dsd_deep_a = "<i><font color='brown'><strong>" + w_a + "</strong></font></i><font color='blue'> " + ": " + dictarr[w_a] + "</font>" + "<br>";
				tinword = "<strong> --> <u>Try in word</u> </strong>";
				found_count++;
			}
		} //end if wlen >1 so can add a
		// ENDING returns no result then try fuzzy search
		/*
		@ FUZZY WORD-BREAK
		*/
		//if ((dsd_deep_a.length < 1) && (fuzzySearchinword == 1)) {
		if (dsd_deep_a.length < 1) {
			var gotsomething;
			var gotsomething_wbank;

			for (var r = 0; r < wlen; r++) {
				if (r == 0) {
					wr = wo.substring(0, wlen);
				} else {
					wr = wo.substring(0, wlen - r);
				}
				var w1 = wr.length;

				//FUZZY ORDER:  > wordbreakdata > itself a again

				//current word = wr, len of word = w1

				//khandhavaggo = (check) khandha+ { (check)vaggo if failed => (check)vagga}
				gotsomething = 0;
				gotsomething_wbank = 0;
				/*
				@ Try 4(1st try in fuzzy) - wordbreakdata
				*/

				new_voca_by_wordbreakdata = "" + wordbreakdata[wr];
				if (!(new_voca_by_wordbreakdata == "undefined")) {
					new_voca_by_wordbreakdata = new_voca_by_wordbreakdata.trim() + "@_@";

					var ary = new_voca_by_wordbreakdata.split("@_@");
					for (i in ary) {
						if (ary[i] != "" ) {

						var isFuzzyCurrentDictFound = "" + dictarr[ary[i]];
						//w1>2 to remove the short word case like long a etc

						if ((!(isFuzzyCurrentDictFound == "undefined")) && (w1 > 2)) {
							if(i==0){
								dsd_deep += "<i><font color='brown'><strong>" + wr + "</strong></font></i>" + " --> " + "<font color='orange'><i><strong>" + ary[i] + "</strong></i></font></i>" + ": " + dictarr[ary[i]] + "<br>";

								wbreak = wbreak + "<font color='grey'><strong>" + wr + "</strong></font>" + "/<i>" + ary[i] + "</i>/" + " - ";
							} else {
								dsd_deep += "<i><font color='brown'><strong>" + wr + "<font color='blue'><sup>("+ (Number(i)+1) +")</sup></font>" + "</strong></font></i>" + " --> " + "<font color='orange'><i><strong>" + ary[i] + "</strong></i></font></i>" + ": " + dictarr[ary[i]] + "<br>";

								wbreak = wbreak + "<font color='grey'><strong>" + wr + "<font color='blue'><sup><sup>("+ (Number(i)+1) +")</sup></sup></font>" + "</strong></font>" + "/<i>" + ary[i] + "</i>/" + " - ";

								}

							gotsomething = 1;

						}//have meaning
					}//word not empty
				}//for
			}//have in breakdata
			/*
			@ Try 5(2nd try in fuzzy) - dictionary itself
			*/

			var isFuzzyCurrentDictFound = "" + dictarr[wr];
			if ((!(isFuzzyCurrentDictFound == "undefined")) && (w1 > 2)) {
				wbreak = wbreak + "<font color='grey'><strong>" + wr + "</strong></font>" + " - ";
				gotsomething = 1;
			}
			/*
			@ Try 6 (3rd try in fuzzy) - Ending with a again
			@ Future to do: //var isU = wo.charAt(wlen-1); check u/i etc...
			*/
			wr_a = wo.substring(0, (wlen - 1)) + "a";
			var isFoundInDictionary = "" + dictarr[wr_a];

			if ((!(isFoundInDictionary == "undefined")) && (w1 > 2)) {
				//Try again with a
				dsd_deep += "<i><font color='brown'><strong>" + wr_a + "</strong></font></i>" + ": " + dictarr[wr_a] + "<br>";
				wbreak = wbreak + "<font color='grey'><strong>" + wr_a + "</strong></font>" + " - ";

				gotsomething = 1;
			}

			if (gotsomething == 1) {
				wnow = wo.substring(wr.length, wo.length);
				wo = wnow;
				wlen = wnow.length;
				r = -1;
			}

			if (w1 == 1) {
				wnow = wo.substring(1, wo.length);
				wlen = wnow.length;
				wo = wnow;
				r = -1;
			}

		} //end for loop DEEP PALI SEARCH
	} //End ENDING returns no result then try fuzzy search
} //End in case new_voca_by_wordbreakdata false try other methods

	if (dsd_deep.length > 0) {
		wbreak = wbreak.substring(0, (wbreak.length) - 2); //remove last -space

		dsd_deep = dsd_deep.substring(0, (dsd_deep.length) - 4); //remove last <br>
		guess_meaning = "<br><font color='green'><b style='font-size:110%'>" + aryAbbr[dictname] + ": </b></font>" + wbreak_a + dsd_deep_a + tinword + "<font color='black'>" + wbreak + "</font>" + "<br>" + "<font color='black'>" + dsd_deep + "</font>";
	} else if (dsd_deep_a.length > 0) {
		better_meaning = "<br><font color='green'><b style='font-size:110%'>" + aryAbbr[dictname] + ": </b></font>" + wbreak_a + dsd_deep_a;
		} else {
			guess_meaning = "";
		}
	}	// END TRY TO GUESS MEANINGS IF NO EXACTLY FOUND

	//APPLY SPECIAL CUSTOM FONT FOR A SPECIFIC DICTIONARY
	// Style for class ZawgyiFont (or your custom special font) can be declared in the projector_style.css
	//Can also use custom function for your dictionary, or can use a function for dictionary

	if (specialoption == 'ZawgyiFont') {
		if (better_meaning.length > 0) {
			better_meaning = '<span class="ZawgyiFont">' + better_meaning + '</span>';  //use custom font
			//better_meaning = encodingConverter_example(better_meaning);//use function to unicode
		}
		if (better_meaning_grammar.length > 0) {
			better_meaning_grammar = '<span class="ZawgyiFont">' + better_meaning_grammar + '</span>';
			//better_meaning_grammar = encodingConverter_example(better_meaning_grammar);
		}
		if (guess_meaning.length > 0) {
			guess_meaning = '<span class="ZawgyiFont">' + guess_meaning + '</span>';
			//guess_meaning = encodingConverter_example(guess_meaning);
		}
			specialoption = "";//unset special custom option after use for a particular dictionary. Otherwise, all following definitions shall be affected
	}

	all_better_meaning = all_better_meaning + better_meaning + better_meaning_grammar;
	all_guess_meaning = all_guess_meaning + guess_meaning;

}//Function lookupDict ENDs

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

		//options for volume etc...
		speakThis.lang ='en-GB';
		speakThis.pitch = 1;
		speakThis.rate = localStorage.getItem("speech_speed"); //speak quickly or slowly
		speakThis.volume = 1;

		synthCall.speak(speakThis);
	}
}//end function speakSynthesis(sayme)

/*
@ Function lookupCoordinator
*/
function lookupCoordinator(texttolook, dual) {

	m_ee = ""; //refresh En meanings
	final_display_meaning = ""; //Refresh new definitions each click time
	all_better_meaning = "";
	all_guess_meaning = "";
	found_count = 0;
	var dualmode = dual;

	t = texttolook;

	var word = t;
	var totalword = 0;
	var o_r = 0;
	var knownw = 0;
	var voca_lowercase = t.toLowerCase();

	var wordb = voca_lowercase;
	var letspeak = 0;

	//WN helps to recognise English words, stop word breaking when it is an English word.
	cee1 = "" + ee1[voca_lowercase];
	alert
	if (hee1 == 1) {
		if (cee1 != "undefined") {

		//allow speak synthesis
		letspeak = 1;

		m_ee1 = "<br><font color='green'><b style='font-size:110%'>💯WN: </b></font>" + cee1+"<br>";

		found_count++;
	}
	if (cee1 == "undefined") {
		var ends = voca_lowercase.charAt(voca_lowercase.length-1);
		if (ends =="s") {
			var newen =  voca_lowercase.substring(0,voca_lowercase.length-1);
			var cee1s = "" + ee1[newen];
			if (cee1s != "undefined") {
				//allow speak synthesis
				letspeak = 1;

				m_ee1s = "<br><font color='green'><b style='font-size:110%'>WN: </b></font>"+newen+"(s)"+"<i> => </i><font color='brown'><strong>" + newen + "</strong></font>"+ cee1s+"<br>";
				m_ee1 = m_ee1s;
			}
		} else {
			m_ee1 = ""; 
		}
	}

}

	//CHANGE THE ORDER OF DISPLAY: BETTER MEANING>THIS ORDER>GUESS MEANING
	//You can change the display name here also, for examle PE1 to whatever you name it.
	// Call look up function for your dictionary here

	//if (hpm2 == 1) { lookupEachDict(pm2, voca_lowercase, "m_pm2", "u_pm2", "PM2", "ZawgyiFont"); }
	/*
	@ The last parameter "ZawgyiFont" is used to tell the app to apply special custom font for this specific dictionary
	@ It will add a class to the definitions of this dictionary. So custom styles can be applied for it.
	@ To use this: find line: APPLY SPECIAL CUSTOM FONT FOR A SPECIFIC DICTIONARY and add your codes
	@ And also need to declare your class's style for the custom class in the projector_style.css
	*/
	//if (hpe1 == 1) { lookupEachDict(pe1, voca_lowercase, "m_pe1", "u_pe1", "PE1"); }
	//if (hpm1 == 1) { lookupEachDict(pm1, voca_lowercase, "m_pm1", "u_pm1", "PM1", "ZawgyiFont"); }

	for (var i = 1; i<ary_dict.length; i++) {
		var d_name = ary_dict[i].substring(1);
		if ((ary_dict[i] == 'hpc1') && (aryTemp[d_name] == '1')) {lookupEachDict(pc1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpc2') && (aryTemp[d_name] == '1')) {lookupEachDict(pc2, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpd1') && (aryTemp[d_name] == '1')) {lookupEachDict(pd1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpe1') && (aryTemp[d_name] == '1')) {lookupEachDict(pe1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpe2') && (aryTemp[d_name] == '1')) {lookupEachDict(pe2, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpe3') && (aryTemp[d_name] == '1')) {lookupEachDict(pe3, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpe4') && (aryTemp[d_name] == '1')) {lookupEachDict(pe4, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpe6') && (aryTemp[d_name] == '1')) {lookupEachDict(pe6, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpg1') && (aryTemp[d_name] == '1')) {lookupEachDict(pg1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpm1') && (aryTemp[d_name] == '1')) {lookupEachDict(pm1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name, "ZawgyiFont");}
		if ((ary_dict[i] == 'hpm2') && (aryTemp[d_name] == '1')) {lookupEachDict(pm2, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name, "ZawgyiFont");}
		if ((ary_dict[i] == 'hpm3') && (aryTemp[d_name] == '1')) {lookupEachDict(pm3, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name, "ZawgyiFont");}
		if ((ary_dict[i] == 'hpm4') && (aryTemp[d_name] == '1')) {lookupEachDict(pm4, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name, "ZawgyiFont");}
		if ((ary_dict[i] == 'hpv1') && (aryTemp[d_name] == '1')) {lookupEachDict(pv1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpv2') && (aryTemp[d_name] == '1')) {lookupEachDict(pv2, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hpv3') && (aryTemp[d_name] == '1')) {lookupEachDict(pv3, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
		if ((ary_dict[i] == 'hse1') && (aryTemp[d_name] == '1')) {lookupEachDict(se1, voca_lowercase, "m_" + d_name , "u_" + d_name, d_name);}
	}

	/*
	@ RESULT AND ORDER OF MEANINGS
	*/

	var word_ = "<font color='brown'><b style='font-size:120%'> <a name=\"" + word + "\" title=\"" + word + "\" >"
	if (view_left== 'Myanmar') {
		word = toMyanmar(word); 
	}                           
	if (view_left == 'Sinhala') {
		word = toSinhala(word);
	}
	if (view_left == 'Thai') {
		word = toThai(word);
	}
	if (view_left == 'Devanagari') {
		word = toDevar(word);
	}
	word_ = word_ + word + "</a></b></font>";

	final_display_meaning = m_ee1 + all_better_meaning + all_guess_meaning;

	/*
	@ If found = 0, and fuzzySearchinword ==0. Tell user current setting Fuzzy-[NO]
	*/
	if ((final_display_meaning.length < 1) && (fuzzySearchinword == 0)) {
		final_display_meaning += '<br><span style="text-size:2pt;color:grey;">Function fuzzy inWord(beta) was disabled.</span>';
	}

	writeme = "";//reset writeme divtopbottom
	//writeme = word_ + "<font color='grey'> [known " + found_count + "" + "|" + dict_in_use + " dictionaries]</font>";
	writeme = word_;
	writeme = writeme + final_display_meaning;

	if (found_count > 0) { 
		known_totalword_parag++; 
	}

	//If popup single word
	//var popupfixdel = document.getElementsByTagName("popupfix");
	//for (var p = 0; p < popupfixdel.length; p++) { 
	//	popupfixdel[p].innerHTML = ""; 
	//}
	/*
	@ Thanks for the scrolling explaination at (overflow-y: scroll;max-height:50%;) at isherwood https://stackoverflow.com/a/18894650
	*/
	//var smallpopup = "<popupfix><popupfix_del>";
	//smallpopup = smallpopup + "<div id=\"pid\" style=\"align:center;overflow-y: scroll;height:10%;padding:15px;position:fixed;top:0%;left:0;right:0%;font-family: DejaVuSansCondensed;font-size:large; text-align:justify;font-weight:bold;background: #F7DBD0;border:1px solid orange;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;-o-border-radius:10px;\" >";
	//smallpopup = smallpopup + "<span align=\"left\" style=\" font-family:DejaVuSansCondensed;font-weight:normal;margin-top:0px;margin-bottom:0px; \">" + writeme + "</span><br></div></popupfix_del></popupfix>";
	document.getElementById('page1_desc').innerHTML = writeme;

	val = localStorage.getItem('history');
	if ((val == null) || (val == undefined)) {
		val = '';
	}
	val = val.replace('-', '');
	val = val.replace('.', '');
	val = val.replace(writeme + '{!@@!}', '');
	val = writeme + '{!@@!}' + val;

	document.write = localStorage.setItem('history', val);

	//alert(document.getElementById('page2').style.display);
	if (localStorage.getItem('main_content') == 'page3') {
		ParagraphAnalysis();
	} else {
		if (localStorage.getItem('main_content') == 'page2') {
			change_tab('page2');
		} else {
			change_tab('page1');
		}
	}	

	//var popupfixdel = document.getElementsByTagName("popupfix");
	//popupfixdel[0].innerHTML = smallpopup;

	/*
	@ Call speak synthesis if English dictionary has meanings
	*/
	if ((letspeak ==1) && ((localStorage.getItem("speech_repeat") != '0'))) {
		for (var idx=1; idx<=localStorage.getItem("speech_repeat"); idx++) {
			speakSynthesis(voca_lowercase);//repeat 2 times
		}
	}


}//look up function ends

/*
@ ADDITIONAL FUNCTIONS
*/

//View other Pali languages
var pmm = "";
var psri = "";
var pthai = "";
var pdevar = "";

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
//function toMyanmar(k) { k = k.toLowerCase() + " "; var m = { a: "အ", i: "ဣ", u: "ဥ", "ā": "အာ", "ī": "ဤ", "ū": "ဦ", e: "ဧ", o: "ဩ" }; var l = { i: "ိ", "ī": "ီ", u: "ု", "ū": "ူ", e: "ေ", "ṃ": "ံ", k: "က", kh: "ခ", g: "ဂ", gh: "ဃ", "ṅ": "င", c: "စ", ch: "ဆ", j: "ဇ", jh: "ဈ", "ñ": "ဉ", "ṭ": "ဋ", "ṭh": "ဌ", "ḍ": "ဍ", "ḍh": "ဎ", "ṇ": "ဏ", t: "တ", th: "ထ", d: "ဒ", dh: "ဓ", n: "န", p: "ပ", ph: "ဖ", b: "ဗ", bh: "ဘ", m: "မ", y: "ယ", r: "ရ", l: "လ", "ḷ": "ဠ", v: "ဝ", s: "သ", h: "ဟ" }; var a = { k: "က", g: "ဂ", "ṅ": "င", c: "စ", j: "ဇ", "ñ": "ဉ", "ṭ": "ဋ", "ḍ": "ဍ", "ṇ": "ဏ", t: "တ", d: "ဒ", n: "န", p: "ပ", b: "ဗ", m: "မ", y: "ယ", r: "ရ", l: "လ", "ḷ": "ဠ", v: "ဝ", s: "သ", h: "ဟ" }; var n = { kh: "1", g: "1", d: "1", dh: "1", p: "1", v: "1" }; var j, f, e, d, c; var b = ""; var g = 0; k = k.replace(/\&quot;/g, "`"); var h = false; while (g < k.length) { j = k.charAt(g - 2); f = k.charAt(g - 1); e = k.charAt(g); d = k.charAt(g + 1); c = k.charAt(g + 2); if (m[e]) { if (g == 0 || f == "a") { b += m[e] } else { if (e == "ā") { if (n[h]) { b += "ါ" } else { b += "ာ" } } else { if (e == "o") { if (n[h]) { b += "ေါ" } else { b += "ော" } } else { if (e != "a") { b += l[e] } } } } g++; h = false } else { if (l[e + d] && d == "h") { b += l[e + d]; if (c != "y" && !h) { h = e + d } if (a[c]) { b += "္" } g += 2 } else { if (l[e] && e != "a") { b += l[e]; g++; if (d != "y" && !h) { h = e } if (a[d] && e != "ṃ") { b += "္" } } else { if (!l[e]) { b += e; g++; if (m[d]) { if (m[d + c]) { b += m[d + c]; g += 2 } else { b += m[d]; g++ } } h = false } else { h = false; g++ } } } } } b = b.replace(/ဉ္ဉ/g, "ည"); b = b.replace(/္ယ/g, "ျ"); b = b.replace(/္ရ/g, "ြ"); b = b.replace(/္ဝ/g, "ွ"); b = b.replace(/္ဟ/g, "ှ"); b = b.replace(/သ္သ/g, "ဿ"); b = b.replace(/င္/g, "င်္"); pmm = b.slice(0, -1); return b.slice(0, -1) }
// modified at 20180521
function toMyanmar(k) { k = k.toLowerCase() + " "; var m = { a: "အ", i: "ဣ", u: "ဥ", "ā": "အာ", "ī": "ဤ", "ū": "ဦ", e: "ဧ", o: "ဩ" }; var l = { i: "ိ", "ī": "ီ", u: "ု", "ū": "ူ", e: "ေ", "ṃ": "ံ", k: "က", kh: "ခ", g: "ဂ", gh: "ဃ", "ṅ": "င", c: "စ", ch: "ဆ", j: "ဇ", jh: "ဈ", "ñ": "ဉ", "ṭ": "ဋ", "ṭh": "ဌ", "ḍ": "ဍ", "ḍh": "ဎ", "ṇ": "ဏ", t: "တ", th: "ထ", d: "ဒ", dh: "ဓ", n: "န", p: "ပ", ph: "ဖ", b: "ဗ", bh: "ဘ", m: "မ", y: "ယ", r: "ရ", l: "လ", "ḷ": "ဠ", v: "ဝ", s: "သ", h: "ဟ" }; var a = { k: "က", g: "ဂ", "ṅ": "င", c: "စ", j: "ဇ", "ñ": "ဉ", "ṭ": "ဋ", "ḍ": "ဍ", "ṇ": "ဏ", t: "တ", d: "ဒ", n: "န", p: "ပ", b: "ဗ", m: "မ", y: "ယ", r: "ရ", l: "လ", "ḷ": "ဠ", v: "ဝ", s: "သ", h: "ဟ" }; var n = { kh: "1", g: "1", d: "1", dh: "1", p: "1", v: "1" }; var j, f, e, d, c; var b = ""; var g = 0; k = k.replace(/\&quot;/g, "`"); var h = false; while (g < k.length) { j = k.charAt(g - 2); f = k.charAt(g - 1); e = k.charAt(g); d = k.charAt(g + 1); c = k.charAt(g + 2); if ((f == "ṃ") || (m[f] != undefined)) { h='';f='';j=''; } if (m[e]) { if ((g == 0 || f == "a") || (m[e] != undefined && f == "")) { b += m[e] } else { if (e == "ā") { if (n[h]) { b += "ါ" } else { b += "ာ" } } else { if (e == "o") { if (n[h]) { b += "ေါ" } else { b += "ော" } } else { if (e != "a") { b += l[e] } } } } g++; h = false } else { if (l[e + d] && d == "h") { b += l[e + d]; if (c != "y" && !h) { h = e + d } if (a[c]) { b += "္" } g += 2 } else { if (l[e] && e != "a") { b += l[e]; g++; if (d != "y" && !h) { h = e } if (a[d] && e != "ṃ") { b += "္" } } else { if (!l[e]) { b += e; g++; if (m[d]) { if (m[d + c]) { b += m[d + c]; g += 2 } else { b += m[d]; g++ } } h = false } else { h = false; g++ } } } } } b = b.replace(/ဉ္ဉ/g, "ည"); b = b.replace(/္ယ/g, "ျ"); b = b.replace(/္ရ/g, "ြ"); b = b.replace(/္ဝ/g, "ွ"); b = b.replace(/္ဟ/g, "ှ"); b = b.replace(/သ္သ/g, "ဿ"); b = b.replace(/င္/g, "င်္"); pmm = b.slice(0, -1); return b.slice(0, -1) }

//Retrieved from: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)]
function toSinhala(l) { l = l.toLowerCase() + " "; var m = { a: "අ", "ā": "ආ", i: "ඉ", "ī": "ඊ", u: "උ", "ū": "ඌ", e: "එ", o: "ඔ" }; var b = { "ā": "ා", i: "ි", "ī": "ී", u: "ු", "ū": "ූ", e: "ෙ", o: "ො", "ṃ": "ං", k: "ක", g: "ග", "ṅ": "ඞ", c: "ච", j: "ජ", "ñ": "ඤ", "ṭ": "ට", "ḍ": "ඩ", "ṇ": "ණ", t: "ත", d: "ද", n: "න", p: "ප", b: "බ", m: "ම", y: "ය", r: "ර", l: "ල", "ḷ": "ළ", v: "ව", s: "ස", h: "හ" }; var j = { kh: "ඛ", gh: "ඝ", ch: "ඡ", jh: "ඣ", "ṭh": "ඨ", "ḍh": "ඪ", th: "ථ", dh: "ධ", ph: "ඵ", bh: "භ", "jñ": "ඥ", "ṇḍ": "ඬ", nd: "ඳ", mb: "ඹ", rg: "ඟ" }; var a = { k: "ක", g: "ග", "ṅ": "ඞ", c: "ච", j: "ජ", "ñ": "ඤ", "ṭ": "ට", "ḍ": "ඩ", "ṇ": "ණ", t: "ත", d: "ද", n: "න", p: "ප", b: "බ", m: "ම", y: "ය", r: "ර", l: "ල", "ḷ": "ළ", v: "ව", s: "ස", h: "හ" }; var k, g, f, e, d; var c = ""; var h = 0; while (h < l.length) { k = l.charAt(h - 2); g = l.charAt(h - 1); f = l.charAt(h); e = l.charAt(h + 1); d = l.charAt(h + 2); if (m[f]) { if (h == 0 || g == "a") { c += m[f] } else { if (f != "a") { c += b[f] } } h++ } else { if (j[f + e]) { c += j[f + e]; h += 2; if (a[d]) { c += "්" } } else { if (b[f] && f != "a") { c += b[f]; h++; if (a[e] && f != "ṃ") { c += "්" } } else { if (!b[f]) { if (a[g] || (g == "h" && a[k])) { c += "්" } c += f; h++; if (m[e]) { c += m[e]; h++ } } else { h++ } } } } } if (a[f]) { c += "්" } c = c.replace(/ඤ්ජ/g, "ඦ"); c = c.replace(/ණ්ඩ/g, "ඬ"); c = c.replace(/න්ද/g, "ඳ"); c = c.replace(/ම්බ/g, "ඹ"); c = c.replace(/්ර/g, "්ර"); c = c.replace(/\`+/g, '"'); psri = c.slice(0, -1); return c.slice(0, -1) }

//Retrieved from: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)]
function toDevar(l) { l = l.toLowerCase() + " "; var m = { a: " अ", i: " इ", u: " उ", "ā": " आ", "ī": " ई", "ū": " ऊ", e: " ए", o: " ओ" }; var n = { "ā": "ा", i: "ि", "ī": "ी", u: "ु", "ū": "ू", e: "े", o: "ो", "ṃ": "ं", k: "क", kh: "ख", g: "ग", gh: "घ", "ṅ": "ङ", c: "च", ch: "छ", j: "ज", jh: "झ", "ñ": "ञ", "ṭ": "ट", "ṭh": "ठ", "ḍ": "ड", "ḍh": "ढ", "ṇ": "ण", t: "त", th: "थ", d: "द", dh: "ध", n: "न", p: "प", ph: "फ", b: "ब", bh: "भ", m: "म", y: "य", r: "र", l: "ल", "ḷ": "ळ", v: "व", s: "स", h: "ह" }; var k, h, g, f, e, d, b; var c = ""; var a = 0; var j = 0; l = l.replace(/\&quot;/g, "`"); while (j < l.length) { k = l.charAt(j - 2); h = l.charAt(j - 1); g = l.charAt(j); f = l.charAt(j + 1); e = l.charAt(j + 2); d = l.charAt(j + 3); b = l.charAt(j + 4); if (j == 0 && m[g]) { c += m[g]; j += 1 } else { if (f == "h" && n[g + f]) { c += n[g + f]; if (e && !m[e] && f != "ṃ") { c += "्" } j += 2 } else { if (n[g]) { c += n[g]; if (f && !m[f] && !m[g] && g != "ṃ") { c += "्" } j++ } else { if (g != "a") { if (a[h] || (h == "h" && a[k])) { c += "्" } c += g; j++; if (m[f]) { c += m[f]; j++ } } else { j++ } } } } } if (a[g]) { c += "्" } c = c.replace(/\`+/g, '"'); pdevar = c.slice(0, -1); return c.slice(0, -1) }

//Retrieved from: sc-offline-2016-11-30/sc/js/compiled.js. [Suttacentral Offline Website (2016)]
// modify errers @ 20180516
function toThai(m) { m = m.toLowerCase() + " "; var n = { a: "1", "ā": "1", i: "1", "ī": "1", "iṃ": "1", u: "1", "ū": "1", e: "2", o: "2" }; var j = { a: "อ", "ā": "า", i: "ิ", "ī": "ี", "iṃ": "ึ", u: "ุ", "ū": "ู", e: "เ", o: "โ", "ṃ": "ํ", k: "ก", kh: "ข", g: "ค", gh: "ฆ", "ṅ": "ง", c: "จ", ch: "ฉ", j: "ช", jh: "ฌ", "ñ": "ญ", "ṭ": "ฏ", "ṭh": "ฐ", "ḍ": "ฑ", "ḍh": "ฒ", "ṇ": "ณ", t: "ต", th: "ถ", d: "ท", dh: "ธ", n: "น", p: "ป", ph: "ผ", b: "พ", bh: "ภ", m: "ม", y: "ย", r: "ร", l: "ล", "ḷ": "ฬ", v: "ว", s: "ส", h: "ห" }; var a = { k: "1", g: "1", "ṅ": "1", c: "1", j: "1", "ñ": "1", "ṭ": "1", "ḍ": "1", "ṇ": "1", t: "1", d: "1", n: "1", p: "1", b: "1", m: "1", y: "1", r: "1", l: "1", "ḷ": "1", v: "1", s: "1", h: "1" }; var l, h, g, f, e, d, b; var c = ""; var k = 0; m = m.replace(/\&quot;/g, "`"); while (k < m.length) { l = m.charAt(k - 2); h = m.charAt(k - 1); g = m.charAt(k); f = m.charAt(k + 1); e = m.charAt(k + 2); d = m.charAt(k + 3); b = m.charAt(k + 4); if (n[g]) { if (g == "o" || g == "e") { c += j[g] + j.a; k++ } else { if (k == 0) { c += j.a } if (g == "i" && f == "ṃ") { c += j[g + f]; k++ } else { if (g != "a") { c += j[g] } } k++ } } else { if (j[g + f] && f == "h") { if (e == "o" || e == "e") { c += j[e]; k++ } c += j[g + f]; if (a[e]) { c += "ฺ" } k = k + 2 } else { if (j[g] && g != "a") { if (f == "o" || f == "e") { c += j[f]; k++ } c += j[g]; if (a[f] && g != "ṃ") { c += "ฺ" } k++ } else { if (!j[g]) { c += g; if (a[h] || (h == "h" && a[l])) { c += "ฺ" } k++; if (f == "o" || f == "e") { c += j[f]; k++ } if (n[f]) { c += j.a } } else { k++ } } } } } if (a[g]) { c += "ฺ" } c = c.replace(/\`+/g, '"'); pthai = c.slice(0, -1); return c.slice(0, -1); };

/*
@ Converter callers:
*/

function viewMM() {
	var textin = document.getElementsByClassName("r1");
	var textout = document.getElementsByClassName("m1");

	var regEx1 = /<span class="b1">/g ;
	var regEx2 = /<\/span>/g ;
	var regEx3 = /<[^>]*>/g ;

	var rn = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "\\.", ",",
	"@_@-@", "#_#-#",
	"@_###", "#=@-@");
	var mn = new Array("၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉", "။", "၊",
	"<span style='font-size:10pt;'>[Pg.", "<span style='font-size:10pt;'>[PTS.",
	'<span class="b1">', '</span>');
	for (var p = 0; p < textin.length; p++) {
		//var text = textin[p].textContent;
		var text = textin[p].innerHTML;

		text = text.replace(regEx1, "@_###"); // <span class="b1">
		text = text.replace(regEx2, "#=@-@"); // </span>

		text = text.replace(regEx3, ""); // Remove Html Tags
		text = text.replace("[Pg.", "@_@-@"); //page no. [Pg.123]
		text = text.replace("[PTS.", "#_#-#"); //PTS no. [PTS.123]

		//toThai(text);
		//toDevar(text);
		//toSinhala(text);
		toMyanmar(text);

		//Replace number and punctuations which SuttaCentral did not cover
		for (var q = 0; q < rn.length; q++) {
			var rule = new RegExp(rn[q], 'igm');
			var textr = pmm.replace(rule, mn[q]);
			pmm = textr;
		}
		textout[p].innerHTML = pmm;
	}
}

function viewThai() {
	var textin = document.getElementsByClassName("r1");
	var textout = document.getElementsByClassName("m1");

	var regEx1 = /<span class="b1">/g ;
	var regEx2 = /<\/span>/g ;
	var regEx3 = /<[^>]*>/g ;
	var regEx4 = /@_###/g ;
	var regEx5 = /#=@-@/g ;

	for (var p = 0; p < textin.length; p++) {
		//var text = textin[p].textContent;
		var text = textin[p].innerHTML;

		text = text.replace(regEx1, "@_###"); // <span class="b1">
		text = text.replace(regEx2, "#=@-@"); // </span>

		text = text.replace(regEx3, ""); // Remove Html Tags
		text = text.replace("[Pg.", "@_@-@"); //page no. [Pg.123]
		text = text.replace("[PTS.", "#_#-#"); //PTS no. [PTS.123]

		toThai(text);
		pthai = pthai.replace("@_@-@", "<span style='font-size:10pt;'>[Pg.");
		pthai = pthai.replace("#_#-#", "<span style='font-size:10pt;'>[PTS.");
		pthai = pthai.replace(regEx4, '<span class="b1">');
		pthai = pthai.replace(regEx5, "</span>");
		//toDevar(text);
		//toSinhala(text);
		//toMyanmar(text);
		textout[p].innerHTML = pthai;
	}
}

function viewDevar() {
	var textin = document.getElementsByClassName("r1");
	var textout = document.getElementsByClassName("m1");

	var regEx1 = /<span class="b1">/g ;
	var regEx2 = /<\/span>/g ;
	var regEx3 = /<[^>]*>/g ;
	var regEx4 = /@_###/g ;
	var regEx5 = /#=@-@/g ;

	for (var p = 0; p < textin.length; p++) {
		//var text = textin[p].textContent;
		var text = textin[p].innerHTML;

		text = text.replace(regEx1, "@_###"); // <span class="b1">
		text = text.replace(regEx2, "#=@-@"); // </span>

		text = text.replace(regEx3, ""); // Remove Html Tags
		text = text.replace("[Pg.", "@_@-@"); //page no. [Pg.123]
		text = text.replace("[PTS.", "#_#-#"); //PTS no. [PTS.123]

		toDevar(text);
		pdevar = pdevar.replace("@_@-@", "<span style='font-size:10pt;'>[Pg.");
		pdevar = pdevar.replace("#_#-#", "<span style='font-size:10pt;'>[PTS.");
		pdevar = pdevar.replace(regEx4, '<span class="b1">');
		pdevar = pdevar.replace(regEx5, "</span>");
		//toSinhala(text);
		//toMyanmar(text);
		textout[p].innerHTML = pdevar;
	}
}

function viewSri() {
	var textin = document.getElementsByClassName("r1");
	var textout = document.getElementsByClassName("m1");

	var regEx1 = /<span class="b1">/g ;
	var regEx2 = /<\/span>/g ;
	var regEx3 = /<[^>]*>/g ;
	var regEx4 = /@_###/g ;
	var regEx5 = /#=@-@/g ;

	for (var p = 0; p < textin.length; p++) {
		//var text = textin[p].textContent;
		var text = textin[p].innerHTML;

		text = text.replace(regEx1, "@_###"); // <span class="b1">
		text = text.replace(regEx2, "#=@-@"); // </span>

		text = text.replace(regEx3, ""); // Remove Html Tags
		text = text.replace("[Pg.", "@_@-@"); //page no. [Pg.123]
		text = text.replace("[PTS.", "#_#-#"); //PTS no. [PTS.123]

		toSinhala(text);
		psri = psri.replace("@_@-@", "<span style='font-size:10pt;'>[Pg.");
		psri = psri.replace("#_#-#", "<span style='font-size:10pt;'>[PTS.");
		psri = psri.replace(regEx4, '<span class="b1">');
		psri = psri.replace(regEx5, "</span>");
		//toMyanmar(text);
		textout[p].innerHTML = psri;
	}
}

/*
//Custom function to apply for a particular dictionary

function encodingConverter_example(text_in) {//code here }

*/

/*
@ Hide loading message
@ Reference https://css-tricks.com/snippets/jquery/display-loading-graphic-until-page-fully-loaded/
*/

//$.holdReady('hold'); //hold ready

//loader.innerHTML = '<div align="center" style="position:fixed;background:orange;border:2px solid white;top:35%;left:3%;right:3%;font-size:x-large;box-shadow:  -8px -2px 8px 8px white, -8px 8px 8px 8px #D9D9D9, 8px 12px 12px 12px white;"">' + loadmsg + '<hr><i>' +'loading data: almost done...'+ '</i></div>';

//$.holdReady();//release ready

//$(document).ready(function () = when DOM & all images are rendered. So it seems better than $(window).on('load',function ()
$(document).ready(function () {
	$('#loader').fadeOut(2000);//give extra 2 seconds for data ready
	//$('#loader').remove();
});