


let data= [];

(()=> {

    
// --------------- FIRST GRAPH ELEMENT--------------------   
let first_DIV= document.createElement("div");
let firstHeadline= document.querySelector('.mw-headline');
first_DIV.setAttribute("class", "testDiv h-25");
first_DIV.style.backgroundColor= 'black';
first_DIV.style.height= '80vh'
first_DIV.style.width= '100%';

firstHeadline.after(first_DIV)



var table = document.getElementById("table1");

for (let i = 0; i < table.rows.length; i++  ){
    let row= table.rows[i];
    data.push("");

    for (let j = 0; j< row.cells.length; j++) {
        let col = row.cells[j]
        if (col.nodeName == 'TD'){
        
            console.log('this is row no' + i);
            console.log("this is no " + j); 
            console.log("this is col " + col.innerText ); 
            // let localData= data[i]
            // localData.push(col.innerText)
            data[i].push(col.innerText);
           
         }
       
    }
}



})();