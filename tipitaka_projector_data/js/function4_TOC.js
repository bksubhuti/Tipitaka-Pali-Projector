function Message(tr_no) { 
	if (typeof P_HTM == 'undefined') { 
		return;
	}

	val = parseInt(tr_no); 

	var msg = 'Id' + val;		// id no
	var para = 0;		// para number;
	for (para=(P_Par.length-1); 0<para; para--) {
		if (P_Par[para] != null) {
			v1 = parseInt(P_Par[para].substring(1));
			if (v1 <= val) {
				break;
			}
		}
	} 	
	
	// fix for para num if it is TOC
	// search for id in TOC if TOC is found the same as ID
	// and ID is one less.. then increment the MyanmarParaNum
	for (var i= 0; i<P_Toc.length; i++){
		if (P_Toc[i] == 'p'+val){
			para++; // it is found in toc and need to increment one more.
			break;
		}
	} 
	msg = msg + '.Para' + para;

	// write local storage the myanmar paragraph number
	localStorage.setItem("MyanmarParNum",para);

	var toc = 0;		// myanmar page number;
	for (toc=(val); 0<toc; toc--) {
		if (P_Tag[toc] != undefined) {
			v1 = P_Tag[toc].indexOf('[Pg.');
			if (v1 != -1) {
				msg = msg + '.M' + parseInt(P_Tag[toc].substring(v1 +4));
				break;
			}	
		}
	} 	  
	var toc = 0;		// PTS page number;
	for (toc=(val); 0<toc; toc--) {
		if (P_Tag[toc] != undefined) {
			v1 = P_Tag[toc].indexOf('[PTS.');
			if (v1 != -1) {
				msg = msg + '.PTS' + parseInt(P_Tag[toc].substring(v1 +5));
				break;
			}	
		}
	} 	  
	$('#IdMessage').html(msg);
}

function goToc() {

	var val = $('#Toc').val();
	str = 	TOC_Dropdown_Items[val];//direct array that filled drop down items
	gPaliHistoryItem.Toc_Name = str.replace(/_/g,''); 

	PaliHistoryGoUrl(html_no + "#" + P_Toc[val]);

}


function goUrl() {
	var p1 = document.getElementsByName('Reference');
	var val = parseInt($('#PageNo').val());
	var url;

	//var old = '@' + localStorage.getItem('palihistory');
	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2) + ('0' + today.getMinutes()).slice(-2);

	if (p1[1].checked == true) {	
		if (P_Par[val] !== undefined) 	{// Paragraph will convert into Id
			//document.write = localStorage.setItem('palihistory', date + '_' + html_no + '.htm#' + P_Par[val]+ old);
			window.location = '#' + P_Par[val];
			GetTrId(P_Par[val].substring(1));
		} else {
			lenx = parseInt(val);
			for (var i=lenx; 0<i; i--) {
				if (P_Par[i] != undefined) {
					window.location = '#' + P_Par[i];
					GetTrId(P_Par[i].substring(1));
					break;
				}
			}
		}
	} else {	// Myanmar Page or PTS Page
		var url = '';
		if (p1[0].checked == true) { 	// Myanmar Page
			//document.write = localStorage.setItem('palihistory', date + '_' + html_no + '.htm#M' + html_no + '_' + val + old);
			url = 'M' + html_no +'_' + val;
		} else { 						// PTS Page
			//document.write = localStorage.setItem('palihistory', date + '_' + html_no + '.htm#P' + html_no + '_' + val + old);
			url = 'P' + html_no +'_' + val;
		} 
		var tr = document.getElementsByClassName('r1');
		for (var i=0; i<tr.length; i++) { 
			if (tr[i].innerHTML.indexOf(url) != -1) {
				document.getElementById('p' + (i +1)).scrollIntoView();
				GetTrId(i);
				break;
			}
		}
	}
}

