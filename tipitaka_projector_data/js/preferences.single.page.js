console.log("checking prefs ");
checkPrefsExist();


function RestorePreferences() {

    file = 'preferences.txt';

    if ( isElectron() ){
        const { remote, ipcRenderer } = require('electron');

        var data = ipcRenderer.sendSync('read-electron-blob', 'preferences.txt'); // prints "pong"

        //ipcRenderer.on('blob-read-reply', (event, arg) => {
//        });
         console.log("got it back"); // prints "pong"
          writePrefDataToStorage(data);

    }
    else{

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var data = rawFile.responseText;
                    writePrefDataToStorage(data);

                }
            }
        }
        rawFile.send(null);
    }
    
}// end restore..

var Dicts = [];
Dicts['pc1'] = 'PC1: [10,530 entries - 675 KB] Pali Zh Suttacentral Offline 2016';
Dicts['pc2'] = 'PC2: [20,113 entries - 5.25 MB] Pali Zh 12 in 1 @2018';
Dicts['pd1'] = 'PD1: [3,607 entries - 400 KB] Pali Indonesian Suttacentral Offline 2016';
Dicts['pe1'] = 'PE1: [23,850 entries - 1.34 MB ] Pali English Suttacentral Offline 2016';
Dicts['pe2'] = 'PE2: [20,968 entries - 1.10 MB] Pali English Extracted From Digital Pali Reader (DPR)';
Dicts['pe3'] = 'PE3: [16,274 entries - 6.91 MB] Pali English Dictionary (PTS)';
Dicts['pe4'] = 'PE4: [381,754 entries - 37.1 MB] Pali English Declension Dict @DPR 2018';
Dicts['pe5'] = 'PE5: [330,972entries - 14.5 MB] Pali English Grammar Dictionary@DPR 2018';
Dicts['pe6'] = 'PE6: [5,775 entries - 4.0 MB] Pali English Proper Names G P Malalasekera@2018';
Dicts['pe7'] = 'PE7: [27,730 entries - 22.8 MB] Pali English Dictionary extract@Janaka 2020';
Dicts['pg1'] = 'PG1: [22,729 entries - 1.27 MB] Pali Germany Suttacentral Offline 2016';
Dicts['pi1'] = 'PI1: [16,183 entries - 1.2 MB] Pali India Dictionary @Janaka 2020';
Dicts['pm1'] = 'PM1: [153,527 entries - 37.8 MB] Pali Myanmar Word Grammar @2018';
Dicts['pm2'] = 'PM2: [153,527 entries - 23.9 MB] Pali Myanmar Tipitaka Pali  @2018';
Dicts['pm3'] = 'PM3: [58,095 entries - 7.01 MB] Pali Myanmar Dictionary @U Hau Sein 2018';
Dicts['pm4'] = 'PM4: [1,882 entries - 441 KB] Pali Myanmar Roots Dictionary @2018';
Dicts['ps1'] = 'PS1: [18,993 entries - 1.6 MB] Pali Sinhala by Buddhadatta@Janaka 2020';
Dicts['ps2'] = 'PS2: [23,118 entries - 2.9 MB] Pali Sinhala by Sumanagala@Janaka 2020';
Dicts['pv1'] = 'PV1: [17,423 entries - 902 KB] Pali Viet Dictionary Bản dịch của ngài Bửu Chơn';
Dicts['pv2'] = 'PV2: [3,827 entries - 214 KB] Pali Viet Abhidhamma Terms - ngài Tịnh Sự (phần ghi chú thuật ngữ)';
Dicts['pv3'] = 'PV3: [914 entries - 253 KB] Pali Viet Vinaya Terms - Từ điển các thuật ngữ về luật do tỳ khưu Giác Nguyên sưu tầm';
Dicts['se1'] = 'SE1: [223,917 entries - 28.9 MB] Sanskrit English Dictionary - Monier Williams@1899';
Dicts['ee1'] = 'EE1: [148,730 entries - 23.2 MB] Word-Net Eng-Eng dictionary'; 


