function AnkiAdd() {
    var tr_id = localStorage.getItem('tr_id');
    if (tr_id != undefined) {
        key = document.getElementById('DictionaryKey').value.trim();
        if (key != '') {
            var AnkiOld = localStorage.getItem('Anki');
            if (AnkiOld == undefined) {
                AnkiOld = '';
            }

            var str1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṬḌṄṆÑḶṂ';
            val = P_HTM[tr_id];
            val = val.replace(/\[[^\]]+./gm, '');
            val = val.replace(/\*/gm, '').replace(/\‘/g, '').replace(/\’/g, '');
            var ary = val.split(key);

            s0 = '';
            arys0 = ary[0].split('');
            lenx = arys0.length-1;
            for (i=lenx; 0<=i; i--) {
                c1 = arys0[i]
                s0 = c1 + s0;
                if (str1.indexOf(c1) != -1) {
                    break;
                }
            }

            s1 = '';
            if (ary[1] == undefined) {
                out = '<b>' + key + '</b>' + s0;
            } else {    
                arys1 = ary[1].split('');
                for (i in arys1) {
                    c1 = arys1[i];
                    s1 = s1 + c1;
                    if (c1 == '.') {
                        break;
                    }
                }
                out = s0 + '<b>' + key + '</b>' + s1;
            }    

            var ret1 = AnkiSearch(key);
            var key2 = '';
            if (ret1 == '') {
                var key2 = wordbreakdata[key]; // declension
                var ret1 = AnkiSearch(key2);
            }    
            
            out = key + '\t' + out + '\t' + ret1  + '<br><br>' + key2 + '\n' + AnkiOld;
            document.write = localStorage.setItem('Anki', out);
        }
    }
}

function AnkiSearch(key) { 
    d_name = document.getElementById('AnkiDictionary').value;
    if (d_name == 'ee1') { return(AnkiGetValue(ee1, key)); }
    if (d_name == 'pc1') { return(AnkiGetValue(pc1, key)); }
    if (d_name == 'pc2') { return(AnkiGetValue(pc2, key)); }
    if (d_name == 'pd1') { return(AnkiGetValue(pd1, key)); }
    if (d_name == 'pe1') { return(AnkiGetValue(pe1, key)); }
    if (d_name == 'pe2') { return(AnkiGetValue(pe2, key)); }
    if (d_name == 'pe3') { return(AnkiGetValue(pe3, key)); }
    if (d_name == 'pe4') { return(AnkiGetValue(pe4, key)); }
    if (d_name == 'pe5') { return(AnkiGetValue(pe5, key)); }
    if (d_name == 'pe6') { return(AnkiGetValue(pe6, key)); }
    if (d_name == 'pg1') { return(AnkiGetValue(pg1, key)); }
    if (d_name == 'pm1') { return(AnkiGetValue(pm1, key)); }
    if (d_name == 'pm2') { return(AnkiGetValue(pm2, key)); }
    if (d_name == 'pm3') { return(AnkiGetValue(pm3, key)); }
    if (d_name == 'pm4') { return(AnkiGetValue(pm4, key)); }
    if (d_name == 'pv1') { return(AnkiGetValue(pv1, key)); }
    if (d_name == 'pv2') { return(AnkiGetValue(pv2, key)); }
    if (d_name == 'pv3') { return(AnkiGetValue(pv3, key)); }
    if (d_name == 'se1') { return(AnkiGetValue(se1, key)); }
}

function AnkiGetValue(aryAnkiGetValue, key) {
    this.aryAnkiGetValue = aryAnkiGetValue;
    var meaning_from_dict = '' + aryAnkiGetValue[key];
    if (meaning_from_dict != "undefined") {
        return(meaning_from_dict);
	} else {
		return ('');
	}
}

function AnkiCopy() {
    var dat = localStorage.getItem('Anki');
    if ((dat != undefined) && (dat != '')) {
        dat = dat.trim()
        ary = dat.split('\n');
        ary.sort();

        var out = '';

        var lenx = ary.length;
        ary[lenx] = '';
        for (i=0; i<lenx; i++) {
            ary1 = ary[i].split('\t');
            ary2 = ary[i+1].split('\t');
            if (ary1[0] != ary2[0]) {
                out = out + ary[i] + '\n';
            }
        }
        out = out.trim();

        document.getElementById('CopyText').value = out;
        
        $('#CopyText').select();
        document.execCommand('copy');
    }    
}

function AnkiClear() {
    document.write = localStorage.setItem('Anki', '');
    document.write = localStorage.removeItem('Anki');
    document.getElementById('CopyText').value = '';
}