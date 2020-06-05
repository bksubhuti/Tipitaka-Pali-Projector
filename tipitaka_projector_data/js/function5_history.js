function DictHistoryList() {

	var url = "";

	var strDictInfoArr = localStorage.getItem('DictInfoArr');
	var DictInfoArr = [];
	if (strDictInfoArr){
		DictInfoArr = JSON.parse(strDictInfoArr);

		var len = DictInfoArr.length;
		for (var i=0 ; i < len ; i++ ){

			url = url + '<input type="checkbox" name="AnkiHist"  checked value="' + DictInfoArr[i].key + '"/><span style="color:blue;" onClick="DictHistoryDisplay(\'' + DictInfoArr[i].key + '\');">' + '&nbsp' + DictInfoArr[i].key + '</span><br>';

		}
		url = '<span style="cursor:pointer;color:blue;" onClick="DictHistoryClear()"><img src="images/b_drop.png">Clear All</span>&nbsp;&nbsp;' + '<span style="cursor:pointer;color:blue;" onClick="DictHistoryCopy()"><img src="images/b_browse.png">Copy Text</span><br>' + url;
		document.getElementById('dicthistory').innerHTML = url;


	}
}

function DictHistoryClear() {
	document.write = localStorage.setItem('DictInfoArr', '');
	document.getElementById('dicthistory').innerHTML = '';
}

function DictHistoryDisplay(val) {
	document.getElementById('DictionaryKey').value = val;
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
		for (var i=0 ; i < len ; i++ ){
			strHistory = strHistory + DictInfoArr[i].key + "\n";
		}

		document.getElementById('CopyText').value = strHistory;
	}
	$('#CopyText').select();
	document.execCommand('copy');
}
