function MyNoteList() {
	$('#pg4_page2_desc').css('display', 'inline');
	if (typeof P_HTM != 'undefined') {	// lines
		//var ShowAll = $('#AllBooksMyNote').is(":checked");
		var url = '';
		var ary = [];
		var ary2 = [];

		right_Selected = $('#AllBooksMyNote').val().split('_')[0];	// English, SuttaCentral, Taiwan, Chinese, MyNote
		right_Range = $('#AllBooksMyNote').val().split('_')[1];		// this or All

		if (right_Range == 'All') {
			ShowAll = true;
		} else {
			ShowAll = false;
		}

		if ('English, SuttaCentral, Taiwan, Chinese, MyNote'.indexOf(right_Selected) != -1) {
			ary[0] = right_Selected;
		} else {
			if (right_Selected == 'All') {
				ary[0] = 'English';
				ary[1] = 'SuttaCentral';
				ary[2] = 'Taiwan';
				ary[3] = 'Chinese';
				ary[4] = 'MyNote';
			} else {
				ary[0]= localStorage.getItem('view_right');
			}
		}

		// font color
		ary2['English'] = "color:rgb(255, 0, 0)";
		ary2['SuttaCentral'] = "color:rgb(0, 128, 0)";
		ary2['Taiwan'] = "color:rgb(0, 0, 255)";
		ary2['Chinese'] = "color:rgb(128, 0, 0)";
		ary2['MyNote'] = "color:rgb(0, 0, 0)";

		// 
		search = $('#MyNoteSearch').val().trim().toLowerCase();
		$('#MyNoteSearch').val(search);


		for (j in ary) {
			var MyNoteArray = [];		//localStorage.getItem("view_right")
			MyNoteArray = JSON.parse(localStorage.getItem(ary[j]));
			if (MyNoteArray != null) {// use JSON objects instead
				if (0 < MyNoteArray.length) {

					for (i in MyNoteArray) { 

						if (MyNoteArray[i].html_no != html_no && ShowAll==false ){
							;// do nothing
							// only show the books that match html_no
						}
						else{ 
							content = MyNoteArray[i].val.replace(/<br>　　/g, '').replace(/<\/?[^>]+(>|$)/g, '').trim();

							if (content != '') {
								if ((search == '') || ((search != '') && (content.indexOf(search) !== -1))) {
									url += '<input type="checkbox" id="MyNoteSel' + MyNoteArray[i].html_no + MyNoteArray[i].TrId + '" unchecked value="' + MyNoteArray[i].TrId + '"/>'; 
									url += '<a href="javascript:MyNoteGoURL(\'' + ary[j] + '_' + MyNoteArray[i].html_no + '#p' + MyNoteArray[i].TrId +'\');" style="' + ary2[ary[j]] + '">&nbsp;&nbsp;';
									url +=  toTranslate(bookData.flat[MyNoteArray[i].html_no].title) + "@" + MyNoteArray[i].TrId + "&nbsp;";
									url += content;

									url += '</a><br>';
								}
							}
						}
					} 
				}	
			} 
		}


		$('#MyNoteList').html(url);
	}
}


function isEditable() {
	if ('English;SuttaCentral;Taiwan;Chinese;MyNote'.indexOf(localStorage.getItem('view_right')) == -1) {
		alert('You must set right_view in preferences to "English / SuttaCentral / Traditional Chinese / Simpled Chinese / MyNote" to make notes');
		return (false);
	} 
	return (true)
}

function MyNoteEdit() { 
	if (isEditable() == false) {return;}	 
	

	if (typeof(P_HTM) != 'undefined') {	// lines

		$('#MyNoteLeftPanel').css('display', 'none');

		$('#MyNoteSaveBtn').css('display', 'inline-block');
		$('#MyNoteEditBtn').css('display', 'none');
		$('#MyNoteCopyBtn').css('visibility', 'hidden');
		$('#MyNoteCancelBtn').css('display', 'inline-block');
		$('#MyNoteClearBtn').css('visibility', 'hidden');
		$('#MyNoteClearABtn').css('visibility', 'hidden');
		$('#AllBooksSelect').css('display', 'none');
		$('#MyNoteExportBtnJs').css('display', 'none');
		$('#MyNoteExportBtnDoc').css('display', 'none');
		$('#MyNoteExportBtnDoc2').css('display', 'none');

		$('#MyNoteSave').css('display', 'inline');
		$('#MyNoteCancel').css('display', 'inline');

		//
		$('#MyNotePanel').css('display', 'inline'); 

		MyNoteCheckClear();

		var tr_ids = '';
		var first = '';
		var k1 = 20;
		var s1 = Number(localStorage.getItem('tr_id'));
		var s2 = P_HTM.length;

		var sec = '0';
		for (i in M_RANGE) {
			if ((parseInt(M_RANGE[i]) <= s1) && (s1 <= parseInt(i))) {
				sec = i;
				break;
			}
		} 
		if (sec != '0') {
			s2 = Math.min(parseInt(sec), parseInt(s2));
		}
		$('#MyNoteSection').val(sec);


		if ((sec != '0') && (typeof $('#MyNoteQueueMoveUp' + sec) !== 'undefined')) {
			$('#MyNoteQueueMoveUp' + sec).css('display', 'inline');

		}

		var tr = document.getElementById('main_table').getElementsByTagName("tr");

		for (i=s1; i<=s2; i++) {   
			if (P_HTM[i] != undefined) {
				tr_ids = tr_ids + ';' + i ;		// keep tr_id & HTML Tag
				if (first == '') {
					first = i;
				}  
				
				$('#MyNoteCheckbox' + i).css('display', 'inline'); 
				$('#m1_' + i).css('display', 'none');
				if ($('#noteH' + i).val() == '0') {
					$('#note' + i).css('height', tr[i -1].offsetHeight + 'px');
					$('#noteH' + i).val(tr[i -1].offsetHeight);
					//$('#p' + i).html($('#p' + i).html() + tr[i -1].offsetHeight );
				}
				$('#note' + i).css('display', 'inline'); 

				k1 = k1 -1;
				if (k1 == 0) {
					break;
				}
			}
		}   
		$('#MyNoteIds').val(tr_ids.substr(1));
		tr_ids = tr_ids + ';';

		//
		var MyNoteArray = [];
		MyNoteArray = JSON.parse(localStorage.getItem(localStorage.getItem("view_right")));
		if (MyNoteArray != null) {// use JSON objects instead
			for (i in MyNoteArray) { 
				if (MyNoteArray[i].html_no == html_no) {
					if (tr_ids.indexOf(';' + MyNoteArray[i].TrId + ';') != -1) {
						v1 = AddSpace(MyNoteArray[i].val, '\n');
						$('#note' + MyNoteArray[i].TrId).val(v1);
					}
				}
			} 
		} 

		$('#note' + first).focus();
	}
}
  

