url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
var radius_ratio=40000;
var circleData=[];
d3.json(url,function(mydata){
    data=mydata.features;
    //console.log(data);
    createFeatures(data);
});
function createFeatures(data){
    //console.log("&&&&&&&&&");
    function onEachFeature(data){
        //console.log(data);
        for (var i=0;i<data.length;i++){
            var color = "";
            console.log("***********");
            console.log(data[i]);
              if (data[i].properties.mag < 4) {
                color = "#008000";
              }
              else if (data[i].properties.mag < 5) {
                color = "#7DC000";
              }
              else if (data[i].properties.mag < 6) {
                color = "	#ffff00";
              }          
              else if (data[i].properties.mag < 7) {
                color = "#ffa500";
              }         
              else if (data[i].properties.mag < 8) {
                color = "#ff0000";
              }
              else {
                color = "#800000";
              }
            radius=data[i].properties.mag*radius_ratio;
            var mycor=[];
            mycor=[data[i].geometry.coordinates[1],data[i].geometry.coordinates[0]];
            circleData.push(L.circle(mycor,{
                fillOpacity: .75,
                color: color,
                fillColor: color,
                radius: radius
            })).bindPopup("<h2>" + data[i].properties.place + "</h2> <hr> <h4>Magnitude: " 
            + data[i].properties.mag + "</h4> <hr> <h4>Date: " 
            + new Date(data[i].properties.time) + "</h4>");
        };
        L.layerGroup(circleData);
     }
    var earthquakes=L.geoJSON(data,{
        onEachFeature:onEachFeature
    })
    createMap(earthquakes);
};
function createMap(earthquakes){
//console.log("****************");
//console.log(earthquakes);
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
        Earthquakes: earthquakes
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
    var legend_loc = L.DomUtil.create("div", "info legend"),
        levels = [0, 1, 2, 3, 4, 5];
    
    };
legend.addTo(myMap);
};


