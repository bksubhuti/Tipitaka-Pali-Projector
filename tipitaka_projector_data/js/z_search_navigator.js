function Sr_Go(val) {
	if (val == '0') {
		document.getElementById('Sr_Div').style.visibility = 'hidden';
		document.write = localStorage.setItem('Sr_id'+ html_no, ''); 
	} else {
		var old = Number(document.getElementById('Sr_Now').innerHTML);
		var last = Number(document.getElementById('Sr_Next').innerHTML);
		if (val == '2') {	// next
			old = old +1;
			if (last < old) {
				old =last;
			}
		} else {
			old = old -1;
			if (old <1) {
				old = 1;
			}
		}

		var ary1 = localStorage.getItem('Sr_id'+ html_no).split(';');  
		document.getElementById('Sr' + ary1[old]).scrollIntoView(); 
		document.getElementById('Sr_Now').innerHTML = old;
	} 
} 


function SrClear() {
	document.getElementById('Sr_Div').style.visibility = 'hidden';
    for (i in localStorage) {
    	if (i.substring(0, 3) == 'Sr_') {
      		document.write = localStorage.setItem(i, '');
      		document.write = localStorage.removeItem(i);
      	}	
    } 
}

window.onload = function () { 
	if (localStorage.getItem('Sr_id'+ html_no)) {
		
		var ary1 = localStorage.getItem('Sr_id'+ html_no).split(';');  
		var n = Number(location.search.split('n=')[1]);
		if (0 < n) {
			for (i in ary1) {
				if (ary1[i] == n ) {
					break;
				}
			}
			document.getElementById('Sr' + ary1[i]).scrollIntoView(); 
			document.getElementById('Sr_Now').innerHTML = (Number(i));
		}
	}
} 