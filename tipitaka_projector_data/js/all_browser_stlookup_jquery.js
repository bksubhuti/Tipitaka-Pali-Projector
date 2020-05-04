/*
@ Pali Tipitaka Projector
@ Filename: stlookup_jquery.js
@ Usage: dictionary_loader.js must be loaded before this file stlookup_jquery.js
@ Functions: to perform look up with the data loaded by dictionary_loader.js, bind many click events into the text file
*/

/*
@ ajaxSetup Cache = true so that it just needs to load dictionaries 1 time
@ References https://api.jquery.com/jquery.getscript/
*/

$.ajaxSetup({
cache: true
});

//var dict_in_use = 0; //count dict in use
var word;
var parawith_percent;
/*
@ var keepChars is used to break a paragraph into words and trim punctuation, non-word chars etc
*/
var keepChars = /[^a-zA-Zāīūṇṅñṃṁḷḍṭáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ]/;
//var rex = /([a-zA-Zāīūṇṅñṃṁḷḍṭáàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ]+)/gim; //add <span> to click for buttom para

/*
@ CHANGE DEFAULT CSS TEXT SIZE
@ WARNING: It shall SLOWDOWN  the page load obviously, so if you know with value is suitable for your device, fix your text-size number in projector_style.css
@ default text-size is delared in the projector_style.css
@ Default values left column text-size: 25pt, right column 20pt;
@ This function help to custom text-size on small-screen devices.
*/

var load_size_left = localStorage.getItem('size_left');
var load_size_right = localStorage.getItem('size_right');

// these are set in the preferences.
var r1 = localStorage.getItem('r1');
var m1 = localStorage.getItem('m1');
var b1 = localStorage.getItem('b1');


var bg_color = localStorage.getItem('bg_color');

