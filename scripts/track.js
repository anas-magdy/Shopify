var lat = 26.2540493;
var lon = 29.2675469;

// country.onchange = function () {
//     var request = new XMLHttpRequest();
//     request.open("GET", `https://nominatim.openstreetmap.org/search?format=json&q=${country.value}`)
//     request.send()
//     request.onload = function () {
//         var data = JSON.parse(request.responseText)
//         lat = Number(data[0].lat)
//         lon = Number(data[0].lon)
//         initMap(lat, lon)
//     }
// }

function initMap(lat, lon) {
    const myLatLng = { lat: lat, lng: lon };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: myLatLng,
    });

    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
    });
}
window.initMap = initMap;