function MyNoteSaveCancel(key) { 	// Save or Cancel
 
	$('#MyNoteLeftPanel').css('display', 'inline');

	$('#MyNoteSaveBtn').css('display', 'none');
	$('#MyNoteEditBtn').css('display', 'inline-block');
	$('#MyNoteCopyBtn').css('visibility', '');
	$('#MyNoteCancelBtn').css('display', 'none');
	$('#MyNoteClearBtn').css('visibility', '');
	$('#MyNoteClearABtn').css('visibility', '');
	$('#AllBooksSelect').css('display', 'inline');

	$('#MyNoteExportBtnJs').css('display', 'inline-block');
	$('#MyNoteExportBtnDoc').css('display', 'inline-block');
	$('#MyNoteExportBtnDoc2').css('display', 'inline-block');

	$('#MyNoteLinkStart').css('display', 'inline'); 
	$('#MyNoteLinkEnd').css('display', 'none'); 
	$('#MyNoteLinkOff').css('display', 'inline'); 
	$('#MyNoteLinkId').css('display', 'none'); 
	$('#MyNoteLinkSave').css('display', 'none'); 
	$('#MyNoteLinkCancel').css('display', 'none'); 
	$('#LinkIdFrom').html('');
	$('#LinkIdTo').html('');
	$('#MyNoteLinkMessage').css('display', 'none');
	$('#MyNoteLinkMessage').html('');
	$('#MyNotePanel').css('display', 'none'); 

	//
	var tr_ids = ';' + $('#MyNoteIds').val() + ';';
	var ary_Ids = $('#MyNoteIds').val().split(';');	
	for (i in ary_Ids) {
		$('#MyNoteCheckbox' + ary_Ids[i]).css('display', 'none'); 
		$('#m1_' + ary_Ids[i]).css('display', 'inline');
		$('#note' + ary_Ids[i]).css('display', 'none');
	}

	var MyNoteSection = $('#MyNoteSection').val();

	$('#MyNoteQueueMoveUp' + MyNoteSection).css('display', 'none'); 

	if ((MyNoteSection != '0') && (typeof $('#MyNoteQueueMoveUp' + MyNoteSection) !== 'undefined')) {
		$('#MyNoteQueueMoveUp' + MyNoteSection).css('display', 'none');
	}

	if (key == 'Save') {	//save 
		if (MyNoteSection == '0') {		// all books
			start = 1;
			end = P_HTM.length;
		} else {						// only in section
			start = parseInt(M_RANGE[MyNoteSection]);
			end = MyNoteSection;
		}

		for (i=start; i<=end; i++) {
			if ($('#note' + i).length > 0) {		// !undefined && !null
				v2 = RemoveSpace($('#note' + i).val(), '<br>');
				v2 = v2.replace(/\<supA\>/g, "<sup stAddSpaceyle='color:blue;' onClick=\"DspNote('");
				v2 = v2.replace(/\<supB\>/g, "')\">");
				v2 = v2.replace(/\<supC\>/g, "</sup>");
				v2 = AddSpace(v2, '<br>');
				$('#m1_' + i).html(v2); 

				v1 = AddSpace($('#note' + i).val(), '\n');
				$('#note' + i).val(v1); 
			}
		}   

	    var jMyNoteData = {html_no:"", TrId:"", val:""};
		var MyNoteData = [];   
		var MyNewNoteData = [];
		

		// This original code is written to rewrite the whole of items for the book.
		//  we will delete all data from array that matches 
		// html_no and then rewrite them again. easiest way to code but not so elegant.
		
		// get from MyNote from local storage
		var strMyNote = localStorage.getItem(localStorage.getItem("view_right"));
		if (strMyNote != null){
			 MyNoteData=JSON.parse(strMyNote);
			 // now delete all from that book that matches this current html_no
			 for (i in MyNoteData){
				if (MyNoteData[i].html_no != html_no){
					MyNewNoteData.push(MyNoteData[i]);
				}
			 }
		}
 

        for (var i in P_HTM) { 
			if ($('#note' + i).length > 0) {
				if ($('#note' + i).val().trim() != '') {  
					v1 = RemoveSpace($('#note' + i).val(), '<br>');

					var jMyNoteData = {};
					jMyNoteData.html_no = html_no;
					jMyNoteData.TrId = i; 
					jMyNoteData.val = v1;
					//jMyNoteData.val = $('#m1_' + i).html().replace(/\'\=\\\"\\\"/g , '');
					// add all the elements for this book.  
					MyNewNoteData.push(jMyNoteData);   

					var m1 = $('#note' + i).val();
					m1 = m1.replace(/\<supA\>/g, "<sup style='color:blue;' onClick=\"DspNote('");
					m1 = m1.replace(/\<supB\>/g, "')\">");
					m1 = m1.replace(/\<supC\>/g, "</sup>");

					$('#m1_' + i).html(AddSpace(m1, '<br>'));
				} else {
					$('#m1_' + i).html('');
				}
			}
		} 
		localStorage.setItem(localStorage.getItem("view_right"), JSON.stringify(MyNewNoteData));

		//*****************************************
		// save MyNoteQueue
	    var jMyNoteNewQueue = {html_no:"", section:"", val:""};
		var MyNoteNewQueue = [];

		var strMyNoteQueue = localStorage.getItem(localStorage.getItem("view_right") + 'Queue');
		if (strMyNoteQueue != null){
			 MyNoteQueue=JSON.parse(strMyNoteQueue);
			 // now delete all from that book that matches this current html_no
			 for (i in MyNoteQueue){
				if (MyNoteQueue[i].html_no != html_no){
					MyNoteNewQueue.push(MyNoteQueue[i]);
				}
			 }
		}

		if (M_RANGE != null) {
			for (i in M_RANGE) {
				if (0 < i ) {
					val = RemoveSpace($('#MyNoteQueue' + i).val(), '<br>');
					
					var jMyNoteNewQueue = {};
					jMyNoteNewQueue.html_no = html_no;
					jMyNoteNewQueue.section = i; 
					jMyNoteNewQueue.val = val;
					
					MyNoteNewQueue.push(jMyNoteNewQueue);
				}
			}
        } 
		localStorage.setItem(localStorage.getItem("view_right") + 'Queue', JSON.stringify(MyNoteNewQueue));

		setTableStyling();

	 } else {	// Cancel 

		var MyNoteArray = [];
		MyNoteArray = JSON.parse(localStorage.getItem(localStorage.getItem("view_right")));
		if (MyNoteArray != null) {// use JSON objects instead
			for (i in MyNoteArray) { 
				if (MyNoteArray[i].html_no == html_no) {
					if (tr_ids.indexOf(';' + MyNoteArray[i].TrId + ';') != -1) {
						$('#note' + MyNoteArray[i].TrId).val(MyNoteArray[i].val);
					}
				}
			} 
		} 


		//*****************************************
		// restore MyNoteQueue
	    var jMyNoteNewQueue = {html_no:"", section:"", val:""};
		var MyNoteNewQueue = [];

		var strMyNoteQueue = localStorage.getItem(localStorage.getItem("view_right") + 'Queue');
		if (strMyNoteQueue != null){
			 MyNoteQueue=JSON.parse(strMyNoteQueue);
			 // now delete all from that book that matches this current html_no
			 for (i in MyNoteQueue){
				if (MyNoteQueue[i].html_no == html_no){
					if ($('#MyNoteQueue' + MyNoteQueue[i].section) != undefined) {
						$('#MyNoteQueue' + MyNoteQueue[i].section).val(AddSpace(MyNoteQueue[i].val, '\n'));
					}
				}
			 }
		}
	}	
  
	$('#MyNoteIds').val('');
	$('#MyNoteSection').val('0');

	MyNoteCheckClear();

	MyNoteList();
}


