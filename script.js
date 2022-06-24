// ------------------- GLOBAL VARS ------------------------------------
let dataT= [];
let dummy= [80, 100, 56, 120, 180, 30, 40, 120, 160]
let table = document.getElementById("table1");


//-------------------- FUNCTIONS ------------------------------------

function drawChart(data){
   
    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var svg = d3.select('.bar-chart')
        .attr("width", svgWidth)
        .attr("height", svgHeight);
        
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleTime()
        .rangeRound([0, width]);
    
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);
    
    var line = d3.line()
        .x(function(d) { return x(d.year)})
        .y(function(d) { return y(parseInt(d.value))})
        x.domain(d3.extent(data, function(d) {   
             return  d.year;
             }));
        
        y.domain(d3.extent(data, function(d) {
         //   console.log(" this id date frim inside y " + d.value);    
            return parseInt(d.value) }));

            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
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
            .text("Price ($)");
        
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
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
         }   
    }
    dataT.push(tempArray);
}}

(()=> {

pullData();   
// --------------- FIRST GRAPH ELEMENT--------------------   

 let firstHeadline= document.querySelector('.mw-headline');

//-------------- TABLE 1 SVG ----------------------------

let data3= dataT[2]
console.log('this content of data 3 ' + JSON.stringify(data3.slice(1, data3.length), null, 2   ));

let svgOne= document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgOne.setAttribute("class", "bar-chart");

table.before(svgOne);

drawChart(data3)
drawChart(dataT[4])


console.log(dataT);
})();