$(window).on('load', function () {

//auto width
//if (((load_size_left) && (load_size_left != "25")) || ((load_size_right) && (load_size_right != "20"))) {

if (localStorage.getItem("viewr_m") == '1' || localStorage.getItem("viewr_t") == '1' || localStorage.getItem("viewr_s") == '1' || localStorage.getItem("viewr_d") == '1') {

if (!(load_size_left)) {load_size_left=25;}//avoid error for case: unset textsize+2 languages
if (!(load_size_right)) {load_size_right=20;}

var width_r1 = parseInt(100 * Number(load_size_left) / (Number(load_size_left) + Number(load_size_right)));
var width_m1 = parseInt(100 * Number(load_size_right) / (Number(load_size_left) + Number(load_size_right)));

$(".r1").css("width", width_r1 + '%');
$(".m1").css("width", width_m1 + '%');

}//else {},  use css default r1 85%, m1 15% (15% width for empty place to click on touch screen)

//I'm leaving this code for now but hope to delete it soon.
//background, default = #f3ddb6 sepia (named "Classic Reader" in htm content file)
if (!(bg_color) || (bg_color == "#f3ddb6")) {   $("select#bg_color").val('#f3ddb6'); }
if ((bg_color) && (bg_color != "#f3ddb6")) {
    if (bg_color == "#fff8dc") { $(".r1").css("color","black"); $(".m1").css("color","black") }
    else { $(".r1").css("color","#FFF2CC"); $(".m1").css("color","#FFF2CC");}
    $("table").css("background", bg_color);
    //$("select#bg_color option[value='abc']").attr('selected','selected');
    $("select#bg_color").val(bg_color);//reference https://stackoverflow.com/a/16979926
}


// these are set in the preferences now.
$(".r1").css("color",r1);
$(".m1").css("color",m1);
$(".b1").css("color",b1);


/*
if ((load_size_left) && (load_size_left != "25")) {
var writeline_heightleft = Number(load_size_left) + 12; writeline_heightleft += 'pt';
var writetextsizeleft = load_size_left + "pt";
$(".r1").css("font-size", writetextsizeleft);
$(".r1").css("line-height", writeline_heightleft);
$(":input#size_left").attr('value', load_size_left);
}

if ((load_size_right) && (load_size_right != "20")) {
var writeline_heightright = Number(load_size_right) + 27; writeline_heightright += 'pt';
var writetextsizeright = load_size_right + "pt";
$(".m1").css("font-size", writetextsizeright);
$(".m1").css("line-height", writeline_heightright);
$(":input#size_right").attr('value', load_size_right);
}

});

*/

/*
@ Change textSize function
*/
function textSize(side) {
this.side = side;
var form = '#' + side;
form = ":input" + form; //select :input#id
var textsize = $(form).prop('value');
textsize = textsize.trim();

if ((textsize.length < 1) && (side == 'size_left')) { textsize = 25; $(form).text(25); }
if ((textsize.length < 1) && (side == 'size_right')) { textsize = 20; $(form).text(20); }

var textsize1 = textsize;

// textsize can be = small/large/x-large or in number 20 30, if in number + pt and can adjust the line-height value accordingly
var isnumber = /\d/.test(textsize);
var istext = /[a-z]/.test(textsize);

if (isnumber) { var lineheightval = Number(textsize) + 12; lineheightval += 'pt'; textsize += 'pt'; } //line-height is larger than text-size +12pt

//if ((isnumber) && (istext)) { alert('Invalid text-size\nIt should be a pure number or pure name:\n 20 30 small medium large  x-large etc...'); }

var lr = "";
if (side == 'size_left') { lr = '.r1' } else { lr = '.m1'; }

if (isnumber) { $(lr).css("line-height", lineheightval); }

$(lr).css("font-size", textsize);

document.write.innerHTML = localStorage.setItem(side, textsize1);

if (localStorage.getItem("viewr_m") == '1' || localStorage.getItem("viewr_t") == '1' || localStorage.getItem("viewr_s") == '1' || localStorage.getItem("viewr_d") == '1') {
var r1 = Number($(':input#size_left').prop('value'));
var m1 = Number($(':input#size_right').prop('value'));
var width_r1 = parseInt(100 * r1 / (r1 + m1));
var width_m1 = parseInt(100 * m1 / (r1 + m1));

$(".r1").css("width", width_r1 + '%');
$(".m1").css("width", width_m1 + '%');
}
//else {} use css default r1 85%, m1 15% (15% for empty place to click)

}//change textSize function

/*
@ Change backgroundColor function
*/
function back_color(color) {
var form = '#bg_color';
form = ":input" + form; //select :input#id
var color = $(form).prop('value');

$('table').css("background", color);
if ((color =="#f3ddb6") || (color =="#fff8dc")) {$(".r1").css("color","black"); $(".m1").css("color","black");
} else {$(".r1").css("color","#FFF2CC"); $(".m1").css("color","#FFF2CC"); }

document.write.innerHTML = localStorage.setItem('bg_color', color);
/*
var font_color = {
'#f3ddb6':['#000000'],
'#fff8dc':['#000000'],
'#1f3763':['#FFFFFE'],
'#000001':['#FFFFFF'],
'#121212':['#B0B0B0'],
'#010101':['#937811'],
'#090C11':['#2D3D4A'],
'#3C3C3C':['#CECECE'],
'#5A5A5A':['#CACACA'],
'#D7D4CD':['#626262'],
'#E0E0E0':['#202020'],
'#F0F0F0':['#008000'],
'#FEFEFE':['#000000'],
'#D8CBAB':['#000001'],
'#E2BDB4':['#010101']}
var b1_color = {
'#f3ddb6':['brown'],
'#fff8dc':['brown'],
'#1f3763':['#ffff00'],
'#000001':['brown'],
'#121212':['brown'],
'#010101':['brown'],
'#090C11':['brown'],
'#3C3C3C':['brown'],
'#5A5A5A':['brown'],
'#D7D4CD':['brown'],
'#E0E0E0':['brown'],
'#F0F0F0':['brown'],
'#FEFEFE':['brown'],
'#D8CBAB':['brown'],
'#E2BDB4':['brown']}
*/

// table and variables set in pref
$(".r1").css("color", r1);
$(".m1").css("color", m1);
$(".b1").css("color", b1);

}//change backgroundColor function

/*
@ DICTIONARY VARIABLES AND PERFORM LOADING
* MOVED TO loader.js to make it load dictionary data load in all browser?
*/

//remove small floating button
function smallrm() {
//$('popupfix').fadeOut();
//$('popupfix').fadeIn();
var popupfixdel = document.getElementsByTagName("popupfix");
for (var p = 0; p < popupfixdel.length; p++) { popupfixdel[p].innerHTML = ""; }
}

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
var knownwp_nolink = '';
var knownwp = '';
var listMode;

var dualtext = '   Dual-[yes]';
var dualclick = 1;

/*
@ Dual Mode: click on word/words in a definition entry to look up its definitions.
@ Default = on when loading a new page
@ Can switch enable/disable anytime onclick
*/
function enableDual() {
if (dualclick == 1) {
//$('.enableDual').attr("style", "color:grey;");
$('.enableDual').text(' Dual-[no]');
dualclick = 0;
dualtext = ' Dual-[no]';
} else {
//$('.enableDual').attr("style", "color:orange;");
$('.enableDual').text(' Dual-[yes]');
dualclick = 1;
dualtext = ' Dual-[yes]';
}
}//func enableDual

/*
@ Fuzzy Mode: Try fuzzy-in-word search or not
@ It is not reliable yet. Sometimes it splits word wrongly
@ Can switch enable/disable anytime onclick
*/

var fuzzytext = ' Fuzzy-[no]'; //default not fuzzy inWord search
var fuzzySearchinword; //value depending on user setting from the index files
var getsettingfuzzy = localStorage.getItem("enablefuzzyinword");
if (!(getsettingfuzzy)) { fuzzySearchinword = 0; } else { fuzzySearchinword = getsettingfuzzy; }

//first load fuzzytext
if (fuzzySearchinword == 1) { fuzzytext = ' Fuzzy-[yes]'; }

function enableFuzzy() {
if (fuzzySearchinword == 1) {
//$('.enableFuzzy').attr("style", "color:grey;");
$('.enableFuzzy').text(' Fuzzy-[no]');
fuzzySearchinword = 0;
fuzzytext = ' Fuzzy-[no]';
document.write.innerHTML = localStorage.setItem('enablefuzzyinword', 0);

} else {
//$('.enableFuzzy').attr("style", "color:orange;");
$('.enableFuzzy').text(' Fuzzy-[yes]');
fuzzySearchinword = 1;
fuzzytext = ' Fuzzy-[yes]';
document.write.innerHTML = localStorage.setItem('enablefuzzyinword', 1);

}
}//func enableFuzzy

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

sel_object.modify("move","right","character");
sel_object.modify("move","left","word");
sel_object.modify("extend","right","word");//extend = extend selection
t = sel_object.toString().trim();
sel_object = "";
}

t = t.toLowerCase();

/* Remove @begining: like "Katha... */
var te = t.substring(0, 1); var f = keepChars.test(te); //chars is not included in var keepChars, it will be removed
if (f) { t = t.substring(1, t.length);
//2 times to remove punctuation.
var te = t.substring(0, 1); var f = keepChars.test(te);
if (f) { t = t.substring(1, t.length);}
}
/* Remove @ending: like: kiṃ’’? (3 times)*/
var te = t.substring(t.length - 1, t.length); var f = keepChars.test(te);
if (f) { t = t.substring(0, t.length - 1);

//2 times to remove
var te = t.substring(t.length - 1, t.length); var f = keepChars.test(te);
if (f) { t = t.substring(0, t.length - 1);
//3 times to remove
var te = t.substring(t.length - 1, t.length); var f = keepChars.test(te);
if (f) { t = t.substring(0, t.length - 1);}

}}

return t;

}//function word_click

