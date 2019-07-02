const request = require('request');

const geoCode = (address, callback) =>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent( address) +'.json?access_token=pk.eyJ1IjoiYWRpdHlhMjBrdWwiLCJhIjoiY2p4MzBybG5pMDN4czN5cDQycHltaXQzYSJ9.UheGHz2JPknZBTXT5dveHw';
   request({ url : url ,json:true},(error,response)=>{
     if(error)
     {
       callback('unable to connect to services !',undefined);
     }
     else if (response.body.features.length===0) {
       callback('Unable to find the location, try another search ',undefined);
     }
     else{
       callback(undefined,{
          latitude : response.body.features[0].center[1],
          longitude : response.body.features[0].center[0],
          place : response.body.features[0].place_name
       });

       // console.log('Latitude : '+ latitude);
       // console.log('Longitude : '+ longitude);
       // console.log('Place : '+ place);
     }
   });
}
module.exports = geoCode;
