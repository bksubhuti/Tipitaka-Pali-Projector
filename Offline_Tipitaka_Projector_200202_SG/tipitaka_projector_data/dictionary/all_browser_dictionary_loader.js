/*
@ Pali Tipitaka Projector
@ Filename: dictionary_loader.js
@ Usage: dictionary_loader.js must be loaded before this file: stlookup_jquery.js
@ Functions: to load dictionaries
*/



//Display random message:
var loader = document.getElementById("loader");

//var loadmsgarr = new Array('<strong><p>"vayadhammā saṅkhārā appamādena sampādethā"</strong><br> <i>~  mahāparinibbāna sutta (pr.218) ~</i></p>', '<strong><p>"vayadhammā saṅkhārā appamādena sampādethā"</strong><br> <i>~  mahāparinibbāna sutta (pr.218) ~</i></p>', '<strong><p>"vayadhammā saṅkhārā appamādena sampādethā"</strong><br> <i>~  mahāparinibbāna sutta (pr.218) ~</i></p>');
//var rdom = Math.floor(((Math.random()) * (loadmsgarr.length)));
//var loadmsg = loadmsgarr[rdom];

var loadmsg = '<strong><p>"vayadhammā saṅkhārā appamādena sampādethā"</strong><br> <i>~  mahāparinibbāna sutta (par.218) ~</i></p>';

loader.innerHTML = '<div align="center" style="position:fixed;background:orange;border:2px solid white;top:35%;left:3%;right:3%;font-size:x-large;box-shadow:  -8px -2px 8px 8px white, -8px 8px 8px 8px #D9D9D9, 8px 12px 12px 12px white;"">' + loadmsg + '<hr><i>loading data...</i></div>';


var dict_in_use = 0; //count dict in use
var loaddictary = [];


/******** English Dictionary ***********
* English dictionary (to support non-english speakers)
to add:
* ee1 dictionary file: wn-Eng-Eng-Dictionary_WordNet_3.0_.js
* ee2 dictionary file: ee2_Eng-Eng_WsT_Unabridged_EnglishDictionary.js
* They are available

***************************************/
var ee1 = ""; //The dictionary code must be always declared before loading the script
//var path = window.location.pathname();
var hee1 = localStorage.getItem("hee1"); //Check setting: enabled this dictionary or not
if ((hee1 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/wn-Eng-Eng-Dictionary_WordNet_3.0_.js"></script>'); }

/******** Pali English Dictionary ******
* wordbreakdata dictionary file: wordbreakdata_Pali_Pali_grammar_Dictionary_extract_DPR_2018.js
* pe1 dictionary file: pe1_Pali_English_sc2016_pi2en-maindata-v1.2.js
* pe2 dictionary file: pe2_Pali_English_Dictionary_extract_DPR_2018.js Extracted From DPR by Ven. Ariyavamsa (TW)
***************************************/
var wordbreakdata = "";
var pe1 = ""; var pe2 = "";


/******** Auto including wordbreakdata *********
* THIS DATA FILE IS VERY IMPORTANT (It helps to recognize compound words)
* wordbreakdata dictionary file: pe0_grammar_wordbreakdata_Pali_English_Dictionary_extract_DPR_2018.js
***************************************/
loaddictary.push('<script src="dictionary/000_wordbreakdata_Pali_Pali_grammar_Dictionary_extract_DPR_2018.js"></script>');

//SuttaCentral Pali-English Dictionary
var hpe1 = localStorage.getItem("hpe1");
if ((hpe1 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pe1_Pali_English_sc2016_pi2en-maindata-v1.2.js"></script>'); }

//DPR DICTIONARY
var hpe2 = localStorage.getItem("hpe2");
if ((hpe2 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pe2_Pali_English_Dictionary_extract_DPR_2018.js"></script>'); }


/******** Pali Viet Dictionary *********
* pv1 dictionary file: pv1_Pali_Viet_Dictionary_by_ngaiBuuChon_stardict.js
* pv2 dictionary file: pv2_Pali_Viet_Abhi-Terms_by_ngaiTinhSu_Stardict.js
* pv3 dictionary file: pv3_Pali_Viet_Vinaya-Terms_by_VenGiacNguyenBhikkhu.js
***************************************/
var pv1 = ""; var pv2 = ""; var pv3 = "";

var hpv1 = localStorage.getItem("hpv1");
if ((hpv1 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pv1_Pali_Viet_Dictionary_by_ngaiBuuChon_stardict.js"></script>'); }
var hpv2 = localStorage.getItem("hpv2");
if ((hpv2 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pv2_Pali_Viet_Abhi-Terms_by_ngaiTinhSu_Stardict.js"></script>'); }
var hpv3 = localStorage.getItem("hpv3");
if ((hpv3 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pv3_Pali_Viet_Vinaya-Terms_by_VenGiacNguyenBhikkhu.js"></script>'); }

/******** Pali Indonesia Dictionary ******
* pd1 dictionary file: pd1_Pali_Indo_sc2016_pi2id-maindata-v1.js
***************************************/
var pd1 = "";

var hpd1 = localStorage.getItem("hpd1");
if ((hpd1 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pd1_Pali_Indo_sc2016_pi2id-maindata-v1.js"></script>'); }

/******** Pali Germany Dictionary ******
* pg1 dictionary file: pg1_Pali_Germany_sc2016_pi2de-maindata-v1.2.js
***************************************/
var pg1 = "";

var hpg1 = localStorage.getItem("hpg1");
if ((hpg1 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pg1_Pali_Germany_sc2016_pi2de-maindata-v1.2.js"></script>'); }

/******** Pali Myanmar Dictionary ******
***************************************/

/******** Pali Zh Chinese Dictionary ******
* pc1 dictionary file: pc1_Pali_Zh_sc2016_pi2zh-maindata-v1.js
*/

var pc1 = "";
var hpc1 = localStorage.getItem("hpc1");
if ((hpc1 == 1)) { dict_in_use++; loaddictary.push('<script src="dictionary/pc1_Pali_Zh_sc2016_pi2zh-maindata-v1.js"></script>'); }


var writejs = loaddictary.toString();
writejs = writejs.replace(/,/g,'');

document.writeln(writejs);