function MyNoteClear(type) {
	if ( typeof(P_HTM) == 'undefined') {
		return;
	}

	if (isEditable() == false) {return;}	 
	

	if (type == 'All') {

		$.confirm({
			title: '<b>' + localStorage.getItem("view_right") + '</b><br><br>' + html_no + ' ' + bookData.flat[html_no].title,
			content: 'Confirm to Clear all notes?',
			boxWidth: '30%',
			escapeKey: true,
			escapeKey: 'cancel',
			buttons: {
				Resume: function () {
					MyNoteClearConfirmed(type);
				},
				cancel: function () {
					;
				}
			}
		});
	} else {
		MyNoteClearConfirmed(type);
	}
}


function MyNoteClearConfirmed(type) {
	var strMyNote = localStorage.getItem(localStorage.getItem("view_right"));
	var MyNoteArr = [];
	var MyNewNoteArr = [];
	if (strMyNote) {
		MyNoteArr = JSON.parse(strMyNote); 

		for (var i in MyNoteArr) {
			if (MyNoteArr[i].val.trim() != '') {
				var strId = MyNoteArr[i].html_no + MyNoteArr[i].TrId +"";
				if ((($('#MyNoteSel' + strId).prop('checked') == true) && (type != 'All')) 
					|| ((html_no == MyNoteArr[i].html_no) && (type == 'All'))) { 

					$('#m1_' + MyNoteArr[i].TrId).html(''); 
					$('#note' + MyNoteArr[i].TrId).val(''); 

					// don't add to the new array

				} else {

					var jMyNoteData = {};
					jMyNoteData.html_no = MyNoteArr[i].html_no;
					jMyNoteData.TrId = MyNoteArr[i].TrId; 
					jMyNoteData.val = MyNoteArr[i].val;
					MyNewNoteArr.push(jMyNoteData); 
				}
			}
		}

		if (MyNewNoteArr.length > 0 ){
			localStorage.setItem(localStorage.getItem("view_right"), JSON.stringify(MyNewNoteArr));

		}
		else{
			localStorage.removeItem(localStorage.getItem("view_right")); 

		}
	} 


	// MyNoteQueue

	var strMyNoteQueue = localStorage.getItem(localStorage.getItem("view_right") + 'Queue');
	var MyNoteQueueArr = [];
	var MyNewNoteQueueArr = [];
	if (strMyNoteQueue) {
		MyNoteQueueArr = JSON.parse(strMyNoteQueue); 

		for (var i in MyNoteQueueArr) {
			if (MyNoteQueueArr[i].val.trim() != '') {
				var strSection = MyNoteQueueArr[i].html_no + MyNoteQueueArr[i].section +"";
				if ((($('#MyNoteSel' + strSection).prop('checked') == true) && (type != 'All')) 
					|| ((html_no == MyNoteQueueArr[i].html_no) && (type == 'All'))) { 
					$('#MyNoteQueue' + MyNoteQueueArr[i].section).css('display', 'none');

					// don't add to the new array

				} else {

					var jMyNoteQueueData = {};
					jMyNoteQueueData.html_no = MyNoteQueueArr[i].html_no;
					jMyNoteQueueData.section = MyNoteQueueArr[i].section; 
					jMyNoteQueueData.val = MyNoteQueueArr[i].val;
					MyNewNoteQueueArr.push(jMyNoteQueueData); 
				}
			}
		}

		if (MyNewNoteQueueArr.length > 0 ){
			localStorage.setItem(localStorage.getItem("view_right") + 'Queue', JSON.stringify(MyNewNoteQueueArr));
		}
		else{
			localStorage.removeItem(localStorage.getItem("view_right") + 'Queue'); 
		}
	} 



	MyNoteCheckClear();

	MyNoteList();
}