function DictionaryMoveOption(enable) {   // source move to dist.
    const $enable = $('#DictionaryEnable');
    const $disable = $('#DictionaryDisable');

    const $source = enable ? $disable : $enable;
    const $destination = enable ? $enable : $disable;

    const selectedInSource = $source.children().toArray().find(c => c.classList.contains('selected'));
    if (selectedInSource) {
        const $s = $(selectedInSource);
        $s.removeClass('selected');
        $s.remove();
        $destination.append(selectedInSource);
    }

    try { 
        // var v1 = '';
        // for(var i=0; i<source.options.length; i++){
        //     if(source.options[i].selected){
        //         var e = source.options[i];
        //
        //         destination.options.add(new Option(e.text, e.value));
        //         destination.options[destination.options.length -1].title = e.title;
        //         //source.remove(i);
        //         v1 = ';' + i + v1;
        //     }
        // }
        // var ary = v1.substr(1).split(';');
        // for (var i in ary) {
        //     source.remove(ary[i]);
        // }
        DictionaryRenew();
    } catch(e) {
        console.log(e);
    }
}

function DictionaryChangePos(index) {
    const $enabled = $('#DictionaryEnable');
    const selectedTarget = $enabled.find('li').toArray().find(c => c.classList.contains('selected'));

    if (!selectedTarget) {
        return;
    }

    const $selected = $(selectedTarget);

    if(index === -1){
        if (!$selected.is(':first-child')){
            //obj.options(obj.selectedIndex).swapNode(obj.options(obj.selectedIndex-1)) //swapNode on at IE
            // obj.insertBefore(obj.options[obj.selectedIndex], obj.options[obj.selectedIndex - 1]);

            const $prev = $selected.prev();
            $prev.before($selected);
        }

    } else if(index === 1) {
        if (!$selected.is(':last-child')){
            //obj.options(obj.selectedIndex).swapNode(obj.options(obj.selectedIndex+1)) //swapNode at IE
            // obj.insertBefore(obj.options[obj.selectedIndex + 1], obj.options[obj.selectedIndex]);

            const $next = $selected.next();
            $next.after($selected);
        }

    }

    DictionaryRenew();
}

function DictionaryRenew() {
    var DictData = [];  
    var strDictData = localStorage.getItem("DictData"); 
    DictData = JSON.parse(strDictData);

    const $enabled = $('#DictionaryEnable');
    const enabledChildren = $enabled.find('li').toArray();
    const enabledCount = enabledChildren.length;
    $('#EnableCount').html(enabledCount);

    for(var i=0; i<enabledCount; i++){
        var dictionaryItem = enabledChildren[i];

        const val = dictionaryItem.dataset.value;
        inc = (i + 1) * 10;
        inc = ('000' + inc).slice(-3);

        for (j in DictData) { 
            if (DictData[j].key == val) {
                DictData[j].order = inc;
                break;
            }    
        }

    }

    const $disabled = $('#DictionaryDisable');
    const disabledChildren = $disabled.find('li').toArray();
    const disabledCount = disabledChildren.length;
    $('#DisableCount').text(disabledCount);

    var val_disable = '';
    j = disabledCount-1;   // remove all options
    for(var i=j; 0<=i; i--) {
        const dictionaryItem = disabledChildren[i];
        const val = dictionaryItem.dataset.value;
        val_disable = val_disable + val + ';';
        
        for (j in DictData) { 
            if (DictData[j].key == val) {
                DictData[j].order = '000';
                break;
            }    
        }
    }
    $disabled.html('');

    localStorage.setItem('DictData', JSON.stringify(DictData));
    initDictionaries();

    for(i in Dicts) {   // add options by Dicts order
        if (val_disable.indexOf(i) != -1) {
            s1 = Dicts[i].split('] ');
            const entry = document.createElement('li');
            entry.dataset.text = s1[1];
            entry.dataset.value = i;
            entry.dataset.title =  s1[0] + ']';
            entry.innerText = entry.dataset.text;
            $disabled.append(entry);
            // e.options.add(new Option(s1[1], i));
            // e.options[e.length -1].title = s1[0] + ']';
        }
    }
}

