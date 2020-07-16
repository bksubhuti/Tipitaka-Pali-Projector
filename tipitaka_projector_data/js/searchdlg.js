    function Start_Fuzzy() {
        document.getElementById('SearchType1').checked = true;
        SetSelect();
        
        var startDate = new Date();
        var strTopResult ='';
        document.getElementById('SearchResult').innerHTML = strTopResult;


        //var Chars = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';

        document.getElementById('msg').innerHTML = "";
        // document.getElementById('out').innerHTML = "";

        localStorage.setItem("Sr_type", 'F');

        var key = toUniRegEx(document.getElementById('key').value).trim().toLowerCase();
        if ( 1 < key.length) {
            localStorage.setItem("Sr_key", key);

            var i, x , y;
            var ResultSpan ='';

            var ary_key = [];
            var ary = key.split(' ');
            for (i in ary) {
                if (i.trim() != '') {
                    //alert(i);
                    ary_key[ary[i]] = ary_key[i];
                }
            }

            var max_length = 0;
            for (x=1; x<=3; x++) {
                for (y=1; y<=8; y++) {
                document.getElementById('Out' + y + x).innerHTML = '';
                localStorage.setItem('Sr_Out' + y + x, '');
                }
            }

            for (i in pws_no) {
                localStorage.setItem('Sr_id' + i, '');
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

                        for (i in pws_no) {
                            //alert(i.substring(0, 2) + "  =  " + name1);

                            if (i.substring(0, 2) == name1) {
                                var file = 'pali/' + i + 'a.js';

                                var Sr_id = '';
                                //alert(file);

                                //**********
                                // read file
                                //**********
                                var flag = '0'
                                var rawFile = new XMLHttpRequest();
                                rawFile.open("GET", file, false);
                                rawFile.onreadystatechange = function () {
                                    if (rawFile.readyState === 4) {
                                        if (rawFile.status === 200 || rawFile.status == 0) {
                                            var data = rawFile.responseText;

                                            var ary_source = data.split( "\n" );
                                            data = data.toLowerCase();

                                            var ary = data.split( "\n" );

                                            for(index = 0; index < ary.length; index++) {
                                                var flag_ary = '1';
                                                //var sno = ary[index].substring(6);
                                                //sno = parseInt(sno);
                                                for (j in ary_key) {
                                                    if (ary[index].indexOf(j) == -1) {
                                                        flag_ary = '0';
                                                        j = 999;
                                                    }
                                                    //} else {
                                                    //	//var ary_tmp = ary[index].split(j);
                                                    //	//var regex = new RegExp( '(' + j + ')', 'i' );
                                                    //	//var ary_tmp = ary_source[index].split(regex);
                                                    //
                                                    //	tmp = replacei(ary_source[index], j, sub=> '<a href="' + i + '.htm?n=' + sno + '"  target=_blank style="background:yellow">' + j + "</a>");
                                                    //
                                                    //	ary_source[index] = tmp;
                                                }
                                                if (flag_ary == '1') {
                                                    if (flag == '0') {
                                                        flag = '1';
                                                        cx_file = cx_file + 1;
                                                        ResultSpan = setResultSpan(i);
                                                        pali = pali + '<hr style="border: 1pt dashed gray;">' + ResultSpan + i + " " + T_Book[i] + "</span><br>";
                                                    }

                                                    cx_hit = cx_hit + 1;

                                                    var tmp = ary_source[index];

                                                    tmp = tmp.replace(/\*/g, '') + "<br><br>";
                                                    tmp = tmp.replace(/\';/, '');
                                                    var pos = tmp.indexOf("='");
                                                    var tmp_id = tmp.substring(6, pos-1);
                                                    tmp = tmp.substring(pos + 2);

                                                    for (j in ary_key) {
                                                        tmp = replacei(tmp, j, sub=> '<a class="search-result" href="#/book/' + i + '/' + tmp_id + '" style="background:yellow">' + j + "</a>");
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
                                    //alert(i +" =  " + Sr_id);
                                    localStorage.setItem('Sr_id' + i, ';' + Sr_id);
                                }
                            }

                        }
                    }
                    if (cx_file != 0) {
                        max_length = max_length + pali.length;
                        if (5200000<max_length) {
                            document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>" + '<b style="color:red">&nbsp;Out of Memory</b>';
                        } else {
                            document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>";
                        }
                        total_file = total_file + cx_file;
                        total_hit = total_hit + cx_hit;
                        localStorage.setItem('Sr_Out' + y + x, pali);
                        strTopResult = strTopResult + pali;

                        //alert(pali.length);
                    } else {
                        document.getElementById('Out' + y + x).innerHTML = '0 Hits.' ;
                    }
                }
            }
        }
        var endDate = new Date();
        var seconds = (endDate.getTime() - startDate.getTime())/1000;
        document.getElementById('msg').innerHTML = 'Fuzzy Search : ' + total_file +' Files, ' + total_hit + ' Paragraphs, ' + seconds + " Seconds";

        // write the final string.
        document.getElementById('SearchResult').innerHTML = strTopResult;
    }





		function Start_Exact() {
			document.getElementById('SearchType1').checked = true;
			SetSelect();
			
			var startDate = new Date();
			var strTopResult ='';
			document.getElementById('SearchResult').innerHTML = strTopResult;


			var Str_Pali = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';

			document.getElementById('msg').innerHTML = "";
			// document.getElementById('out').innerHTML = "";

			localStorage.setItem("Sr_type", 'E');

			var key = toUniRegEx(document.getElementById('key').value).trim().toLowerCase();
			if ( 1 < key.length) {
				localStorage.setItem("Sr_key", key);

				var i, x , y;
                var ResultSpan ='';

				var ary_key = [];
				var ary = key.split(' ');
				for (i in ary) {
					if (i.trim() != '') {
						//alert(i);
						ary_key[ary[i]] = ary_key[i];
					}
				}

				var max_length = 0;
				for (x=1; x<=3; x++) {
				  for (y=1; y<=8; y++) {
				    document.getElementById('Out' + y + x).innerHTML = '';
				    localStorage.setItem('Sr_Out' + y + x, '');
				  }
				}

				for (i in pws_no) {
					localStorage.setItem('Sr_id' + i, '');
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

							for (i in pws_no) {
								//alert(i.substring(0, 2) + "  =  " + name1);

								if (i.substring(0, 2) == name1) {
									var file = 'pali/' + i + 'a.js';

									var Sr_id = '';
									//alert(file);

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

												var ary = data.split( "\n" );

												for(index = 0; index < ary.length; index++) {
													var flag_ary = '1';
													//var sno = ary[index].substring(6);
													//sno = parseInt(sno);

													for (j in ary_key) {
														var pos = ary[index].indexOf(j);
														var tmp = ary[index].substr(pos + j.length, 1);
														if ( pos == -1) {
															flag_ary = '0';
															j = 999;
														} else {
															var tmp = ary[index].substr(pos + j.length, 1);
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
													}
													if (flag_ary == '1') {
														if (flag == '0') {
															flag = '1';
                                                            cx_file = cx_file + 1;
                                                            ResultSpan = setResultSpan(i);
                                                            pali = pali + '<hr style="border: 1pt dashed gray;">' + ResultSpan + i + " " + T_Book[i] + "</span><br>";
                                                        }

														cx_hit = cx_hit + 1;

														var tmp = ary_source[index];

														tmp = tmp.replace(/\*/g, '') + "<br><br>";
														tmp = tmp.replace(/\';/, '');
														var pos = tmp.indexOf("='");
														var tmp_id = tmp.substring(6, pos-1);
														tmp = tmp.substring(pos + 2);

														for (j in ary_key) {
															tmp = replacei(tmp, j, sub=> '<a class="search-result" href="#/book/' + i + '/' + tmp_id + '" style="background:yellow">' + j + "</a>");
														}

														pali = pali + tmp;
														Sr_id = Sr_id + tmp_id + ";";
														strTopResult = strTopResult + pali;

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
										//alert(i +" =  " + Sr_id);
										localStorage.setItem('Sr_id' + i, ';' + Sr_id);
									}
								}

							}
						}
						if (cx_file != 0) {
							max_length = max_length + pali.length;
							if (5200000<max_length) {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>" + '<b style="color:red">&nbsp;Out of Memory</b>';
							} else {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>";
							}
							total_file = total_file + cx_file;
							total_hit = total_hit + cx_hit;
							localStorage.setItem('Sr_Out' + y + x, pali);
						} else {
							document.getElementById('Out' + y + x).innerHTML = '0 Hits.' ;
						}

					}
				}
			}
			var endDate = new Date();
			var seconds = (endDate.getTime() - startDate.getTime())/1000;
			document.getElementById('msg').innerHTML = 'Exact Search : ' + total_file +' Files, ' + total_hit + ' Paragraphs, ' + seconds + " Seconds";
		
			// write the final string.
			document.getElementById('SearchResult').innerHTML = strTopResult;				
		}


        function Start_Suffix() {
			document.getElementById('SearchType1').checked = true;
			SetSelect();

			var startDate = new Date();

			var Str_Pali = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';

			document.getElementById('msg').innerHTML = "";
			// document.getElementById('out').innerHTML = "";

			var strTopResult ='';
			document.getElementById('SearchResult').innerHTML = strTopResult;

			localStorage.setItem("Sr_type", 'S');

			var key = toUniRegEx(document.getElementById('key').value).trim().toLowerCase();

			if ( 1 < key.length) {
				localStorage.setItem("Sr_key", key);

				var i, x , y;
                var ResultSpan ='';

				var ary_key = [];
				var ary = key.split(' ');
				for (i in ary) {
					if (i.trim() != '') {
						//alert(i);
						ary_key[ary[i]] = ary_key[i];
					}
				}

				var max_length = 0;
				for (x=1; x<=3; x++) {
				  for (y=1; y<=8; y++) {
				    document.getElementById('Out' + y + x).innerHTML = '';
				    localStorage.setItem('Sr_Out' + y + x, '');
				  }
				}

				for (i in pws_no) {
					localStorage.setItem('Sr_id' + i, '');
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

							for (i in pws_no) {
								//alert(i.substring(0, 2) + "  =  " + name1);

								if (i.substring(0, 2) == name1) {
									var file = 'pali/' + i + 'a.js';

									var Sr_id = '';
									//alert(file);

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

												var ary = data.split( "\n" );

												for(index = 0; index < ary.length; index++) {
													var flag_ary = '1';
													//var sno = ary[index].substring(6);
													//sno = parseInt(sno);

													for (j in ary_key) {
														//alert(j);
														var pos = ary[index].indexOf(j);
														var tmp = ary[index].substr(pos + j.length, 1);
														if ( pos == -1) {
															flag_ary = '0';
															j = 999;
														} else {
															var tmp = ary[index].substr(pos + j.length, 1);
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
													if (flag_ary == '1') {
														if (flag == '0') {
															flag = '1';
                                                            cx_file = cx_file + 1;
                                                            ResultSpan = setResultSpan(i);
                                                            pali = pali + '<hr style="border: 1pt dashed gray;">' + ResultSpan + i + " " + T_Book[i] + "</span><br>";
                                                        }

														cx_hit = cx_hit + 1;

														var tmp = ary_source[index];

														tmp = tmp.replace(/\*/g, '') + "<br><br>";
														tmp = tmp.replace(/\';/, '');
														var pos = tmp.indexOf("='");
														var tmp_id = tmp.substring(6, pos-1);
														tmp = tmp.substring(pos + 2);

														for (j in ary_key) {
															tmp = replacei(tmp, j, sub=> '<a class="search-result" href="#/book/' + i + '/' + tmp_id + '" style="background:yellow">' + j + "</a>");
														}

														pali = pali + tmp;
														Sr_id = Sr_id + tmp_id + ";";
														strTopResult = strTopResult + pali;

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
										//alert(i +" =  " + Sr_id);
										localStorage.setItem('Sr_id' + i, ';' + Sr_id);
									}
								}

							}
						}
						if (cx_file != 0) {
							max_length = max_length + pali.length;
							if (5200000<max_length) {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>" + '<b style="color:red">&nbsp;Out of Memory</b>';
							} else {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>";
							}
							total_file = total_file + cx_file;
							total_hit = total_hit + cx_hit;
							localStorage.setItem('Sr_Out' + y + x, pali);
						} else {
							document.getElementById('Out' + y + x).innerHTML = '0 Hits.' ;
						}

					}
				}
			}
			var endDate = new Date();
			var seconds = (endDate.getTime() - startDate.getTime())/1000;
			document.getElementById('msg').innerHTML = 'Suffix Search : ' + total_file +' Files, ' + total_hit + ' Paragraphs, ' + seconds + " Seconds";
		
		
			// write the final string.
			document.getElementById('SearchResult').innerHTML = strTopResult;		
		}


        function Start_Prefix() {
			document.getElementById('SearchType1').checked = true;
			SetSelect();
			
			var startDate = new Date();

			var Str_Pali = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';
			var strTopResult ='';
			document.getElementById('SearchResult').innerHTML = strTopResult;

			document.getElementById('msg').innerHTML = "";
			// document.getElementById('out').innerHTML = "";

			localStorage.setItem("Sr_type", 'P');

			var key = toUniRegEx(document.getElementById('key').value).trim().toLowerCase();
			if ( 1 < key.length) {
				localStorage.setItem("Sr_key", key);

				var i, x , y;
                var ResultSpan ='';

				var ary_key = [];
				var ary = key.split(' ');
				for (i in ary) {
					if (i.trim() != '') {
						//alert(i);
						ary_key[ary[i]] = ary_key[i];
					}
				}

				var max_length = 0;
				for (x=1; x<=3; x++) {
				  for (y=1; y<=8; y++) {
				    document.getElementById('Out' + y + x).innerHTML = '';
				    localStorage.setItem('Sr_Out' + y + x, '');
				  }
				}

				for (i in pws_no) {
					localStorage.setItem('Sr_id' + i, '');
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

							for (i in pws_no) {
								//alert(i.substring(0, 2) + "  =  " + name1);

								if (i.substring(0, 2) == name1) {
									var file = 'pali/' + i + 'a.js';

									var Sr_id = '';
									//alert(file);

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

												var ary = data.split( "\n" );

												for(index = 0; index < ary.length; index++) {
													var flag_ary = '1';
													//var sno = ary[index].substring(6);
													//sno = parseInt(sno);

													for (j in ary_key) {
														var pos = ary[index].indexOf(j);
														var tmp = ary[index].substr(pos + j.length, 1);
														if ( pos == -1) {
															flag_ary = '0';
															j = 999;
														} else {
															var tmp = ary[index].substr(pos + j.length, 1);
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
													}
													if (flag_ary == '1') {
														if (flag == '0') {
															flag = '1';
                                                            cx_file = cx_file + 1;
                                                            ResultSpan = setResultSpan(i);
                                                            pali = pali + '<hr style="border: 1pt dashed gray;">' + ResultSpan + i + " " + T_Book[i] + "</span><br>";
                                                        }

														cx_hit = cx_hit + 1;

														var tmp = ary_source[index];

														tmp = tmp.replace(/\*/g, '') + "<br><br>";
														tmp = tmp.replace(/\';/, '');
														var pos = tmp.indexOf("='");
														var tmp_id = tmp.substring(6, pos-1);
														tmp = tmp.substring(pos + 2);

														for (j in ary_key) {
															tmp = replacei(tmp, j, sub=> '<a class="search-result" href="#/book/' + i + '/' + tmp_id + '" style="background:yellow">' + j + "</a>");
														}

														pali = pali + tmp;
														Sr_id = Sr_id + tmp_id + ";";
														strTopResult = strTopResult + pali;

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
										//alert(i +" =  " + Sr_id);
										localStorage.setItem('Sr_id' + i, ';' + Sr_id);
									}
								}

							}
						}
						if (cx_file != 0) {
							max_length = max_length + pali.length;
							if (5200000<max_length) {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>" + '<b style="color:red">&nbsp;Out of Memory</b>';
							} else {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>";
							}
							total_file = total_file + cx_file;
							total_hit = total_hit + cx_hit;
							localStorage.setItem('Sr_Out' + y + x, pali);
						} else {
							document.getElementById('Out' + y + x).innerHTML = '0 Hits.' ;
						}

					}
				}
			}
			var endDate = new Date();
			var seconds = (endDate.getTime() - startDate.getTime())/1000;
			document.getElementById('msg').innerHTML = 'Prefix Search : ' + total_file +' Files, ' + total_hit + ' Paragraphs, ' + seconds + " Seconds";
		
			// write the final string.
			document.getElementById('SearchResult').innerHTML = strTopResult;
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


function Keyin() {
    var key = toUniRegEx(document.getElementById('key').value);
    document.getElementById('key').value = key;
    key = key.trim().toLowerCase();

    if (document.getElementById('SearchType1').checked == true) {
        key_ary = key.split(' ');
        key_ary_length = key_ary.length;

        var out = "";
        var key_notfound = "";
        for (key_i = 0; key_i < key_ary_length; key_i++) {
            key = key_ary[key_i].trim();
            var len = key.length;
            if (1 <= len) {
                if ((pws[key.substring(0, 1)] == undefined) && ('abcdeghijklmnoprstuvyñāīūḍḷṃṅṇṭ'.indexOf(key.substring(0, 1)) != -1)) {
                    var newscript = document.createElement('script');
                    newscript.setAttribute('type', 'text/javascript');
                    newscript.setAttribute('src', 'dictionary/zz_search_' + key.substring(0, 1) + '.js');
                    var head = document.getElementsByTagName('head')[0];
                    head.appendChild(newscript);
                }

                if ((key_i + 1) == key_ary_length) {
                    cx = 0;
                    var out_tmp = "";

                    for (var i in pws) {
                        if (i.substring(0, len) == key) {
                            cx = cx + 1;
                            out_tmp = out_tmp + '<a hef="javascript:void(0)" style="color:blue;" onClick="Put(\'' + i + '\');">' + i + '</a>' + " <span style='font-size:9pt;color:#800080;'>" + pws[i] + "</span>,&nbsp;&nbsp;&nbsp;";
                            if (cx > 99) {
                                out_tmp = out_tmp + " <span style='font-size:12pt;color:red;'>> 99...</span>";
                                break;
                            }
                        }
                    }

                    if (out_tmp == "") {
                        key_notfound = key_notfound + key + " ";
                    } else {
                        out = out + out_tmp;
                    }
                } else {
                    if (pws[key] == undefined) {
                        key_notfound = key_notfound + key + ".... ";
                    }
                }
            }
        }
        document.getElementById('out').innerHTML = out;
    } else {
        if (2 < key.length) {
            var ary = [];
            for (i = 1; i <= 3; i++) {
                for (j = 1; j <= 8; j++) {
                    no = '' + j + '' + i;
                    ary[no] = '';
                    document.getElementById('Out' + no).innerHTML = '';
                }
            }

            var type2 = document.getElementById('SearchType2').checked;
            var lenx = key.length;

            old = 'x';
            cx = 0;
            for (i in P_TNO) {
                sutta = i.substring(0, 4)
                no = i.substring(0, 2);
                var sub = i.substr(8, lenx);
                //chk = document.getElementById('Nikaya' + no).checked;
                //if ((i.indexOf(key) != -1) && (chk == true)) {
                if (((i.indexOf(key) != -1) && type2) || ((sub == key) && !type2)) {

                    if (old != sutta) {
                        ary[no] = ary[no] + '<hr style="border: 1pt dashed gray;"><b style="color:brown;">' + sutta + " " + T_Book[sutta] + "</b><br>";
                    }
                    cx = cx + 1;

                    name = i.substring(8);
                    name = name.replace(key, '<span style="background:yellow">' + key + '</span>');

                    ary[no] = ary[no] + cx + ' ' + '<a href="javascript:void(0);" onClick="Jump(\'' + sutta + P_TNO[i] + '\')" title="' + P_TNO[i] + '">' + name + '<span></a><br>';
                    old = sutta;
                }
            }

            for (i = 1; i <= 3; i++) {
                for (j = 1; j <= 8; j++) {
                    no = '' + j + '' + i;
                    id = 'Out' + no;
                    document.getElementById(id).innerHTML = ary[no];
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
    v1 = document.getElementById("velthuis").style.display;
    if (v1 == "none") {
        document.getElementById("velthuis").style.display = "inline";
    } else {
        document.getElementById("key").focus();
        document.getElementById("velthuis").style.display = "none";

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
    document.getElementById('key').value = '';
    document.getElementById('key').focus();
    for (x = 1; x <= 3; x++) {
        for (y = 1; y <= 8; y++) {
            var name1 = 'Out' + y + x;
            document.getElementById(name1).innerHTML = '';
        }
    }
    document.getElementById('out').innerHTML = '';
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
        document.getElementById("SearchResult").style.display="inline";
    }else{
        document.getElementById("SearchResult").style.display="none";
	}
	
	// set the status to local storage.
	localStorage.setItem("ShowOnTop", checked.toString());

}

function Show_Detail(id) {
    var html = document.getElementById(id).innerHTML;
    var pos1 = html.indexOf('<hr');
    if (pos1 == -1) {
        document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + localStorage.getItem('Sr_' + id);
    } else {
        document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.substring(0, pos1);
    }
}