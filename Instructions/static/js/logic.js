url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

var my_zoom = 3;
var radius_ratio = 40000;
var my_coord = [37.09, -95.71];
var markers=[];
d3.json(url,function(mydata){
    data=mydata.features;
    //console.log(data);
    getQuakeCircles(data, my_zoom, radius_ratio, my_coord);
});

    
function getQuakeCircles(earthquakeData, my_zoom, radius_ratio, my_coord) { 

    var myData = earthquakeData;
    var circleData = [];
    var quakeData = [];
    
    console.log(myData);
    console.log(my_coord);

    for (var i = 0; i < myData.length; i++) {
        var quake = myData[i];
        quakeData.push(quake);
    }
        console.log(quakeData); 

//// Loop through the magnitutdes and assign colors ////
    for (var i = 0; i < quakeData.length; i++) {

        var color = "";
            if (quakeData[i].properties.mag < 4) {
                color = "#008000";
            }
            else if (quakeData[i].properties.mag < 5) {
                color = "#7DC000";
            }
            else if (quakeData[i].properties.mag < 6) {
                color = "	#ffff00";
            }          
            else if (quakeData[i].properties.mag < 6.5) {
                color = "#ffa500";
            }         
            else if (quakeData[i].properties.mag < 7) {
                color = "#ff0000";
            }
            else {
                color = "#800000";
            }

        myRadius = quakeData[i].properties.mag * radius_ratio;
        // console.log(myRadius); 
        // console.log(quakeData[i].geometry.coordinates);
        var myCoords = [];
        myCoords = [quakeData[i].geometry.coordinates[1], quakeData[i].geometry.coordinates[0]];
        

        function toDateTime(secs) {
            var t = new Date(secs);
            return t;
        }

        var mysec = quakeData[i].properties.time;
        var myDate = toDateTime(mysec).toLocaleString();
        // console.log(myDate) 

        //// Append each circle definition to circleData ////
        circleData.push(L.circle(myCoords, {
            fillOpacity: .75,
            color: color,
            fillColor: color,
            radius: myRadius
        })
        .bindPopup("<h2>" + quakeData[i].properties.place + "</h2> <hr> <h4>Magnitude: " 
                            + quakeData[i].properties.mag + "</h4> <hr> <h4>Date: " 
                            + myDate + "</h4>"));
        }
    console.log(circleData);
    quakemap = L.layerGroup(circleData);
    console.log(my_coord);
    createMap(quakemap);
};
    
function createMap(earthquakes){
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
     var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };
    var overlayMaps = {
        Earthquakes: quakemap
    };
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend =L.control({position:"bottomright"});

    legend.onAdd=function(){
    var legend_loc = L.DomUtil.create("div", "info legend");
    var levels = [0, 1, 2, 3, 4, 5];
    var colors=[
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
       " #ea2c2c",
    ];
    
    };
legend.addTo(myMap);
};


