"use strict";
const map = L.map('map').setView([51.25490467237197, 4.53515883042842], 13);
L.tileLayer('https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=SDPkk4ZkeosQ7zntL0m1', {
    attribution: '<<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

const logoIcon = L.icon({
    iconUrl: '/assets/images/logo-blue.png',
    iconSize: [40, 40],
});
const logoIcon2 = L.icon({
    iconUrl: '/assets/images/logo-bruin.png',
    iconSize: [40, 40],
});
const marker = L.marker([51.25788926578986, 4.508677381507705], {icon: logoIcon}).addTo(map);
marker.bindPopup("<b>Sander's Figures Factory</b><br>Come visit us here!<img src='/assets/images/factory_map.png' style='width:1000px; margin-top:10px;'>").openPopup();
const marker2 = L.marker([51.263, 4.54], {icon: logoIcon2}).addTo(map);
marker2.bindPopup("<b>Sander's Figures Store</b><br>Our shop is located here!<br>").openPopup();
