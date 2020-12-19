/*	// go to history position  
	if (localStorage.getItem('history_pos') != null) {
		if (localStorage.getItem('history_pos') != '') {
			var pos = localStorage.getItem('history_pos');	// pos #MP
 
			if (pos.indexOf('p') != -1) {	// for id
				loc = pos.substring(1); 
				document.getElementById(loc).scrollIntoView();
			} else {
				if ((pos.indexOf('M') != -1) || (pos.indexOf('P') != -1)){		// myanmar or PTS page
					loc = pos.substring(1);
					var tr = document.getElementsByClassName('r1');
					for (var i=0; i<tr.length; i++) {
						if (tr[i].innerHTML.indexOf(loc) != -1) {
							document.getElementById('p' + (i +1)).scrollIntoView();
							Message(i);
							break;
						}
					}
				} else {			// R= from paragraph number to id
					//loc = '"para' + pos.substring(2) + '"';	// loc=R12
					loc = pos.substring(2);
					var tr = document.getElementsByClassName('r1');
					//alert(tr.length);
					for (var i=tr.length; 1<i; i--) {
						console.log(loc + ' ' + i);
						no = tr[i].innerHTML.split('name="para')[1];
						console.log('  '+ no +'\n');
						if (no != undefined) {
							if (loc <= parseInt(no)) {
								document.getElementById('p' + (i +1)).scrollIntoView();
								Message(i);
								break;
							}	
						}
					}
				}
			} 
			document.write = localStorage.setItem('history_pos', ''); 
		}
	} 
*/