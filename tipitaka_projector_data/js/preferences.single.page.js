function RestorePreferences() {
    var def = [];
    def['bg_color'] = '@';
    def['contentdisplay'] = '@';
    def['contentfontname'] = '@';
    def['contentfontsize'] = '@';
    def['contentlineheight'] = '@';
    def['contentmode'] = '@';
    def['contentposition'] = '@';
    def['font_left'] = '@';
    def['font_right'] = '@';
    def['hee1'] = '@';
    def['hpc1'] = '@';
    def['hpc2'] = '@';
    def['hpd1'] = '@';
    def['hpe1'] = '@';
    def['hpe2'] = '@';
    def['hpe3'] = '@';
    def['hpe4'] = '@';
    def['hpe5'] = '@';
    def['hpe6'] = '@';
    def['hpg1'] = '@';
    def['hpm1'] = '@';
    def['hpm2'] = '@';
    def['hpm3'] = '@';
    def['hpm4'] = '@';
    def['hpv1'] = '@';
    def['hpv2'] = '@';
    def['hpv3'] = '@'; 
    def['hse1'] = '@'; 
    def['ipc1'] = '@';
    def['ipc2'] = '@';
    def['ipd1'] = '@';
    def['ipe1'] = '@';
    def['ipe2'] = '@';
    def['ipe3'] = '@';
    def['ipe4'] = '@';
    def['ipe5'] = '@';
    def['ipe6'] = '@';
    def['ipg1'] = '@';
    def['ipm1'] = '@';
    def['ipm2'] = '@';
    def['ipm3'] = '@';
    def['ipm4'] = '@';
    def['ipv1'] = '@';
    def['ipv2'] = '@';
    def['ipv3'] = '@'; 
    def['ise1'] = '@'; 
    def['main_height'] = '@';
    def['main_left'] = '@';
    def['main_top'] = '@';
    def['main_width'] = '@';
    def['Pali_note'] = '@';
    def['size_left'] = '@';
    def['size_right'] = '@';
    def['speech_repeat'] = '@';
    def['speech_speed']='@';
    def['view_left'] = '@';
    def['view_right'] = '@';
    def['width_left'] = '@';
    def['width_right'] = '@'; 
    def['Show_Numbers']='@';
    def['r1']='@';
    def['m1']='@';
    def['b1']='@';
    def['PaliFontSize'] ='@';
    def['panel_bg_color'] ='@';
    

    file = 'preferences.txt'; 
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            var data = rawFile.responseText; 
            data = data.replace(/<[^>]+>/gm, '');

            var ary = data.split( "\n" );
            for (i in ary) {
            var ary2 = ary[i].split('\t');

            if ((ary2[0] != null) && (ary2[1] != null)) { 
                var key = ary2[0].trim();
                var val = ary2[1].trim();

                if ((key != '') && (val != '')) { 
                if (def[key] == '@') { 
                    def[key] = val;
                }
                }
            }
            }

            for (i in def) {
            if (def[i] != '@') {
                document.write  = localStorage.setItem(i, def[i]);  
            }
            } 
            // reload the values.

            initPreferences();
            // window.location.reload();
        }
        }
    }
    rawFile.send(null);



}// end restore..

    var Dicts = [];
    Dicts['pc1'] = 'PC1: [10,530 entries - 675 KB] Pali Zh Suttacentral Offline 2016';
    Dicts['pc2'] = 'PC2: [20,113 entries - 5.25 MB] Pali Zh 12 in 1 @2018';
    Dicts['pd1'] = 'PD1: [3,607 entries - 400 KB] Pali Indonesian Suttacentral Offline 2016';
    Dicts['pe1'] = 'PE1: [23,850 entries - 1.34 MB ] Pali English Suttacentral Offline 2016';
    Dicts['pe2'] = 'PE2: [20,968 entries - 1.10 MB] Pali English Extracted From Digital Pali Reader (DPR)';
    Dicts['pe3'] = 'PE3: [16,274 entries - 6.91 MB] Pali English Dictionary (PTS)';
    Dicts['pe4'] = 'PE4: [381,754 entries - 37.1 MB] Pali English Declension Dict @DPR 2018';
    Dicts['pe5'] = 'PE5: [330,972entries - 14.5 MB] Pali Grammar Dictionary@DPR 2018';
    Dicts['pe6'] = 'PE6: [5,775 entries - 4,0 MB] Pali Proper Names G P Malalasekera@2018';
    Dicts['pg1'] = 'PG1: [22,729 entries - 1.27 MB] Pali Germany Suttacentral Offline 2016';
    Dicts['pm1'] = 'PM1: [153,527 entries - 37.8 MB] Pali Word Grammar @2018';
    Dicts['pm2'] = 'PM2: [153,527 entries - 23.9 MB] Tipitaka Pali Myanmar @2018';
    Dicts['pm3'] = 'PM3: [58,095 entries - 7.01 MB] Pali Myanmar Dictionary @U Hau Sein 2018';
    Dicts['pm4'] = 'PM4: [1,882 entries - 441 KB] Pali Roots Dictionary @2018';
    Dicts['pv1'] = 'PV1: [17,423 entries - 902 KB] Pali Viet Dictionary Bản dịch của ngài Bửu Chơn';
    Dicts['pv2'] = 'PV2: [3,827 entries - 214 KB] Pali Viet Abhidhamma Terms - ngài Tịnh Sự (phần ghi chú thuật ngữ)';
    Dicts['pv3'] = 'PV3: [914 entries - 253 KB] Pali Viet Vinaya Terms - Từ điển các thuật ngữ về luật do tỳ khưu Giác Nguyên sưu tầm';
    Dicts['se1'] = 'SE1: [223,917 entries - 28.9 MB] A Sanskrit English Dictionary - Monier Williams@1899';


