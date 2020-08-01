function BookmarkList() {
	if (typeof P_HTM == 'undefined') {  
		var url = '<br>';
	} else {
		var	url = '<a href="javascript:void(0);" onClick="BookmarkAdd()"><img src="images/add_point_on.png" width="16">Add Bookmark</a><br>';
	}	

	var v1 = localStorage.getItem('BookmarkJSON'); 
	if ((!v1) || (v1 == '')) {
	} else {	
		var BookmarkArray = [];
		BookmarkArray = JSON.parse(v1);
		if (BookmarkArray != null){// use JSON objects instead
			url += '<a href="javascript:void(0);" onClick="BookmarkCopy()" style="font-size:11pt;"><img src="images/b_browse.png" width="16">Copy</a>&nbsp;&nbsp;';
			url += '<a href="javascript:void(0);" onClick="BookmarkClear(\'Select\')" style="font-size:11pt;"><img src="images/b_drop.png" width="16">Delete Select</a>&nbsp;&nbsp;'
			url += '<a href="javascript:void(0);" onClick="BookmarkClear(\'All\')" style="font-size:11pt;"><img src="images/b_drop.png" width="16">Delete All</a>';
			url += '<br>';

			for (i in BookmarkArray) {
				url += '<input type="checkbox" id="BookmarkRec' + i + '" checked value="' + BookmarkArray[i].html_no + '"/>';
				url += '<a style="white-space: nowrap;\" href=\"#/book/' + BookmarkArray[i].bookId + '/' + BookmarkArray[i].trId + '\");">';

				url += BookmarkArray[i].setTitle;
				url += ', Id='  + BookmarkArray[i].trId;
				url += '</a><br>';
			}
		} 
	}	 

	$('#bookmark').html(url); 
}

function BookmarkAdd() {
	if (typeof P_HTM == 'undefined') { 
		return;
	} 

	var tr_id = localStorage.getItem('tr_id');
	if (!tr_id) {
		return;
	}
	tr_id = parseInt(tr_id);

    var bookInfo = bookData.flat[html_no]; 

    var jBookmarkData = {bookId:"", trId:"", setTitle:"", pali:""};
    jBookmarkData.bookId = html_no;
    jBookmarkData.trId = tr_id;
    jBookmarkData.setTitle = bookInfo.set + '-' + bookInfo.title;
    jBookmarkData.pali =  document.getElementById('p' + tr_id).innerText;
 
    var BookmarkData = [];  
    var strBookmarkData = localStorage.getItem("BookmarkJSON");
    if (!strBookmarkData){
        BookmarkData.push(jBookmarkData); 
    } else {    	
        BookmarkData = JSON.parse(strBookmarkData); 
    	for (i in BookmarkData) {
    		if ((BookmarkData[i].bookId == html_no) && (BookmarkData[i].trId == tr_id)) {
    			BookmarkData.splice(i, 1);
    			break;
    		}
    	}
    	BookmarkData.unshift(jBookmarkData);
   	}
    localStorage.setItem('BookmarkJSON', JSON.stringify(BookmarkData));  
    BookmarkList();
}	

function BookmarkClear(type) {
	if (type == 'All') {
		document.write = localStorage.setItem('BookmarkJSON', ''); 
		$('#bookmark').html(url); 
	} else {
		var str = "";
		var strBookmark = localStorage.getItem('BookmarkJSON');
		var BookmarkArr = [];
		if (strBookmark){
			BookmarkArr = JSON.parse(strBookmark); 

			var ary = [];
			var cx = 0;
	 
	        var len = BookmarkArr.length -1;
	        for (i=len; 0<=i; i--) {
	        	var e = document.getElementById('BookmarkRec' + i);
	            if (e.checked == true){
	            	ary[cx] = i;
	            	cx = cx +1;
	            } 
	        } 
	        for (i in ary) {
	        	BookmarkArr.splice(ary[i], 1);
	        }

			localStorage.setItem('BookmarkJSON', JSON.stringify(BookmarkArr));
		} 
	}	
	BookmarkList();
}
     


function BookmarkCopy() {  
	var strBookmark = '';

    var BookmarkData = [];  
    var strBookmarkData = localStorage.getItem("BookmarkJSON"); 
    BookmarkData = JSON.parse(strBookmarkData); 
    for (i in BookmarkData) {
    	strBookmark += BookmarkData[i].bookId + '-' + BookmarkData[i].trId + '  ';
    	strBookmark += BookmarkData[i].setTitle + '\n';
    	strBookmark += BookmarkData[i].pali + '\n\n';
    }	 
    $('#CopyText').val(strBookmark);
    
    change_tab('page5');

    $('#CopyText').select();
    document.execCommand('copy'); 
}
