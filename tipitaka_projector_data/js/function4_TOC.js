function Message(tr_no) { 
	val = parseInt(tr_no); 

	var msg = 'Id' + val;		// id no
	var para = 0;		// para number;
	for (para=(P_Par.length-1); 0<para; para--) {
		if (P_Par[para] != null) {
			v1 = parseInt(P_Par[para].substring(1));
			if (v1 <= val) {
				msg = msg + '.Para' + para;
				break;
			}
		}
	} 	  
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
	document.getElementById('message').innerHTML = msg;
}

function goToc() {

	var val = document.getElementById('Toc').value;

	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ('0' + today.getMinutes()).slice(-2);


	gPaliHistoryItem.paraNo = P_Toc[val];
	gPaliHistoryItem.html_no = html_no;



	var str = 	TOC_Dropdown_Items[val];//direct array that filled drop down items

	gPaliHistoryItem.Toc_Name = str.replace(/_/g,''); 

	writeHistoryStorage();
	

	window.location = '#' + P_Toc[val];	// P_Toc convert to Id
	Message(P_Toc[val].substring(1));
	PaliHistoryList();
}


function goUrl() {
	var p1 = document.getElementsByName('Reference');
	var val = parseInt(document.getElementById('PageNo').value);
	var url;

	var old = '@' + localStorage.getItem('palihistory');
	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2) + ('0' + today.getMinutes()).slice(-2);

	if (p1[1].checked == true) {	
		if (P_Par[val] !== undefined) 	{// Paragraph will convert into Id
			document.write = localStorage.setItem('palihistory', date + '_' + html_no + '.htm#' + P_Par[val]+ old);
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
			document.write = localStorage.setItem('palihistory', date + '_' + html_no + '.htm#M' + html_no + '_' + val + old);
			url = 'M' + html_no +'_' + val;
		} else { 						// PTS Page
			document.write = localStorage.setItem('palihistory', date + '_' + html_no + '.htm#P' + html_no + '_' + val + old);
			url = 'P' + html_no +'_' + val;
		} 
		var tr = document.getElementsByClassName('r1');
		for (var i=0; i<tr.length; i++) {
			//alert(tr[i].innerHTML + '  ' + url);
			if (tr[i].innerHTML.indexOf(url) != -1) {
				document.getElementById('p' + (i +1)).scrollIntoView();
				GetTrId(i);
				break;
			}
		}
	}
}

function PaliHistoryList() {
	var PaliHistoryArray = [];
	PaliHistoryArray = JSON.parse(localStorage.getItem('PaliHistoryJSON'));
	if (PaliHistoryArray != null){// use JSON objects instead
		var showurl = '';
		var i = PaliHistoryArray.length - 1;

		for (i in PaliHistoryArray) {
			if (PaliHistoryArray[i] != 'null'){
				showurl = showurl + '<span style="white-space: nowrap;\" onClick="PaliHistoryGoUrl(\'' + PaliHistoryArray[i].html_no + "#" + PaliHistoryArray[i].paraNo +  '\');"">'
				//showurl = showurl + PaliHistoryArray[i].date + '&nbsp;'; // date
				//
				showurl = showurl + toTranslate(T_Book[PaliHistoryArray[i].html_no]);//pass html_no to get the title of book
				showurl = showurl + '&nbsp;' +'/ '  + PaliHistoryArray[i].Toc_Name;
				showurl = showurl + '&nbsp;#';
				showurl = showurl + PaliHistoryArray[i].paraNo + '</span><br>';
			}
		}
		showurl = '&nbsp;<span style="font-size:10.5pt;" onClick="PaliHistoryClear(0)">&nbsp;<img src="images/b_drop.png">Clear All</span><br>' + showurl;
		document.getElementById('palihistory').innerHTML = showurl;


	}

}

function PaliHistoryClear(val) {
	document.write = localStorage.setItem('PaliHistoryJSON', '');
	document.getElementById('palihistory').innerHTML = ''; 
}

function PaliHistoryGoUrl(val) {
	file = val.substring(0,4);
	pos = val.substring(4);
//html_no
// para_no

	if (html_no == file ) {		// same doc file
		if (pos.indexOf('p') != -1) {	// directly jump
			window.location = pos;
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
	} else {
		document.write = localStorage.setItem('history_pos', pos);
		 var Thelocation = pos.substring(1);
		if (document.getElementById('QuickJumpNewTab').checked == true) {
			loadBook(file);
			document.getElementById(Thelocation).scrollIntoView();
		} else {
			loadBook(file);		
			document.getElementById(Thelocation).scrollIntoView(); // I will fix the logic for this later.. only need this line after
									// any of the load books and just have this be a drop default.
		
		}
		
	}	
}

function QuickJump() {
	input = document.getElementById('QuickJump').value.trim().toLowerCase();

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
}


function QuickJumpTips() {
	key = document.getElementById('QuickJump').value.trim().toLowerCase();
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
	document.getElementById('QuickJumpTips').innerHTML = val;

	//document.getElementById('QuickJump').value = key + ' ';
}



function SetupToc() {
    const options = TOC_Dropdown_Items.map((item, index) => `<option value="${index}">${item}</option>`);
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
				 HistoryJSONArray.splice(i,1);	
			} 
		}
		// new item goes to beginning
		HistoryJSONArray.unshift(gPaliHistoryItem);
	
	
		document.write = localStorage.setItem('PaliHistoryJSON', JSON.stringify(HistoryJSONArray));	
	
		PaliHistoryList(); // refresh the list // maybe needed on book load.
	
	}
	