function DictionaryMoveOption(source, destination) {   // source move to dist. 
    try { 
        for(var i=0; i<source.options.length; i++){ 
        if(source.options[i].selected){ 
            var e = source.options[i];  

            destination.options.add(new Option(e.text, e.value)); 
            destination.options[destination.options.length -1].title = e.title;
            source.remove(i);  
        } 
        } 
        DictionaryRenew();
    } catch(e) {
    } 
} 

function DictionaryChangePos(obj, index) { 
    if(index==-1){ 
        if (obj.selectedIndex>0){ 
        //obj.options(obj.selectedIndex).swapNode(obj.options(obj.selectedIndex-1)) //swapNode on at IE
        obj.insertBefore(obj.options[obj.selectedIndex], obj.options[obj.selectedIndex - 1]); 
        } 
    }else if(index==1){ 
        if (obj.selectedIndex<obj.options.length-1){ 
        //obj.options(obj.selectedIndex).swapNode(obj.options(obj.selectedIndex+1)) //swapNode at IE
        obj.insertBefore(obj.options[obj.selectedIndex + 1], obj.options[obj.selectedIndex]);  
        } 
    } 
    DictionaryRenew();
}

function DictionaryRenew() {
    var e = document.form1.DictionaryEnable;
    document.getElementById('EnableCount').innerHTML = e.options.length;
    for(var i=0; i<e.options.length; i++){ 
        val = e.options[i].value; 
        inc = (i + 1) * 10;
        inc = ('000' + inc).slice(-3);
        document.write  = localStorage.setItem('h' + val, inc); 

        initDictionaries();
    }

    var e = document.form1.DictionaryDisable;
    document.getElementById('DisableCount').innerHTML = e.options.length;
    var val_disable = '';

    j = e.options.length-1;   // remove all options  
    for(var i=j; 0<=i; i--) { 
        val = e.options[i].value;
        val_disable = val_disable + val + ';';
        document.write  = localStorage.setItem('h' + val, '000'); 
        e.remove(i);
    } 

    for(i in Dicts) {   // add options by Dicts order
        if (val_disable.indexOf(i) != -1) { 
        s1 = Dicts[i].split('] '); 
        e.options.add(new Option(s1[1], i));   
        e.options[e.length -1].title = s1[0] + ']';
        }
    }
}

function toGetAbbr(val) { // 0= from disabled, 1 = from enabled
    if (val == '0') {
        val = document.getElementById('DictionaryDisable').value;
    } else{
        val = document.getElementById('DictionaryEnable').value;
    }
    document.getElementById('AbbreviatedDictionary').value = val;
    document.getElementById('AbbreviatedMessage').innerHTML = Dicts[val];

    v1 = localStorage.getItem('i' + val);
    if (!v1) {
        v1 = val;
    }
    document.getElementById('Abbreviated').value = v1;
}

