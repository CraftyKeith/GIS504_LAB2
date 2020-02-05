// <script type="text/javascript">
// function PopUp(){
//         document.getElementById('ac-wrapper').style.display="none";
// }
// </script>

var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox://styles/craftykeith/cjhi12pri00ty2rpb1ki6kjs2'
    id: 'mapbox/streets-v10',
    accessToken: 'pk.eyJ1IjoiY3JhZnR5a2VpdGgiLCJhIjoiY2s1aGp5bHV5MDRrdjNqbW41dDE0enEybyJ9.st8ZnB2PCZ17FSVTLcZQtg',
}).addTo(map);
//https://www.liedman.net/leaflet-routing-machine/api/
var control = L.Routing.control({
    waypoints: [
      null
        // L.latLng(47.246587, -122.438830),
        // L.latLng(47.258024, -122.444725),
        // L.latLng(47.318017, -122.542970),
    ],
        geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiY3JhZnR5a2VpdGgiLCJhIjoiY2s1aGp5bHV5MDRrdjNqbW41dDE0enEybyJ9.st8ZnB2PCZ17FSVTLcZQtg'),
    units:'imperial',
    collapsible: true,
    show: false,
    router: L.Routing.mapbox('pk.eyJ1IjoiY3JhZnR5a2VpdGgiLCJhIjoiY2s1aGp5bHV5MDRrdjNqbW41dDE0enEybyJ9.st8ZnB2PCZ17FSVTLcZQtg'),
     routeWhileDragging: true

}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);
        L.DomEvent.on(startBtn, 'click', function() {
            control.spliceWaypoints(0, 1, e.latlng);
            map.closePopup();
        });
        L.DomEvent.on(destBtn, 'click', function() {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    control.show();
    map.closePopup();
});
    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
 });
 function onLocationFound(e) {
    var radius = e.accuracy; //this defines a variable radius as the accuracy value returned by the locate method divided by 2. It is divided by 2 because the accuracy value is the sum of the estimated accuracy of the latitude plus the estimated accuracy of the longitude. The unit is meters.

    L.marker(e.latlng).addTo(map)  //this adds a marker at the lat and long returned by the locate function.
        .bindPopup("You are here!").openPopup(); //this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number.
}

map.on('locationfound', onLocationFound); //this is the event listener
map.locate({setView: true, maxZoom: 16});
