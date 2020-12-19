const fs = require('fs');
const path = require('path');

const allFiles = fs.readdirSync('.');

const textFiles = allFiles.filter(file => {
    const extension = path.extname(file).toLowerCase();
    if (extension !== '.htm') {
        return false;
    }
    
    const fileName = path.basename(file, '.htm');
    if (fileName.length !== 4) {
        return false;
    }

    if (isNaN(fileName)) {
        return false;
    }
    
    const fileNumber = parseInt(fileName);
    if (fileNumber < 1000 || fileNumber > 9000) {
        return false;
    }
    return true;
});

const rowsMap = {};

const regex = /^\s+var end = (\d+);/gm;
for (const file of textFiles) {
    const fileContents = fs.readFileSync(file, 'utf8').toString();
    const matches = fileContents.match(regex);
    let rowsCount = 0;
    if (matches) {
        rowsCount = parseInt(RegExp.$1);
    } else {
        console.log('could not determine rows for ' + file);
    }

    rowsMap[path.basename(file, '.htm')] = rowsCount;
}

fs.writeFileSync('rows.json', JSON.stringify(rowsMap, null, 4));