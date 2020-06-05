

function AnkiAdd() {
    var AnkiHistArr =[];
    var strAnkiLine = "";
    var strDef = "";

    var strDictInfoArr = localStorage.getItem('DictInfoArr');
	var DictInfoArr = [];
	if (strDictInfoArr){
		DictInfoArr = JSON.parse(strDictInfoArr);
        AnkiHistArr =  document.getElementsByName("AnkiHist");

        // DictInfoArr and AnkiHistArr were built from the same array so 
        // we can use the same index instead of going off the key.

        var len = AnkiHistArr.length;
        for (i in AnkiHistArr ){
            if (AnkiHistArr[i].checked == true){
        
                strDef =DictInfoArr[i].def.replace(/(\r\n|\n|\r)/gm,"");
                strDef = strDef.replace(/style=\"background-color:rgb\(204,198,176\)\"/g, "");
                strAnkiLine = strAnkiLine  + DictInfoArr[i].key + '\t' + DictInfoArr[i].source + '\t' +  strDef + '\n';

            }
        }

        document.write = localStorage.setItem('Anki', strAnkiLine); 
        document.getElementById('CopyText').value = strAnkiLine;

        //var blob = new Blob([strAnkiLine], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, 'AnkiImportFromTPP.tsv');

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
    var strAnkiLine = localStorage.getItem('Anki');
        document.getElementById('CopyText').value = strAnkiLine;
        
        $('#CopyText').select();
        document.execCommand('copy');
    }    


function AnkiClear() {
    document.write = localStorage.setItem('Anki', '');
    document.write = localStorage.setItem('AnkiLine', '');
    document.write = localStorage.removeItem('Anki');
    document.getElementById('CopyText').value = '';
}