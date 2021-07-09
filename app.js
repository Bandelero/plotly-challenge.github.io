function buildCharts(myValue) {
 

 //Read samples.json
        d3.json("samples.json").then (sampleData => {
            console.log(sampleData)
            // console.log(sampledata.metadata[0])
            
            //If myvalue has no value this inputs a value
            if (myValue==null || myValue === undefined){
                myValue=sampleData.names[0];
            }
            //If my value has no value assigned to it, it is undefined. However when the value undefined is convereted to a string by the  == comparison
            //Its value becomes an empty string, which is not equal to undefined. This is why the second part needs ===. There is a js library to fix this

            var ids = sampleData.names;
            console.log(ids)

            //filter sampledata by myValue here to get samples and metadata
            var filterSampleValues = sampleData.samples.filter((sample)=>myValue == sample.id);
            console.log(filterSampleValues)//Array
            var filterMetaDataValues = sampleData.metadata.filter((data)=>myValue == data.id);
            console.log(filterMetaDataValues)

            var sampleValues =  filterSampleValues[0].sample_values.slice(0,10).reverse();
            console.log(filterSampleValues[0].sample_values)//Object
            console.log("testesttest")
            console.log(sampleValues)
            //top 10 otu ids
            var topTen = ( filterSampleValues[0].otu_ids.slice(0, 10)).reverse();
            console.log(filterMetaDataValues[0])
            console.log("-----------")
            console.log(topTen)
            //Concantenate id's 
            var otuIDS = topTen.map(d => "OTU " + d);
            console.log(`OTU IDS: ${otuIDS}`)
            //Top 10 labels for the plot
            var labels =  filterSampleValues[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: otuIDS,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 100
                }
            };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);

        //Bubble Chart

        var trace1 = {
            x: topTen,
            y: sampleValues,
            text: labels,
            mode: 'markers',
            marker: {
                color: topTen,
                size: sampleValues
            }
          };
          
          var data1 = [trace1];
          
          var layout1 = {
            title: 'OTUs',
            showlegend: false,
            height: 600,
            width: 1000
          };
          
          Plotly.newPlot('bubble', data1, layout1);

        //Demographics
        
        var metaData = filterMetaDataValues[0]
        console.log("===========")
        console.log(metaData.id)
        console.log("===========")
        var list = d3.select(".panel-body");
        console.log(metaData)
        list.html("");

        Object.entries(metaData).forEach(([key, value]) => {
            list.append("p").text(`${key}: ${value}`);
        });


        //dropdown

        d3.select("#selDataset").selectAll("option")
            .data(ids)
            .enter() // creates placeholder for new data
            .append("option") // appends a div to placeholder
            .classed("dropDown",true) // sets the class of the new div
            .text(function(d) {
                return d;
            }); // sets the html in the div to an image tag with the link

        });

}

function optionChanged(myValue) {
    //console.log(myValue);
    buildCharts(myValue);
    


};


buildCharts();
//Null value is being passed which is why we need the if statement on line10