function MyNoteCopy() {
	if (isEditable() == false) {return;}	 
	

	var MyNoteArray = [];
	MyNoteArray = JSON.parse(localStorage.getItem(localStorage.getItem("view_right")));
	if (MyNoteArray != null) {// use JSON objects instead
		if (0 < MyNoteArray.length) {		 
			var strMyNote = '';
			for (i in MyNoteArray) { 
				strMyNote += toTranslate(bookData.flat[MyNoteArray[i].html_no].title) + '\n';
				strMyNote += "Paragraph " + GetMyanmarParaNo( MyNoteArray[i].TrId) + '\n';
				strMyNote += $('#p' + MyNoteArray[i].TrId).text().trim() + '\n';
				strMyNote += MyNoteArray[i].val + '\n\n'; 
			} 
			$('#CopyText').val(strMyNote);  
	    
	    	change_tab('page5');

	    	$('#CopyText').select();
	   		document.execCommand('copy'); 
	   	}	
	}
}


function MyNoteGoURL(url) { 

	viewRight = url.split('_')[0];

	url = url.split('_')[1];
	// change to mynotes mode.
		// View Right
	
	if ((isEditable() == false) || (localStorage.getItem("view_right") != viewRight)) { 

		localStorage.setItem("view_right", viewRight);
		$('#view_right').val(viewRight);

		initPreferences();

		if (url.substring(0,4)==html_no){
			// need to reload the book so that mynotes are showing.
			// pali historygoUrl does not reload the same book.. 
			// need a reload to show myNotes on right side.
			loadBook(html_no);  
		}

	}
	PaliHistoryGoUrl(url);
}


function MyNoteExport(type) {
	if (isEditable() == false) {return;}	 
	
	

	if (typeof P_HTM != 'undefined') {	// lines

		var MyNoteData = [];
		MyNoteData[0] = '';

		var MyNoteArray = [];
		MyNoteArray = JSON.parse(localStorage.getItem(localStorage.getItem("view_right")));
		if (MyNoteArray != null) {// use JSON objects instead
			if (0 < MyNoteArray.length) {
				for (i in MyNoteArray) { 
					if (MyNoteArray[i].html_no == html_no) {
						MyNoteData[MyNoteArray[i].TrId] = MyNoteArray[i].val;
					}
				}
			}
		} 

		var is_QueueData = '0';
		var MyNoteQueueData = [];
		//if (M_RANGE != null) {
		//	var MyNoteQueueData = Array(M_RANGE.length).fill('');
		//}
		var MyNoteQueueArray = [];
		MyNoteQueueArray = JSON.parse(localStorage.getItem(localStorage.getItem("view_right") + 'Queue'));
		if (MyNoteQueueArray != null) {// use JSON objects instead
			if (0 < MyNoteQueueArray.length) {
				for (i in MyNoteQueueArray) { 
					if (MyNoteQueueArray[i].html_no == html_no) {
						MyNoteQueueData[MyNoteQueueArray[i].section] = MyNoteQueueArray[i].val;
						is_QueueData = '1';
					}
				}
			}
		} 

		
		footnote = '';
		if (M_FNOTE != null) {// use JSON objects instead
			for (i in M_FNOTE) {
				footnote += '<div id="sdfootnote' + i + '">';
				footnote += '<p class="sdfootnote-western" align="left">';
				footnote += '<a class="sdfootnotesym" name="sdfootnote' + i + 'sym" href="#sdfootnote' + i + 'anc">';
				footnote += i;
				footnote += '</a>';
				footnote += M_FNOTE[i];
				footnote += '</p>';
				footnote += '</div>';
			}
		} 

		if ((type == 'doc') || (type == 'doc2')) {
			doc = '<html>\n';
			doc += '	<head>\n';
			doc += '		<meta charset="utf-8">\n';
			doc += '		<style type="text/css">\n';
			if (type == "doc") {
				doc += '			@page { size: 8.27in 11.69in; margin-right: 0.5in; margin-left: 0.5in; margin-top: 0.5in; margin-bottom: 0.5in }\n';
			} else {	
				doc += '			@page { size: 11.69in 8.27in; margin-right: 0.5in; margin-left: 0.5in; margin-top: 0.5in; margin-bottom: 0.5in }\n';
			}
			doc += '			td	{ vertical-align:top}\n';
			doc += '			.b1	{ font-size: 12pt; text-indent: 2em;}\n';
			doc += '			.b2	{ font-size: 16.5pt; text-align:center; font-weight: bold;}\n';
			doc += '			.c3	{ font-size: 12pt; text-align:center;}\n';
			doc += '			.c4	{ font-size: 15pt; text-align:center; font-weight: bold;}\n';
			doc += '			.g5	{ font-size: 12pt; margin-bottom: 0em; margin-left: 4em;}\n';
			doc += '			.g6	{ font-size: 12pt; margin-bottom: 0em; margin-left: 4em;}\n';
			doc += '			.g7	{ font-size: 12pt; margin-bottom: 0em; margin-left: 4em;}\n';
			doc += '			.g8	{ font-size: 12pt; margin-bottom: 0.5cm; margin-left: 4em;}\n';
			doc += '			.h9	{ font-size: 12pt; text-indent: 2em;}\n';
			doc += '			.ia	{ font-size: 12pt; text-indent: 2em; margin-left: 3em;}\n';
			doc += '			.nb	{ font-size: 14pt; text-align:center; font-weight: bold;}\n';
			doc += '			.sc	{ font-size: 12pt; text-align:center; font-weight: bold;}\n';
			doc += '			.sd	{ font-size: 12pt; text-align:center; font-weight: bold;}\n';
			doc += '			.te	{ font-size: 12pt; text-align:center; font-weight: bold;}\n';
			doc += '			.uf	{ font-size: 12pt;}\n';
			doc += '		</style>\n';
			doc += '	</head>\n';
			doc += '\n';
			doc += '	<body>\n';
			doc += '		{!@#body#@!}\n';
			doc += '	</body>\n';
			doc += '</html>\n';

			if (type == "doc") {
				val = '';
			} else {
				val = '<table border="0" width="200%">';
				val += '<tr>';
				val += '<th width="50%">';
				val += '<th width="50%">';
				val += '</tr>';
			}
			for (i in P_HTM) {
				p1 = $('#p' + i).html();
				p1_class = p1.split('<p class="')[1].substr(0, 2);

				var m1 = '';
				if ((MyNoteData[i] != null) && (MyNoteData[i] != undefined)) {
					//m1 = $('#m1_' + i).html();
					m1 = MyNoteData[i];

					// footnote
					if (m1.indexOf('<supA>') != -1) {
						ary1 = m1.split('<supA>');

						m2 = '';
						for (j in ary1) {
							if (ary1[j].indexOf('<supC>') == -1) {
								m2 = m2 + ary1[j];
							} else {
								fno = ary1[j].split('<supB>')[0];
								m3 = ary1[j].split('<supC>')[1];
								m2 = m2 + '<sup><a class="sdfootnoteanc" name="sdfootnote'+ fno +'anc" href="#sdfootnote'+ fno + 'sym">' + fno + '</a></sup>' + m3;
							}
						}
						m1 = m2;
					}
					// end of footnote
				}
				if (type == 'doc') {
					val += p1 + '<p class="' + p1_class + '">' + m1 + '</p>';
					val += '<p class="b1"></br></br></p>';
				} else {
					val += '<tr>';
					val += '<td>' + p1 + '</td>';
					val += '<td>' + '<p class="' + p1_class + '">' + m1 + '</p>' + '</td>';
					val += '</tr>';

				}
			}
			if (type == 'doc2') {
				val += '</table>';
			}
			//footnote
			val += footnote;
			doc = doc.replace('{!@#body#@!}', val);
			doc = doc.replace(/\&nbsp;/g, '') 

			var blob = new Blob([doc], {type: "text/plain;charset=utf-8"});
			if (type == 'doc') {
				saveAs(blob, html_no + '_MyNote_' + bookData.flat[html_no].title.replace(/\ /g, '_') + '.doc');
			} else {
				saveAs(blob, html_no + '_MyNote_' + bookData.flat[html_no].title.replace(/\ /g, '_') + '(2_Columns).doc');
			}
		} else {		//js
			var ExportJs = '';

			
			if (MyNoteData != null) {
				for (i in P_HTM) {
					if (MyNoteData[i] != null) {
						ExportJs += 'M_LOC[' + i + '] = "' + MyNoteData[i] + '";\n';
					}
				}
				ExportJs += '\n';


				if (M_FNOTE != null) {
					for (i in M_FNOTE) {
						ExportJs += 'M_FNOTE["' + i + '"] = "' + M_FNOTE[i] + '";\n';
					}
					ExportJs += '\n';
				}

				ExportJs += 'M_START = ' + M_START + ';\n\n';

				if (is_QueueData == '1') {
					for (i in MyNoteQueueData) {
						if (0 < i) {
							ExportJs += 'M_QUE[' + i + '] = "' + MyNoteQueueData[i] + '";\n';
						}
					}
					ExportJs += '\n';
				}


				ExportJs = ExportJs.trim();

			}

			var blob = new Blob([ExportJs], {type: "text/plain;charset=utf-8"});
			saveAs(blob, html_no + '.js'); 
		}

	}
}


