


	function Sr_Go(val) {
		if (val == '0') {
			document.getElementById('Sr_Div').style.visibility = 'hidden';
			document.write.innerHTML = localStorage.setItem('Sr_id'+ html_no, ''); 			
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
			
			document.getElementById('p' + ary1[old]).scrollIntoView();

			document.getElementById('Sr_Now').innerHTML = old;
		}

	}