function toGetAbbr(item) { // 0= from disabled, 1 = from enabled
    var DictData = [];  
    var strDictData = localStorage.getItem("DictData"); 
    DictData = JSON.parse(strDictData);  

    const val = item.dataset.value;
    $('#AbbreviatedDictionary').val(val);
    $('#AbbreviatedMessage').html(Dicts[val]);
 
    for (j in DictData) { 
        if (DictData[j].key == val) {
            v1 = DictData[j].abbr;
            break;
        }    
    } 
    $('#Abbreviated').val(v1);
}

function toSaveAbbr() { // 0= from disabled, 1 = from enabled
    no = $('#AbbreviatedDictionary').val();
    if (no != '') {
        val = $('#Abbreviated').val().trim();
        if (val == '') {
            val = no;
        }
        val = val.substr(0, 8);

        var DictData = [];  
        var strDictData = localStorage.getItem("DictData"); 
        DictData = JSON.parse(strDictData); 
        for (j in DictData) { 
            if (DictData[j].key == no) {
                DictData[j].abbr = val;
                break;
            }    
        }  
        localStorage.setItem('DictData', JSON.stringify(DictData));
    }
}

function setTextColorsFromLocalStorage() {
    const r1 = localStorage.getItem('r1');
    const m1 = localStorage.getItem('m1');
    const b1 = localStorage.getItem('b1');

    $('.r1').css('color', r1);
    $('.m1').css('color', m1);
    $('.b1').css('color', b1);

    $('h2').css('color', r1);
    $('h3').css('color', r1);
}

function getFontColor() {
    if (localStorage.getItem('Themes') === 'true') {
        const fontColors = {
            '#f3ddb6':'#000000',
            '#fff8dc':'#000000',
            '#1f3763':'#fffffe',
            '#000001':'#ffffff',
            '#121212':'#b0b0b0',
            '#010101':'#937811',
            '#090c11':'#2d3d4a',
            '#3C3C3C':'#cecece',
            '#5a5a5a':'#cacaca',
            '#d7d4cd':'#626262',
            '#e0e0e0':'#202020',
            '#f0f0f0':'#008000',
            '#fefefe':'#000000',
            '#d8cbab':'#000001',
            '#e2bdb4':'#010101'
        };
        return fontColors[getCurrentTheme()];
    }

    // black by default
    //
    return '#000000';
}
function setThemeStyling() {

    // themes simply sets the panel to the same color scheme.. nothing more nothing less
    // the panel can be set separately.
    const useTheme = localStorage.getItem('Themes') === 'true';


    const theme = getCurrentTheme();

    document.body.style.background = theme;

    let r1 = '';
    let m1 = '';
    let b1 = '';

    const font_color = {
        '#f3ddb6':'black',
        '#fff8dc':'black',
        '#1f3763':'white',
        '#000001':'white',
        '#121212':'darkgray',
        '#010101':'goldenrod',
        '#1e1e1e':'goldenrod',
        '#090c11':'deepskyblue',
        '#3C3C3C':'darkgray',
        '#5a5a5a':'darkgray',
        '#d7d4cd':'darkgray',
        '#e0e0e0':'black',
        '#f0f0f0':'green',
        '#fefefe':'black',
        '#d8cbab':'black',
        '#e2bdb4':'black'
    };
    const b1_color = {
        '#f3ddb6':'black',
        '#fff8dc':'black',
        '#1f3763':'white',
        '#000001':'white',
        '#121212':'darkgray',
        '#010101':'goldenrod',
        '#1e1e1e':'goldenrod',
        '#090c11':'deepskyblue',
        '#3C3C3C':'darkgray',
        '#5a5a5a':'darkgray',
        '#d7d4cd':'darkgray',
        '#e0e0e0':'black',
        '#f0f0f0':'green',
        '#fefefe':'black',
        '#d8cbab':'black',
        '#e2bdb4':'black'
    };

    r1 = font_color[theme];
    m1 = font_color[theme];
    b1 = b1_color[theme];

    // set these to local storage
    localStorage.setItem("r1", r1);
    localStorage.setItem("m1", m1);
    localStorage.setItem("b1", b1);
 
    hideshowlogo();

    // get the theme checkbox.. if checked then set the panel to the same color
    if ( document.getElementById("Themes").checked ){


        localStorage.setItem('panel_bg_color', theme);
        localStorage.setItem('panel_font_color', r1);

        $('#panel_font_color').val(theme);
        $('#panel_bg_color').val(r1);
        updatePanelColors();


    }

    setTextColorsFromLocalStorage();
}

