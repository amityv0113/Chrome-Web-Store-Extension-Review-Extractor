const request = require('request');

var request_promise = require('request-promise');



const chromeWebStoreReview = (extension_id)=>{

    return new Promise(async(resolve ,reject)=>{

        let five_star_reviews = []

        const options = {
            
            family: 4,

            method: 'POST',

            url:'https://chrome.google.com/webstore/reviews/get?hl=en&gl=IN&pv=20200420&mce=atf,pii,rtr,rlb,gtc,hcn,svp,wtd,hap,nma,dpb,ar2,ctm,ac,hot,hsf,mac,fcf,rma,lrc,irt,scm,der,bgi,bem,rae,shr,dda,igb,qso,pot,evt&_reqid=1403836&rt=j',
        
            
            headers: {
                'authority': 'chrome.google.com',
                'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
            },
            
            body:'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D'+extension_id+'%22%2C%22en%22%2C%5B175%2C0%5D%2C2%2C%5B2%5D%5D&t=AHUv8HGTtb9fVXZ4YJddPHg5441kGzfNPA%3A1594755233262&'

        }

        try
        {
            let value = await request_promise(options)
            if (!value) 
            {
                reject({error:'does not find value for api'})
      
            }
            else
            {
                
                arr_of_reviews_object = []
                const a= value.substring(5)
                const json = JSON.parse(a)
                


                const array_of_reviews = json[0][1][4]
        
                for (var i=0 ;i<array_of_reviews.length; i++)
                {
                    let obj = new Object()

                    obj.id = array_of_reviews[i][2][0]
                    obj.name = array_of_reviews[i][2][1]
                    obj.rating = array_of_reviews[i][3]
                    obj.review = array_of_reviews[i][4]
                    arr_of_reviews_object.push(obj)
                    if (obj.rating===5 && obj.name!==undefined)
                    {
                        five_star_reviews.push(obj)
                    }
                    // console.log(obj.review)
                    // console.log(array_of_reviews[i])
                }
                
                resolve({totalReviews:arr_of_reviews_object,fiveStarReviews:five_star_reviews})
        
            }

        }
        catch(e)
        {
            reject({error:'not able to make a request to api'})
        }

    })

}

module.exports = chromeWebStoreReview






