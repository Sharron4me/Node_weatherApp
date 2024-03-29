 const request = require('request');

 const forecast=(lat,long,callback)=>{
   const darkskyurl = 'https://api.darksky.net/forecast/'+SOME_API_KEY_HERE+'/' + lat + ','+ long + '?units=si';
   //console.log(darkskyurl);
   request({url:darkskyurl,json:true},(error,response)=>{
     if(error)
     {
       callback('error',undefined);
     }
     else if (response.body.error) {
        callback('Unable to find location ',undefined);
     }
     else {
        callback(undefined,"It is currently " + response.body.currently.temperature+" degree celsius out there.<br>There is "+(response.body.currently.precipProbability)*100+" percent chance of precipitation.");
        //callback(undefined,response.body.timezone);
     }
   });
 }
module.exports = forecast;
