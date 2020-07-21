url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
var radius_ratio=40000;
var markers=[];
d3.json(url,function(mydata){
    data=mydata.features;
    //console.log(data);
    createFeatures(data);
});
function createFeatures(data){
    //console.log("&&&&&&&&&");
    var circleData = [];
    function onEachFeature(data){
        if (data.properties.mag < 4) {
        color = "#008000";
        }
        else if (data.properties.mag < 5) {
          color = "#7DC000";
        }
        else if (data.properties.mag < 6) {
          color = "	#ffff00";
        }          
        else if (data.properties.mag < 7) {
          color = "#ffa500";
        }         
        else if (data.properties.mag < 8) {
          color = "#ff0000";
        }
        else {
          color = "#800000";
        };
        
        radius=data.properties.mag*radius_ratio;
        var mycor=[];
        
        mycor=[data.geometry.coordinates[1],data.geometry.coordinates[0]];
       
        circleData.push(L.circle(mycor,{
            fillOpacity: .75,
            color: color,
            fillColor: color,
            radius: radius
        }).bindPopup("<h2>" + data.properties.place + "</h2> <hr> <h4>Magnitude: " 
           + data.properties.mag + "</h4> <hr> <h4>Date: " 
           + new Date(data.properties.time) + "</h4>"));
    };
    //var circleData=L.layerGroup(markers);
     
    var earthquakes=L.geoJSON(data,{
        onEachFeature:onEachFeature
    });
    earthquakes=L.layerGroup(circleData);
    createMap(earthquakes);
};
var circleData=L.layerGroup(markers);
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
        Earthquakes: circleData
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


