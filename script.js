// ------------------- GLOBAL VARS ------------------------------------
let dataT= [];
let year= new Set();
let rate=  new Set();
let table = document.getElementById("table1");
let g;
let y;
let x;
let line;
 //global dimensions for each SVG container 
Dimensions = {
    svgWidth: 600,
    svgHeight: 400,
    marginTop: 20,
    marginLeft: 50,
    marginBottom: 30,
    marginRight: 20,
  }
  
  
  
  const width= Dimensions.svgWidth - Dimensions.marginLeft - Dimensions.marginRight;
  const height= Dimensions.svgHeight - Dimensions.marginTop -  Dimensions.marginBottom;
  
//-------------------- FUNCTIONS ------------------------------------


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
  
  function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
  }

function drawChart(x_axis, y_axis){
    x_axis_array= Array.from(x_axis);
    y_axis_array= Array.from(y_axis);
    console.log("this is x axis data" + x_axis_array);
    console.log("this is  axis data" + y_axis_array);
   
   
  // var svgWidth = 600, svgHeight = 400;
  // var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  // var width = svgWidth - margin.left - margin.right;
  // var height = svgHeight - margin.top - margin.bottom;
  
  svg = d3.select('.bar-chart')
      .attr("width", Dimensions.svgWidth)
      .attr("height", Dimensions.svgHeight);
      
   g = svg.append("g")
      .attr("transform", "translate(" + Dimensions.marginLeft + "," + Dimensions.marginTop + ")");
  
   x = d3.scaleTime()
     // .domain([0, d3.max(data)])
      .rangeRound([0, width]);
  
   y = d3.scaleLinear()
      .rangeRound([height, 0]);
  
g.append("g")
    .call(d3.axisBottom(x))
    .attr("transform", "translate(0," + height + ")")
    .attr("fill", "#000")
    .attr("x", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .select(".domain")
    .remove();

g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Crimes recorded");
 
}    

function drawLine(data, labelColor){
  line = d3.line()
 .x(function(d) { return x(d.year)})
 .y(function(d) { return y(parseInt(d.value))})
 x.domain(d3.extent(data, function(d) {   
      return  d.year;
      }));
 
 y.domain(d3.extent(data, function(d) {
  //   console.log(" this id date frim inside y " + d.value);    
     return parseInt(d.value) }));
 
 
 
 g.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", `${labelColor}`)
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 3)
     .attr("d", line);
 }
 
 


function pullData(){

for (let i = 2; i < table.rows.length; i++  ){
    let row= table.rows[i];
   
    let tempArray= []
    let xVal= 2002;
 
    for (let j = 2; j< row.cells.length; j++) {
      
        let col = row.cells[j]
        if (col.nodeName == 'TD'){
           // console.log("outer inner log" + col);
            tempArray.push({
                country: row.cells[1].innerText,
                value: col.innerText,
                year: xVal++
            });

            year.add(xVal++);
            rate.add(col.innerText);  

         }   
    }
    dataT.push(tempArray);
}}


function drawLabels(inputArray, container){

    for(let i = 0; i < inputArray.length; i++){
        let row= inputArray[i];
        //row[1].country
        let labelDot = document.createElement('span');
        labelDot.setAttribute("class", "dot");
        labelDot.setAttribute("title", `${row[1].country}`);
        labelDot.setAttribute("id", `${i}`)
        labelDot.style.height= '18px';
        labelDot.style.width= '18px';
        labelDot.style.backgroundColor= getRandomColor();
        labelDot.style.borderRadius= '15%';
        container.appendChild(labelDot);
        
    }
}




(()=> {

pullData();   

// --------------- FIRST GRAPH ELEMENT--------------------   

 
//-------------- TABLE 1 SVG ----------------------------
let svgOne= document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgOne.setAttribute("class", "bar-chart");

let firstHeadline= document.querySelector('.mw-headline');
 let graphContainer= document.createElement('div')
 graphContainer.setAttribute("class", "graph-container")
 graphContainer.style.display= "flex"
 graphContainer.style.width= '100%'
 graphContainer.style.height= '80vh';
 table.before(graphContainer);
 graphContainer.appendChild(svgOne)

 //----------------------- labels-------------------------
 
 let labelContainer= document.createElement('div');
 labelContainer.setAttribute("class", "label-container");

 labelContainer.style.display= 'flex';
 labelContainer.style.flexWrap= 'wrap';
 labelContainer.style.width= '200px';
 labelContainer.style.height= '400px';
 labelContainer.style.gap= '5px';
 labelContainer.style.justifyContent= 'center'
 
 graphContainer.appendChild(labelContainer); //add element to DOM
 drawLabels(dataT,labelContainer);



 


 

let data3= dataT[2]
let dummy = JSON.stringify(data3.slice(1, data3.length), null, 2   )

console.log('this content of data 3 ' + data3[1].year);


document.querySelectorAll('.dot').forEach(item => {
    item.addEventListener('click', () => {
      countryName= document.querySelector('.dot').id
      console.log(typeof item.id);
      let labelId= parseInt(item.id);
      console.log("this is type" + item.style.backgroundColor);
      drawLine(dataT[labelId],item.style.backgroundColor )
    })
  })



drawChart(year, rate)




console.log(dataT);
})();

