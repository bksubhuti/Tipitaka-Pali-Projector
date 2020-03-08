function MyNoteExport(key) { 	// 0=cancel, 1=save, lines=5-10-20
	if ('1' < key) {	// lines
		var tr_ids = '';
		var tr_tags = '';
		var tr_olds = '';
		var first = '';
		var k1 = Number(key);
		var s1 = Number(localStorage.getItem('tr_id'));
		var s2 = P_HTM.length;

		for (i=s1; i<=s2; i++) {  
			if (P_HTM[i] != undefined) {
				tr_ids = tr_ids + i + ';';		// keep tr_id & HTML Tag
				tr_tags = tr_tags + '<' + document.getElementById('m' + i).innerHTML.split('>')[0].substring(1) + '>{!@!}'; 
				tr_olds = tr_olds + document.getElementById('m' + i).innerHTML + '{!@!}';

				if (first == '') {
					first = i;
				}

				val = '';
				if ((M_LOC[i] != undefined) && (M_LOC[i] != '')) {	// remove HTML Tag
					val = document.getElementById('m' + i).innerHTML.replace(/<[^>]+>/gm ,'') ; 
				}
				height = parseInt(document.getElementById('p' + i).innerHTML.length /1.8);
				document.getElementById('m' + i).innerHTML = '<textarea id="notes' + i +'" style="font-size:14.0pt;line-height:180%;width:99%;height:' + height + 'pt;color:#000000;background-color:#e0ffff;">' + val + '</textarea>';

				k1 = k1 -1;
				if (k1 == 0) {
					break;
				}
			}
		}  
		document.getElementById('mynote1').value = s1;
		document.getElementById('mynoteids').value = tr_ids;
		document.getElementById('mynotetags').value = tr_tags;
		document.getElementById('mynoteolds').value = tr_olds;
		document.getElementById('notes' + first).focus();

		document.getElementById('mynotesave').style.display = 'inline';
		document.getElementById('mynotecancel').style.display = 'inline';
		document.getElementById('mynote5').style.display = 'none';
		document.getElementById('mynote10').style.display = 'none';
		document.getElementById('mynote20').style.display = 'none';
	}

	if (key == '1') {	//save 
		flag = '1'; 

		var ary1 = document.getElementById('mynoteids').value.split(';');
		var ary2 = document.getElementById('mynotetags').value.split('{!@!}');
		var ary3 = document.getElementById('mynoteolds').value.split('{!@!}'); 
		for (i=0; i<ary1.length; i++) {
			if (ary1[i] != '') {
				M_LOC[ary1[i]] = document.getElementById('notes' + ary1[i]).value.trim(); 
				if (M_LOC[ary1[i]] == '') {
					if (view_right == 'MyNote') {
	     				document.write = localStorage.removeItem('n' + html_no +'_' + ary1[i]);
					} 
					document.getElementById('m' + ary1[i]).innerHTML = ary3[i];
				} else {
					document.getElementById('m' + ary1[i]).innerHTML = ary2[i] +  M_LOC[ary1[i]] + '</p>';
					document.write = localStorage.setItem('n' + html_no +'_' + ary1[i] , M_LOC[ary1[i]]); 
				}
			}
		}  
 	} 

	if (key <='1') {	//save & cancel 
		var ary1 = document.getElementById('mynoteids').value.split(';');
		var ary2 = document.getElementById('mynotetags').value.split('{!@!}');
		var ary3 = document.getElementById('mynoteolds').value.split('{!@!}');
		for (i=0; i<ary1.length; i++) {
			if (ary1[i] != '') {
				if ((M_LOC[ary1[i]] == '') || (M_LOC[ary1[i]] == undefined)) {
     				document.write = localStorage.removeItem('n' + html_no +'_' + ary1[i]);
					document.getElementById('m' + ary1[i]).innerHTML = ary3[i];
				} else {
					document.getElementById('m' + ary1[i]).innerHTML = ary2[i] +  M_LOC[ary1[i]] + '</p>';
					document.write = localStorage.setItem('n' + html_no +'_' + ary1[i] , M_LOC[ary1[i]]); 
				}
			}	
		}   

		document.getElementById('mynote1').value = '';
		document.getElementById('mynoteids').value = '';
		document.getElementById('mynotetags').value = '';
		document.getElementById('mynoteolds').value = '';
		document.getElementById('mynotesave').style.display = 'none';
		document.getElementById('mynotecancel').style.display = 'none';
		document.getElementById('mynote5').style.display = 'inline';
		document.getElementById('mynote10').style.display = 'inline';
		document.getElementById('mynote20').style.display = 'inline';
	} 
}