function ChooseSelect(key) {
    val = $('#' + key).val();
    localStorage.setItem(key, val);

    if (key === 'view_left'){

        loadJSONBooks();
        //$('#books-tree').jstree({core: {data: treeData}});
        // set the tree.. cannot set and don't understand this code

    }

    if (key == 'contentfontname') {
        $('#showfontnamesize').html(val + ' ' + $('#contentfontsize').val() + 'pt');

        $('#showfontnamesize').css('fontFamily', val);
        $('#showbackground').css('fontFamily', val);
        $('#showfontcolor').css('fontFamily', val);

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


    // IMPORTANT
    // Call the default table settings prior to setting the theme stuff
    setTableStyling();

    if (key == 'bg_color') {
        localStorage.setItem('current-theme', val);
        setThemeStyling();
    }

}

function getCurrentTheme() {
    // #f3ddb6 is the 'Classic Reader' theme
    //
    return localStorage.getItem('current-theme') || '#f3ddb6';
}

function ChooseRadio(key) {
    val = $('#' + key).val();


    if (key.indexOf('Pali_note') === 0) {
        const display = key === 'Pali_note1'
        setPreferenceFlag(PreferenceKeys.showAlternateReading, display);
        return;
    }

    if (/(Show|Hide)_Numbers(1|2)/.test(key)) {
        const display = key === 'Show_Numbers1';
        setPreferenceFlag(PreferenceKeys.showPageNumbers, display);
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
}

function ChooseCheckbox(key) {
    chk = document.getElementById(key).checked;

 
    if (key.indexOf('Themes') != -1) {
        if (chk == true) {
            localStorage.setItem('Themes', 'true');
        } else {
            localStorage.setItem('Themes', 'false');
        }
    }

}

function ChooseRange(key) {
    var val = $('#' + key).val();
    document.write = localStorage.setItem(key, val);

    if (key.indexOf('divwidth') != -1) {
        $('#width_left').html(val + ' %');
        $('#width_right').html((100- Number(val)) + ' %');
        document.write = localStorage.setItem('width_left', val);
        document.write = localStorage.setItem('width_right', (100 - Number(val)));
    }

    if (key.indexOf('divheight') != -1) {
        $('#showdivheight').html('Height=' + val + ' %');
    }
    if (key.indexOf('speed') != -1) {
        $('#showspeed').html('Speed=' + val);
    }
    if (key.indexOf('fontsize') != -1) {
        $('#showfontnamesize').html($('#contentfontname').val() + ' ' + val + 'pt');

        $('#showfontnamesize').css('fontSize', val + 'pt');
        $('#showbackground').css('fontSize', val + 'pt');
        $('#showfontcolor').css('fontSize', val + 'pt');

        document.write  = localStorage.setItem('contentfontsize', val);
        //
        var x = document.getElementById('colortable').getElementsByTagName('td');
        x[0].style.lineHeight = $('#contentlineheight').val() + '%';
    }

    if (key.indexOf('color') != -1) {
        r = Number($('#colorR').val());
        g = Number($('#colorG').val());
        b = Number($('#colorB').val());

        var x = document.getElementById('colortable').getElementsByTagName('td');
        x[0].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        $('#showbackground').html('Background = RGB(' + r +', ' + g + ', ' + b +')');

        localStorage.setItem('contentbackgroundR', r);
        localStorage.setItem('contentbackgroundG', g);
        localStorage.setItem('contentbackgroundB', b);
    }

    if (key.indexOf('fontcolor') != -1) {
        r = Number($('#fontcolorR').val());
        g = Number($('#fontcolorG').val());
        b = Number($('#fontcolorB').val());

        $('#showfontnamesize').css('color', 'rgb(' + r + ',' + g + ',' + b + ')');
        $('#showbackground').css('color', 'rgb(' + r + ',' + g + ',' + b + ')');
        $('#showfontcolor').css('color', 'rgb(' + r + ',' + g + ',' + b + ')');
        $('#showfontcolor').html('Font Color = RGB(' + r +', ' + g + ', ' + b +')');

        localStorage.setItem('contentfontcolorR', r);
        localStorage.setItem('contentfontcolorG', g);
        localStorage.setItem('contentfontcolorB', b);
    }
}
function onChangePanel_dict_bg_color(){

    var panel_dict_bg_color = $('#panel_dict_bg_color').val();
    var color = new RGBColor(panel_dict_bg_color);
	panel_dict_bg_color = color.toRGB();
	
	panel_dict_bg_color = panel_dict_bg_color.replace(/rgb/, "rgba");
	panel_dict_bg_color = panel_dict_bg_color.replace(")", " ,0.45");


    localStorage.setItem('panel_dict_bg_color', panel_dict_bg_color);
    $('.DictionaryClass').css('background-color', panel_dict_bg_color);


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
    def['contentposition'] = '';
    def['font_left'] = '';
    def['font_right'] = '';
    def['DictData'] = '';
    //**********************

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
    $('#preferences').val(dat);


    if ( isElectron() ){
        const { remote, ipcRenderer } = require('electron');
        ipcRenderer.send('write-electron-blob', dat, "preferences.txt");
        alert("file has been written to the user data folder");

    }
    else{
        var blob = new Blob([dat], {type: "text/plain;charset=utf-8"});
    //    saveAs(blob, 'preferences.txt');

        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = "preferences.txt";
        element.click();


    }




}


window.onload = function () {
    initPreferences();
}

var setPanelFontColorInput = function setPanelFontColorInput() {
    var panel_font_color = localStorage.getItem("panel_font_color");
    $('#anel_font_color').val(panel_font_color);
    return panel_font_color;
};

var setPanelBackgroundColorInput = function setPanelBackgroundColorInput() {
    var panel_bg_color = localStorage.getItem("panel_bg_color") || '#fff000';
    $('#panel_bg_color').val(panel_bg_color);
    return panel_bg_color;
}
var setPanelDictBackgroundColorInput = function setPanelDictBackgroundColorInput (){
    var panel_dict_bg_color = localStorage.getItem("panel_dict_bg_color");
    $('#panel_dict_bg_color').val(panel_dict_bg_color);
    return panel_bg_color;
} 

var updatePanelColors = function updatePanelColors(panel_bg_color, panel_font_color) {
    var panel_bg_color = setPanelBackgroundColorInput();
    var panel_font_color = setPanelFontColorInput();

    // set the font color for the dictionary
//    r1 = localStorage.getItem("r1");
  //  $('.dict').css('color', r1);
    //--- $('li').css('color', r1);

    $('#main_div').css('backgroundColor', panel_bg_color);
    $('#main_div').css('color', panel_font_color);
    $('.helpers').css('background-color', panel_bg_color);

    var x = document.getElementById('colortable').getElementsByTagName('td');
    x[0].style.backgroundColor =  panel_bg_color ;//'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
    x[0].style.color = panel_font_color; //'rgb(' + fontcolorR + ',' + fontcolorG + ',' + fontcolorB + ')';
    x[0].style.lineHeight = contentlineheight + '%';

    $('#showbackground').html('Background = ' + panel_bg_color);
    $('#showfontcolor').html('Font Color = ' + panel_font_color);

}

const PreferenceKeys = {
    showAlternateReading: 'showAlternateReading',
    showPageNumbers: 'showPageNumbers'
}

function setPreferenceFlag(pref, value) {
    if (value) {
        localStorage.setItem(pref, 'true')
    } else {
        localStorage.removeItem(pref);
    }
    onPrefFlagChange(pref);
}

function getPreferenceFlag(pref, defaultValue) {
    return !!(localStorage.getItem(pref) || defaultValue);
}

function onPrefFlagChange(pref) {
    const value = getPreferenceFlag(pref);

    switch (pref) {
        case PreferenceKeys.showAlternateReading: {
            $('body').toggleClass('show-notes', value);
            break;
        }

        case PreferenceKeys.showPageNumbers: {
            $('body').toggleClass('show-page-numbers', value);
            break;
        }
    }
}

function initPreferences(){

    // View Left
    var size_left = localStorage.getItem("size_left");
    $('#size_left').val(size_left);

    var font_left = localStorage.getItem("font_left");
    $('#font_left').val(font_left);

    var PaliFontSize = localStorage.getItem("PaliFontSize");
    $('#PaliFontSize').val(PaliFontSize);

    var view_left = localStorage.getItem("view_left");
    $('#view_left').val(view_left);
    if (view_left == 'Myanmar') {
        if ((font_left != 'Myanmar Text') && (font_left != 'Pyidaungsu')) {
            font_left = 'Myanmar Text';
            $('#font_left').val(font_left);
        }
    }

    // Background Color
    var bg_color = localStorage.getItem("bg_color");
    $('#bg_color').val(bg_color);
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
    $("#main_table").css('backgroundColor', bg_color);


    hideshowlogo();

    // Left - Right Width Ratio
    var width_left = localStorage.getItem("width_left");
    document.write = localStorage.setItem("width_right", (100 - Number(width_left)));
    $('#divwidth').val(width_left);
    $('#width_left').html(width_left + ' %');
    $('#width_right').html((100 - Number(width_left)) + ' %');

    // View Right
    var view_right = localStorage.getItem("view_right");
    $('#view_right').val(view_right);

    var font_right = localStorage.getItem("font_right");
    $('#font_right').val(font_right);
    if (view_right == 'Myanmar') {
        if ((font_right != 'Myanmar Text') && (font_right != 'Pyidaungsu')) {
            font_right = 'Myanmar Text';
            $('#font_right').val(font_right)
        }
    }

    var size_right = localStorage.getItem("size_right");
    $('#size_right').val(size_right);

    // Pali_note
    var pref = getPreferenceFlag(PreferenceKeys.showAlternateReading);
    if (pref) {
        document.getElementById('Pali_note1').checked = true;
    } else {
        document.getElementById('Pali_note2').checked = true;
    }


    var prefNumbers = getPreferenceFlag(PreferenceKeys.showPageNumbers);
    if (prefNumbers){
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
        $('#btnHeaderDropUp').show();
        $('#btnHeaderDictionary').show();
        $('#btnHeaderDropDown').show();
    } else {
        document.getElementById('positionfixed').checked = true;
        $('#btnHeaderDropUp').hide();
        $('#btnHeaderDictionary').hide();
        $('#btnHeaderDropDown').hide();

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

// confirm
    var strPromptConfirm = localStorage.getItem("PromptConfirm");      // 0=moveable, 1=fixed
    var AutoRestore = localStorage.getItem("AutoRestore");        // 0=onclick, 1=always

    // call the logic to enable and switch etc.
    onPromptRestoreSwitch(strPromptConfirm);
    onAutoRestoreSwitch(AutoRestore);



    // panel position & size
    var main_top = localStorage.getItem("main_top");
    $('#main_top').html(main_top);

    var main_left = localStorage.getItem("main_left");
    $('#main_left').html(main_left);

    var main_width = localStorage.getItem("main_width");
    $('#main_width').html(main_width);

    var main_height = localStorage.getItem("main_height");
    if (_init == '1') {
        if (contentposition == '0') {       // floating
            main_height = '200px';
        } else {
            main_height = '100%';
        }
        document.write = localStorage.setItem("main_height", main_height);
    }
    $('#main_height').html(main_height);

    // Panel Font Family
    var contentfontname = localStorage.getItem("contentfontname");
    $('#contentfontname').val(contentfontname);

    // Panel Font Size
    var contentfontsize = localStorage.getItem("contentfontsize");
    $('#contentfontsize').val(contentfontsize);




    ///  font stuff.. set the other active changes to panel



    lineheight = localStorage.getItem('contentlineheight');
    if (!lineheight) {
        lineheight = '200';
    }
    $('#main_div').css('lineHeight', lineheight + '%');

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




    // Panel Line height
    var contentlineheight = localStorage.getItem("contentlineheight");
    if (!contentlineheight) {
        contentlineheight = '200';
        document.write = localStorage.setItem("contentlineheight", contentlineheight);
    }

    var x = document.getElementById('colortable').getElementsByTagName('td');
    x[0].style.lineHeight = contentlineheight + '%';

    $('#contentlineheight').val(contentlineheight);


    $('#showfontnamesize').html(contentfontname + ' ' +contentfontsize + 'pt');
    $('#showfontnamesize').css('fontFamily', contentfontname);
    $('#showfontnamesize').css('fontSize', contentfontsize + 'pt');
    $('#showbackground').css('fontFamily', contentfontname);
    $('#showbackground').css('fontSize', contentfontsize + 'pt');
    $('#showfontcolor').css('fontFamily', contentfontname);
    $('#showfontcolor').css('fontSize', contentfontsize + 'pt');

    //--------------------------------------------------------------------------------
    //End of Panel
    //--------------------------------------------------------------------------------
    // PALI DICTIONARIES
    var e_enable = document.getElementById('DictionaryEnable');
    var e_disable = document.getElementById('DictionaryDisable');

    e_enable.innerHTML = '';
    e_disable.innerHTML = '';

    // for(var i=(e_enable.length -1); 0<=i; i--) { // remove all options
    //     e_enable.remove(i);
    // }
    // for(var i=(e_disable.length -1); 0<=i; i--) { // remove all options
    //     e_disable.remove(i);
    // }

    //  
    var jDictData = {key:"", order:"", abbr:""};
    var DictData = [];  
    var strDictData = localStorage.getItem("DictData");
    if (strDictData){
        DictData = JSON.parse(strDictData); 
    }

    e_enable_options = '';
    for(i in Dicts) {   // add options by Dicts order 
        val = '000';
        var find = '0';
        for (j in DictData) {
            if (DictData[j]) {
                if (DictData[j].key == i) {
                    val = DictData[j].order;
                    find = '1';
                    break;
                }    
            }
        }
        if (find == '0') {
            var jDictData = {};
            jDictData.key = i;
            jDictData.order = val;
            jDictData.abbr = i;
            DictData.push(jDictData);
        }

        if (val == '000') {
            s1 = Dicts[i].split('] ');

            const entry = document.createElement('li');
            entry.dataset.text = s1[1];
            entry.dataset.value = i;
            entry.dataset.title =  s1[0] + ']';
            entry.innerText = entry.dataset.text;
            e_disable.appendChild(entry);

            // e_disable.options.add(new Option(s1[1], i));
            // e_disable.options[e_disable.length -1].title = s1[0] + ']';
        } else {
            e_enable_options = e_enable_options + val + i + '@';
        }
    }

    var ary = e_enable_options.split('@'); // put enabled options
    ary.sort();
    var inc = 0;
    for (var i in ary) {
        if (ary[i] != '') {
            v2 = ary[i].slice(-3);    // keys

            s1 = Dicts[v2].split('] ');

            const entry = document.createElement('li');
            entry.dataset.text = s1[1];
            entry.dataset.value = v2;
            entry.dataset.title =  s1[0] + ']';
            entry.innerText = entry.dataset.text;
            e_enable.appendChild(entry);

            // e_enable.options.add(new Option(s1[1], v2));
            // e_enable.options[e_enable.length -1].title = s1[0] + ']';

            inc = inc +10;
            v1 = '000' + inc;
            v1 = v1.slice(-3);
 
            for (j in DictData) { 
                if (DictData[j].key == v2) {
                    DictData[j].order = v1;
                    break;
                }
            }
        }
    } 
    localStorage.setItem('DictData', JSON.stringify(DictData));

    $('#EnableCount').html(e_enable.childElementCount);
    $('#DisableCount').html(e_disable.childElementCount);

    $('.ping-pong-list').on('click', 'li', function() {
        toGetAbbr(this);
        const $li = $(this);
        const $parent = $li.parent();
        $parent.find('li').removeClass('selected');
        $li.addClass('selected');
    })

    // Speech Repeat
    var speech_repeat = localStorage.getItem("speech_repeat");
    $('#speech_repeat').val(speech_repeat);

    // Speed
    var speech_speed = localStorage.getItem("speech_speed");
    $('#showspeed').html('Speed=' + speech_speed);

    setThemeStyling();


    // this belongs on search dlg but I'll put it here
    var checked = false;
    var strChecked = localStorage.getItem("ShowOnTop");
    if (strChecked = "true") {
        checked = true; 
    }
    document.getElementById("ShowOnTop").checked = checked;
    ShowOnTopClick(checked);

    Object.keys(PreferenceKeys)
        .map(key => PreferenceKeys[key])
        .map(onPrefFlagChange);
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

    $.ajax({
        url: versionfile,
        dataType: "text",
        type: "GET",
        mimeType: 'text/json; charset=utf-8',
        contentType: 'text/json; charset=UTF-8',
        success: function(rawJson) {
            if (rawJson) {
                var versiontxt = JSON.parse(rawJson) ;
                $('#currentversion').html('<b>' + versiontxt.versionno +'</b>');
                localStorage.setItem('versionno', versiontxt.versionno);
            }
        },
        error: function(error) {
            alert("problem loading file: " + versionfile );
        }
    });
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
                        $('#versioninfo').html('<b>Version is up to date</b>');
                    } else {
                        $('#versioninfo').html("<b>Version number:</b> " + versiontxt.versionno + '<br>' + '<b>New Version Notes:</b> ' + versiontxt.releasenotes);

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


function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}



function writePrefDataToStorage(data){
    var def = [];
    def['bg_color'] = '@';
    def['contentdisplay'] = '@';
    def['contentfontname'] = '@';
    def['contentfontsize'] = '@';
    def['contentlineheight'] = '@';
    def['contentposition'] = '@';
    def['font_left'] = '@';
    def['font_right'] = '@'; 
    def['DictData'] = '@';
    //********************

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
    def['ShowOnTop']='@';

    if (data == "") 
        return 0;

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
    alert("settings have been imported");


}

function checkPrefsExist(){
    if ( isElectron() ){

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "preferences.template", false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var data = rawFile.responseText + "";
                    console.log("sending message to check for prefs");
                    const { remote, ipcRenderer } = require('electron');
                    
                    ipcRenderer.send('check-prefs-exist', data); 
            
                }
            }
        }
        rawFile.send(null);


    }


}



function doMobileAdjust(){

        $('#btnSave').addClass('hideMe');
        $('#btnRestore').addClass('hideMe');
        $('#savePrompt').addClass('hideMe');
}

function onPromptRestoreSwitch(key){

    localStorage.setItem("PromptConfirm", key);    
    // if prompt is on . grey the autorestore.
    // turn off and set storage as well.
    if (key == "on"){
            document.getElementById('AutoRestoreOn').disabled = true;
            document.getElementById('AutoRestoreOff').checked = true;
            localStorage.setItem('AutoRestore', "off");

        }else{
            document.getElementById('AutoRestoreOn').disabled = false;
        }
}

function onAutoRestoreSwitch(key){
    localStorage.setItem("AutoRestore", key);      
}
