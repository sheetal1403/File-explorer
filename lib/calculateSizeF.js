const calculateSizeF = stats => {
    
    const units = "BKMGT";
//    console.log("FILE:");
    const itemSizeBytes = stats.size;
//    console.log(`Item size bytes: ${itemSizeBytes}`);
    
    
    const index = Math.floor(Math.log10(itemSizeBytes)/3);
//    console.log(`index: ${index}`);
    
    let itemSize = (itemSizeBytes / Math.pow(1000,index)).toFixed(2);
    
//     console.log(`Units: ${units[index]}`);
    itemSize = (`${itemSize}${units[index]}`)
//    console.log(`Item size: ${itemSize}`);
    
    
//    console.log(typeof(stats.size));
    return [itemSize, itemSizeBytes];
};

module.exports = calculateSizeF;