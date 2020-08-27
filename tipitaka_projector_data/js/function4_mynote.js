function MyNoteList() {
	if (1){ 
		$('#pg4_page2_desc').css('display', 'inline');
		if (typeof P_HTM != 'undefined') {	// lines
			$('#MyNoteEditable').css('display', 'inline'); 
			var ShowAll = $('#AllBooksMyNotes').is(":checked");
			var url = '';
			var MyNoteArray = [];
			MyNoteArray = JSON.parse(localStorage.getItem('MyNotes'));
			if (MyNoteArray != null) {// use JSON objects instead
				if (0 < MyNoteArray.length) {

					for (i in MyNoteArray) { 

						if (MyNoteArray[i].html_no != html_no && ShowAll==false ){
							;// do nothing
							// only show the books that match html_no
						}
						else{ 
						url += '<input type="checkbox" id="MyNoteSel' + MyNoteArray[i].html_no + MyNoteArray[i].TrId + '" unchecked value="' + MyNoteArray[i].TrId + '"/>'; 
						url += '<a href="javascript:MyNotesGoURL(\'' + MyNoteArray[i].html_no + '#p' + MyNoteArray[i].TrId +'\');" title="'+ MyNoteArray[i].val+'">&nbsp;&nbsp;';
						url +=   toTranslate(T_Book[MyNoteArray[i].html_no]) + "&nbsp;" +  MyNoteArray[i].val.replace(/<BR>/g, "");
						url += '</a><br>';
						}
					} 
				}	
			} 
			$('#MyNoteList').html(url);
		}	 
	} else {
		//$('#pg4_page2_desc').css('display', 'none');
	}	
}

function MyNoteEdit() { 	// 0=cancel, 1=save, lines=5-10-20


	if (localStorage.getItem("view_right") != 'MyNote')
	{
		alert('You must set right_view in preferences to "MyNotes" to make notes');
		return;
	}



	if (typeof P_HTM != 'undefined') {	// lines
		var tr_ids = '';
		var first = '';
		var k1 = 10;
		var s1 = Number(localStorage.getItem('tr_id'));
		var s2 = P_HTM.length;

		for (i=s1; i<=s2; i++) {   
			if (P_HTM[i] != undefined) {
				tr_ids = tr_ids + i + ';';		// keep tr_id & HTML Tag
				if (first == '') {
					first = i;
				}  
				 
				$('#m1_' + i).css('display', 'none');
				$('#notes' + i).css('display', 'inline'); 
				$('#notes' + i).val($('#m1_' + i).html());

				k1 = k1 -1;
				if (k1 == 0) {
					break;
				}
			}
		}   
		$('#MyNoteIds').val(tr_ids);
		$('#notes' + first).focus();

		$('#MyNoteEdit').css('display', 'none');
		$('#MyNoteSave').css('display', 'inline');
	}
}
 

function MyNoteSaveCancel(key) { 	// Save or Cancel
	if (key == 'Save') {	//save 

		var ary_Ids = $('#MyNoteIds').val().split(';');		
		for (i=0; i<ary_Ids.length; i++) {
			if (ary_Ids[i] != '') {

		        val = $('#notes' + ary_Ids[i]).val().trim();
				$('#m1_' + ary_Ids[i]).html(val); 
				$('#notes' + ary_Ids[i]).val(val); 

				document.getElementById('m1_' + ary_Ids[i]).style.display = 'inline';
				document.getElementById('notes' + ary_Ids[i]).style.display = 'none';
			}
		}   

	    var jMyNoteData = {html_no:"", TrId:"", val:""};
		var MyNoteData = [];   
		var MyNewNoteData = [];
		

		// This original code is written to rewrite the whole of items for the book.
		//  we will delete all data from array that matches 
		// html_no and then rewrite them again. easiest way to code but not so elegant.
		
		// get from MyNotes from local storage
		var strMyNotes = localStorage.getItem("MyNotes");
		if (strMyNotes != null){
			 MyNoteData=JSON.parse(strMyNotes);
			 // now delete all from that book that matches this current html_no
			 for (i in MyNoteData){
				if (MyNoteData[i].html_no != html_no){
					MyNewNoteData.push(MyNoteData[i]);

				}

			 }
		}

        for (var i in P_HTM) { 
			if ($('#notes' + i).val() != '') {  
            	var jMyNoteData = {};
				jMyNoteData.html_no = html_no;
				jMyNoteData.TrId = i; 
				jMyNoteData.val = $('#m1_' + i).html();
				// add all the elements for this book.  
	            MyNewNoteData.push(jMyNoteData);  
			} 
        } 
    	localStorage.setItem('MyNotes', JSON.stringify(MyNewNoteData));

 	} else {	// Cancel
		var ary1 = $('#MyNoteIds').val().split(';');
		for (i=0; i<ary1.length; i++) {
			if (ary1[i] != '') {
				$('#m1_' + ary1[i]).css('display', 'inline');
				$('#notes' + ary1[i]).css('display', 'none');
				$('#notes' + ary1[i]).val($('#m1_' + ary1[i]).text());
			}	
		}    
	}	
  
	$('#MyNoteIds').val('');

	$('#MyNoteEdit').css('display', 'inline');
	$('#MyNoteSave').css('display', 'none');
	$('#MyNoteCancel').css('display', 'none');

	MyNoteList();
}


function MyNoteClear(type) {
	if (type == 'All') { 

		// need to get the html and remove from aray.
		//localStorage.setItem('MyNotes','');
		localStorage.removeItem('MyNotes'); 
 
        for (var i in P_HTM) {
			$('#m1_' + i).html(''); 
			$('#notes' + i).val('');
        }
	} else{ 

		var strHistory = ""; 
		var strMyNote = localStorage.getItem('MyNotes');
		var MyNoteArr = [];
		var MyNewNoteArr = [];
		if (strMyNote) {
			MyNoteArr = JSON.parse(strMyNote); 
 
			var ary_TrId = [];  
	 		for (var i in MyNoteArr) {
	 			var strId = MyNoteArr[i].html_no + MyNoteArr[i].TrId +"";
	 			if ($('#MyNoteSel' + strId).prop('checked') == true) { // don't add to the new array

		 			$('#m1_' + MyNoteArr[i].TrId).html('');
		 			$('#notes' + MyNoteArr[i].TrId).val('');
				 }	
				 else{
					 // keep it
					MyNewNoteArr.unshift(MyNoteArr[i]);
				 }

	        } 

			if (MyNewNoteArr.length > 0 ){
				localStorage.setItem('MyNotes', JSON.stringify(MyNewNoteArr));

			}
			else{
				localStorage.removeItem('MyNotes'); 

			}
		} 

	}
	MyNoteList();
}


function MyNoteCopy() {
	var MyNoteArray = [];
	MyNoteArray = JSON.parse(localStorage.getItem('MyNotes'));
	if (MyNoteArray != null) {// use JSON objects instead
		if (0 < MyNoteArray.length) {		 
			var strMyNote = '';
			for (i in MyNoteArray) { 
				strMyNote += toTranslate(T_Book[MyNoteArray[i].html_no]) + '\n';
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

function MyNotesGoURL(url) { 

	// change to mynotes mode.
		// View Right
	if (localStorage.getItem("view_right") != 'MyNote') { 

		var view_right = localStorage.setItem("view_right", "MyNote");
		$('#view_right').val('MyNote');
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


