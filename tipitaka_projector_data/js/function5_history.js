function DictHistoryList() {

	var strDictInfoArr = localStorage.getItem('DictInfoArr');
	var DictInfoArr = [];

	if (strDictInfoArr){
		var url = '<br>';

		DictInfoArr = JSON.parse(strDictInfoArr);
		var len = DictInfoArr.length;
		for (var i=0 ; i < len ; i++ ) {
			url += '<input type="checkbox" name="AnkiHist" id="DictHist' + i + '" checked value="' + DictInfoArr[i].key + '"/>';
			url += '<a href="javascript:void(0);" onClick="DictHistoryDisplay(\'' + DictInfoArr[i].key + '\');" title="' + DictInfoArr[i].key + '">' + '&nbsp' + toTranslate(DictInfoArr[i].key) + '</a><br>';
		}
		$('#dicthistory').html(url);
	}
}

function DictHistoryClear(type) {
	if (type == 'All') {
		document.write = localStorage.setItem('DictInfoArr', '');
		$('#dicthistory').html('');
	} else {
		var strHistory = "";
		var strDictInfoArr = localStorage.getItem('DictInfoArr');
		var DictInfoArr = [];
		if (strDictInfoArr){
			DictInfoArr = JSON.parse(strDictInfoArr);

			//var len = DictInfoArr.length;
			//for (var i=0 ; i < len ; i++ ){
			//	strHistory = strHistory + DictInfoArr[i].key + "\n";
			//}
			var ary = [];
			var cx = 0;
	 
	        var len = DictInfoArr.length -1;
	        for (i=len; 0<=i; i--) {
	        	var e = document.getElementById('DictHist' + i).checked;
	            if (e == true){  
	            	ary[cx] = i;
	            	cx = cx +1;
	            }
	        } 
	        for (i in ary) {
	        	DictInfoArr.splice(ary[i], 1);
	        }

			document.write = localStorage.setItem('DictInfoArr', JSON.stringify(DictInfoArr));
			DictHistoryList();
		} 
	}	
}

function DictHistoryDisplay(val) {
	$('#DictionaryKey').val(val);
	change_tab('page1');
	DictionaryKeyGo();
}

function DictHistoryCopy() {
	var strHistory = "";
	var strDictInfoArr = localStorage.getItem('DictInfoArr');
	var DictInfoArr = [];
	if (strDictInfoArr){
		DictInfoArr = JSON.parse(strDictInfoArr);

        var len = DictInfoArr.length;
        for (i in DictInfoArr) {
        	var e = document.getElementById('DictHist' + i).checked;
            if (e == true){        
                strHistory = strHistory + DictInfoArr[i].key + "\n";
            }
        }
 
		$('#CopyText').val(strHistory); 
	}
	$('#CopyText').select();
    
    change_tab('page5');

    $('#CopyText').select();
    document.execCommand('copy'); 
}