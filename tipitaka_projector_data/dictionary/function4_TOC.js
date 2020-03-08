function Message(tr_no) { 
	val = parseInt(tr_no); 

	var msg = val;
	var para = 0;		// para number;
	for (para=(P_Par.length-1); 0<para; para--) {
		if (P_Par[para] != null) {
			v1 = parseInt(P_Par[para].substring(1));
			if (v1 <= val) {
				msg = msg + '_PR' + para;
				break;
			}
		}
	} 	  
	var toc = 0;		// myanmar page number;
	for (toc=(val); 0<toc; toc--) {
		if (P_Tag[toc] != undefined) {
			v1 = P_Tag[toc].indexOf('[Pg.');
			if (v1 != -1) {
				msg = msg + '_M' + parseInt(P_Tag[toc].substring(v1 +4));
				break;
			}	
		}
	} 	  
	var toc = 0;		// PTS page number;
	for (toc=(val); 0<toc; toc--) {
		if (P_Tag[toc] != undefined) {
			v1 = P_Tag[toc].indexOf('[PTS.');
			if (v1 != -1) {
				msg = msg + '_P' + parseInt(P_Tag[toc].substring(v1 +5));
				break;
			}	
		}
	} 	  
	document.getElementById('message').innerHTML = msg;
}

function goToc() {
	var val = document.getElementById('Toc').value;
	var url = '#' + P_Toc[val];

	var old = '@' + localStorage.getItem('palihistory');
	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2)  + ('0' + today.getMinutes()).slice(-2);

	document.write.innerHTML = localStorage.setItem('palihistory', date + "_" + html_file + url + old) ;

	window.location = url;
}

function goUrl() {
	var p1 = document.getElementsByName('Reference');
	var val = parseInt(document.getElementById('PageNo').value);
	var url;

	var old = '@' + localStorage.getItem('palihistory');
	var today = new Date();
	var date = ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2)  + " "+ ('0' + today.getHours()).slice(-2) + ('0' + today.getMinutes()).slice(-2);

	if (p1[1].checked == true) {	// Paragraph
		if (P_Par[i] !== undefined) {
			url = '#' + P_Par[val];
			document.write.innerHTML = localStorage.setItem('palihistory', date + '_' + html_file + url + old);
			window.location = url;
		}	
	} else {	// Myanmar Page or PTS Page
		var url = '';
		if (p1[0].checked == true) { 	// Myanmar Page
			url = '#M' + html_no + '_' + val;
		} else { 						// PTS Page
			url = '#P' + html_no + '_' + val;
		}
		document.write.innerHTML = localStorage.setItem('palihistory', date + '_' + html_file + url + old);
		window.location = url;
	}
}

function PaliHistoryList() {
	var val = localStorage.getItem('palihistory');
	if ((val != null) && (val != '')) {
		var url = '';
		var ary = val.split('@');
		for (var i in ary) {
			if ((ary[i] != 'null') && (ary[i] != '')) {
				url = url + '<span onClick="PaliHistoryDisplay(\'' + ary[i].substring(10) + '\');"">'
				url = url + ary[i]  + '</span><br>';
			}
		}
		url = '&nbsp;<span style="font-size:10.5pt;" onClick="PaliHistoryClear(0)">&nbsp;<img src="images/b_drop.png">Clear All</span><br>' + url;
		document.getElementById('palihistory').innerHTML = url;
	}
}

function PaliHistoryClear(val) {
	document.write.innerHTML = localStorage.setItem('palihistory', '');
	document.getElementById('palihistory').innerHTML = ''; 
}

function PaliHistoryDisplay(val) {
	file = val.substring(0,8);
	pos = val.substring(8);

	if (window.location.toString().indexOf(file) != -1) {		// same file
		if (pos.indexOf('#') != -1) {	// directly jump
			window.location = pos;
		} else {	// myanmar or PTS page no jump
			var tr = document.getElementsByClassName('r1');
			for (var i=0; i<tr.length; i++) {
				if (tr[i].innerHTML.indexOf(pos) != -1) {
					document.getElementById('p' + (i +1)).scrollIntoView();
					break;
				}
			}
		}
	} else {
		document.write.innerHTML = localStorage.setItem('history_pos', pos);
		location.href = file;
	}
}