import GoogleMapsApiLoader from '../../scripts/GoogleMapsApiLoader.js';
import { fetchData } from '../../scripts/lib-franklin.js';

async function renderMap(block, users) {
    
    // Create a new div element
    const mapEle = document.createElement('div');
        
    // Add the 'google-map' class to the div element
    mapEle.classList.add('google-map');
    
    // Insert the 'google-map' div 
    block.appendChild(mapEle);
    
    const { Map } = await google.maps.importLibrary("maps");
    
    const map = new Map(mapEle, {
        center: { lat: 39.8097343, lng: -98.5556199 },
        zoom: 4,
    });
    
    let prevInfowindow = false; 
    
    // Create a marker for each user in the JSON object
    const markers = Object.entries(users).map(([id, user]) => {
        // Get the user's latitude and longitude
        const lat = user.latitude;
        const lng = user.longitude;
    
        // Create a new marker
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            icon: {
                // The URL of the custom image
                url: 'https://dev--my-franklin-prototype--jeffsimkomrm.hlx.page/icons/map-pin.png',
            }
        });
        
        // Add a listener to the marker so that when it is clicked, the user's information is displayed in an info window
        marker.addListener('click', () => {
            
            // Close all open info windows
            prevInfowindow && prevInfowindow.close();
             
      
            // Create a new info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                <h3 data-id=${id}>${user.first_name} ${user.last_name}</h3>
                <p>IP address: ${user.ip_address}</p>
                `,
            });
            
            map.setZoom(17);
            map.panTo(marker.position);
    
            // Open the info window when the marker is clicked
            prevInfowindow = infoWindow;
            infoWindow.open(map, marker);
        });
        
        return marker
    });
    
    // use default algorithm and renderer
    setTimeout(() => {
        new markerClusterer.MarkerClusterer({ map, markers });
    }, 500);
}

export default async function decorate(block) {
    
    const dataURL = block.querySelector('a[href$=".json"]').href;
    
    // Remove default html from block
    block.removeChild(block.firstElementChild);
    
    if(dataURL) {
    
        try {
            const userData = await fetchData(dataURL);
            const users = userData.data;
            const gApiKey = '';
            const gmapApi = new GoogleMapsApiLoader(gApiKey);

            gmapApi.load().then(() => {
                renderMap(block, users);
            })
          
        } catch (error) {
            console.error('No JSON found:', error);
        }
    }
}