function DspNote(id) {

	onTabClick(document.getElementById('page1'));

	$('#page1_desc').html('<hr><span style="color:#880000;">' + M_FNOTE[id] + '</span><hr>');

}


function DspQue(id) {
	if ($('#notex' + id).html() != '') {
		$('#notex' + id).html('');
	} else {
		var MyNoteSection = id;
 
		htm = $('#MyNoteQueue' + MyNoteSection).val();

		htm = AddSpace(htm, '<br>');

		$('#notex' + id).html(htm);
	}
}


function MyNoteCheckClear() {
	for (i in P_HTM) {
		if ($('Notechk' +i).length > 0 ) {
			document.getElementById('Notechk' + i).checked = false;
		}
	}
}


function MyNoteSup(val) {
	val = val.replace(/\<supA\>/g, "<sup style='color:blue;' onClick=\"DspNote('");
	val = val.replace(/\<supB\>/g, "')\">");
	val = val.replace(/\<supC\>/g, "</sup>");
	return(val);
}

function MyNoteQueueMoveUp(id) {
	var MyNoteSection = $('#MyNoteSection').val();
	var pos = $('#MyNoteQueue' + MyNoteSection).val().indexOf('\n');

	var MoveUpData = $('#MyNoteQueue' + MyNoteSection).val().substr(0, pos);
	MoveUpData = AddSpace($('#note' + id).val() + '\n' + MoveUpData, '\n');
	$('#m1_' + id).html(MyNoteSup(AddSpace(MoveUpData, '<br>')));
	$('#note' + id).val(MoveUpData);
	M_LOC[id] = MoveUpData;

	ResetAreaTextHeight(id);

	$('#MyNoteQueue' + MyNoteSection).val($('#MyNoteQueue' + MyNoteSection).val().substr(pos +1));
}


