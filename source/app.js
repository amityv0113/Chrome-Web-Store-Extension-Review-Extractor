const express = require('express')
const { response } = require('express')

const chromeReview = require('../chromeReview')

var CronJob = require('cron').CronJob;

// const request1 = require('request');

const app = express()


const port = process.env.PORT || 3000

const path = require('path')
const dotenv = require('dotenv');

const file_dir = path.join(__dirname, '../config/dev.env')

dotenv.config({
    path: file_dir
});

var cors = require('cors');

app.use(cors())




app.use(express.json())

app.get('/user/:id',(request,response)=>{
    console.log(request.query.api_key)
    
    const id_of_extension =request.params.id
    // const number_of_reviews = request.params.number

    if (request.query.api_key===process.env.API_KEY)
    {
        let count =0 ;
        var job = new CronJob('*/2 * * * *', function() {
            const l = chromeReview(id_of_extension)
            l.then((result) => {
              // console.log('total 5 star reviews array length :'+val.fiveStarReview.length)
              // console.log(val.fiveStarReview)
            //  console.log('-------------------')
            //   console.log('total reviews array length : '+result.totalReview.length)
            //   console.log(result.index_of_arr_api_that_worked)
              // console.log(val.totalReview)
              count++
              response.send({ans:result,val:count})
           
            })
            
          }, null, true, 'America/Los_Angeles');
          
          
          job.start();
        
           
    }
    else
    {
        response.send({error:'invalid API KEY'})
    }
    
    
    // response.send('hello world')
})

app.get('*', (request, response) => {
    response.send('404 Page')
})


app.listen(port,"0.0.0.0" ,() => {
    console.log('server is up running on port ' + port)
})

