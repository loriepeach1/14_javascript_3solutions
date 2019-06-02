// from data.js
var tableData = data;

const uniqueshape = Array.from(new Set(tableData.map(entry => entry.shape)));
uniqueshape.sort().unshift("0")

const uniquestate = Array.from(new Set(tableData.map(entry => entry.state)));
uniquestate.sort().unshift("0")

const uniquecountry = Array.from(new Set(tableData.map(entry => entry.country)));
uniquecountry.sort().unshift("0")

var inputDate = d3.select("#datetime");
var outputData = d3.select("#ufo-table");
var submitButton = d3.select("#filter-btn")

outputData.select("tbody")
    .selectAll("tr")
    .data(tableData)
    .enter()
    .append("tr")
    .html(function(d)
        {
        return `<td>${d.datetime}</d>
                <td>${d.city}</d>
                <td>${d.state}</d>
                <td>${d.country}</d>
                <td>${d.shape}</d>
                <td>${d.durationMinutes}</d>
                <td>${d.comments}</d>`;    
        });

d3.select("#shapedrop")
    .selectAll("option")
    .data(uniqueshape)
    .enter()
    .append("option")
    .html(function(d)
        {
        return `<option value=${d}>${d}</option>`; 
        });

d3.select("#statedrop")
    .selectAll("option")
    .data(uniquestate)
    .enter()
    .append("option")
    .html(function(d)
        {
        return `<option value=${d}>${d}</option>`; 
        });

d3.select("#countrydrop")
    .selectAll("option")
    .data(uniquecountry)
    .enter()
    .append("option")
    .html(function(d)
        {
        return `<option value=${d}>${d}</option>`; 
        });

function dateFilter(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    var DateValue = inputDate.node().value.trim();
    var CityValue = d3.select("#city").node().value.trim().toLowerCase();
    var ShapeValue = d3.select("#shapedrop").node().value;
    var StateValue = d3.select("#statedrop").node().value;
    var CountryValue = d3.select("#countrydrop").node().value;

    var filterData = tableData;

    if (DateValue != ""){filterData=filterData.filter(entry=> {return entry.datetime==DateValue});}
    if (CityValue != ""){filterData=filterData.filter(entry=> {return entry.city==CityValue});}
    if (ShapeValue != "0"){filterData=filterData.filter(entry=>{return entry.shape==ShapeValue});}
    if (StateValue != "0"){filterData=filterData.filter(entry=>{return entry.state==StateValue});}
    if (CountryValue != "0"){filterData=filterData.filter(entry=>{return entry.country==CountryValue});}


    // var filterInfo = {
    //     datetime:dateselect,
    //     shape: shapeselect
    // }
    // console.log(filterInfo)
    // var filterData = tableData.filter((entry)=>{return entry.datetime == filterInfo.datetime && entry.shape == filterInfo.shape});
    
    // console.log(filterData.length)
    outputData.select("tbody").html("")

    outputData.select("tbody")
        .selectAll("tr")
        .data(filterData)
        .enter()
        .append("tr")
        .html(function(d)
            {
            return `<td>${d.datetime}</d>
                    <td>${d.city}</d>
                    <td>${d.state}</d>
                    <td>${d.country}</d>
                    <td>${d.shape}</d>
                    <td>${d.durationMinutes}</d>
                    <td>${d.comments}</d>`;    
            });

};

function dateReset(){
    d3.event.preventDefault();
    inputDate.node().value = ''
    d3.select("#city").node().value = ''
    document.getElementById('shapedrop').selectedIndex=0;
    document.getElementById('statedrop').selectedIndex=0;
    document.getElementById('countrydrop').selectedIndex=0;
}


submitButton.on("click", dateFilter);
d3.select("#reset-btn").on("click", dateReset);