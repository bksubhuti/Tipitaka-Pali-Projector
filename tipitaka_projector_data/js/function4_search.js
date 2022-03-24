 
function PaliSearchGo(parm) {
	//************************
	// ary[0] = SrchType
	// ary[1] = key
	// ary[2] = check
	//************************
	var ary = parm.split('#');

	//
	showDialog('#search');
	Clear();
	$('#key').val(ary[1]);

	for (x = 1; x <= 3; x++) {
        for (y = 1; y <= 8; y++) {
        	no = '' + y + x;
        	if (ary[2].indexOf(no) != -1) {
           		key = 'Nikaya' + no;
            	document.getElementById(key).checked = '1'; 
            }
        }
    }
 
    for (y = 2; y <= 6; y++) {
    	no = '9' + y;
    	if (ary[2].indexOf(no) != -1) {
       		key = 'Nikaya' + no;
            document.getElementById(key).checked = '1'; 
        }
    }  

	$('#key').focus(); 
	SearchPali(ary[0]); 
}

function PaliSearchList() { 

	var PaliSearchArray = [];
	PaliSearchArray = JSON.parse(localStorage.getItem('PaliSearchJSON'));

	if (PaliSearchArray != null){// use JSON objects instead
		var url = '';

		var i = -1;
		for (const search of PaliSearchArray) { 
			i = i +1;
			url += '<span style="white-space: pre;">';
			url += '<input type="checkbox" id="SearchHist' + i + '" unchecked value="' + i + '"/>&nbsp;';
			url += '<a href="javascript:void(0);" onClick="PaliSearchGo(\'' + search.type + "#" + search.key + "#" + search.check +  '\');" title="' + search.check + '">'
			url += '<span style="background-color:red;color:white;">' + search.type + '</span>&nbsp;' + toTranslate(search.key) + '</a>'; //pass html_no to get the title of book 
			url += '</span><br>';
		}
		$("#searchhistory").html(url);
	}
}

function PaliSearchClear(type) {
	if (type == 'All') {
		document.write = localStorage.setItem('PaliSearchJSON', '');
		$('#searchhistory').html('');
	} else {
		var strSearch = "";
		var strPaliSearch = localStorage.getItem('PaliSearchJSON');
		var PaliSearchArr = [];
		if (strPaliSearch){
			PaliSearchArr = JSON.parse(strPaliSearch); 

			var ary = [];
			var cx = 0;
	 
	        var len = PaliSearchArr.length -1;
	        for (i=len; 0<=i; i--) {
	        	var e = document.getElementById('SearchHist' + i);
	            if (e.checked == true){
	            	ary[cx] = i;
	            	cx = cx +1;
	            } 
	        } 
	        for (i in ary) {
	        	PaliSearchArr.splice(ary[i], 1);
	        }

			localStorage.setItem('PaliSearchJSON', JSON.stringify(PaliSearchArr));
			PaliSearchList();
		} 
	}	
}


function PaliSearchCopy() {
	var strSearch = "";
	var strPaliSearch = localStorage.getItem('PaliSearchJSON');
	var PaliSearchArr = [];
	if (strPaliSearch){
		PaliSearchArr = JSON.parse(strPaliSearch); 

        var len = PaliSearchArr.length;
        for (i in PaliSearchArr) {
        	var e = document.getElementById('SearchHist' + i).checked;
            if (e == true){        
                strSearch = strSearch + PaliSearchArr[i].date + "\t";
                strSearch = strSearch + PaliSearchArr[i].type + "\t";
                strSearch = strSearch + toTranslate(PaliSearchArr[i].key) + "\t";
                strSearch = strSearch + PaliSearchArr[i].check + "\n"; 
            }
        }
 
		$('#CopyText').val(strSearch); 
	}
	
	$('#CopyText').select();
    
    change_tab('page5');

    $('#CopyText').select();
    document.execCommand('copy'); 
}


///////////////////////////////////////////////////////
/// function writeSearchStorage
// will manage unique list and put recent one up top
// if duplicate wants to be added
////////////////////////////////////////////////////////
function WriteSearchStorage(SrhType){
	// duplicates for now okay until I learn 
	// some() and shift()

	var SrhKey = $('#key').val();
	SrhKey = toRoman(SrhKey);
	SrhKey = toUniRegEx(SrhKey).trim().toLowerCase();

    var chk = '';
    var all = '';
    for (x = 1; x <= 3; x++) {
        for (y = 1; y <= 8; y++) {
            key = 'Nikaya' + y + x;
            if (document.getElementById(key).checked) {
            	chk = chk + ';' + y + x;
            }	
        	all = all + ';' + y + x;
        }
    }
 
    for (y = 2; y <= 6; y++) {
        key = 'Nikaya9' + y;
        if (document.getElementById(key).checked) {
        	chk = chk + ';9' + y;
        }	
    	all = all + ';9' + y;
    }  
    if (chk == '') {
    	chk = all.substr(1);
    } else {
    	chk = chk.substr(1);
    } 

    var gPaliSearchItem = [];

	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ('0' + today.getMinutes()).slice(-2);

    var jSeachData = {date:"", type:"", key:"", check:""};
    jSeachData.date = date;
    jSeachData.type = SrhType;
    jSeachData.key = SrhKey;
    jSeachData.check = chk; 
 
    var SeachData = [];  
    var strSeachData = localStorage.getItem("PaliSearchJSON");
    if (!strSeachData){
        SeachData.push(jSeachData); 
    } else {    	
        SeachData = JSON.parse(strSeachData); 
    	for (i in SeachData) {
    		if ((SeachData[i].type == SrhType) && (SeachData[i].key == SrhKey)) {
    			SeachData.splice(i, 1);
    			break;
    		}
    	}
    	SeachData.unshift(jSeachData);
   	}
    localStorage.setItem('PaliSearchJSON', JSON.stringify(SeachData));  

	PaliSearchList(); // refresh the list // maybe needed on book load.
}

