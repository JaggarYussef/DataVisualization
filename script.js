// ------------------- GLOBAL VARS ------------------------------------
let dataT= [];
let testData= [];
let year= new Set();
let rate=  new Set();
let table = document.getElementById("table1");
let homocide= document.getElementById('table2')
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

function drawChart(x_axis, y_axis, chart_id){
    x_axis_array= Array.from(x_axis);
    y_axis_array= Array.from(y_axis);
    // console.log("this is x axis data" + typeof x_axis_array[2]);
     console.log("this is y axis data" + typeof y_axis_array[2]);
   

  
  svg = d3.select(`${chart_id}`)
      .attr("width", Dimensions.svgWidth)
      .attr("height", Dimensions.svgHeight);
      
   g = svg.append("g")
      .attr("transform", "translate(" + Dimensions.marginLeft + "," + Dimensions.marginTop + ")");
  
   x = d3.scaleTime()
      .rangeRound([0, width]);
  
   y = d3.scaleLinear()    
      .rangeRound([height, 0]);

      var x_axis_line = d3.axisBottom().scale(x);      
         
  
g.append("g")
    .call(d3.axisBottom(x))
    .attr("transform", "translate(0," + Dimensions.svgWidth + ")")
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

    var xAxisTranslate = Dimensions.svgHeight - 20;


         
    svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate  +")")
    .call(x_axis_line);    
 
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
 
 

//iterates through html table to make an array of objects. Each object contains country name and crime rate and year
//simultaniously it updates the year and rate sets to have a the years displayed in the y and x axises
function pullData(input_table, target_array, startYear){

  for (let i = 2; i < input_table.rows.length; i++  ){
      let row= input_table.rows[i];
     
      let tempArray= []
      let xVal= startYear;
   
      for (let j = 2; j< row.cells.length; j++) {
        
          let col = row.cells[j]
          if (col.nodeName == 'TD'){
             // console.log("outer inner log" + col);
              tempArray.push({
                  country: row.cells[1].innerText,
                  value: col.innerText,
                  year: xVal++
              });
  
              year.add(xVal);
              rate.add(parseInt(col.innerText));  
  
           }   
      }
      target_array.push(tempArray);
  }}
  


//creates labels from data array and assigns id to each button in order to be identified when clicked
function drawLabels(inputArray, container_id){

    for(let i = 0; i < inputArray.length; i++){
        let row= inputArray[i];
        //row[1].country
        const container= document.getElementById(`${container_id}`)
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

  pullData(table, dataT, 2000)
  pullData(homocide, testData, 2007)
console.log(testData);
// --------------- FIRST GRAPH ELEMENT--------------------   
function createGraph(bar_chart_id, graph_container_id, label_container_id, parentNode){
  let svgOne= document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgOne.setAttribute("class", "bar-chart");
  svgOne.setAttribute("id", `${bar_chart_id}`);

  let graphContainer= document.createElement('div')
  graphContainer.setAttribute("class", "graph-container")
  graphContainer.setAttribute("id", `${graph_container_id}`)
  graphContainer.style.display= "flex"
  graphContainer.style.width= '100%'
  graphContainer.style.height= '80vh';
  parentNode.before(graphContainer);
  graphContainer.appendChild(svgOne)

  let labelContainer= document.createElement('div');
  labelContainer.setAttribute("class", "label-container");
  labelContainer.setAttribute("id", `${label_container_id}`);
 
  labelContainer.style.display= 'flex';
  labelContainer.style.flexWrap= 'wrap';
  labelContainer.style.width= '200px';
  labelContainer.style.height= '400px';
  labelContainer.style.gap= '5px';
  labelContainer.style.justifyContent= 'center'
  graphContainer.appendChild(labelContainer); //add element to DOM


}

let data3= dataT[2]
let dummy = JSON.stringify(data3.slice(1, data3.length), null, 2   )

console.log('this content of data 3 ' + data3[1].year);


testElem= document.getElementById("Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police")



createGraph("bar-chart-two", "graphContainer-two", "labelContainer-two", homocide)
drawChart(year, rate, "#bar-chart-two" )
drawLabels(dataT,"labelContainer-two");

createGraph("bar-chart", "graphContainer", "labelContainer", testElem )
drawChart(year, rate, "#bar-chart" )
drawLabels(dataT,"labelContainer");



//Once labels have been created by drawLabels() with respective ID's  and color
//it select the respective country(by id)  and passes the Country object inside array AND and the assigend color

document.querySelectorAll('.dot').forEach(item => {
    item.addEventListener('click', () => {
      console.log('clicked');
      countryName= document.querySelector('.dot').id
      console.log(typeof item.id);
      let labelId= parseInt(item.id);
      
      drawLine(dataT[labelId],item.style.backgroundColor )
    })
  })

console.log(dataT);
})();