function MyNoteExec(type) {
	var id = localStorage.getItem('tr_id');
	if (id == undefined) { return; }
	id = parseInt(id);

	var ary_Ids = $('#MyNoteIds').val().split(';'); 
	var start = parseInt(ary_Ids[0]);
	var end = parseInt(ary_Ids[ary_Ids.length -1]);
	if ((type != 'Cancel') && (type != 'Save')) {
		if ((id < start) || (id > end)) {
			return;
		}
	}

	MyNoteSection = $('#MyNoteSection').val();
	aryMyNoteQueue = [];
	if (MyNoteSection != '0') {
		aryMyNoteQueue = $('#MyNoteQueue' + MyNoteSection).val().split('\n');
	}


	//
	if (type == "AddRow") {    // Add row
		if ((id == MyNoteSection) || (id == end)) {
			$('#MyNoteErrMessage').css('display', 'inline').html('Can not add a new row!').delay(4000).fadeOut(400);
			return;
		} 
		
		start = 1;
		end = P_HTM.length -1;

		var last_note = $('#note' + (P_HTM.length -1)).val();
		if (MyNoteSection != '0') {		// section only
			start = id;
			end = MyNoteSection;
			last_note = $('#note' + end).val();
		} 
		last_note = RemoveSpace(last_note, '\n').trim();
		last_note = last_note.replace(/\n/g, '<br>')

		for (i=end; start<i; i--) {
			$('#m1_' + i).html( MyNoteSup(AddSpace($('#note' + (i -1)).val(), '<br>')));
			$('#note' + i).val( $('#note' + (i -1)).val());
			M_LOC[i] = $('#note' + (i -1)).val();
			ResetAreaTextHeight(id);
		}
		$('#m1_' + id).html('');
		$('#note' + id).val('');
		M_LOC[id] = '';

		//******************************************
		// pust last notes into queue (MyNoteQueue)
		v1 = (last_note + '\n') + $('#MyNoteQueue' + MyNoteSection).val();
		v1 = AddSpace(v1, '\n');
		$('#MyNoteQueue' + MyNoteSection).val(v1);


	}


	if (type == "AddComment") {    // Add comment
		v1 = $('#note' + id).val().trim();
		if (v1 != '') {
			v1 = $('#note' + id).val().replace(/\<\!Comment\!\>/g, '').replace(/\<\/Comment\!\>/g, '');
			v1 = AddSpace('<!Comment!>' + v1.trim() + '</Comment!>', '\n');
			$('#note' + id).val(v1);
			M_LOC[id] = v1;
		}
	}

	if (type == "DeleteComment") {    // Del. comment
		var v1 = $('#note' + id).val().replace(/\<\!Comment\!\>/g, '').replace(/\<\/Comment\!\>/g, '');
		$('#note' + id).val(v1);
		M_LOC[id] = v1;
	} 


	if (type == "Cancel") {    // Cancel
		MyNoteSaveCancel('Cancel');
	} 
	//************************************************************


	if (type == "SelectPrevious") {
		if (document.getElementById('Notechk' + id).checked == true) {
			chk = false;
		} else {
			chk = true;
		}

		for (i=start; i<=id; i++) {
			document.getElementById('Notechk' + i).checked = chk;
		}
	}


	if (type == "SelectAll") { 
		if (document.getElementById('Notechk' + id).checked == true) {
			chk = false;
		} else {
			chk = true;
		}

		for (i=start; i<=end; i++) {
			document.getElementById('Notechk' + i).checked = chk;
		}
	}


	if (type == "SelectNext") {
		if (document.getElementById('Notechk' + id).checked == true) {
			chk = false;
		} else {
			chk = true;
		}

		for (i=id; i<=end; i++) {
			document.getElementById('Notechk' + i).checked = chk;
		}
	}


	if (type == "Save") {    // Save
		MyNoteSaveCancel('Save');
	} 
	//************************************************************


	if (type == "MoveUp") {
		if (id == start) {
			$('#MyNoteErrMessage').css('display', 'inline').html('Can not move up!').delay(4000).fadeOut(400);
			return;
		}

		for (i=start; i<id; i++) {
			document.getElementById('Notechk' + i).checked = false;
		}
		
		//
		document.getElementById('Notechk' + id).checked == true;
		var last = id;
		for (i=id; i<=end; i++) {
			if (document.getElementById('Notechk' + i).checked == false) {
				break;
			}
			last = i;
		}

		for (i=id; i<=last; i++) {
			var v2 = $('#note' + (i -1)).val().trim() + "\n" + $('#note' + i).val();
			v2 = AddSpace(v2, '\n');

			$('#note' + (i -1)).val(v2); 
			M_LOC[i -1] = v2;
			ResetAreaTextHeight(i - 1);

			$('#note' + i).val(''); 
			M_LOC[i] = v2;
			ResetAreaTextHeight(i);
		}
		
		$('#note' + last).val('');
		M_LOC[last] = '';
		ResetAreaTextHeight(last);

		document.getElementById('Notechk' + last).checked = false; 

		$('#m' + (id -1)).click();
		$('#note' + (id -1)).focus();
	}


	if (type == "Merge") {
		if (document.getElementById('Notechk' + id).checked == false) {
			$('#MyNoteErrMessage').css('display', 'inline').html('This row must be selected!').delay(4000).fadeOut(400);
			return;
		}

		var out = '';
		for (i=id; start<=i; i--) {
			if (document.getElementById('Notechk' + i).checked == false) {
				break;
			}
			out = $('#note' + i).val().trim() + '\n' + out;
			$('#note' + i).val('');
			M_LOC[i] = '';
			ResetAreaTextHeight(i);
		}

		var checked_cx = 0;
		var next_id = id;
		for (i=(id +1); i<=end; i++) {
			if (document.getElementById('Notechk' + i).checked == false) {
				break;
			}
			checked_cx += 1;

			out = out + $('#note' + i).val().trim() + '\n';

			$('#note' + i).val('');
			M_LOC[i] = '';
			ResetAreaTextHeight(i);
		}
		out = AddSpace(out, '\n');
		$('#note' + id).val(out);
		M_LOC[id] = out;
		ResetAreaTextHeight(id);

		if (0 < checked_cx) {	//
			if (MyNoteSection == '0') {
				last = P_HTM.length -1;
			} else {
				last = MyNoteSection;
				aryMyNoteQueue = $('#MyNoteQueue' + MyNoteSection).val().split('\n');
			}
 
			next_id = id +1;
			for (i=next_id; i<=(last - checked_cx); i++) {
				$('#note' + i).val($('#note' + (i + checked_cx)).val());
				M_LOC[i] = $('#note' + (i +checked_cx)).val();
				ResetAreaTextHeight(i);  
			}

			for (i=1; i<=checked_cx; i++) {
				s1 = last - checked_cx + i;
				$('#note' + s1).val('');
				M_LOC[s1] = '';

				if ((aryMyNoteQueue[i -1] != null) && (aryMyNoteQueue[i -1] != undefined)) {
				
					$('#note' + s1).val(aryMyNoteQueue[i -1]);
					M_LOC[s1] = aryMyNoteQueue[i -1];
					aryMyNoteQueue[i -1] = '';
				}	
				ResetAreaTextHeight(s1); 
			}

			$('#MyNoteQueue' + MyNoteSection).val(AddSpace(aryMyNoteQueue.join('\n'), '\n'));
		}

		for (i=start; i<=end; i++) {
			document.getElementById('Notechk' + i).checked = false;
		}
	}


	if (type == "MoveDown") {

		if (id == end) {
			$('#MyNoteErrMessage').css('display', 'inline').html('Can not move down!').delay(4000).fadeOut(400);
			return;
		} 

		for (i=end; id<i; i--) {
			document.getElementById('Notechk' + i).checked = false;
		}
		
		//
		document.getElementById('Notechk' + id).checked == true;
		var last = id;
		for (i=id; start<=i; i--) {
			if (document.getElementById('Notechk' + i).checked == false) {
				break;
			}
			last = i;
		}

		for (i=id; last<=i; i--) {
			var v2 = $('#note' + i).val().trim() + "\n" + $('#note' + (i +1)).val();
			v2 = AddSpace(v2, '\n');

			$('#note' + (i +1)).val(v2); 
			M_LOC[i +1] = v2;
			ResetAreaTextHeight(i + 1);

			$('#note' + i).val(''); 
			M_LOC[i] = '';
			ResetAreaTextHeight(i);
		}
		
		$('#note' + last).val('');
		M_LOC[last] = '';
		ResetAreaTextHeight(last);

		document.getElementById('Notechk' + last).checked = false; 

		$('#m' + (id +1)).click();
		$('#note' + (id +1)).focus();
	}


	if (type == "DeleteRow") {    // Remove space lines

		var AryRemove = [];

		var count = 0;
		for (i=start; i<=end; i++) {
			if ($('#note' + i).val().trim() == '') {
				if (document.getElementById('Notechk' + i).checked == true) {
					AryRemove.push(('0000' + i).substr(-4));
					count = count +1;
				} else {
					if (i == id) {
						AryRemove.push(('0000' + i).substr(-4));
						count = count +1;
					}
				}
			}
		}

		
		if (count == 0) {
			$('#MyNoteErrMessage').css('display', 'inline').html('No empty rows can be deleted!').delay(4000).fadeOut(400);
			return;
		} else {
			$('#MyNoteErrMessage').css('display', 'inline').html('There are ' + count + ' rows will be deleted!').delay(4000).fadeOut(400);
		}


		AryRemove.sort();
		remove = ';';
		for (i in AryRemove) {
			remove = remove + parseInt(AryRemove[i]) + ';'
		}

		if (MyNoteSection == '0') {
			last = P_HTM.length -1;
		} else {
			last = MyNoteSection;
		}

		var first = parseInt(remove.split(';')[1]);
		var valid = [];
		for (i=first; i<=last; i++) {
			var cond = ';' + i + ';';
			if (remove.indexOf(cond) == -1) {
				valid[i] = $('#note' + i).val();
			}
		}

		for (i in valid) {
			$('#m1_' + first).html(MyNoteSup(AddSpace(valid[i], '<br>')));
			$('#note' + first).val(valid[i]);
			M_LOC[first] = valid[i];
			ResetAreaTextHeight(i);
			first = first +1;
		} 

		cx = 0;
		for (i=(last - count +1); i<=last; i++) {
			$('#m1_' + i).html('');
			$('#note' + i).val('');
			M_LOC[i] = '';
			if ((MyNoteSection != '0') && (aryMyNoteQueue[cx] != null) && (aryMyNoteQueue[cx] != undefined)) {
				$('#m1_' + i).html(MyNoteSup(AddSpace(aryMyNoteQueue[cx], '<br>')));
				$('#note' + i).val(aryMyNoteQueue[cx]);
				M_LOC[i] = aryMyNoteQueue[cx];
				aryMyNoteQueue[cx] = '';
			}
			ResetAreaTextHeight(i);
			cx = cx +1;
		}

		if (MyNoteSection != '0') {
			$('#MyNoteQueue' + MyNoteSection).val(AddSpace(aryMyNoteQueue.join('\n'), '\n'));
		}

		MyNoteCheckClear(); 
	}


}