var para_text2 = "";
/*
@ DICTIONARY MODE (SHOW MEANINGS FOR WHOLE PARAGRAPH | SINGLE WORD)
@ Default Dictionary mode is listing paragraph
*/

listMode = 1;
//var isListMode = localStorage.getItem("listparagraph");

//Check setting list para/single popup
var isPopupMode = localStorage.getItem("popupword");
if (isPopupMode == 1) { listMode = 0; }

$(window).on('load', function () {

if (listMode == 1) {
//List whole paragraph
$(".r1").not(".eachwmean").one("click", function () {

$('popupfix').html(''); //delete old value first
//$('popupfix').html('') is still reserve the place for next click, .remove() is not

writemefinal = "";//reset
known_totalword_parag = 0;

para_text = $(this).text();//get text
para_text2 = para_text;

breakParagraph2Word(para_text);//send to function to break them

/*
@ TO SCROLL THE TEXT UP TO THE LATEST CLICKED PARAGRAPH, WE HAVE 2 RELEVENT SOLUTIONS HERE.
@ 1. USING x= $(this).position(); //return object x.left and x.top; then //scroll(x.left ,x.top); but this has disadvantage that when the definitions are removed the relative position will be also changed, may lead to incorrect position.
@ 2. Attach time tag as link, this solution is a good choice,  applied here,  as it will fix the position of the object.
*/
//scroll_up = $(this).position(); //return object x.left and x.top

pclicktime = new Date().getTime(); //use for inside document link (#time), attached next to % found

$(this).attr("class", "r11"); //set class r1 => new class = r11

$(this).attr("style", "margin-left:28px;color:green;border:1px solid grey;padding:8px;background:#F7DBD0;font-size:x-large;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-o-border-radius:4px;"); //set new style instead of r1

knownwp_short = "<sub><sub><sub>known </sub><sub>" + known_totalword_parag + "/" + totalword_parag + " words (" + Math.floor((known_totalword_parag / totalword_parag) * 100) + "%" + ") " + "</sub></sub></sub>";

knownwp_nolink = "Known: " + known_totalword_parag + "/" + totalword_parag + " words (~" + Math.floor((known_totalword_parag / totalword_parag) * 100) + "%" + ") ";
knownwp = knownwp_nolink + "<a name=\"" + pclicktime + "\"></a>";//for link use inside document link (#timetag) next to % found

writemefinal = "<hr width='40%' align='left' color='grey'><span style='color:grey;'>" + "Used " + dict_in_use + " dictionaries. " + knownwp + "</span><delparamean>" + '<span style="text-align:right;color:orange;" class="enableFuzzy" onclick="enableFuzzy()">' + fuzzytext + '</span>' + '<span style="text-align:right;color:orange;" class="enableDual" onclick="enableDual()">' + '     ' + dualtext + '</span>' + "<isc>" + writemefinal + '</isc>' + '<div class="click2delpara" align="center">' + "<a name=\"" + pclicktime + "\">^^ Remove These Definitions ^^</a></div></delparamean>";

$(this).append(writemefinal);

fp();//function to show popup reading paragraph at the bottom

/*
@ CLICK TO JUMP TO DEFINITION IN THE POPUP PARAGRAPH at the bottom
*/

var returnpoint = "";
var showpara_again_image = '<img id="showfloatingpara" style="display:scroll;position:fixed;bottom:2px;left:1%;right:1%px;" src="images/showpara.jpg" border="0">';

$("popupfixbottom").bind('click', function () {
word_click();
if ((t.length > 0) && (t !="x")) { window.location.assign("#" + t); returnpoint = "#" + t;} //X already became lower case x

//Hide floating paragraph when click on X
if (t == "x") {
$("popupfixbottom_del").html(showpara_again_image);
if (returnpoint.length > 0) {window.location.assign(returnpoint);} else { window.location.assign("#" + pclicktime);}
}
//Show floating paragraph again
$('#showfloatingpara').bind('click', function () { fp();});

});

/* Option function, now disabled
@ After viewed the, class r11 can be click to popup meanings again, but only one word popup
@ $(".r11").not(".eachwmean").bind('click', function () {});
*/

/*
@ Add function to continue to find definition  of the definition
@ Mean definition for definitions
*/

$(".eachwmean").bind('click', function () {

if (dualclick == 1) {

word_click();

if (t.length > 0) { lookupCoordinator(t, 1); } else { $("popupfix").html(''); }//So double click can remove

} else { $(this).remove();}

});

/*
@ Remove the single-word-popup window when it is clicked itself
*/
$("popupfix").bind('click', function () {
$(this).html('');// remove word popupfix
});

$(".click2delpara").bind('click', function () {
//scroll(scroll_up.left,scroll_up.top);

var up_this_only = $(this).children('a').prop('name'); //retrieved timetag value
window.location.assign("#" + up_this_only);//scroll up for this para only

//window.location.assign("#"+pclicktime); pclicktime: always the latest clicked para position
$('popupfix').html('');

$(this).parent('delparamean').remove();
//$(this).parent('delparamean').html('');

//$('popupfix_del').remove();
$('popupfixbottom_del').remove();
//$(this).text("Show again");
//$(this).attr("class","showagain");
});

$(".m1").bind('click', function () {
//scroll(scroll_up.left,scroll_up.top);
window.location.assign("#" + pclicktime);//scroll up to the latest clicked para

$("popupfix").html(''); //del word popup top
$('delparamean').remove(); //all meanings @ all places
//$('delparamean').html('');
$('popupfix_del').remove();
$('popupfixbottom_del').remove();

});

/*
@ May add  in the future: on popup paragraph, can click to view next/previous  paragraph on click
*/

});

/*
@ END OF list paragraph mode
@ Now POPUP MODE
*/
} else {

$(".r1").click(function () {

word_click();

if (t.length > 0) {
lookupCoordinator(t, 0);//$changecolor = $ns % 2; /

} else { $("popupfix").html(''); }

});

/*
@ Un-limited click in popup window;
@ In single word popup only
*/

$("popupfix").click(function () {

word_click();

if (t.length > 0) {
lookupCoordinator(t, 0);//$changecolor = $ns % 2; /

}

});

$(".m1").bind('click', function () {
//scroll(scroll_up.left,scroll_up.top);
//window.location.assign("#"+pclicktime);//scroll up to the latest clicked para
$("popupfix").html('');
//$('delparamean').remove(); //all meanings @ all places
//$('delparamean').html('');
//$('popupfix_del').remove();
//$('popupfixbottom_del').remove();

});

} //End else for popup mode

}); //Onload

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
totalword_parag += 1;
var p_word = para_text_wordarr[i];
var p_words = p_word.toLowerCase();
lookupCoordinator(p_words, 0);
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
better_meaning = "<br><font color='green'><strong style='font-size:110%'>💯" + dictname + ": </strong></font>" + "<font color='green'>" + meaning_from_dict + "</font>";
found_count++;
guess_meaning = "";
}
//EXACTLY FOUND MEANINGS FINISHED

