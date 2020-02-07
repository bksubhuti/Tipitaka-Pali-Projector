/*
@ Change textSize function
*/
function textSize(side) {
	this.side = side;
	var form = '#' + side;
	form = ":input" + form; //select :input#id
	var textratio = $(form).prop('value');  

	document.write.innerHTML = localStorage.setItem(side, textratio);

	var p24 = parseInt(textratio * 24);
	var p30 = parseInt(textratio * 30);
	var p33 = parseInt(textratio * 33);
	var p36 = parseInt(textratio * 36); 

	if (view_left == 'Roman') { 
	  var h24 = parseInt(p24 * 1.4);
	  var h30 = parseInt(p30 * 1.4);
	  var h33 = parseInt(p33 * 1.4);
  	  var h36 = parseInt(p36 * 1.4);
	} else {
		var h24 = parseInt(p24 * 1.8);
		var h30 = parseInt(p30 * 1.8);
		var h33 = parseInt(p33 * 1.8);
		var h36 = parseInt(p36 * 1.8); 
	} 
	if (side == 'size_left') {	 
		$(".b1").css("font-size",	p24 + "pt");
		$(".b2").css("font-size",	p33 + "pt");
		$(".c3").css("font-size",	p24 + "pt");
		$(".c4").css("font-size", 	p30 + "pt");
		$(".g5").css("font-size", 	p24 + "pt");
		$(".g6").css("font-size", 	p24 + "pt");
		$(".g7").css("font-size", 	p24 + "pt");
		$(".g8").css("font-size",	p24 + "pt");
		$(".h9").css("font-size",	p24 + "pt");
		$(".ia").css("font-size",	p24 + "pt");
		$(".nb").css("font-size",	p36 + "pt");
		$(".sc").css("font-size", 	p24 + "pt");
		$(".sd").css("font-size", 	p24 + "pt");
		$(".te").css("font-size", 	p24 + "pt");
		$(".uf").css("font-size", 	p24 + "pt");

		$(".b1").css("line-height",	h24 + "pt");
		$(".b2").css("line-height",	h33 + "pt");
		$(".c3").css("line-height",	h24 + "pt");
		$(".c4").css("line-height",	h30 + "pt");
		$(".g5").css("line-height",	h24 + "pt");
		$(".g6").css("line-height",	h24 + "pt");
		$(".g7").css("line-height",	h24 + "pt");
		$(".g8").css("line-height",	h24 + "pt");
		$(".h9").css("line-height",	h24 + "pt");
		$(".ia").css("line-height",	h24 + "pt");
		$(".nb").css("line-height",	h36 + "pt");
		$(".sc").css("line-height",	h24 + "pt");
		$(".sd").css("line-height",	h24 + "pt");
		$(".te").css("line-height",	h24 + "pt");
		$(".uf").css("line-height",	h24 + "pt");
	} else {
		$(".m_b1").css("font-size",	p24 + "pt");
		$(".m_b2").css("font-size",	p33 + "pt");
		$(".m_c3").css("font-size",	p24 + "pt");
		$(".m_c4").css("font-size",	p30 + "pt");
		$(".m_g5").css("font-size",	p24 + "pt");
		$(".m_g6").css("font-size",	p24 + "pt");
		$(".m_g7").css("font-size",	p24 + "pt");
		$(".m_g8").css("font-size",	p24 + "pt");
		$(".m_h9").css("font-size",	p24 + "pt");
		$(".m_ia").css("font-size",	p24 + "pt");
		$(".m_nb").css("font-size",	p36 + "pt");
		$(".m_sc").css("font-size",	p24 + "pt");
		$(".m_sd").css("font-size",	p24 + "pt");
		$(".m_te").css("font-size",	p24 + "pt");
		$(".m_uf").css("font-size",	p24 + "pt"); 

		$(".m_b1").css("line-height",	h24 + "pt");
		$(".m_b2").css("line-height",	h33 + "pt");
		$(".m_c3").css("line-height",	h24 + "pt");
		$(".m_c4").css("line-height",	h30 + "pt");
		$(".m_g5").css("line-height",	h24 + "pt");
		$(".m_g6").css("line-height",	h24 + "pt");
		$(".m_g7").css("line-height",	h24 + "pt");
		$(".m_g8").css("line-height",	h24 + "pt");
		$(".m_h9").css("line-height",	h24 + "pt");
		$(".m_ia").css("line-height",	h24 + "pt");
		$(".m_nb").css("line-height",	h36 + "pt");
		$(".m_sc").css("line-height", 	h24 + "pt");
		$(".m_sd").css("line-height", 	h24 + "pt");
		$(".m_te").css("line-height", 	h24 + "pt");
		$(".m_uf").css("line-height", 	h24 + "pt");
	}
	
	if (view_right != 'x') {
		var r1 = Number($(':input#size_left').prop('value'));
		var m1 = Number($(':input#size_right').prop('value')); 
		var width_r1 = parseInt(100 * r1 / (r1 + m1));
		var width_m1 = parseInt(100 * m1 / (r1 + m1));

		$(".r1").css("width", width_r1 + '%');
		$(".m1").css("width", width_m1 + '%');
	} else {
		$(".r1").css("width", '85%');
		$(".m1").css("width", '15%');
		
	}
	//document.write.innerHTML = localStorage.setItem(side, font_family);
	//else {} use css default r1 85%, m1 15% (15% for empty place to click)
 
}//change textSize function


/*
@ Change textFont function
*/
function textFont(side) {
	var form = '#' + side;	// #font_left or #font_right
	form = ":input" + form; //select :input#id
	var font_family = $(form).prop('value');

	document.write.innerHTML = localStorage.setItem(side, font_family);

	if (side == 'font_left') { 
	$(".r1").css("font-family", font_family); 
	} else {
	$(".m1").css("font-family", font_family); 
	}  
}//change textFont function


/*
@ Change backgroundColor function
*/
function back_color(color) {
	var form = '#bg_color';
	form = ":input" + form; //select :input#id
	var color = $(form).prop('value');

	document.write.innerHTML = localStorage.setItem('bg_color', color);  
	$('table').css("background", color);

	var font_color = {
	'#f3ddb6':['#000000'],
	'#fff8dc':['#000000'],
	'#1f3763':['#fffffe'],
	'#000001':['#ffffff'],
	'#121212':['#b0b0b0'],
	'#010101':['#937811'],
	'#1e1e1e':['#628754'],
	'#090c11':['#2d3d4a'],
	'#3c3c3c':['#cecece'],
	'#5a5a5a':['#cacaca'],
	'#d7d4cd':['#626262'],
	'#e0e0e0':['#202020'],
	'#f0f0f0':['#008000'],
	'#fefefe':['#000000'],
	'#d8cbab':['#000001'],
	'#e2bdb4':['#010101']}
	var bld_color = {
	'#f3ddb6':['brown'],
	'#fff8dc':['brown'],
	'#1f3763':['#ffff00'],
	'#000001':['brown'],
	'#121212':['brown'],
	'#010101':['brown'],
	'#1e1e1e':['brown'],
	'#090c11':['brown'],
	'#3c3c3c':['brown'],
	'#5a5a5a':['brown'],
	'#d7d4cd':['brown'],
	'#e0e0e0':['brown'],
	'#f0f0f0':['brown'],
	'#fefefe':['brown'],
	'#d8cbab':['brown'],
	'#e2bdb4':['brown']}
	$(".r1").css("color", font_color[color]);
	$(".m1").css("color", font_color[color]);
	$(".bld").css("color", bld_color[color]); 
}//change backgroundColor function
 