function MyNoteExecLink(type) {
	var id = localStorage.getItem('tr_id');
	if (id == undefined) { return; }
	id = parseInt(id);

	var ary_Ids = $('#MyNoteIds').val().split(';'); 

	var start = parseInt(ary_Ids[0]);
	var end = parseInt(ary_Ids[ary_Ids.length -1]);
	
	for (i in M_RANGE) {
		if ((M_RANGE[i] <= start) && (start <= i)) {
			start = parseInt(M_RANGE[i]);
			end = parseInt(i);
			break;
		}
	}

	if ((type != 'LinkStart') && (type != 'LinkOff')) {
		if ((id <= start) || (end <= id)) { 
			$('#MyNoteErrMessage').css('display', 'inline').html('Id range should be ' + (start +1) + ' - ' + (end -1) + ' !').delay(4000).fadeOut(400);
			return;
		} 
	}


	if (type == "LinkStart") { 
		$('#MyNoteLinkStart').css('display', 'none');
		$('#MyNoteLinkEnd').css('display', 'inline');
		$('#MyNoteLinkCancel').css('display', 'inline');
		$('#MyNoteLinkOff').css('display', 'none');
		$('#MyNoteLinkId').css('display', 'inline');
		$('#LinkIdFrom').html(id);

		out = '';
		for (i=(start +1); i<=(end -1); i++) {
			if ($('#note' +i).val().trim() != '') {
				out += '<input name="linkx" id="linkx' + i + '" type="radio"';
				if (id == i) {
					out += ' checked';
				}
				out += ' onClick="$(\'#LinkIdFrom\').html(this.id.substr(5))">' + i + '<br>';
				out += '<label for="linkx' + i + '">' + $('#note' +i).val().replace(/\n/g, '') + '</label>';
				out += '<br><br>';
			}
		}
		$('#MyNoteLinkMessage').css('display', 'inline');
		$('#MyNoteLinkMessage').html(out);


	}

	if (type == "LinkEnd") { 
		if (id == $('#LinkIdFrom').html()) {
			$('#MyNoteErrMessage').css('display', 'inline').html('Id range should not be the same!').delay(4000).fadeOut(400);
			return;
		} 
		$('#LinkIdTo').html(id);

		$('#MyNoteLinkEnd').css('display', 'none');
		$('#MyNoteLinkSave').css('display', 'inline');
		$('#MyNoteLinkCancel').css('display', 'inline');
	}

	if (type == "LinkSave") { 
		IdFrom = parseInt($('#LinkIdFrom').html());
		IdTo = parseInt($('#LinkIdTo').html());

		IdToPrevious = IdTo -1;
		if (IdTo < IdFrom) {
			out = '';
			for (i=IdTo; i<IdFrom; i++) {
				out = out + $('#note' + i).val() + '\n';
				$('#note' +i).val('');
				ResetAreaTextHeight(i);

				$('#m1_' +i).html('');
			}
			$('#MyNoteQueue' + IdToPrevious).val(AddSpace(out, '\n'));
			$('#MyNoteQueueDsp' + IdToPrevious).css('display', 'inline');


			cx = IdTo;
			for (i=IdFrom; i<=end; i++) {
				$('#note' +cx).val($('#note' +i).val());
				$('#m1_' +cx).html($('#m1_' +i).html());
				ResetAreaTextHeight(cx);

				$('#note' +i).val('');
				$('#m1_' +i).html('');
				ResetAreaTextHeight(i);
				cx = cx +1;
			}

			// add M_RANGE
			M_RANGE[end] = IdTo;
			M_RANGE[IdToPrevious] = start; 
		} else {
			out = '';
			for (i=(end - IdTo + IdFrom +1); i<=end; i++) {
				out = out + $('#note' + i).val() + '\n';
				$('#note' +i).val('');
				ResetAreaTextHeight(i);

				$('#m1_' +i).html('');
			}
			out = out + $('#MyNoteQueue' + end).val();
			$('#MyNoteQueue' + end).val(AddSpace(out, '\n'));
			$('#MyNoteQueueDsp' + IdToPrevious).css('display', 'inline');


			cx = end;
			for (i=(end - IdTo + IdFrom); IdFrom<=i; i--) {
				$('#note' +cx).val($('#note' +i).val());
				$('#m1_' +cx).html($('#m1_' +i).html());
				ResetAreaTextHeight(cx);

				$('#note' +i).val('');
				$('#m1_' +i).html('');
				ResetAreaTextHeight(i);
				cx = cx -1;
			}

			// add M_RANGE
			M_RANGE[end] = IdTo;
			M_RANGE[IdToPrevious] = start;
		}

		// save previous section
		var tr_ids = '';
		s1 = Math.min(start, IdToPrevious);
		s2 = Math.max(start, IdToPrevious);
		for(i=s1; i<=s2; i++) {
			tr_ids += ';' + i;
			$('#note' + i).css('display', 'none');
		}
		tr_ids = tr_ids.substr(1);
		$('#MyNoteIds').val(tr_ids);
		$('#MyNoteSection').val(IdToPrevious);
		MyNoteSaveCancel('Save');

		// save Next section
		var tr_ids = '';
		for(i=IdTo; i<=end; i++) {
			tr_ids += ';' + i;
			$('#note' + i).css('display', 'none');
		}			
		tr_ids = tr_ids.substr(1);
		$('#MyNoteIds').val(tr_ids);
		$('#MyNoteSection').val(end);
		MyNoteSaveCancel('Save');   
	}


	if (type == "LinkCancel") { 
		$('#MyNoteLinkStart').css('display', 'inline'); 
		$('#MyNoteLinkEnd').css('display', 'none'); 
		$('#MyNoteLinkOff').css('display', 'inline'); 
		$('#MyNoteLinkId').css('display', 'none'); 
		$('#MyNoteLinkSave').css('display', 'none'); 
		$('#MyNoteLinkCancel').css('display', 'none'); 
		$('#LinkIdFrom').html('');
		$('#LinkIdTo').html('');
		$('#MyNoteLinkMessage').css('display', 'none');
		$('#MyNoteLinkMessage').html('');
	}

	if (type == "LinkOff") {
		if (M_RANGE[id] == undefined) {
			$('#MyNoteErrMessage').css('display', 'inline').html('This row can not unlink!').delay(4000).fadeOut(400);
			return;
		}
		M_RANGE.splice(id, 1);

		val = $('#note' +id).val() + '\n' + $('#MyNoteQueue' + id).val();
		$('#note' +id).val(AddSpace(val, '\n'));
		ResetAreaTextHeight(id);

		$('#MyNoteQueue' + id).val('');
		$('#MyNoteQueueDsp' + id).css('display', 'none');
	}

}

