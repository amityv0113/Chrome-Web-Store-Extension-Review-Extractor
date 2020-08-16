var CronJob = require('cron').CronJob;

const Client = require('pg').Client

const sql = require('sql');

const chromeWebStoreReview= require('./Latest_chrome_reviews')

// to store users 

let database_array =[]

// how data base schema look like 
let User = sql.define({

    name: 'reviews',
    columns: [
      'id',
      'user_id',
      'name',
      'rating',
      'review',

    ]
});

// to connect to database 

const client  = new Client({
    user:'amityv0113',
    password:'amityv0113',
    database:'ChromeReviews'
})


// this execute function is used to insert user in data base 

const execute = async (array) => {

    try 
    {
        
        let query = User.insert(array).returning(User.id).toQuery();
        
        let {rows} = await client.query(query);
        // console.log(rows);
        const result  =await client.query('select * from reviews')
        console.table(result.rows)
        


    }
    catch(error)
    {
        console.log('error '+error)
    }
    

}



// job function is used to execute code every 2 min


const id_of_extension ='nckgahadagoaajjgafhacjanaoiihapd'

var job = new CronJob('*/2 * * * *', async function() {

    const l = chromeWebStoreReview(id_of_extension)

    l.then((result)=>{

        
        // console.log(result.fiveStarReviews)

        let users_that_get_credit = []

        for (var i=0 ; i<result.fiveStarReviews.length ; i++)
        {
        
            let count =0
            for (var j=0 ;j< database_array.length ; j++)
            {
                if ( result.fiveStarReviews[i].name === database_array[j].name && result.fiveStarReviews[i].id===database_array[j].id )
                {
                    count++
                }
            }
            if (count===0)
            {
                users_that_get_credit.push(result.fiveStarReviews[i])
            }

        }



        for (var i=0 ;i<users_that_get_credit.length ; i++)
        {
            database_array.push(users_that_get_credit[i])
        }

        // count_time=count_time+2
        // console.log('--------------------------')
        // console.log('users that need credit ')

        // console.log(users_that_get_credit)

        // console.log('data base ')
        // console.log(array)
        
        if (users_that_get_credit.length!==0)
        {
            console.log(users_that_get_credit.length)
            execute(users_that_get_credit)
        }
        else
        {
            console.log('zero New reviews')
        }

        

    })
    .catch((error)=>{

        console.log(error)
    })


    
}, null, true, 'America/Los_Angeles');
  
  


const connect_to_database = async ()=>{

    try 
    {
        await client.connect()
        console.log('connected to postgres ')
        job.start();

    }
    catch(error)
    {
        console.log('not able to connect to database!')
    }
    
    
}

connect_to_database()




