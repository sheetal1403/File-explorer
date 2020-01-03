const fs = require('fs');
const path = require('path');


//Require files
const calculateSizeD = require('./calculateSizeD.js');
const calculateSizeF = require('./calculateSizeF.js');

const main_content = (fullStaticPath,pathname) => {
    let mainContent = '';
    let link;
    let timestamp,date;
    let itemSize, itemSizeBytes;
    //loop through the elements inside the folder
    try{
            let items = fs.readdirSync(fullStaticPath);
            
            items = items.filter(element => element !== '.DS_Store');
            console.log(items);
            items.forEach(element => {
                
            //link for each item
            link = path.join(pathname, `${element}`);
                
            //icon for each item
            let icon;
            const itemFullStaticPath = path.join(fullStaticPath, element);
             
            let stats;        
            try{
                stats = fs.lstatSync(itemFullStaticPath);
            }catch(err){
                console.log(err);
            }
            
                
            //Check if the item is a directory
            if(stats.isDirectory()){
                //Add the correct icon
                icon = '<ion-icon name="folder"></ion-icon>';
                
                //Calculate size of the folder
                [itemSize, itemSizeBytes] = calculateSizeD(itemFullStaticPath);
            } else if(stats.isFile()){
                icon = '<ion-icon name="document"></ion-icon>';
                
                //Calculate size of the file
                [itemSize, itemSizeBytes] = calculateSizeF(stats);
            } 
                
            timestamp = parseInt(stats.mtimeMs);
            date = new Date(timestamp);
            date = date.toLocaleString();
                
            
            
      
            mainContent +=  `<tr data-name="${element} "data-size="${itemSizeBytes}" date-time="${timestamp}">
                                <td>${icon}<a href="${link}" target=${stats.isFile() ? "_blank" : ""}>   ${element}</a></td>
                                <td>${itemSize}</td>
                                <td>${date}</td>
                            </tr>`
            
        });
    }catch(err)
        {
            console.log(err);
        }
    
    
   
    
    return mainContent;
}

module.exports = main_content;