function MyNoteLink(v1) {
	$('#LinkIdFrom').html(v1.id.substr(5));
}

function MyNoteAdjust(id) {
	$('#note' +id).val(AddSpace($('#note' +id).val(), '\n'));

	ResetAreaTextHeight(id);
}


function AddSpace(v1, OutDelimiter) {
	//if (v1 != undefined) {
		v1 = v1.replace(/\<br\>/g, '\n'); 
		v1 = v1.trim();

		var ary1 = v1.split('\n');
		var out = '';
		for (var i in ary1) {
			if (ary1[i].trim() != '') {
				out = out + '　　' + ary1[i].trim() + OutDelimiter;
			}
		}
		return (out);
	//} else {
	//	return;
	//}
}  


function RemoveSpace(v1, OutDelimiter) {
	v1 = ('\n' + v1).replace(/\<br\>/g, '\n');
	v1 = v1.replace(/\n /g, '\n');
	v1 = v1.replace(/\n　/g, '\n').trim();

	var ary1 = v1.split('\n');
	var out = '';
	for (var i in ary1) {
		if (ary1[i].trim() != '') {
			out = out + OutDelimiter + ary1[i].trim();
		}
	}
	out = out.trim();
	if (OutDelimiter == '<br>') {
		out = out.substr(4);
	}
	return (out);
}  


function ResetAreaTextHeight(id) {
	if ($('#note' + id).val().trim() == '') {
		$('#note' + id).css('height', '33px');
	} else {
		var rows = $('#note' + id).val().trim().split('\n').length;
		var heightNew = (rows +1) * 33;

		var heightTr = parseInt($('#noteH' + id).val());

		heightNew = Math.max(heightNew, heightTr);
		$('#note' + id).css('height', heightNew +'px');
	}
}
