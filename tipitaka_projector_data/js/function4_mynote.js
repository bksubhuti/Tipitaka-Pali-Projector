function MyNoteList() {
	if (localStorage.getItem("view_right") == 'MyNote') { 
		$('#pg4_page2_desc').css('display', 'inline');
		if (typeof P_HTM != 'undefined') {	// lines
			$('#MyNoteEditable').css('display', 'inline'); 

			var url = '';
			var MyNoteArray = [];
			MyNoteArray = JSON.parse(localStorage.getItem('MyNote' + html_no));
			if (MyNoteArray != null) {// use JSON objects instead
				if (0 < MyNoteArray.length) {
					url += '<a href="javascript:void(0);" onClick="MyNoteCopy()"><img src="images/b_browse.png">Copy Text</a>&nbsp;&nbsp;';
					url += '<a href="javascript:void(0);" onClick="MyNoteClear(\'Select\')"><img src="images/b_drop.png">Delete Select</a>&nbsp;&nbsp;'
					url += '<a href="javascript:void(0);" onClick="MyNoteClear(\'All\')"><img src="images/b_drop.png">Delete All</a>';
					url += '<br>';

					for (i in MyNoteArray) { 
						url += '<input type="checkbox" id="MyNoteSel' +MyNoteArray[i].TrId + '" checked value="' + MyNoteArray[i].TrId + '"/>'; 
						url += '<label for="MyNoteSel' + MyNoteArray[i].TrId + '">';
						url += MyNoteArray[i].val;
						url += '</label><br>';
					} 
				}	
			} 
			$('#MyNoteList').html(url);
		}	 
	} else {
		$('#pg4_page2_desc').css('display', 'none');
	}	
}

function MyNoteEdit() { 	// 0=cancel, 1=save, lines=5-10-20
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
		$('#MyNoteCancel').css('display', 'inline');
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

	    var jMyNoteData = {TrId:"", val:""};
	    var MyNoteData = [];   
        for (var i in P_HTM) { 
			if ($('#notes' + i).val() != '') {  
            	var jMyNoteData = {};
				jMyNoteData.TrId = i; 
				jMyNoteData.val = $('#m1_' + i).html();  
	            MyNoteData.push(jMyNoteData);  
			} 
        } 
    	localStorage.setItem('MyNote' + html_no, JSON.stringify(MyNoteData));

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
		localStorage.setItem('MyNote' + html_no, '');
		localStorage.removeItem('MyNote' + html_no); 
 
        for (var i in P_HTM) {
			$('#m1_' + i).html(''); 
			$('#notes' + i).val('');
        }
	} else{ 

		var strHistory = ""; 
		var strMyNote = localStorage.getItem('MyNote' + html_no);
		var MyNoteArr = [];
		if (strMyNote) {
			MyNoteArr = JSON.parse(strMyNote); 
 
			var ary_TrId = [];  
	 		for (var i in MyNoteArr) {
	 			var TrId = MyNoteArr[i].TrId;
	 			if ($('#MyNoteSel' + TrId).prop('checked') == true) { 
		 			ary_TrId.unshift(TrId);

		 			$('#m1_' + TrId).html('');
		 			$('#notes' + TrId).val('');
		 		}	

	        } 

	        for (i in ary_TrId) { 
	        	for (j in MyNoteArr) {
	        		if (ary_TrId[i] == MyNoteArr[j].TrId) {
        				MyNoteArr.splice(j, 1);
        				break;
        			}
        		}	
	        }

			localStorage.setItem('MyNote' + html_no, JSON.stringify(MyNoteArr));
			MyNoteList();
		} 

	}
	MyNoteList();
}


function MyNoteCopy() {
	var MyNoteArray = [];
	MyNoteArray = JSON.parse(localStorage.getItem('MyNote' + html_no));
	if (MyNoteArray != null) {// use JSON objects instead
		if (0 < MyNoteArray.length) {		 
			var strMyNote = '';
			for (i in MyNoteArray) { 
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