function toSaveAbbr() { // 0= from disabled, 1 = from enabled
    no = document.getElementById('AbbreviatedDictionary').value;
    if (no != '') {
        val = document.getElementById('Abbreviated').value.trim();
        if (val == '') {
        val = no;
        }
        val = val.substr(0, 8);
        document.write = localStorage.setItem('i' + no, val); 
    }
}

function ChooseSelect(key) {
    val = document.getElementById(key).value;
    document.write = localStorage.setItem(key, val);


    if (key == 'contentfontname') {
        document.getElementById('showfontnamesize').innerHTML = val + ' ' + document.getElementById('contentfontsize').value + 'pt';

        document.getElementById('showfontnamesize').style.fontFamily = val;
        document.getElementById('showbackground').style.fontFamily = val;
        document.getElementById('showfontcolor').style.fontFamily = val;

        document.write = localStorage.setItem('contentfontname', val);
    }

    if (key == 'contentlineheight') {
        var x = document.getElementById('colortable').getElementsByTagName('td');
        x[0].style.lineHeight = val + '%';

        document.write = localStorage.setItem('contentlineheight', val);
    }


    if (key == 'PaliFontSize'){

        localStorage.setItem("PaliFontSize", val);
        // call the text size routine found in all_broswer_stllookup.. 
    }

    if (key == 'bg_color'){
        document.body.style.background = val;

        var r1='';
        var m1='';
        var b1='';

        // copied from all_browser_stlookup_jquery.js
        // set r1 m1 in local storage
//        if (!(val) || (val == "#f3ddb6")) {   $("select#bg_color").val('#f3ddb6'); }
        if ((val) && (val != "#f3ddb6")) {
            if (val == "#fff8dc") {r1 = m1 = 'black';   }// { $(".r1").css("color","black"); $(".m1").css("color","black") }
            else  {r1 = m1 = '#FFF2CC'} ;  // { $(".r1").css("color","#FFF2CC"); $(".m1").css("color","#FFF2CC");}
//            $("table").css("background", val);
        }

        var font_color = {
        '#f3ddb6':['#000000'],
        '#fff8dc':['#000000'],
        '#1f3763':['#fffffe'],
        '#000001':['#ffffff'],
        '#121212':['#b0b0b0'],
        '#010101':['#937811'],
        '#090c11':['#2d3d4a'],
        '#3C3C3C':['#cecece'],
        '#5a5a5a':['#cacaca'],
        '#d7d4cd':['#626262'],
        '#e0e0e0':['#202020'],
        '#f0f0f0':['#008000'],
        '#fefefe':['#000000'],
        '#d8cbab':['#000001'],
        '#e2bdb4':['#010101']}
        var b1_color = {
        '#f3ddb6':['brown'],
        '#fff8dc':['brown'],
        '#1f3763':['#ffff00'],
        '#000001':['brown'],
        '#121212':['brown'],
        '#010101':['brown'],
        '#090C11':['brown'],
        '#3c3c3c':['brown'],
        '#5a5a5a':['brown'],
        '#d7d4cd':['brown'],
        '#e0e0e0':['brown'],
        '#f0f0f0':['brown'],
        '#fefefe':['brown'],
        '#d8cbab':['brown'],
        '#e2bdb4':['brown']}


        r1 = font_color[val];
        m1 = font_color[val];
        b1 = b1_color[val];

        // set these to local storage
        localStorage.setItem("r1", r1);
        localStorage.setItem("m1", m1);
        localStorage.setItem("b1", b1);

        $('h2').css('color', r1);
        $('h3').css('color', r1);

        var el = document.getElementById("main_table");
            if (el)
                {
                    document.getElementById("main_table").style.backgroundColor = bg_color;
                    document.getElementById("main_div").style.backgroundColor = bg_color;
                }

        hideshowlogo();

        // get the theme checkbox.. if checked then set the panel to the same color
        if ( document.getElementById("Themes").checked == true ){
        

            localStorage.setItem('panel_bg_color', val);

            // need to make string?  stackexchange  otherwise length is always 1
            let strR1= String(r1);
            // Panel FontColor
            localStorage.setItem('panel_font_color', strR1);
            // I don't feel like doing the code 
            // to set this little box.. It is done here.
            initPreferences();
        }

    }

    // this will set the colors adn everything.   
    // located finalscript.js; 
    setTableStyling();
 
} 