function PaliHistoryList() {
	if (isNaN(html_no) === false) {
		var url = '';
		var strLastHistory = localStorage.getItem('LastHistory');
		if (strLastHistory) {
			url += '<img src="images/reset.png" width="16">' 
			url +='<a href="javascript:void(0);" onClick="PaliHistoryGoUrl(\'' + strLastHistory + '\');"> Latest</a>';
		} 
		$('#LastHistory').html(url);	

		var PaliHistoryArray = [];
		PaliHistoryArray = JSON.parse(localStorage.getItem('PaliHistoryJSON'));
		if (PaliHistoryArray != null){// use JSON objects instead
			var url = '';
			url += '<br>';

			for (i in PaliHistoryArray) {
				url += '<span style="white-space: pre;">';
				url += '<input type="checkbox" id="PaliHist' + i + '" unchecked value="' + PaliHistoryArray[i].html_no + '"/>';
				url += '<a href="javascript:void(0);" onClick="PaliHistoryGoUrl(\'' + PaliHistoryArray[i].html_no + "#" + PaliHistoryArray[i].paraNo +  '\');" title="' + bookData.flat[PaliHistoryArray[i].html_no].title + '">' 
				url += toTranslate(bookData.flat[PaliHistoryArray[i].html_no].title); //pass html_no to get the title of book
				url += '&nbsp;' +'/ '  + toTranslate(PaliHistoryArray[i].Toc_Name);
				url += '&nbsp;#';
				url += PaliHistoryArray[i].paraNo + '</a><br>';
				url += '</span>';
			} 
			$("#palihistory").html(url);
		}
	}

}

function PaliHistoryClear(type) {
	if (type == 'All') {
		document.write = localStorage.setItem('PaliHistoryJSON', '');
		$('#palihistory').html('');
	} else {
		var strHistory = "";
		var strPaliHistory = localStorage.getItem('PaliHistoryJSON');
		var PaliHistoryArr = [];
		if (strPaliHistory){
			PaliHistoryArr = JSON.parse(strPaliHistory); 

			var ary = [];
			var cx = 0;
	 
	        var len = PaliHistoryArr.length -1;
	        for (i=len; 0<=i; i--) {
	        	var e = document.getElementById('PaliHist' + i);
	            if (e.checked == true){
	            	ary[cx] = i;
	            	cx = cx +1;
	            } 
	        } 
	        for (i in ary) {
	        	PaliHistoryArr.splice(ary[i], 1);
	        }

			localStorage.setItem('PaliHistoryJSON', JSON.stringify(PaliHistoryArr));
			PaliHistoryList();
		} 
	}	
}


function PaliHistoryCopy() {
	var strHistory = "";
	var strPaliHistory = localStorage.getItem('PaliHistoryJSON');
	var PaliHistoryArr = [];
	if (strPaliHistory){
		PaliHistoryArr = JSON.parse(strPaliHistory); 

        var len = PaliHistoryArr.length;
        for (i in PaliHistoryArr) {
        	var e = document.getElementById('PaliHist' + i).checked;
            if (e == true){        
                strHistory = strHistory + PaliHistoryArr[i].date + "\t";
                strHistory = strHistory + PaliHistoryArr[i].html_no + "\t";
                strHistory = strHistory + toTranslate(bookData.flat[PaliHistoryArr[i].html_no].title) + "\t";
                strHistory = strHistory + PaliHistoryArr[i].paraNo + "\t";
                strHistory = strHistory + PaliHistoryArr[i].Toc_Name + "\n";  
            }
        }
 
		$('#CopyText').val(strHistory); 
	}
	$('#CopyText').select();
    
    change_tab('page5');

    $('#CopyText').select();
    document.execCommand('copy'); 
}

