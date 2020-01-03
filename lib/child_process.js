//Require node modules

//If only method of child_process .i.e exec sync here, is used, use :
// const execSync = require('child_process').execSync
//result = execSync(`du -sh....`)

//same as const {execSync} = require('child_process');

const {execSync} = require('child_process');


    
//    console.log(`child_process: ${itemFullStaticPath}`);
    const result = execSync(`du -sh "${itemFullStaticPath}"`).toString();
//    console.log(`Child process function: ${result}`);
    return result;
};



