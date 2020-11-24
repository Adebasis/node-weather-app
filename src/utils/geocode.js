const request=require('request')


const geoCode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGViYS1zb251MSIsImEiOiJjanl6bndhN3owMXVrM29xZDZwdTBidzR1In0.2RuGugYCne7Ak8jsi4ymPg&limit=1'
    
    // // General Process
    // request({url:geolocationUrl,json:true},(error,response)=>{

    //      if(error){
    //          callback("Unable to Connect to Geo Location Service",undefined)
    //      }else if(response.body.features.length===0){
    //          callback("Unable to find Location",undefined)
    //      }else{

            
    //         callback(undefined,{
                  
    //             longitude:response.body.features[0].center[0],
    //             latitude:response.body.features[0].center[1], 
    //             Place:response.body.features[0].place_name
    //         })
    //      }

    // })

    // General Process
    request({url,json:true},(error,{ body })=>{

        if(error){
            callback("Unable to Connect to Geo Location Service",undefined)
        }else if(body.features.length===0){
            callback("Unable to find Location",undefined)
        }else{

           
           callback(undefined,{
                 
               longitude:body.features[0].center[0],
               latitude:body.features[0].center[1], 
               Place:body.features[0].place_name
           })
        }

   })
}

module.exports=geoCode