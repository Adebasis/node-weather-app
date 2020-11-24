const request=require('request')


const forecast=(lat,long,callback)=>{
 
    const url="http://api.weatherstack.com/current?access_key=4541c11220091223b7ad02af3b654897&query="+ lat +','+ long +'&units=m'
    // General
    // request({url:url,json:true},(error,response)=>{
   
    //     if(error){
    //         callback("Unble to connect weather service",undefined)
    //     }else if(response.body.error){
    //         callback("Unble to Find location",undefined)
    //     }else{

    //         callback(undefined,response.body.current.weather_descriptions[0] +' '+ chalk.bold.red("Current Tempreture") +' '+ response.body.current.temperature +' '+ chalk.bold.blue("But it feels like") +' '+ response.body.current.feelslike)
    //     }


    // })

    // Object properties Destructuring

    request({url,json:true},(error,{ body })=>{
   
        if(error){
            callback("Unble to connect weather service",undefined)
        }else if(body.error){
            callback("Unble to Find location",undefined)
        }else{

            callback(undefined,body.current.weather_descriptions[0] +' '+ "Current Tempreture" +' '+ body.current.temperature +' '+ "But it feels like" +' '+ body.current.feelslike)
        }


    })
}


module.exports=forecast