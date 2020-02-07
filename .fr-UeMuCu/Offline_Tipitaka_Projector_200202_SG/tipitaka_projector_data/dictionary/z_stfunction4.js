
function History_Open() {
	var val = localStorage.getItem('history');
	if ((val != null) && (val != '')) { 
		var url = '';
		if (document.getElementById('history').innerHTML == '') {
			var ary = val.split('@');
			for (var i in ary) {
				if ((ary[i] != 'null') && (ary[i] != '')) {
					url = url + '&nbsp<span style="color:black;">' + ary[i]  + '</span>&nbsp;<img src="images/2rightarrow.png" onClick="History_Go(\'' + ary[i].substring(15) + '\');"><br>';
				}
			}
		}   
		if (4 < i) {
			url = url + '<a href="#" onClick="History_Clr(0)" style="color:red;">Clear All</a>';
			url = url + '&nbsp;|&nbsp;<a href="#" onClick="History_Clr(5)" style="color:red;">Clear(5)</a>';
			url = url + '&nbsp;|&nbsp;<a href="#" onClick="History_Clr(3)" style="color:red;">Clear(3)</a>';
			url = url + '&nbsp;|&nbsp;<a href="#" onClick="History_Clr(1)" style="color:red;">Clear(1)</a>';
		}
		document.getElementById('history').innerHTML = url; 
	}
}

function History_Clr(val) { 
	if (val == '0') { 
		document.write.innerHTML = localStorage.setItem('history', ''); 
		document.getElementById('history').innerHTML = ''; 
	} else {
		var val = parseInt(val); 
		var url = '';
		var hist = '';
		var ary = localStorage.getItem('history').split('@');
		var i = ary.length - val -1; 
		for (var j =0; j<i; j++) {
			if (ary[j] != '') { 
				hist = hist + ary[j] + '@';
				url = url + '&nbsp<span style="color:black;">' + ary[j]  + '</span>&nbsp;<img src="images/2rightarrow.png" onClick="History_Go(\'' + ary[j].substring(15) + '\');"><br>';
			}
		}
		if (4 < j) {
			url = url + '<a href="#" onClick="History_Clr(0)" style="color:red;">Clear All</a>';
			url = url + '&nbsp;|&nbsp;<a href="#" onClick="History_Clr(5)" style="color:red;">Clear(5)</a>';
			url = url + '&nbsp;|&nbsp;<a href="#" onClick="History_Clr(3)" style="color:red;">Clear(3)</a>';
			url = url + '&nbsp;|&nbsp;<a href="#" onClick="History_Clr(1)" style="color:red;">Clear(1)</a>';
		} 
		
		document.write.innerHTML = localStorage.setItem('history', hist); 		 
		document.getElementById('history').innerHTML = url; 
	}
}

function History_Go(val) {
	file = val.substring(0,8);
	pos = val.substring(8);   

	if (window.location.toString().indexOf(file) != -1) {		// same file
		if (pos.indexOf('#') != -1) {	// directly jump
			document.getElementById('history').innerHTML = ''; 
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
		sel_off();
	} else {  
	document.write.innerHTML = localStorage.setItem('history_pos', pos); 
	location.href = file;  
	} 
}
