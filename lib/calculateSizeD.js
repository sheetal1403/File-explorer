

const {execSync} = require('child_process');

const calculateSizeD = itemFullStaticPath => {
    
    let itemSize, itemSizeBytes;
    
    //esc spaces, tabs, etc
    // \s- escape spaces, g- all global 
    let itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g,'\ ');
    
    const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();
    itemSize = commandOutput.replace(itemFullStaticPathCleaned, '');
    itemSize = itemSize.replace(/\s/g,'');
//    
//    console.log(`Item size ${itemSize}`);
//    console.log(typeof(itemSize));
    
//    itemSize = itemSize.split('/');
//    itemSize = itemSize[0];
//    console.log(`Item size array ${itemSize[0]}`);
//    console.log(typeof(itemSize));
    
//    console.log(itemSize[0]);
    
    
    const itemSizeUnits = itemSize.replace(/\d|\./g,'');
//    console.log(itemSizeUnits);
//    console.log(typeof(itemSizeUnits));
//    
    const itemSizeNumber = parseFloat(itemSize.replace(/[a-z]/i,''));
//    console.log(itemSizeNumber);
//    
    const  units = "BKMGT";
    
//    console.log(units.indexOf(itemSizeUnits));
//    console.log(Math.pow(1000, units.indexOf(itemSizeUnits)));
    itemSizeBytes = itemSizeNumber * Math.pow(1000, units.indexOf(itemSizeUnits));
//    const filesizeBytes = filesizeNumber * Math.pow(1000, units.indexOf(filesizeUnit));
//    console.log(`Bytes: ${itemSizeBytes}`);
     
    return [itemSize, itemSizeBytes];
};

module.exports = calculateSizeD;