function ChooseRadio(key) {
    val = document.getElementById(key).value;
    if (key.indexOf('Pali_note') != -1) {
        if (key == 'Pali_note1') {
            document.write  = localStorage.setItem('Pali_note', 'inline');
        } else {
            document.write  = localStorage.setItem('Pali_note', 'none');
        }
    }

    if (key == 'Show_Numbers1') {
        document.write  = localStorage.setItem('Show_Numbers', 'true');
    }
    if (key == 'Hide_Numbers2') {   
        document.write  = localStorage.setItem('Show_Numbers', 'false');
    }


    if (key.indexOf('position') != -1) {



        if (val == 1){ 
        // left fixed will set Always (display)
        // disable click to show
        document.getElementById('displayclick').disabled = true;
        document.getElementById('displayalways').checked = true;

        }
        else{
            document.getElementById('displayclick').disabled = false;
        }

        document.write  = localStorage.setItem('contentposition', val);
    }

    if (key.indexOf('display') != -1) {
        document.write  = localStorage.setItem('contentdisplay', val);
    }
    
    if (key.indexOf('mode') != -1) {
        document.write  = localStorage.setItem('contentmode', val);
    }

}

function ChooseCheckbox(key) {
    chk = document.getElementById(key).checked;

    if (key.indexOf('hee1') != -1) {
        if (chk == true) {
        document.write  = localStorage.setItem('hee1', 1);
    } else {
        document.write  = localStorage.setItem('hee1', 0);
        }
    }

    if (key.indexOf('Themes') != -1) {
        if (chk == true) {
             localStorage.setItem('Themes', 'true');
        } else {
             localStorage.setItem('Themes', 'false');
            }
    }
    
}

function ChooseRange(key) {
    var val = document.getElementById(key).value;
    document.write = localStorage.setItem(key, val);

    if (key.indexOf('divwidth') != -1) {
        document.getElementById('width_left').innerHTML = val + ' %';
        document.getElementById('width_right').innerHTML = (100- Number(val)) + ' %';
        document.write = localStorage.setItem('width_left', val);
        document.write = localStorage.setItem('width_right', (100 - Number(val)));
    } 

    if (key.indexOf('divheight') != -1) {
        document.getElementById('showdivheight').innerHTML = 'Height=' + val + ' %';
    } 
    if (key.indexOf('speed') != -1) {
        document.getElementById('showspeed').innerHTML = 'Speed=' + val;
    }
    if (key.indexOf('fontsize') != -1) {
        document.getElementById('showfontnamesize').innerHTML = document.getElementById('contentfontname').value + ' ' + val + 'pt';

        document.getElementById('showfontnamesize').style.fontSize = val + 'pt';
        document.getElementById('showbackground').style.fontSize = val + 'pt';
        document.getElementById('showfontcolor').style.fontSize = val + 'pt';
        
        document.write  = localStorage.setItem('contentfontsize', val);
        //
        var x = document.getElementById('colortable').getElementsByTagName('td');
        x[0].style.lineHeight = document.getElementById('contentlineheight').value + '%';
    }

    if (key.indexOf('color') != -1) {
        r = Number(document.getElementById('colorR').value);
        g = Number(document.getElementById('colorG').value);
        b = Number(document.getElementById('colorB').value);

        var x = document.getElementById('colortable').getElementsByTagName('td');
        x[0].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        document.getElementById('showbackground').innerHTML = 'Background = RGB(' + r +', ' + g + ', ' + b +')';

        localStorage.setItem('contentbackgroundR', r);
        localStorage.setItem('contentbackgroundG', g);
        localStorage.setItem('contentbackgroundB', b);
    }

    if (key.indexOf('fontcolor') != -1) {
        r = Number(document.getElementById('fontcolorR').value);
        g = Number(document.getElementById('fontcolorG').value);
        b = Number(document.getElementById('fontcolorB').value);

        document.getElementById('showfontnamesize').style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        document.getElementById('showbackground').style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        document.getElementById('showfontcolor').style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        document.getElementById('showfontcolor').innerHTML = 'Font Color = RGB(' + r +', ' + g + ', ' + b +')';

        localStorage.setItem('contentfontcolorR', r);
        localStorage.setItem('contentfontcolorG', g);
        localStorage.setItem('contentfontcolorB', b);
    }
} 

