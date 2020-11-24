const path = require('path');
const express=require('express')
const hbs=require('hbs');
const geoCode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


const app=express()
const port=process.env.PORT || 3000  // for heroku server port

//console.log(__dirname)  // show current directory of the file with path
//console.log(__filename) // show current file name with path
//console.log(path.join(__dirname,'../public'))

// Defining Express Config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,"../templates/views") // To give different name to View Folder
const partialPath=path.join(__dirname,"../templates/partials")


  // Setup Handlebar and View
 app.set("view engine","hbs")
 app.set('views',viewsPath) // To point Express to different path for views
 hbs.registerPartials(partialPath)

// Setup Static Directory to Serve
app.use(express.static(publicPath))

// These are the Routes

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather App',
        name:"Debasis Acharya"
})

})


app.get('/about',(req,res)=>{

    res.render('about',{
         title:"About Us",
         name:"Debasis Acharya"
    })
})

app.get('/help',(req,res)=>{

     res.render('help',{
          title:"Some Help regarding the Site",
          name:"Debasis Acharya"

     })

})


app.get('/weather',(req,res)=>{

     if(!req.query.address){
        return res.send({
            errorMessage:"Address is not provided"
        })
     }
    
     const location=req.query.address


     geoCode(location,(error,{latitude,longitude,place}={})=>{
        if(error){
          return res.send({error})
        }
        forecast(latitude,longitude,(error,dataforecast)=>{

            if(error){
               return res.send({error})
            }
            
            res.send({
                forcasteData:dataforecast,
                location:location 
                       
            })
       })
     
})


     
})



app.get('/help/*',(req,res)=>{

     res.render('404',{
        title:"404",
        message:"There is no Article Available",
        name:"Debasis Acharya"
     })
})

app.get('*',(req,res)=>{
  
    res.render('404',{
        title:"404",
        message:"404 page not found",
        name:"Debasis Acharya"
    })
})

app.listen(port,()=>{
    console.log("Server is running")
})