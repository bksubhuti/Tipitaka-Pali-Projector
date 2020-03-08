function Grammar_Open() {
	//BookTipOut();
	var idx = localStorage.getItem('tr_id');
	if ((idx) && (idx != undefined) && (idx != null)) {

		var url;
		var s1 = '';

		var para_no = '1';

		var pali2 = P_HTM[idx].split('*');
		var tags2 = P_Tag[idx].split('*');

		// get para_no
		var s0 = 'p' + idx;
		var s0 = P_Par.findIndex(key => key === s0);
		if (s0 != -1) {
			para_no = s0;
		}

		var n1 = '{!@#' + idx + '#@!}';
		var pali = P_HTM[idx].split('*');

		//var tags = P_Tag[idx].split('*');
		//tags[0]=  tags[0] + '<b style="color:red;">' + url + '</b>';

		s1 = '';
		//
		var Chars = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';
		//

		for (var idy in pali) {

			var word = pali[idy] + ' ';
			var word_ret = '';
			var word_str = '';
			for (var ndx=0; ndx < word.length; ndx ++) {
				var c1 = word.substr(ndx, 1);
				if (Chars.indexOf(c1) == -1) {
					if (word_str.length > 1) {
						word_ret = pe5[word_str.toLowerCase()] + " ";
						//alert(word_str);

						switch (view_left) {
							case 'Roman' :
								var ret = word_str;
								break;
							case 'Myanmar' :
								var ret = toMyanmar(word_str);
								break;
							case 'Sinhala' :
								var ret = toSinhala(word_str);
								break;
							case 'Thai' :
								var ret = toThai(word_str);
								break;
							case 'Devanagari' :
								var ret = toDevar(word_str);
								break;
						}

						if (word_ret.indexOf('undefined') == -1) {
		
							if ((word_ret.indexOf('3rd') != -1) || (word_ret.indexOf('2nd') != -1) || (word_ret.indexOf('1st') != -1)) {
								s1 = s1 + '<span style="color:red">' + ret + '</span>';
							} else{
								s1 = s1 + ret;
							}

							var reg1 = /\#/g;
							word_ret = word_ret.replace(reg1, '][');
							//var reg1 = /\[./g;
							//word_ret = word_ret.replace(reg1, '[');

							s1 = s1 + '<span style="color:#880000;font-size:12pt;">[' + word_ret + ']</span>';

						} else {
							s1 = s1 + ret;
						}
						s1 = s1 + c1;
					} else {
						s1 = s1 + word_str + c1;
					}
					word_str = '';
				} else {
					word_str = word_str + c1;
				}
			}

			//s1 = s1.trim() +  tags[idy];
			//document.getElementById('p' +idx).innerHTML = s1;
		}
		document.getElementById('page3_desc').innerHTML = s1;
		change_tab('page3');

		if (localStorage.getItem('Pali_note') == 'none') {
			$(".note").css("display", 'none');
		} else {
			$(".note").css("display", 'inline');
		}
	}	
}