function SavePreferences() {
    def = [];
    def['bg_color'] = '';
    def['contentbackgroundR'] = '';
    def['contentbackgroundG'] = '';
    def['contentbackgroundB'] = '';
    def['contentdisplay'] = '';
    def['contentfontcolorR'] = '';
    def['contentfontcolorG'] = '';
    def['contentfontcolorB'] = '';
    def['contentfontname'] = '';
    def['contentfontsize'] = '';
    def['contentlineheight'] = '';
    def['contentmode'] = '';
    def['contentposition'] = '';
    def['font_left'] = '';
    def['font_right'] = '';
    def['hee1'] = '';
    def['hpc1'] = '';
    def['hpc2'] = '';
    def['hpd1'] = '';
    def['hpe1'] = '';
    def['hpe2'] = '';
    def['hpe3'] = '';
    def['hpe4'] = '';
    def['hpe5'] = '';
    def['hpe6'] = '';
    def['hpg1'] = '';
    def['hpm1'] = '';
    def['hpm2'] = '';
    def['hpm3'] = '';
    def['hpm4'] = '';
    def['hpv1'] = '';
    def['hpv2'] = '';
    def['hpv3'] = '';
    def['hpv3'] = ''; 
    def['hse1'] = ''; 
    def['ipc1'] = '';
    def['ipc2'] = '';
    def['ipd1'] = '';
    def['ipe1'] = '';
    def['ipe2'] = '';
    def['ipe3'] = '';
    def['ipe4'] = '';
    def['ipe5'] = '';
    def['ipe6'] = '';
    def['ipg1'] = '';
    def['ipm1'] = '';
    def['ipm2'] = '';
    def['ipm3'] = '';
    def['ipm4'] = '';
    def['ipv1'] = '';
    def['ipv2'] = '';
    def['ipv3'] = '';
    def['ipv3'] = ''; 
    def['ise1'] = ''; 
    def['main_height'] = '';
    def['main_left'] = '';
    def['main_top'] = '';
    def['main_width'] = ''; 
    def['Pali_note'] = '';
    def['size_left'] = '';
    def['size_right'] = '';
    def['speech_repeat'] = '';
    def['speech_speed']='';
    def['view_left'] = '';
    def['view_right'] = '';
    def['width_left'] = '';
    def['width_right'] = '';
    def['Show_numbers']='';
    def['r1']='';
    def['m1']='';
    def['b1']='';
    def['PaliFontSize']='';

    for (i in localStorage) {
        if (def[i] != null) {
        def[i] = localStorage[i];
        }
    }

    dat = '';
    for (i in def) {
        if (def[i] != '') {
        dat = dat + i + '\t' + def[i] + '\n';
        }
    }
    document.getElementById('preferences').value = dat;

    var blob = new Blob([dat], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'preferences.txt');
} 


window.onload = function () {
    initPreferences();
}

var setPanelFontColorInput = function setPanelFontColorInput() {
    var panel_font_color = localStorage.getItem("panel_font_color");
    document.getElementById('panel_font_color').value = panel_font_color;
    return panel_font_color;
};

var setPanelBackgroundColorInput = function setPanelBackgroundColorInput() {
    var panel_bg_color = localStorage.getItem("panel_bg_color") || '#fff000';
    document.getElementById('panel_bg_color').value = panel_bg_color;
    return panel_bg_color;
}

var updatePanelColors = function updatePanelColors(panel_bg_color, panel_font_color) {
    var panel_bg_color = setPanelBackgroundColorInput();
    var panel_font_color = setPanelFontColorInput();

    document.getElementById("main_div").style.backgroundColor = panel_bg_color;
    document.getElementById("main_div").style.color = panel_font_color;
    
    var x = document.getElementById('colortable').getElementsByTagName('td');
    x[0].style.backgroundColor =  panel_bg_color ;//'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
    x[0].style.color = panel_font_color; //'rgb(' + fontcolorR + ',' + fontcolorG + ',' + fontcolorB + ')';
    x[0].style.lineHeight = contentlineheight + '%';

    document.getElementById('showbackground').innerHTML = 'Background = ' + panel_bg_color;
    document.getElementById('showfontcolor').innerHTML = 'Font Color = ' + panel_font_color;

}

