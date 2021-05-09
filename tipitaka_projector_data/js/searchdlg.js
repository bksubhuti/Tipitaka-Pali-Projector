function SearchPali(SrhType) {
	document.getElementById('SearchType1').checked = true;
	SetSelect();
	
	var startDate = new Date();

	var Str_Pali = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';
	var strTopResult ='';
	$('#SearchResult').html(strTopResult);

	$('#msg').html('');

	localStorage.setItem("Sr_type", SrhType);

	var strKey = $('#key').val();
	strKey = toRoman(strKey);
	var key = toUniRegEx(strKey).trim().toLowerCase();

	if ( 1 < key.length) {
		localStorage.setItem("Sr_key", key);

		var i, x , y;
		var ResultSpan ='';

		var ary_key = [];
		var ary = key.split(' ');
		var tmp = '';
		for (i in ary) {
			if (i.trim() != '') {
				if (SrhType != 'T') {
					ary_key[ary[i]] = ary_key[i];
				} else {
					tmp = tmp + ' ' + ary[i];
				}
				
			}
		}
		if (SrhType == 'T') {
			ary_key[tmp.substr(1)] = tmp.substr(1);
		}

		var max_length = 0;
		for (x=1; x<=3; x++) {
			for (y=1; y<=8; y++) {
			$('#Out' + y + x).html('');
			localStorage.setItem('Sr_Out' + y + x, '');
			}
		}

		for (i in bookData.flat) {
			localStorage.setItem('Sr_id' + bookData.flat[i].bookId, '');
		}

		var total_file = 0;
		var total_hit = 0;

		for (x=1; x<=3; x++) {
			for (y=1; y<=8; y++) {
				var name1 = 'Nikaya' + y + x;
				var cx_file = 0;
				var cx_hit = 0;

				var pali = '';
				if (document.getElementById(name1).checked) {
					name1 = name1.substring(6);

					for (i in bookData.flat) {
						bookId = '' + bookData.flat[i].bookId;

						if (bookId.substring(0, 2) == name1) {
							if (document.getElementById('SearchBold').checked == false) {
								var file = 'pali/' + bookId + 'a.js';
							} else {
								var file = 'dictionary/bold_search/bold_pali_' + bookId + 'a.txt';
							}

							var Sr_id = '';
							//**********
							// read file
							//**********
							var flag = '0'
							var rawFile = new XMLHttpRequest();
							rawFile.open("GET", file, false);
							rawFile.onreadystatechange = function () {
								if (rawFile.readyState === 4) {
									if (rawFile.status === 200 || rawFile.status == 0) {
										
										var data =' ' +  rawFile.responseText + ' ';

										var ary_source = data.split( "\n" );
										data = data.toLowerCase();

										data = data.replace(/\*/g, '');
										var ary = data.split( "\n" );

										for(index = 0; index < ary.length; index++) {
											var flag_ary = '1';

											for (j in ary_key) {
												if (SrhType == 'F') {
	                                                if (ary[index].indexOf(j) == -1) {
	                                                    flag_ary = '0';
	                                                    j = 999;
	                                                }
												} else {
													var pos = ary[index].indexOf(j);
													var tmp = ary[index].substr(pos + j.length, 1);
														

													if ( pos == -1) {
														flag_ary = '0'; break;
													} else {
														var tmp = ary[index].substr(pos + j.length, 1);
														if ((SrhType == 'E') || (SrhType == 'T')) {
															if (Str_Pali.indexOf(tmp) != -1) {
																flag_ary = '0';
																j = 999;
															} else {
																var tmp = ary[index].substr(pos-1, 1);
																if (Str_Pali.indexOf(tmp) != -1) {
																	flag_ary = '0';
																	j = 999;
																}
															}
														}

														if (SrhType == 'P') {
															if (Str_Pali.indexOf(tmp) < 0) {
																flag_ary = '0';
																j = 999;
															} else {
																var tmp = ary[index].substr(pos-1, 1);
																if (0 <= Str_Pali.indexOf(tmp)) {
																	flag_ary = '0';
																	j = 999;
																}
															}
														}

														if (SrhType == 'S') {
															if (0 <= Str_Pali.indexOf(tmp)) {
																flag_ary = '0';
																j = 999;
															} else {
																var tmp = ary[index].substr(pos-1, 1);
																if (Str_Pali.indexOf(tmp) < 0) {
																	flag_ary = '0';
																	j = 999;
																}
															}
														}


													}
												}
											}
											if (flag_ary == '1') {
												if (flag == '0') {
													flag = '1';
													cx_file = cx_file + 1;
													ResultSpan = setResultSpan(i);
													pali = pali + '<hr style="border: 1pt dashed gray;">' + ResultSpan + i + " " + toSelectedScript(bookData.flat[i].title) + "</span><br>";
												}

												cx_hit = cx_hit + 1;

												var tmp = ary_source[index];

												tmp = tmp.replace(/\*/g, '');
												tmp = tmp.replace(/\';/, '');

												if (document.getElementById('SearchBold').checked == true) {
													var pos = tmp.indexOf("=");
													var tmp_id = tmp.substring(0, pos);
													tmp = tmp.substring(pos + 1);
												} else {
													var pos = tmp.indexOf("='");
													var tmp_id = tmp.substring(6, pos-1);
													tmp = tmp.substring(pos + 2);
												}
												tmp = toSelectedScript(tmp);
												tmp += "<br><br>";

												for (j in ary_key) {
													tmp = replacei(tmp, toSelectedScript(j), sub=> '<a class="grey-button search" href="#/book/' + i + '/' + tmp_id + '" style="background:yellow">' + toSelectedScript(j)  + "</a>");
												}

												pali = pali + tmp;
												Sr_id = Sr_id + tmp_id + ";";
												
											}
										}
									}
								}
							}
							rawFile.send(null);
							//*****************
							// end read file
							//*****************
							if (Sr_id != '') {
								localStorage.setItem('Sr_id' + i, ';' + Sr_id);
							}
						}
					}
				}
				if (cx_file != 0) {
					max_length = max_length + pali.length;
					if (5200000<max_length) {
						$('#Out' + y + x).html('<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>" + '<b style="color:red">&nbsp;Out of Memory</b>');
					} else {
						$('#Out' + y + x).html('<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>");
					}
					total_file = total_file + cx_file;
					total_hit = total_hit + cx_hit;
					localStorage.setItem('Sr_Out' + y + x, pali);
					strTopResult = strTopResult + pali;

				} else {
					$('#Out' + y + x).html('');
				}
			}
		}
	}
	var endDate = new Date();
	var seconds = (endDate.getTime() - startDate.getTime())/1000;
	$('#msg').html('Search Result: <b>' + total_file + '</b> Files, <b>' + total_hit + '</b> Paragraphs, ' + seconds + " Seconds");

	// write the final string.
	$('#SearchResult').html(strTopResult);
}
 

function setResultSpan(i){
    var strSpan = '';
    var ipalitext = 0;
    ipalitext = Math.floor(i / 1000);
    switch (ipalitext){
        case 1:
            strSpan = '<span style="color:blue;font-weight:bold">';
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            strSpan = '<span style="color:red;font-weight:bold">';
            break;
        case 7:
            strSpan = '<span style="color:purple;font-weight:bold">';
            break;
        default:
            strSpan = '<span style="color:green;font-weight:bold">';
            break;
    }

    return strSpan;
            
}

function toSelectedScript(input, script) {
	return toTranslate(input);

}

function SearchBold() {

    if (document.getElementById('SearchBold').checked == true) {
		$('#SubmitT').css('visibility', 'hidden');
	} else {
		$('#SubmitT').css('visibility', '');
	}

	Keyin();
}


function Keyin() {
    var key = toUniRegEx($('#key').val());
    $('#key').val(key);
	key = toRoman(key.trim().toLowerCase());
	


    if (document.getElementById('SearchType1').checked == true) {
        key_ary = key.split(' ');
        key_ary_length = key_ary.length;

        const currentScript = localStorage.getItem("view_left");

        key = key_ary[key_ary_length -1].trim();
        var len = key.length;
        var abc = 'abcdeghijklmnoprstuvyñāīūḍḷṃṅṇṭ';
        if (2 <= len) {


            if ((abc.indexOf(key.substr(0, 1)) != -1) && (abc.indexOf(key.substr(1, 1)) != -1)) {

				//*********************************************
				// bold 
				//
	
                var newscript = document.createElement('script');
                newscript.setAttribute('type', 'text/javascript');
                newscript.setAttribute('src', 'dictionary/search/xx_search_' + key.substr(0, 2) + '.js');
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(newscript);

                //****************************************************
                // word count 
                var chk = 0;

                for (x=1; x<=3; x++) {
					for (y=1; y<=8; y++) {

						var name1 = 'Nikaya' + y + x;
						if (document.getElementById(name1).checked) {
							if (name1 != 'Nikaya81') {
								chk = chk +1;
							}
						}
					}
				}

                //****************************************************
	            cx = 0;
	            var out_tmp = "";

				str =  key.replace(/[autnidlm]/g, (m) => variations[m]);
				filterRegex = new RegExp(str);

				var chkAll = false;
				if ((chk == 0) || (23 <= chk)) {
					chkAll = true;
				}
 
				var ary = {
					'A':11, 'B':12, 'C':13,
					'D':21, 'E':22, 'F':23,
					'G':31, 'H':32, 'I':33,
					'J':41, 'K':42, 'L':43,
					'M':51, 'N':52, 'O':53,
					'P':61, 'Q':62, 'R':63,
					'S':71, 'T':72, 'U':73,
							'V':82, 'W':83};

				var pwsSorted = [];
				var pwsBoldSorted = [];
				var pwsBold = [];
				for (var k in pws) {
					if (k.search(filterRegex)==0 ) {
						var paliKey = k.split('	')[0];
						val = '' + pws[k];

						// pali search
						if (document.getElementById('SearchBold').checked == false) {
							var paliCount = val.split('#')[0];

							for (var i=65; i<=87; i++) {
								var v2 = String.fromCharCode(i);
								var v3 = ';' + ary[v2] + ';';
								paliCount = paliCount.replace(v2, v3);
							}
							ary2 = paliCount.split(';');
							var newtotal = 0 ;
							for (i=1; i<ary2.length; i=i+2) {
								if ((chkAll == true) || 
									(document.getElementById('Nikaya' + ary2[i]).checked)) {
									newtotal = newtotal + parseInt(ary2[i +1]);
								}
							}
							if (0 < newtotal) {
								cx = cx +1
								pwsSorted[cx] = (999999 - Number(newtotal)) + paliKey;
								pws[paliKey] = Number(newtotal);
							}
						}

						// bold search
						if (val.indexOf('#') != -1) {
							var paliCount = val.split('#')[1];
							for (var i=65; i<=87; i++) {
								var v2 = String.fromCharCode(i);
								var v3 = ';' + ary[v2] + ';';
								paliCount = paliCount.replace(v2, v3);
							}
							ary2 = paliCount.split(';');
							var newtotal = 0 ;
							for (i=1; i<ary2.length; i=i+2) {
								if ((chkAll == true) || 
									(document.getElementById('Nikaya' + ary2[i]).checked)) {
									newtotal = newtotal + parseInt(ary2[i +1]);
								}
							}
							if (0 < newtotal) {
								cx = cx +1
								pwsBoldSorted[cx] = (999999 - Number(newtotal)) + paliKey;
								pwsBold[paliKey] = Number(newtotal); 
							} 
						}
					}
				}

				// merge array
				var aryLast = pwsSorted.concat(pwsBoldSorted);
				aryLast.sort();

				cx = 0;
				for (i in aryLast) {
					v2 = aryLast[i].substr(6);
					
					var out_tmp1 = '';
					if ((pws[v2] != undefined) && (pws[v2] != null)) {
						if (0 < pws[v2]) {
							out_tmp1 += " <span style='font-size:9.5pt;color:#800080;'>";
							out_tmp1 += pws[v2] + "</span>"; 
							pws[v2] = 0; 
						}
					}

					if ((pwsBold[v2] != undefined) && (pwsBold[v2] != null)) {
						if (0 < pwsBold[v2]) {
							out_tmp1 += ',<b style="font-size:10pt;background-color:black;color:white;">&nbsp;';
							out_tmp1 += ('' + pwsBold[v2]);
							out_tmp1 += '&nbsp;</b>';
							pwsBold[v2] = 0; 
						}
					}

					if (out_tmp1 != '') {
						cx = cx + 1;
						out_tmp += '<a hef="javascript:void(0)" style="color:blue;" onClick="Put(\'' + v2 + '\');">' + toSelectedScript(v2, currentScript) + '</a>';
						
						out_tmp += out_tmp1; 
						out_tmp += ",&nbsp;&nbsp;&nbsp;";

						if (cx > 99) {
							out_tmp += " <span style='font-size:12pt;color:red;'>> 99...</span>";
							break;
						} 
					}
				}
	            $('#out').html(out_tmp);
            }
        }
        

    } else {
        if (2 < key.length) {
        	//***************************************
        	// open search_Title_No.js in here 
        	//
    		addScriptToHead('js/search_Title_No.js');


            var ary = [];
            for (i = 1; i <= 3; i++) {
                for (j = 1; j <= 8; j++) {
                    no = '' + j + '' + i;
                    ary[no] = '';
                    $('#Out' + no).html('');
                }
            }

            var type2 = document.getElementById('SearchType2').checked;
            var lenx = key.length;

            old = 'x';
            cx = 0;
            for (i in P_TNO) {

				//
				// Sample variable values:
				//
				// i: 6102_001dhammapadapāḷi
				// key: dhammapad
				//
				// key is what the user typed in, i.e. the search term
				// i is the title item
				//




				const actualTitle = i.slice(8);
				let matchedAt = fuzzyLetterIndexOf(actualTitle, key);

            	if (!type2 && matchedAt !== 0) {
           			// If not 'type2' then this is a "Prefix Title" search
					//
					matchedAt = -1;
				}

            	if (matchedAt >= 0) {
					sutta = i.substring(0, 4)
					no = i.substring(0, 2);

                    if (old != sutta) {
                        ary[no] = ary[no] + '<hr style="border: 1pt dashed gray;"><b style="color:brown;">' + sutta + " " + toTranslate(bookData.flat[sutta].title) + "</b><br>";
                    }
                    cx = cx + 1;

                    const properMatch = actualTitle.substr(matchedAt, key.length);
                    const renderedTitle = actualTitle.replace(properMatch, '@!@' + properMatch + '#!#');

                    ary[no] = ary[no] + cx + ' ' + '<a href="javascript:void(0);" onClick="Jump(\'' + sutta + P_TNO[i] + '\')" title="' + P_TNO[i] + '">' + toTranslate(renderedTitle).replace(/@!@/g, '<span style="background:yellow">').replace(/#!#/g, '</span>') + '</a><br>';
					old = sutta;
                }
            }

            for (i = 1; i <= 3; i++) {
                for (j = 1; j <= 8; j++) {
                    no = '' + j + '' + i;
                    id = 'Out' + no;
                    $('#' + id).html(ary[no]);
                }
            }
        }
    }
}

//**************************************************************************************


//**************************************************************************************


//**************************************************************************************


//**************************************************************************************


//**************************************************************************************
function Velthuis() {
    v1 = $("#velthuis").css('display');
    if (v1 == "none") {
        $("#velthuis").css('display', "inline");
    } else {
        $("#key").focus();
    	$("#velthuis").css('display', "none");
    }
}

function Clear() {
    for (i in localStorage) {
        if (i.substring(0, 3) == 'Sr_') {
            localStorage.setItem(i, '');
            localStorage.removeItem(i);
        }
    }

    localStorage.setItem("Sr_key", '');
    $('#key').val('');
    document.getElementById('key').focus();
    for (x = 1; x <= 3; x++) {
        for (y = 1; y <= 8; y++) {
            var name1 = 'Kex' + y + x;
            $('#' + name1).html('');
            var name1 = 'Out' + y + x;
            $('#' + name1).html('');
        }
    }
    $('#msg').html('');
    $('#out').html('');
    $('#SearchResult').html('');
}

function choosePali(val) {
    var chk, key, x, y;
    var v1 = val.substring(0, 1);
    var v2 = val.substring(1, 2);

    if (val == 'All') {
        chk = document.getElementById('All').checked;
        for (x = 1; x <= 3; x++) {
            for (y = 1; y <= 8; y++) {
                key = 'Nikaya' + y + x;
                document.getElementById(key).checked = chk;
            }
        }
    }
    if (v1 == 'x') {
        chk = document.getElementById('MAT' + v2).checked;
        for (y = 1; y <= 8; y++) {
            key = 'Nikaya' + y + v2;
            document.getElementById(key).checked = chk;
        }
    }
    if (v2 == 'x') {
        chk = document.getElementById('Nikaya' + v1).checked;
        for (x = 1; x <= 3; x++) {
            key = 'Nikaya' + v1 + x;
            document.getElementById(key).checked = chk;
        }
    }
}

function ShowOnTopClick(checked)
{
    if (checked == true){
        $("#SearchResult").css('display', "inline");
    }else{
        $("#SearchResult").css('display', "none");
	}
	
	// set the status to local storage.
	localStorage.setItem("ShowOnTop", checked.toString());

}

function Show_Detail(id) {
    var html = $('#' + id).html();
    var pos1 = html.indexOf('<hr');
    if (pos1 == -1) {
        $('#' + id).html($('#' + id).html() + localStorage.getItem('Sr_' + id));
    } else {
        $('#' + id).html($('#' + id).html().substring(0, pos1));
    }
}

// this is called from the title fuzzy search  to load a book and title
function Jump(url) {
	html = url.substring(0, 4);
	id = url.substring(4);
	PaliHistoryGoUrl(html + "#p"+id);
}

// copied from index.htm when the search word is clicked on 
function Put(input) {
	var v1 = '';
	var v1Bold = '';
	if ((pws[input] != undefined) && (pws[input] != null)) {
		v1 = pws[input].split('#')[0];
		v1Bold = pws[input].split('#')[1];
	}
	
	var ary = {
		'A':11, 'B':12, 'C':13,
		'D':21, 'E':22, 'F':23,
		'G':31, 'H':32, 'I':33,
		'J':41, 'K':42, 'L':43,
		'M':51, 'N':52, 'O':53,
		'P':61, 'Q':62, 'R':63,
		'S':71, 'T':72, 'U':73,
				'V':82, 'W':83};
	v1Bold = v1Bold || '';
	for (var i=65; i<=87; i++) {
		var v2 = String.fromCharCode(i);
		var v3 = ';' + ary[v2] + ';';
		v1 = v1.replace(v2, v3);
		v1Bold = v1Bold.replace(v2, v3);
	}
	var ary3 = [];
	ary2 = v1.split(';');
	for (i=1; i<=ary2.length; i=i+2) {
		ary3[ary2[i]] = ary2[i +1];
	}

	//
	var aryBold3 = [];
	v1Bold = v1Bold || '';
	aryBold2 = v1Bold.split(';');
	for (i=1; i<=aryBold2.length; i=i+2) {
		aryBold3[aryBold2[i]] = aryBold2[i +1];
	} 

	for (i=1; i<=8; i++) {
		for (j=1; j<=3; j++) {
			var ij = i + '' + j;
			out = '';
			
			if (document.getElementById('SearchBold').checked == false) {
				if (ary3[ij] != undefined) {
					out = out + ary3[ij] + ',';
				}
			}

			if (aryBold3[ij] != undefined) {
				out = out + '<b style="background-color:black;color:white">&nbsp;' + aryBold3[ij] + '&nbsp;</b>,';
			}

			$('#Kex' + ij).html(out); 
		}
	}

	var strKey = toSelectedScript(input.trim());
	var pos = strKey.lastIndexOf(' ');
	if (pos != -1) {
		$('#key').val(strKey.substr(0, pos) + ' ' + input);
	} else {
		$('#key').val(strKey + ' ');
	}
	SearchPali('F');
}
