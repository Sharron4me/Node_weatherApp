const express = require('express');
const path = require('path');
const hbs =require('hbs');
const app = express();
const geocode = require('./geocode');
const forecast = require('./forecast');

const publicdirpath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');

//app.set('views',path.join(__dirname,'../views'));
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

app.use(express.static(publicdirpath));

app.get('',(req,res)=>{
   // res.send('Hello express !');
  res.render('weather',{
      title: 'Weather'
  });
})

// app.get('/weather',(req,res)=>{
//     // res.send({
//     //     location : 'Aurangabad',
//     //     forecast : 'Warm'
//     // });
//     res.render('weather',{
//         title: 'Weather'
//     });
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Provide address'
        });
    }

    // res.send({
    //     forecast : 'Warm',
    //     location: req.query.address
    // })
    else
    {
        geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
         if(error)
         {
             return res.send({error});
         }
         else
         {
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error)
                {
                    return  res.send({error});
                }
                else
                {
                    return res.send({
                        forecast : forecastData,place,
                        address : req.query.address 
                    })
                }
               
            })
         }
        
    })
    }
    
})


app.get('/about',(req,res)=>{
   // res.render('about');
   res.render('about',{
    name: 'Aditya Kulkarni',
    title : 'About Page'
});
})

app.get('/help',(req,res)=>{
    res.render('help');
})
app.get('/help/*',(req,res)=>{
    //res.send("My 404 Page !!!");
    res.render('404',{
        title: '404',
        name : 'Aditya kulkarni',
        errormessage : 'No such data was found in /help'
    })

})
app.get('*',(req,res)=>{
    //res.send("My 404 Page !!!");
    res.render('404',{
        title: '404',
        name : 'Aditya kulkarni',
        errormessage : 'Page not found'
    })

})

app.listen(3000,()=>{
    console.log('Server is up at port 3000');
})