function initPreferences(){

    // View Left
    var size_left = localStorage.getItem("size_left");
    document.getElementById('size_left').value = size_left;

    var font_left = localStorage.getItem("font_left");
    document.getElementById('font_left').value = font_left;

    var PaliFontSize = localStorage.getItem("PaliFontSize");
    document.getElementById('PaliFontSize').value = PaliFontSize;

    var view_left = localStorage.getItem("view_left");
    document.getElementById('view_left').value = view_left;
    if (view_left == 'Myanmar') {
        if ((font_left != 'Myanmar Text') && (font_left != 'Pyidaungsu')) {
        font_left = 'Myanmar Text';
        document.getElementById('font_left').value = font_left;
        } 
    }  

    // Background Color
    var bg_color = localStorage.getItem("bg_color");
    document.getElementById('bg_color').value = bg_color;
    // need to change for dlg too
    // cannot get this to refresh.
    document.body.style.background = bg_color;
/*
    const setBg = (elementId, color) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.backgroundColor = color;
        }
        console.log('setting bg', element, color);
    };
    ['main_table', 'main_div'].forEach(id => setBg(id, bg_color));
  */  
 
    updatePanelColors();


    // check to see if themes is set or not and load it.
    if(localStorage.getItem('Themes')=='true'){
        document.getElementById('Themes').checked = true;
    }else {
        document.getElementById('Themes').checked = false;
    }

    // get the font color and set it 
    var r1 = localStorage.getItem('r1');
    $('h2').css('color', r1);
    $('h3').css('color', r1);
    document.getElementById("main_table").style.backgroundColor = bg_color;
    



    hideshowlogo();

    // Left - Right Width Ratio
    var width_left = localStorage.getItem("width_left");
    document.write = localStorage.setItem("width_right", (100 - Number(width_left)));
    document.getElementById('divwidth').value = width_left;
    document.getElementById('width_left').innerHTML = width_left + ' %';
    document.getElementById('width_right').innerHTML = (100 - Number(width_left)) + ' %';

    // View Right
    var view_right = localStorage.getItem("view_right");
    document.getElementById('view_right').value = view_right;

    var font_right = localStorage.getItem("font_right");
    document.getElementById('font_right').value = font_right;
    if (view_right == 'Myanmar') {
        if ((font_right != 'Myanmar Text') && (font_right != 'Pyidaungsu')) {
        font_right = 'Myanmar Text';
        document.getElementById('font_right').value = font_right;
        } 
    }  

    var size_right = localStorage.getItem("size_right");
    document.getElementById('size_right').value = size_right;

    // Pali_note
    var Pali_note = localStorage.getItem("Pali_note");
    if (Pali_note == 'inline') {
    document.getElementById('Pali_note1').checked = true;
    } else {
    document.getElementById('Pali_note2').checked = true;
    }

    
    
    if (localStorage.getItem('Show_Numbers') == 'true' ){
        // set the radio button
        document.getElementById('Show_Numbers1').checked = true;
    }
    else{
        document.getElementById('Hide_Numbers2').checked = true;
    }

    
    if ( localStorage.getItem('Themes') == 'true') {
        document.getElementById('Themes').checked = true;
    }
    else{
        document.getElementById('Themes').checked = false;
    }



    //--------------------------------------------------------------------------------
    // Start of Panel
    //--------------------------------------------------------------------------------
    // Panel Position
    var contentposition = localStorage.getItem("contentposition");      // 0=moveable, 1=fixed
    var contentdisplay = localStorage.getItem("contentdisplay");        // 0=onclick, 1=always
    if (contentposition == '0') {
        document.getElementById('positionfloat').checked = true;
    } else {
        document.getElementById('positionfixed').checked = true;

        contentdisplay = '1';
        document.write = localStorage.setItem("contentdisplay", '1');
        document.getElementById('displayalways').checked = true;
        //disable the choice to show by click if left fixed.
        document.getElementById('displayclick').disabled = true;


    }
    // Panel Display
    if (contentdisplay == '0') {
        document.getElementById('displayclick').checked = true;
    } else {
        document.getElementById('displayalways').checked = true;
    }
    // panel position & size
    var main_top = localStorage.getItem("main_top");
    document.getElementById('main_top').innerHTML = main_top;

    var main_left = localStorage.getItem("main_left");
    document.getElementById('main_left').innerHTML = main_left;

    var main_width = localStorage.getItem("main_width");
    document.getElementById('main_width').innerHTML = main_width; 

    var main_height = localStorage.getItem("main_height");
    if (_init == '1') {
        if (contentposition == '0') {       // floating
            main_height = '200px';
        } else {
            main_height = '100%';
        }
        document.write = localStorage.setItem("main_height", main_height); 
    } 
    document.getElementById('main_height').innerHTML = main_height;

    // Panel mode
    var contentmode = localStorage.getItem("contentmode");
    if (contentmode == 'PC') {
    document.getElementById('modepc').checked = true;
    } else {
    document.getElementById('modeipad').checked = true;
    }
    
    // Panel Font Family
    var contentfontname = localStorage.getItem("contentfontname");
    document.getElementById('contentfontname').value = contentfontname;

    // Panel Font Size
    var contentfontsize = localStorage.getItem("contentfontsize");
    document.getElementById('contentfontsize').value = contentfontsize;


        
    
    ///  font stuff.. set the other active changes to panel

    // set the font color for the dictionary
    r1 = localStorage.getItem("r1");
    $('.dict').css('color', r1);
    $('li').css('color', r1);


    lineheight = localStorage.getItem('contentlineheight');
    if (!lineheight) {
        lineheight = '200';
    }
    document.getElementById('main_div').style.lineHeight= lineheight + '%';

    fontsize = localStorage.getItem('contentfontsize');
    if (!fontsize) {
        fontsize = '12';
    }
    $(".pages").css('font-size', fontsize + 'pt');
    $(".pages2").css('font-size', fontsize + 'pt');
    v1 = parseInt(fontsize * 0.9 + 0.5);
    //page3ResultStyle = page3ResultStyle + 'font-size:' + v1 + 'pt;';

    fontname =  localStorage.getItem('contentfontname');
    if (!fontname) {
        fontname = 'Tahoma';
    }
    $(".pages").css('font-family', fontname);
    $(".pages2").css('font-family', fontname);
    //page3ResultStyle = page3ResultStyle + 'font-family:"' + fontname +'";';





    // Panel FontColor
    

    // Panel Line height
    var contentlineheight = localStorage.getItem("contentlineheight");
    if (!contentlineheight) {
        contentlineheight = '200';
        document.write = localStorage.setItem("contentlineheight", contentlineheight); 
    } 
    
    var x = document.getElementById('colortable').getElementsByTagName('td');
    x[0].style.lineHeight = contentlineheight + '%';
    
    document.getElementById('contentlineheight').value = contentlineheight;

    
    document.getElementById('showfontnamesize').innerHTML = contentfontname + ' ' +contentfontsize + 'pt';
    document.getElementById('showfontnamesize').style.fontFamily = contentfontname;
    document.getElementById('showfontnamesize').style.fontSize = contentfontsize + 'pt';
    document.getElementById('showbackground').style.fontFamily = contentfontname;
    document.getElementById('showbackground').style.fontSize = contentfontsize + 'pt';
    document.getElementById('showfontcolor').style.fontFamily = contentfontname;
    document.getElementById('showfontcolor').style.fontSize = contentfontsize + 'pt';
    
    //--------------------------------------------------------------------------------
    //End of Panel
    //--------------------------------------------------------------------------------
    var ary = 'ipc1;ipc2;ipd1;ipe1;ipe2;ipe3;ipe4;ipe5;ipe6;ipg1;ipm1;ipm2;ipm3;ipm4;ipv1;ipv2;ipv3;ise1';

    // PALI DICTIONARIES
    var e_enable = document.getElementById('DictionaryEnable');
    var e_disable = document.getElementById('DictionaryDisable');

    for(var i=(e_enable.length -1); 0<=i; i--) { // remove all options  
        e_enable.remove(i);
    } 
    for(var i=(e_disable.length -1); 0<=i; i--) { // remove all options  
        e_disable.remove(i);
    } 

    e_enable_options = '';
    for(i in Dicts) {   // add options by Dicts order
        var val = localStorage.getItem("h" + i);
        if (!val) {
        val = '000';
        }

        if (val == '000') {
        s1 = Dicts[i].split('] ');
        e_disable.options.add(new Option(s1[1], i));  
        e_disable.options[e_disable.length -1].title = s1[0] + ']';
        } else { 
        e_enable_options = e_enable_options + val + i + '@';
        } 

        // put dictionary name
        var val = localStorage.getItem("i" + i);
        if (!val) {
        val = i;
        document.write = localStorage.setItem('i' + i, val);
        }

    } 
  
    var ary = e_enable_options.split('@'); // put enabled options
    ary.sort(); 
    var inc = 0;
    for (var i in ary) {
        if (ary[i] != '') { 
        v2 = ary[i].slice(-3);    // key 

        s1 = Dicts[v2].split('] ');
        e_enable.options.add(new Option(s1[1], v2));
        e_enable.options[e_enable.length -1].title = s1[0] + ']';

        inc = inc +10;
        v1 = '000' + inc;
        v1 = v1.slice(-3);
        document.write = localStorage.setItem('h' + v2, v1);
        } 
    } 
    document.getElementById('EnableCount').innerHTML = document.form1.DictionaryEnable.options.length;
    document.getElementById('DisableCount').innerHTML = document.form1.DictionaryDisable.options.length;

    // English Dictionary
    var hee1 = localStorage.getItem("hee1"); 
    if (hee1 == '1') {
    document.getElementById('hee1').checked = true;
    } else {
    document.getElementById('hee1').checked = false;
    } 

    // Speech Repeat
    var speech_repeat = localStorage.getItem("speech_repeat");
    document.getElementById('speech_repeat').value = speech_repeat;

    // Speed
    var speech_speed = localStorage.getItem("speech_speed");
    document.getElementById('showspeed').innerHTML = 'Speed=' + speech_speed;



}

