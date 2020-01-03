path = require('path');

const buildBreadcrumb = pathname => {
    const pathChunks = pathname.split('/').filter(element => element!= '');
    let link = '/';
    let breadcrumb = '<li class="breadcrumb-item"><a href="/">Home</a></li>';
    pathChunks.forEach( (item,index) => {
        link = path.join(link, item);
        console.log(`Item: ${item}`);
        //for the last item, a tag should not be there and it should be active
      if(index != pathChunks.length -1){
          breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`
    }else{
        breadcrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`
}
      
    });
    return breadcrumb;
    
    
};
module.exports = buildBreadcrumb;