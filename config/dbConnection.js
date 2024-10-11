const mongoose = require('mongoose');

function dbConnect(){
    try{
            mongoose.connect(process.env.DB_URL)
            .then(()=>{
                console.log('Great connected with DB 😊')
            })
    }catch{
        console.log('Failed to Connect', error)
    }
}
module.exports = {dbConnect}; 

// give backend for this form give controller model route and index.js file code for this give updated code 
