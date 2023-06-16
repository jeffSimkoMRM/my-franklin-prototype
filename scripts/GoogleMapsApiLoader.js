// A class that loads the Google Maps API and resolves a promise when it's loaded.

class GoogleMapsApiLoader {
  // Constructor that takes an API key as a parameter and initializes some properties.
  constructor(apiKey) {
    this.apiKey = apiKey; // Store the API key in an instance variable.
    this.callbackName = '_GoogleMapsApiLoader.mapLoaded'; // Name of the callback function that will be called when the script is loaded.
    this.promise = null; // Promise that will be resolved when the script is loaded.
  }
  
  // Method that loads the script.
  load() {
    // If the promise has already been created, return a resolved promise.
    if (this.promise) {
      return Promise.resolve();
    }
  
    // Otherwise, create a new promise that resolves when the script is loaded.
    this.promise = new Promise((resolve, reject) => {
      // If the Google Maps API has already been loaded, resolve the promise and return early.
      if (typeof window.google !== 'undefined') {
        resolve();
        return;
      }
  
      // If the Google Maps API hasn't been loaded yet, create a script element that loads it.
      const script = document.createElement('script');
      script.src = `//maps.googleapis.com/maps/api/js?callback=${this.callbackName}`; 
      // script.src = `//maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`; // Set the source of the script to the Google Maps API URL with the API key and callback name.
      script.async = true; // Set the async attribute of the script to true.
      
      // Add cluster script
      const script2 = document.createElement('script');
      script2.src = `//unpkg.com/@googlemaps/markerclusterer@2.2.3/dist/index.min.js`;
      script2.async = true; // Set the async attribute of the script to true.
  
      // Set a global _GoogleMapsApiLoader object with the mapLoaded property set to the resolve function of the promise.
      window._GoogleMapsApiLoader = {
        mapLoaded: resolve,
      };
  
      // Set an onerror event handler to reject the promise if the script fails to load.
      script.onerror = reject;
  
      // Append the script to the body of the document.
      document.body.appendChild(script);
      document.body.appendChild(script2);
    });
  
    return this.promise; // Return the promise that will be resolved when the script is loaded.
  }
}

export default GoogleMapsApiLoader; // Export the class. 