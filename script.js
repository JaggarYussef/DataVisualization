


let data= [];
//let dummy= [80, 100, 56, 120, 180, 30, 40, 120, 160]
//let dummy= [1, 2, 3, 4, 4, 5, 6, 7, 8]

function pullData(){
    var table = document.getElementById("table1");

for (let i = 2; i < table.rows.length; i++  ){
    let row= table.rows[i];
   
    let tempArray= []

    for (let j = 0; j< row.cells.length; j++) {
        let col = row.cells[j]
        if (col.nodeName == 'TD'){
            tempArray.push(col.innerText);     
         }
    
    }
    data.push(tempArray);
  
}

}

(()=> {

pullData();   
// --------------- FIRST GRAPH ELEMENT--------------------   
let first_DIV= document.createElement("div");
let firstHeadline= document.querySelector('.mw-headline');
first_DIV.setAttribute("class", "testDiv h-25");
first_DIV.style.backgroundColor= 'white';
first_DIV.style.height= '80vh'
first_DIV.style.width= '100%';


//-------------- SVG ELEMENT----------------------------
const svgWidth= "200" ; const svgHeight= "800" ; const barPadding= "5";
const barWidth= (svgWidth / data[3].length); 
let data3= data[3]
console.log("this third type of" +  typeof data3[5] );

//let svgOne= document.createElement("svg");
//first_DIV.appendChild(svgOne);
//svgOne.setAttribute("class", "bar-chart");
let svgRep= d3.select('svg').attr("width", svgWidth).attr("height", svgHeight);
//svgRep.style("backgroundColor", "black")


let bars= svgRep.selectAll("rect")
    .data(data[3].slice(1,2))
    .enter()
    .append("rect")
    .attr("y", function(d){
        return svgHeight - (parseInt(d)) / 2 ;
    })
    .attr("height", function(d){
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function(d, i){
        var translate = [barWidth * i, 0];
        return "translate("+ translate +")";
    });
   
 //  svgRep.appendChild(bars) 





//-------------- DISPLAY ----------------------------------
firstHeadline.after(first_DIV)






// function cleanUp(array){
//     for(let i =0; i < array.length; i++){
//         if(array[i].length == 0){

//             array.splice(i);
//             console.log(data);
//         }
//     }
// }




console.log(data);

})();