//TRY TO GUESS MEANINGS/OR USE GRAMMAR BASE WORD BANK  IF NO EXACTLY FOUND
if ((meaning_from_dict == "undefined") && (cee1 == "undefined")) {

var tinword = "<font color='grey'>[fuzzy-notSure] </font><font color='brown'><strong>" + voca + ": </strong></font> ?~ ";
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
better_meaning_grammar += "<br><font color='green'><strong style='font-size:110%'>" + dictname + wbreak_grammar + ": </strong></font>" + "<font color='green'>" + dictarr[ary[i]] + "</font>";
} else {

wbreak_grammar = "<font color='grey'>"+"<span style='visibility:hidden;'>"+dictname+":</span>"+" [d] </font><font color='brown'><strong>" + wo + "</strong></font>"+"<font color='grey'><sup>("+ (Number(i)+1) +")</sup></font>"+" => <font color='blue'><strong>" + ary[i] + "</strong></font>";
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

if ((dsd_deep_a.length < 1) && (fuzzySearchinword == 1)) {

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
dsd_deep += "<i><font color='brown'><strong>" + wr + "</strong></font></i>" + ": " + dictarr[wr] + "<br>";
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
guess_meaning = "<br><font color='green'><b style='font-size:110%'>" + dictname + ": </b></font>" + wbreak_a + dsd_deep_a + tinword + "<font color='black'>" + wbreak + "</font>" + "<br>" + "<font color='black'>" + dsd_deep + "</font>";
} else if (dsd_deep_a.length > 0) {
better_meaning = "<br><font color='green'><b style='font-size:110%'>" + dictname + ": </b></font>" + wbreak_a + dsd_deep_a;
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
@ Function lookupCoordinator
*/

function lookupCoordinator(texttolook, dual) {

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
//WN helps to recognise English words, stop word breaking when it is an English word.
cee1 = "" + ee1[voca_lowercase];
if (hee1 == 1) {
if (cee1 != "undefined") {
m_ee1 = "<br><font color='green'><b style='font-size:110%'>💯WN: </b></font>" + cee1;
found_count++;
}
if (cee1 == "undefined") {
var ends = voca_lowercase.charAt(voca_lowercase.length-1);
if (ends =="s") {
var newen =  voca_lowercase.substring(0,voca_lowercase.length-1);
var cee1s = "" + ee1[newen];
if (cee1s != "undefined") {
m_ee1s = "<br><font color='green'><b style='font-size:110%'>WN: </b></font>"+newen+"(s)"+"<i> => </i><font color='brown'><strong>" + newen + "</strong></font>"+ cee1s;
m_ee1 = m_ee1s;
}

} else {m_ee1 = ""; }

}

}

//CHANGE THE ORDER OF DISPLAY: BETTER MEANING>THIS ORDER>GUESS MEANING
//You can change the display name here also, for examle PE1 to whatever you name it.
// Call look up function for your dictionary here

if (hpe1 == 1) { lookupEachDict(pe1, voca_lowercase, "m_pe1", "u_pe1", "PE1"); }

if (hpv1 == 1) { lookupEachDict(pv1, voca_lowercase, "m_pv1", "u_pv1", "PV1"); }
if (hpe2 == 1) { lookupEachDict(pe2, voca_lowercase, "m_pe2", "u_pe2", "PE2"); }

if (hpv2 == 1) { lookupEachDict(pv2, voca_lowercase, "m_pv2", "u_pv2", "PV2"); }

//if (hpm2 == 1) { lookupEachDict(pm2, voca_lowercase, "m_pm2", "u_pm2", "PM2", "ZawgyiFont"); }
/*
@ The last parameter "ZawgyiFont" is used to tell the app to apply special custom font for this specific dictionary
@ It will add a class to the definitions of this dictionary. So custom styles can be applied for it.
@ To use this: find line: APPLY SPECIAL CUSTOM FONT FOR A SPECIFIC DICTIONARY and add your codes
@ And also need to declare your class's style for the custom class in the projector_style.css
*/

//if (hpm3 == 1) { lookupEachDict(pm3, voca_lowercase, "m_pm3", "u_pm3", "PM3", "ZawgyiFont"); }
//if (hpm4 == 1) { lookupEachDict(pm4, voca_lowercase, "m_pm4", "u_pm4", "PM4", "ZawgyiFont"); }

if (hpv3 == 1) { lookupEachDict(pv3, voca_lowercase, "m_pv3", "u_pv3", "PV3"); }

//if (hpm1 == 1) { lookupEachDict(pm1, voca_lowercase, "m_pm1", "u_pm1", "PM1", "ZawgyiFont"); }

if (hpd1 == 1) { lookupEachDict(pd1, voca_lowercase, "m_pd1", "u_pd1", "PD1"); }
if (hpg1 == 1) { lookupEachDict(pg1, voca_lowercase, "m_pg1", "u_pg1", "PG1"); }

if (hpc1 == 1) { lookupEachDict(pc1, voca_lowercase, "m_pc1", "u_pc1", "PC1"); }

/*
@ RESULT AND ORDER OF MEANINGS
*/

var word_ = "<font color='brown'><b style='font-size:120%'> <a name=\"" + word + "\">" + word + "</a></b></font>";

final_display_meaning = m_ee1 + all_better_meaning + all_guess_meaning;

/*
@ If found = 0, and fuzzySearchinword ==0. Tell user current setting Fuzzy-[NO]
*/
if ((final_display_meaning.length < 1) && (fuzzySearchinword == 0)) {

final_display_meaning += '<br><span style="text-size:2pt;color:grey;">Function fuzzy inWord(beta) was disabled.</span>';

}

writeme = "";//reset writeme
writeme = word_ + "<font color='grey'> [known " + found_count + "" + "|" + dict_in_use + " dictionaries]</font>" + " " + final_display_meaning;

if (found_count > 0) { known_totalword_parag++; }

//If popup single word
if (listMode == 0) {
var popupfixdel = document.getElementsByTagName("popupfix");
for (var p = 0; p < popupfixdel.length; p++) { popupfixdel[p].innerHTML = ""; }

/*
@ Thanks for the scrolling explaination at (overflow-y: scroll;max-height:50%;) at isherwood https://stackoverflow.com/a/18894650
*/

var smallpopup = "<popupfix><popupfix_del><div id=\"pid\" style=\"align:center;overflow-y: scroll;max-height:45%;padding:15px;position:fixed;top:0%;left:0%;right:0%;font-family: DejaVuSansCondensed;font-size:large; text-align:justify;font-weight:bold;background: #F7DBD0;border:1px solid orange;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;-o-border-radius:10px;\" >" + "<span align=\"left\" style=\" font-family:DejaVuSansCondensed;font-weight:normal;margin-top:0px;margin-bottom:0px; \">" + writeme + "</span><br></div></popupfix_del></popupfix>";

var popupfixdel = document.getElementsByTagName("popupfix");
popupfixdel[0].innerHTML = smallpopup;

}
//If list whole para

if ((listMode == 1) && (dualmode == 0)) {
//list

writemefinal += "<p class ='eachwmean' style='border:1px solid grey;padding:4px;background:white;font-size:large;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-o-border-radius:4px;'>" + writeme + " " + "</p>";
//border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;-o-border-radius:10px;
}

/*
@ Dual mode means: click on a word in the definition to clarify the definitions again
@  It is useful for further clarification of definition
*/

if ((listMode == 1) && (dualmode == 1)) {
//background choices #F7DBD0 #FFF2CC
//

var smallpopup_dualtop = "<popupfix><popupfix_del><div id=\"pid\" style=\"align:center;overflow-y: scroll;max-height:30%;padding:15px;position:fixed;top:0%;left:0%;right:0%;font-family:DejaVuSansCondensed;font-size:large; text-align:justify;font-weight:bold;background:#FFF2CC;border:2px dashed brown;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-o-border-radius:4px;\" >" + "<span align=\"left\" style=\" font-family:DejaVuSansCondensed;font-weight:normal;margin-top:0px;margin-bottom:0px; \">" + writeme + "</span><br></div></popupfix_del></popupfix>";

var popupfixdel = document.getElementsByTagName("popupfix");
popupfixdel[0].innerHTML = smallpopup_dualtop;
}

}//look up function ends

/*
@ function popup rolling paragraph
*/

function fp() {

//background: #EEBDAA
//background: #F7DBD0
//background: #1f3763;//same with body
//background: #FFF2CC
//found tell #CCCAC5
//found #CEC9B8

//#F7DBD0 #FFF2CC

//Method to add span to word with <span>
//reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
//para_text_click = "";
//para_text_click = para_text2.replace(rex,"<span>"+"$1"+"</span>");

parawith_percent = "<popupfixbottom><popupfixbottom_del><div id=\"pid\" style=\"align:left;color:#FFF2CC;overflow-y: scroll;max-height:50%;padding:15px;position:fixed;bottom:0%;left:0%;right:0%;font-family: DejaVuSansCondensed;font-size:x-large; text-align:justify;font-weight:bold;background:#F7DBD0;border:2px solid orange;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-o-border-radius:4px;\" >" + "<span align=\"left\" style=\" font-family:DejaVuSansCondensed;color:#1f3763;font-weight:bold;\">" + "<span style='text-size:1pt;color:orange;margin-top:-10%;'><sup><sup><c> X </c></sup></sup></span>" + para_text + "</span><span style='color:grey;'>" + knownwp_short + "</span></font><br></div></popupfixbottom_del></popupfixbottom>";

var popupfixdel = document.getElementsByTagName("popupfixbottom");
//for (var p = 0; p < popupfixdel.length; p++) { popupfixdel[p].innerHTML = ""; }

//sbtext.innerHTML = formstart + para_text + formend;
popupfixdel[0].innerHTML = parawith_percent;

//document.write.innerHTML = localStorage.setItem(floatingpara_no_str,n);

} //end function

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
var viewr_m = localStorage.getItem("viewr_m");
if ((viewr_m == 1)) { viewMM(); }
var viewr_t = localStorage.getItem("viewr_t");
if ((viewr_t == 1)) { viewThai(); }
var viewr_s = localStorage.getItem("viewr_s");
if ((viewr_s == 1)) { viewSri(); }
var viewr_d = localStorage.getItem("viewr_d");
if ((viewr_d == 1)) { viewDevar(); }
$('#loader').fadeOut(); //give extra 2 seconds for data ready
//$('#loader').remove();

});

/*****
@ May all be well and happy!
@ Pali Tipitaka Projector
@ Dec 2017 - April 2018
@ Pyin Oo Lwin, Mandalay, Myanmar
****/
    