function hideshowlogo(){
    // hide or showt the logo
    var r1 = localStorage.getItem('r1');
    var bg_color = localStorage.getItem('bg_color');

    $('#asoka2').hide();
    $('#asoka1').show();

    if ( (r1 == '#ffffff') || (r1 == '#fffffe')  || (r1 =='#b0b0b0') || bg_color == '#010101') { 
        $('table#titletable a').css('color',r1);
        $('#asoka1').hide() ;
        $('#asoka2').show();
    }
}

function ResetPreferences(){
        var askcf = confirm("It helps to refresh the Pāḷi Tipiṭaka Projector to its original settings.\nConfirm to proceed?");
        if (askcf == true) {
          localStorage.clear();
          window.location.href ='index.htm';
        }
}

function enlarge()
{
    /*var ev = jQuery.Event("keypress");
    ev.ctrlKey = false;
    ev.which = 43;
    $("container").trigger(ev);

    */

   $('body').animate({ 'zoom': 4.2 }, 150); 

    alert('called');

}


function getCurrentVersion(){

    // get the version number.. always do this last in case the file read fails it will 
    // cause the function to crash.
    versionfile = 'version.json'; 
    var rawFile = new XMLHttpRequest();
    
    try {
        rawFile.open('GET', versionfile, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {

                var versiontxt = JSON.parse(rawFile.responseText) ;
    
                document.getElementById('currentversion').innerHTML = '<b>' + versiontxt.versionno +'</b>'; 
                localStorage.setItem('versionno', versiontxt.versionno)
            } //readystate =200
        }//readystate 4
    } //readstaychange
    rawFile.send(null);
    }//try
    catch{
        //do nothing.
    }




}


function getVersion() {
    file = 'https://raw.githubusercontent.com/bksubhuti/Tipitaka-Pali-Projector/master/tipitaka_projector_data/version.json';
    var rawFile = new XMLHttpRequest();
    
    try {
        rawFile.open('GET', file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var versiontxt = JSON.parse(rawFile.responseText);

                    if (versiontxt.versionno == localStorage.getItem('versionno')) {
                        document.getElementById('versioninfo').innerHTML = '<b>Version is up to date</b>';
                    } else {
                        document.getElementById('versioninfo').innerHTML = "<b>Version number:</b> " + versiontxt.versionno + '<br>' + '<b>New Version Notes:</b> ' + versiontxt.releasenotes;

                    }
                    //alert('WRITING FILEURI IS OK') ;
                }// status = 200
            } //readystate =4
        }//readystatechange
        rawFile.send(null);
    }//try
    catch {
        //do nothing.
    }

}    //getVersion function

function PanelBGColorChange(color){
    localStorage.setItem("panel_bg_color", color);
    updatePanelColors();
}

function PanelFontColorChange(color){
    localStorage.setItem("panel_font_color", color);
    updatePanelColors();
}


