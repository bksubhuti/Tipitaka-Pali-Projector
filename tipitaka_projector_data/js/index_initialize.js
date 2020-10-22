    //-----------------------
    // Left Right View
    //-----------------------
    // Left View
    if (!localStorage.getItem("size_left")) {
        document.write = localStorage.setItem("size_left", '1.5');
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
        document.write = localStorage.setItem("size_right", '1.5');
    }
    // Font Size
    if (!localStorage.getItem("PaliFontSize")) {
        if (isMobile){
            document.write = localStorage.setItem("PaliFontSize", '11');
        }else{
            document.write = localStorage.setItem("PaliFontSize", '20');
        }
    }
    // Dispaly Note
    // if (!localStorage.getItem("Pali_note")) {
    //     document.write = localStorage.setItem("Pali_note", 'none');
    // }


    //-----------------------
    // Dictionaries
    //----------------------- 
    var ary = {        
        'pc1':'ZhD',
        'pc2':'Zh12D',
        'pd1':'IdD',
        'pe1':'SCD',
        'pe2':'DPR',
        'pe3':'PTS',
        'pe4':'PEDD',
        'pe5':'PGD',
        'pe6':'PPN',
        'pe7':'PES',
        'pg1':'PGeD',
        'pi1':'PInD',
        'pm1':'MmG',
        'pm2':'MmT',
        'pm3':'MmD',
        'pm4':'MmR',
        'ps1':'SrB',
        'ps2':'SrS',
        'pv1':'Vn1',
        'pv2':'Vn2',
        'pv3':'Vn3',
        'se1':'SED',
        'ee1':'EED'}
    //  
    var jDictData = {key:"", order:"", abbr:""};
    var DictData = [];  
    var strDictData = localStorage.getItem("DictData");
    if (strDictData){
        DictData = JSON.parse(strDictData); 
    } 

    var flag = '0';
    for (i in ary) { 
        var find = '0';
        for (j in DictData) {
            if (DictData[j]) {
                if (DictData[j].key == i) {
                    flag = '1';
                    find = '1';
                    break;
                }    
            }
        }
        if (find == '0') {
            var jDictData = {};
            jDictData.key = i;
            jDictData.order = '000';
            jDictData.abbr = ary[i];
            DictData.push(jDictData);
        }
    }

    if (flag == '0') {
        for (j in DictData) { 
            if (DictData[j].key == 'pe4') {
                DictData[j].order = '010';
            }
            if (DictData[j].key == 'ee1') {
                DictData[j].order = '020';
            }
        }
    } 
    localStorage.setItem('DictData', JSON.stringify(DictData));

    // Speech Repeat
    if (!localStorage.getItem("speech_repeat")) {
        document.write = localStorage.setItem("speech_repeat", '0');
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
        document.write = localStorage.setItem("main_width", '400'); 
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
        if(isMobile){
            document.write = localStorage.setItem("contentfontsize", '10');
        }else{
            document.write = localStorage.setItem("contentfontsize", '12');
        }
    }  

    if (!localStorage.getItem("panel_bg_color")) {
        document.write = localStorage.setItem("panel_bg_color", '#f0f0f0'); 
    }

    if (!localStorage.getItem("panel_dict_bg_color")) {
        document.write = localStorage.setItem("panel_dict_bg_color", '#fffff8'); 
    }
    


    // Panel FontColor
    if (!localStorage.getItem("panel_font_color")) {
        localStorage.setItem("panel_font_color", '#000000');
    }
    // Panel Line height
    if (!localStorage.getItem("contentlineheight")) {
        localStorage.setItem("contentlineheight", '200');
    } 

    // Show numbers checkbox
    if (!localStorage.getItem("Show_Numbers") ) {
        localStorage.setItem("Show_Numbers", 'true');
    } 

    // checkbox for Themes
    if (!localStorage.getItem("Themes") ) {
        localStorage.setItem("Themes", 'true');
    } 