function PaliHistoryGoUrl(val) {
	var Booktoload    = "";
	var MyanmarParaNo = "";
	var PositionToGo  = "";
	var str ="";
	gPaliHistoryItem.Toc_name = "id/para num";


	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ('0' + today.getMinutes()).slice(-2);


	if (val.substring(0,2) == 'qj')
	{
		Booktoload= val.substring(2,6);
		if (tocnum < 9000){
			loadBook(Booktoload, () => {
					PositionToGo =  P_Toc[tocnum];
					str = 	TOC_Dropdown_Items[tocnum];//direct array that filled drop down items
					gPaliHistoryItem.Toc_Name = str.replace(/_/g,''); 
					window.location = "#" + PositionToGo;
					gPaliHistoryItem.paraNo = PositionToGo;
					writeHistoryStorage();
					toGetScrollId();

				});									// any of the load books and just have this be a drop default.
		}
		else{  // AN book
			// it is angutara  .. subtract 10,000 to get paragraph number.
			tocnum = tocnum -10000;
			//PositionToGo =  "para" +  tocnum.toString();
			loadBook(Booktoload, () => {
				// set the title as "Number + para" instead of name... no TOC
				gPaliHistoryItem.Toc_Name = "Number "+ tocnum.toString(); 
				window.location = "#" + P_Par[tocnum];
				gPaliHistoryItem.paraNo = PositionToGo;
				writeHistoryStorage();	
				toGetScrollId();
	
			});
				
		}
	}else{ // not quick jump

		Booktoload = val.substring(0,4);
		if (val.search("#")== -1){
			PositionToGo = "p" + val.substring(4);
		}else{
			PositionToGo = val.substring(5);
		}

		// now load the book if needed
		// set scroll position
		// set variables in storage to go back to myanmar parano
		// This is always a jump.. so always set tr_id to "" and MyanmarParano

		if (html_no == Booktoload ) {		// same doc file
			window.location = "#" + PositionToGo;
			gPaliHistoryItem.paraNo = PositionToGo;
			writeHistoryStorage();
			toGetScrollId();
	

		}
		else{
			loadBook(Booktoload, () => {
				if (PositionToGo.substring(0, 4) == 'para') {
					window.location = "#" + P_Par[parseInt(PositionToGo.substring(4))];
				} else {
					window.location = "#" + PositionToGo;
				}
				gPaliHistoryItem.paraNo = PositionToGo;
				writeHistoryStorage();
				toGetScrollId();
				});									// any of the load books and just have this be a drop default.
		}
	}

/*
		} else {	// myanmar or PTS page no jump
			if ((pos.indexOf('M') != -1) || (pos.indexOf('P') != -1)) {
				pos = val.substring(9);		// M9999_9
				var tr = document.getElementsByClassName('r1');
				for (var i=0; i<tr.length; i++) {
					if (tr[i].innerHTML.indexOf(pos) != -1) {
						document.getElementById('p' + (i +1)).scrollIntoView();
						break;
					}
				}
			} else {		//  R= go to paragraph no
			    loc = pos.substring(2);	// loc=R12
				loc = P_Par[loc];		// loc=p123
				loc = loc.substring(1);	// loc=123
				for (i=(P_Par.length-1); 0<i; i--) {
					v1 = parseInt(P_Par[i].substring(1));
					//alert(v1);
					if (v1 <= loc) {
						document.getElementById(P_Par[i]).scrollIntoView();
						break;
					}
				}
			}	
		}
	}	


*/

}



function findquickjump(qj) {
    for (i = 0; i < gDNJSON.length; i++) {
        if (gDNJSON[i].QuickJump == qj) {
            return gDNJSON[i];
        }
    }
    return -1;
}


