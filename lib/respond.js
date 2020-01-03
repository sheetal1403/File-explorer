//require node modules
const url = require('url');
const path = require('path');
const fs = require('fs');

//file imports
const buildBreadcrumb = require('./breadcrumb.js');
const build_main_content = require('./main_content.js');
const getMimeType = require('./getMimeType.js');

//__dirname -> path of the folder in which this code(respond.js) is executing
//Go back one step from this folder (respond.js) and then go to static
const staticBasePath = path.join(__dirname, '..', 'static');

const respond = (request,response) => {
    
    //Get the pathname and decode it
    //console.log(request.url);
    let pathname = url.parse(request.url, true).pathname
    
    if(pathname == '/favicon.ico'){
        return false;
    }
    pathname = decodeURIComponent(pathname);
    
    
    
    //Get the full path in the static folder that is in the server    
    const fullStaticPath = path.join(staticBasePath, pathname);
    

//    Check if the file exists in the static folder
    if(!fs.existsSync(fullStaticPath)){
        response.write('FILE NOT FOUND')
        response.end();
        return false; // Dont execute the further code
    }
    
//    Found something
//    Check if its a directory or a file
    let stats;
    try{
        stats = fs.lstatSync(fullStaticPath);
    }catch(err){
        console.log(`lstatSync error: ${err}`);
    }
    
    //It is a directory
    let folderName;
    if(stats.isDirectory()){
        let data = fs.readFileSync(path.join(staticBasePath,'project_files/index.html'), 'utf-8');
        
//        Page title
        console.log('Pathname: '+pathname);
        if(pathname == '/'){
           folderName = "Home";
            
            
        }else{
            let pathElements = pathname.split('/').reverse();
            pathElements = pathElements.filter(element => element != '');
        
            folderName = pathElements[0];
        }
        
        
        
        
        //Build breadcrumb
        const breadcrumb = buildBreadcrumb(pathname);
        
        const main_content = build_main_content(fullStaticPath,pathname);
        ;
        

        data = data.replace('page_title', folderName);
        
        data = data.replace('pathname', breadcrumb);
        
        data = data.replace('main_content', main_content);
        
        
        response.write(data);
        return response.end();
    }
    
    //Neither a file nor a directory
    if(!stats.isFile()){
        response.statusCode = 404;
        response.write('401: Access denied')
    }
    
    //Its a file
    const fileDetails = {};
    fileDetails.extname = path.extname(fullStaticPath);
    
    
    getMimeType(fileDetails.extname) 
    .then(mime => {
        
        
        //Store headers
        let head = {};
        let options = {};
        let statusCode = 200;
        
        head['Content-Type'] = mime;
        
        if(fileDetails.extname === '.pdf'){
            head['Content-Disposition'] = 'attachment;filename=file.pdf';
        }
          //Method - Reading the fileMethod - Promises
          
//        fs.promises.readFile(fullStaticPath, 'utf-8')
//        .then(data => {
//            response.writeHead(statusCode, head);
//            response.write(data);
//            return response.end();
//        }).catch(err => {
//            response.statusCode = 404;
//            response.write('404: Error reading file');
//            return respond.end();
//        });      
          
          //Method - Reading the fileMethod - call backs method
//        fs.readFile(fullStaticPath, 'utf-8', (error, data) => {
//            if(error){
//                response.statusCode = 404;
//                response.write('404: Error reading file');
//                return respond.end();
//            }else{
//                response.writeHead(statusCode, head);
//                response.write(data);
//                return response.end();
//            }
//        });
        
        //Method - streaming the file
        
        //Create stream
        const fileStream = fs.createReadStream(fullStaticPath, options);
        
        //Start filling the stream with response
        response.writeHead(statusCode,head);
        fileStream.pipe(response);
        
        //events
        fileStream.on('close',() => {
           response.end(); 
        });
        
        fileStream.on('error',error => {
           response.statusCode = '404';
           response.write('404: Error streaming file');
           return respond.end();
            
        });   
    })
    .catch(err => {
        response.statusCode = 500;
        response.write(`500: Server internal error`);
        console.log(`Promise error: ${err}`);
        return response.end();
        
    });
    
    
    
};



































module.exports = respond