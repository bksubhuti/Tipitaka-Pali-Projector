    //-----------------------
    // Left Right View
    //-----------------------
    // Left View
    if (!localStorage.getItem("size_left")) {
        document.write = localStorage.setItem("size_left", '1.0');
    }
    if (!localStorage.getItem("font_left")) {
        document.write = localStorage.setItem("font_left", 'DejaVuSansCondensed');
    } 
    if (!localStorage.getItem("view_left")) {
        document.write = localStorage.setItem("view_left", 'Roman');
    }
    // Background Color
    if (!localStorage.getItem("bg_color")) {
        document.write = localStorage.setItem("bg_color", '#fff8dc');
    }
    // Left - Right Frame's Width Ratio
    if (!localStorage.getItem("width_left")) {
        document.write = localStorage.setItem("width_left", '50');
    }
    // View Right
    if (!localStorage.getItem("view_right")) {
        document.write = localStorage.setItem("view_right", 'Space');
    }
    if (!localStorage.getItem("font_right")) {
        document.write = localStorage.setItem("font_right", 'DejaVuSansCondensed');
    }
    if (!localStorage.getItem("size_right")) {
        document.write = localStorage.setItem("size_right", '1.0');
    }
    // Dispaly Note
    if (!localStorage.getItem("Pali_note")) {
        document.write = localStorage.setItem("Pali_note", 'none');
    }


    //-----------------------
    // Dictionaries
    //-----------------------
    var _s1 = '0';
    var _ary = 'pc1;pc2;pd1;pe1;pe2;pe3;pe4;pe5;pe6;pg1;pm1;pm2;pm3;pm4;pv1;pv2;pv3;se1'.split(';');
    var _ary2 = {
        'pc1':['ZhD'],
        'pc2':['Zh12D'],
        'pd1':['IdD'],
        'pe1':['SCD'],
        'pe2':['DPR'],
        'pe3':['PTS'],
        'pe4':['PEDD'],
        'pe5':['PGD'],
        'pe6':['PPN'],
        'pg1':['PGeD'],
        'pm1':['MmG'],
        'pm2':['MmT'],
        'pm3':['MmD'],
        'pm4':['MmR'],
        'pv1':['Vn1'],
        'pv2':['Vn2'],
        'pv3':['Vn3'],
        'se1':['SED']}

    for (_i in _ary) {
        var _val = localStorage.getItem("h" + _ary[_i]);
        if (!_val) {
            document.write = localStorage.setItem("h" + _ary[_i], '000');
        } else {
            _s1 = '1';
        }

        var _val = localStorage.getItem("i" + _ary[_i]);
        if (!_val) {
            document.write = localStorage.setItem("i" + _ary[_i], _ary2[_ary[_i]]);
        }
    }
    if (_s1 == '0') {
        document.write = localStorage.setItem("hpe4", '010');
    }
    // English Dictionary
    if (!localStorage.getItem("hee1")) {
        document.write = localStorage.setItem("hee1", '0');
    }
    // Speech Repeat
    if (!localStorage.getItem("speech_repeat")) {
        document.write = localStorage.setItem("speech_repeat", '1');
    }
    // Speed
    if (!localStorage.getItem("speech_speed")) {
        document.write = localStorage.setItem("speech_speed", '1');
    }

    //-----------------------
    // Panel
    //-----------------------
    // Panel Position
    var _init = '0';
    if (!localStorage.getItem("contentposition")) {
        document.write = localStorage.setItem("contentposition", '1');      // Floating
        var _init = '1';
    }
    // Panel mode
    if (!localStorage.getItem("contentmode")) {
        document.write = localStorage.setItem("contentmode", 'PC');
    } 
    // Panel Display
    if (!localStorage.getItem("contentdisplay")) {
        document.write = localStorage.setItem("contentdisplay", '1');       // onClick
    } 
    // panel position & size
    if (!localStorage.getItem("main_top")) {
        document.write = localStorage.setItem("main_top", '0px'); 
    } 
    if (!localStorage.getItem("main_left")) {
        document.write = localStorage.setItem("main_left", '0px'); 
    } 
    if (!localStorage.getItem("main_width")) {
        document.write = localStorage.setItem("main_width", '300'); 
    } 
    if (!localStorage.getItem("main_height")) {
        document.write = localStorage.setItem("main_height", '200px'); 
    } 
    // Panel Font Family
    if (!localStorage.getItem("contentfontname")) {
        document.write = localStorage.setItem("contentfontname", 'DejaVuSansCondensed');
    }  
    // Panel Font Size
    if (!localStorage.getItem("contentfontsize")) {
        document.write = localStorage.setItem("contentfontsize", '12');
    }  

    // Panel Background
    if (!localStorage.getItem("contentbackgroundR")) {
        document.write = localStorage.setItem("contentbackgroundR", '255'); 
    }
    // Panel Background
    if (!localStorage.getItem("contentbackgroundG")) {
        document.write = localStorage.setItem("contentbackgroundG", '248'); 
    }
    // Panel Background
    if (!localStorage.getItem("contentbackgroundB")) {
        document.write = localStorage.setItem("contentbackgroundB", '220'); 
    }
    // Panel FontColor
    if (!localStorage.getItem("contentfontcolorR")) {
        document.write = localStorage.setItem("contentfontcolorR", '0'); 
    }
    // Panel FontColor
    if (!localStorage.getItem("contentfontcolorG")) {
        document.write = localStorage.setItem("contentfontcolorG", '0'); 
    }
    // Panel FontColor
    if (!localStorage.getItem("contentfontcolorB")) {
        document.write = localStorage.setItem("contentfontcolorB", '0'); 
    }
    // Panel Line height
    if (!localStorage.getItem("contentlineheight")) {
        document.write = localStorage.setItem("contentlineheight", '200'); 
    } 

    // Show numbers checkbox
    if (!localStorage.getItem("Show_Numbers") ) {
        document.write = localStorage.setItem("Show_Numbers", 'true'); 
    } 

    // checkbox for Themes
    if (!localStorage.getItem("Themes") ) {
        document.write = localStorage.setItem("Themes", 'true'); 
    } 