function makeQuickJumpTables(){
	 
	input = $('#QuickJump').val().trim().toLowerCase();
	var s = "";
	var suttanum = parseInt(input.substring(2)) -1;
	var sectionnum = 0;
	var x = 0;

	if (input.substring(0,2)== "mn"){
		for (x in TOC_Dropdown_Items){
			if (1){
				let num = parseInt(TOC_Dropdown_Items[x].substring(4,5)); //or just Number.parseInt
				if(!isNaN(num)) {  // first is number this is a higher sutta number
					suttanum=suttanum +1;
					sectionnum = 0;
					s = s + "mn" + suttanum.toString() + "," + x.toString() + ','  + html_no + ',' + TOC_Dropdown_Items[x] +  '\n' ;
					s = s + "mn" + suttanum +'.'+ sectionnum.toString() +  "," + x.toString() + ','  + html_no + ',' + TOC_Dropdown_Items[x] + '\n';
					//console.log(s);
				}else{
					sectionnum = sectionnum + 1;
					s = s + "mn" + suttanum +'.'+ sectionnum.toString() +  "," + x.toString() + ','  + html_no + ',' + TOC_Dropdown_Items[x] + '\n';
					//console.log(s);

				}
			}
		}
	
	}

	var samyuttano = parseInt(input.substring(2)) -1;
	var huh = input.substring(0,2);
	if (input.substring(0,2)== "sn"){
		for (x in  TOC_Dropdown_Items){
			if (TOC_Dropdown_Items[x].includes("saṃyuttaṃ") ){  // first character is a number  = samyutta
				
				// increase the samyutta number
				samyuttano++;
				suttanum = 0;
			}
			if (TOC_Dropdown_Items[x].includes("vaggo") ){
				// do nothing.. 
			
			}
			if (TOC_Dropdown_Items[x].includes("suttaṃ") ) {
				suttanum++;
				s = s + "sn" + samyuttano.toString() + "." + suttanum.toString() + "," + x.toString() + "," + html_no + "," + TOC_Dropdown_Items[x] +  "\n" ;		
			}	
			if (TOC_Dropdown_Items[x].search(/\d+-\d+/) != -1) {

				var sran = TOC_Dropdown_Items[x].match(/\d+-\d+/) + ""; // make string.
				var strnumrangeArr = sran.split("-");
				
				// there will be a start and end
				var iStart = parseInt(strnumrangeArr[0]);
				var iEnd = parseInt(strnumrangeArr[1]);

				var subx = 0;
				for (subx=iStart; subx <= iEnd; subx++){
					suttanum++;
					s = s + "sn" + samyuttano.toString() + "." + suttanum.toString() + "," + x.toString() + "," + html_no + "," + TOC_Dropdown_Items[x] +  "\n" ;		
				}


			}// 	
		}// for loop


	}// if sn type

    var blob = new Blob([s], {type: "text/plain;charset=utf-8"});
    saveAs(blob, input.substring(0,2) + parseInt(input.substring(2)) +  ".csv");



}

function QuickJump() {
	//makeQuickJumpTables();
	//return;
 
	input = $('#QuickJump').val().trim().toLowerCase();
	

	if (input.substring(0,2) == "an"){
		var strnumsut =  input.match(/\d+.\d+/) + "";
		var stranarr =  strnumsut.split(".");
		var book = stranarr[0];
		var sutta = stranarr[1];
		var filenum =0;
		
		filenum = 5100 + parseInt(book);  // 5101 is book of ones , 5102 is book of twos
		tocnum = 10000 + parseInt(sutta); // 10,000 is a code to look for
		PaliHistoryGoUrl("qj"+ filenum + 'para' + sutta); // test for quick jump works..

	}
	else{
		var qjson= findquickjump(input);
		tocnum =  parseInt(qjson.TOC);
		PaliHistoryGoUrl("qj"+ qjson.File); // test for quick jump works..
	}


	/*
	var dot = input.lastIndexOf('.'); 	// for direct jump into sutta no
	var dot_para = '0';
	if (dot != -1) {
		dot_para = input.substring(dot+1, 99);
		input=input.substring(0, dot);
	} 

	key = input;
	var reg1 = /\./g;
	key = key.replace(reg1, ' ');
	var reg1 = /\;/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\-/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\‘/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\’/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\  /g;
	key = key.replace(reg1, ' ');  

	var ary = key.split(' ');		//sutta + 99 || sutta + M99  || sutta + PTS99

	sutta = '';
	length = ary[0].length;
	keyin = ary[0];			// sutta Abbreviated
	T_Jump.sort();
	for (i in T_Jump) {
		k1 = i.split(' ')[0];
		if (keyin == k1) {
			sutta = T_Jump[i];
			break;
		}
	}

	if (sutta != '') {
		para_M_PTS = key.substring(length+1);	// remove sutta Abbreviated

		no = '';
		for (i=0; i<para_M_PTS.length; i++) {
			s1 =para_M_PTS[i];
			if (('0' <= s1) && (s1 <= '9')) {
				no = no + s1;
			}
		}
		if (no == '') {
			no = '1';
		}

		if (dot_para == '0') {			
			if (ary[1].substring(0, 1) == 'm') {
				para_M_PTS = sutta + '.htm#'+ 'M' + sutta + '_' + no;	// M=myanmar page
			} else {
				if ((ary[1].substring(0, 1) == 'p') || (ary[1].substring(0, 3) == 'pts')) { 
					para_M_PTS = sutta + '.htm#'+ 'P' + sutta + '_' + no;	// P=pts page
				} else {
					para_M_PTS = sutta + '.htm#'+ 'R' + no;	//	R=para number
				}
			}	
		} else {
			P_Sno['3103_103'] = '85';
			no = '';
			var k1 = '_' + ary[1];
			var lenx = k1.length;
			for (i in P_Sno) {
				if (i.slice(-lenx) == k1) {
					no = P_Sno[i];
					break;
				}
			}

			if (no == '') {
				para_M_PTS = '';
			} else {
				no = parseInt(no) + parseInt(dot_para);
				sutta = i.substring(0, 4);
				para_M_PTS = sutta + '.htm#p' + no;		//	p=id number
			}	
			//alert(para_M_PTS);
		}	
		if (para_M_PTS != '') {
			var old = '@' + localStorage.getItem('palihistory');
			var today = new Date();
			var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ('0' + today.getMinutes()).slice(-2);
			document.write = localStorage.setItem('palihistory', date + "_" + para_M_PTS + old) ;
			PaliHistoryGoUrl(para_M_PTS);
		}	
	}

*/
}


