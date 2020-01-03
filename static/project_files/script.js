//Create an object for each row of the table.
//Sort all the objects based on name and size

//Creating an object for each row

//Loop through the body
let children = $('tbody').children();
let children_array = [];
for(let i=0; i<children.length; i++){
    children_array.push(children[i]);
}

//Order status
const sortStatus = {
    name: 'none', //can be none, up or down
    size: 'none',
    time: 'none'
    
}


//Each Children array element is an object that has a lot of properties. But we need only four. Hence create an object with only 4 properties for each element
const items = [];
children_array.forEach(element => {
    const rowDetials = {
        name: element.getAttribute('data-name'),
        size: parseInt(element.getAttribute('data-size')),
        time: element.getAttribute('date-time'),
        html: element.outerHTML
    }
    items.push(rowDetials);
}
);

//const sort_name_up = items => {
//    items.sort((item1,item2) => {
//    const name1 = item1.name.toUpperCase();
//    const name2 = item2.name.toUpperCase();
//    
//    if(name1 < name2){
//    return -1;
//}
//    if(name1 > name2){
//    return 1;
//}
//return 0;
//    
//
//})};
//
//const sort_name_down = items => {
//    items.sort((item1,item2) => {
//    const name1 = item1.name.toUpperCase();
//    const name2 = item2.name.toUpperCase();
//    
//    if(name1 < name2){
//    return -1;
//}
//    if(name1 > name2){
//    return 1;
//}
//return 0;
//    
//
//}).reverse()};

//fill table body
const fill_table_body = items => {
  const content = items.map(element =>
    element.html).join('');
    $('tbody').html(content);
};

const sort = (items,option, type ) => {
    
    items.sort((item1,item2) => {
        let value1,value2;
        if(type === 'name'){
                 value1 = item1.name.toUpperCase();
                 value2 = item2.name.toUpperCase();
        }
        else if(type === 'size'){
                 value1 = item1.size;
                 value2 = item2.size;
        }else{
                 value1 = item1.time;
                 value2 = item2.time;
        }
        
        
                if(value1 < value2){
                return -1;
            }
                if(value1 > value2){
                return 1;
            }
            return 0;
        
        

    

})
    
    if(option === 'down'){
            items.reverse();
        }
    
};

//Event listeners
document.getElementById('table_head_row').addEventListener('click',event => {
    $('ion-icon').remove();
    if(event.target){
        
        if(['none', 'down'].includes(sortStatus[event.target.id])){
       //Arrange in ascending order
        
        sort(items, 'up', event.target.id );
        sortStatus[event.target.id] = 'up';
        //Add icon
        event.target.innerHTML += ' <ion-icon class="updown" name="arrow-dropdown-circle"></ion-icon>';
       }
    else if(sortStatus[event.target.id] === 'up'){
       //Arrange in ascending order
        console.log(event.target.id);
        sort(items, 'down', event.target.id);
        sortStatus[event.target.id] = 'down';
        event.target.innerHTML += ' <ion-icon class="updown" name="arrow-dropup-circle"></ion-icon>';
       };
    fill_table_body(items);
        
    }
    
    
});







//let array1 = [
//  {name: 'John', age:44},
//  {name: 'Zain', age:35},
//  {name: 'Snow', age:28},
//];
//
//console.log(array1.sort((person1, person2) => {
//    const name1 = person1.name.toUpperCase(); 
//    const name2 = person2.name.toUpperCase(); 
//    if(name1 < name2){
//    return -1;
//}
//    if(name1 > name2){
//    return 1;
//}
//return 0;
//})[0].name);