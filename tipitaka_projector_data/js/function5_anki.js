

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
                strAnkiLine = strAnkiLine  + toTranslate(DictInfoArr[i].key) + '\t' + toTranslate(DictInfoArr[i].source) + '\t' +  strDef + '\n';

            }
        }

        document.write = localStorage.setItem('Anki', strAnkiLine); 
        $('#CopyText').val(strAnkiLine);

        var blob = new Blob([strAnkiLine], {type: "text/plain;charset=utf-8"});
        
        
        fileDownload(strAnkiLine, 'AnkiImportFromTPP.tsv');
        //const element = document.createElement("a");
        //element.href = URL.createObjectURL(blob);
        //element.download = "AnkiImportFromTPP.tsv";
        //element.click();
    




        

    }

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
        $('#CopyText').val(strAnkiLine);
        
        $('#CopyText').select();
        document.execCommand('copy');
    }    


function AnkiClear() {
    document.write = localStorage.setItem('Anki', '');
    document.write = localStorage.setItem('AnkiLine', '');
    document.write = localStorage.removeItem('Anki');
    $('#CopyText').val('');

}