function QuickJumpTips() { 
	key = $('#QuickJump').val().trim().toLowerCase();
	var reg1 = /\./g;
	key = key.replace(reg1, ' ');
	var reg1 = /\;/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\-/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\‘/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\’/g;
	key = key.replace(reg1, ' ');
	var reg1 = /\  /g;
	key = key.replace(reg1, ' ');  

	val = ' ';
	var ary = key.split(' ');
	keyin = ary[0];
	length = ary[0].length;
	T_Jump.sort();
	for (i in T_Jump) {
		k1 = i.split(' ')[0];
		if (keyin == k1.substring(0, length)) {
			if (val.indexOf(' ' + k1 + ',') == -1) {
				val = val + k1 + ', ';
			}	
		}
	}
	val = val.trim(); 
	$('#QuickJumpTips').html(val);
 
}


function SetupToc() {

	var aryTranslated = toTranslate(TOC_Dropdown_Items.join()).split(',');


    //const options = TOC_Dropdown_Items.map((item, index) => `<option value="${index}">${item}</option>`);
    const options = aryTranslated.map((item, index) => `<option value="${index}">${item}</option>`);
	document.getElementById('Toc').innerHTML = options;

}



///////////////////////////////////////////////////////
/// function writeHistoryStorage
// will manage unique list and put recent one up top
// if duplicate wants to be added
////////////////////////////////////////////////////////
function writeHistoryStorage(){
	// duplicates for now okay until I learn 
	// some() and shift()
	gPaliHistoryItem.html_no = html_no;

	
		var today = new Date();
		var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ('0' + today.getMinutes()).slice(-2);
		gPaliHistoryItem.date = date;
	
		var HistoryJSONArray = [];
		var oldHistoryJSONString = localStorage.getItem('PaliHistoryJSON');
	
		if (oldHistoryJSONString){
			HistoryJSONArray  = JSON.parse(oldHistoryJSONString);
		}
	

		var i=0;
		// Check to see if it exists already.. if so we need to shift it up top  shift/push
		for (i in  HistoryJSONArray){
			if ( (HistoryJSONArray[i].html_no == gPaliHistoryItem.html_no) &&  ( HistoryJSONArray[i].paraNo == gPaliHistoryItem.paraNo ) ){
				//found.. take it out and push to beginning later. 
				 var ar =  HistoryJSONArray.splice(i,1);
				 gPaliHistoryItem = ar[0];	
			} 
		}
		// new item goes to beginning
		HistoryJSONArray.unshift(gPaliHistoryItem);
	
	
		document.write = localStorage.setItem('PaliHistoryJSON', JSON.stringify(HistoryJSONArray));	
	
		PaliHistoryList(); // refresh the list // maybe needed on book load.
	
	}

// global var...
var tocnum;
var gDNJSON;
///////////  global variables

$.ajax({
	url: 'js/quickjump.json',
	dataType: "text",
	type: "GET",
	mimeType: 'text/json; charset=utf-8',
	contentType: 'text/json; charset=UTF-8',
	success: function(json) {
		gDNJSON = JSON.parse(json);
	}
});
