function iPadDirection() {
	d1 = document.getElementById('iPadDirection').value;
	if (d1.indexOf('NE') != -1) {
		t = '0';
		l = Math.max(0, window.innerWidth - parseInt(document.getElementById('main_div').style.width) -25);
	}
	if (d1.indexOf('SE') != -1) {
		t = window.innerHeight - parseInt(document.getElementById('main_div').style.height) -25;
		l = Math.max(0, window.innerWidth - parseInt(document.getElementById('main_div').style.width) -25);
	}
	if (d1.indexOf('SW') != -1) {
		t = Math.max(0, window.innerHeight - parseInt(document.getElementById('main_div').style.height) -25);
		l = '0';
	}
	if (d1.indexOf('NW') != -1) {
		t = '0';
		l = '0';
	}
	document.getElementById('main_div').style.top = t + 'px';
	document.getElementById('main_div').style.left = l + 'px';
}	
	  
function iPadWidth() {
	w1 = document.getElementById('iPadWidth').value;
	document.getElementById('main_div').style.width = w1 +'px';
	document.getElementById('main_content').style.width = w1 +'px';
	document.write = localStorage.setItem('main_width', w1);

	RedrawTable(w1);
}	
	  
function iPadHeight() {
	h1 = parseInt(document.getElementById('iPadHeight').value);
	document.getElementById('main_div').style.height = h1 +'px';

	tx = parseInt(document.getElementById('main_div').style.top);
	tx2 = document.getElementById('main_content').offsetTop;
	h2 = (h1 - (tx2 - tx) + 20);
	// document.getElementById('main_content').style.height = h2 + "px";

	console.log(tx +'  '+h1+ '  ' + window.innerHeight);
	if (window.innerHeight <= (tx + h1 + 25)) {
		t = tx + h1 - window.innerHeight + 25;
		t = tx - t;
		console.log('t=' + t);
		document.getElementById('main_div').style.top = Math.max(0, t) + 'px';
		document.write = localStorage.setItem('main_top', Math.max(0, t));
	}

	document.write = localStorage.setItem('main_height', h1);
	RedrawTable(0);
}	
