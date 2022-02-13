const NodeGeocoder = require('node-geocoder');

const { geocode } = NodeGeocoder({
    provider: 'google',
    apiKey: 'YOUR_API_KEY',
  });
   
  (async () => {
    const location = await geocode('29 champs elysée paris');
    
    /** A list of matching locations is returned */
    console.log(JSON.stringify(location));
  })();