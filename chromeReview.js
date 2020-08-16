var request_promise = require('request-promise');


var CronJob = require('cron').CronJob;


// this is chromeReview function which return promise as object  total reviews of the extension and total fiveStarRating 
// this take single argument as extension id 
// when you run the code with node <filename> you can see in terminal that each api gives
// 175 reviews and  at the end of code you will find object which contain total reviews which can be more then 4000 and fiveStarReviews array
// many poplular extension like google translate and grammerly have only 4000 reviews which I have checked manually 
// if 22th api gives 175 reviews then there must be chance that extension have more reviews then result 
// if any api gives less then 175 like 76 or 81 then this is the last API we should break the loop this is the main logic


let chromeReview = (extension_id) => {


  return new Promise(async (resolve, reject) => {

    //this array is used to store reviews 
    let answer = []

    //users with 5 star rating 

    let array_of_users_fiveStar_rating = []

    //

    let index_of_arr_api_that_worked =[]

    //array of api there are total 22 API's
    arr_api = [{
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso&_reqid=977124&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%5D%2C1%2C%5B2%5D%2Ctrue%5D&t=AHUv8HH9QcX90tIJHl6prvtSXz9gXsCYEw%3A1594310121240&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=5377124&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAKng%2F5xaR5ielp7Fz8%2FPz8%2FPyszKm82emZ7GnsXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QrwEhZ6WjQTRLWe8xelcimLLXYVo5uKVjAB9W%2F%2F9QAFoLCfuIHGafkPRjEANgqfHw8gMyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HH9QcX90tIJHl6prvtSXz9gXsCYEw%3A1594310121240&'

      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=9277124&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KoQBCkb3AACpiP9Qo4WYnpaexc%2FPz8%2FPz8acm8ydnMnJncrFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEMUCIWelo0E0S1nvMQR%2BYkHxD1rwMS6gRHa7K6GFOXpcrwB3Vv%2F%2FUABaCwnIotDS1TXFOhADYKnx8PIDMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HH9QcX90tIJHl6prvtSXz9gXsCYEw%3A1594310121240&'

      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=11877124&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAKlt%2FoMEGZielp7Fz8%2FPz8%2FPzs7LnM6ZyMfPy8XOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4Q9AMhZ6WjQTRLWe8xMv0Vf0gu50Y55vt8AZJW%2F%2F9QAFoLCcii0NLVNcU6EANgqfHw8gMyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HH9QcX90tIJHl6prvtSXz9gXsCYEw%3A1594310121240&'

      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=10102605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAKau%2FuCnIJielp7Fz8%2FPz8%2FPy5yaxp3Jms2Zy8XOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QowUhZ6WjQTRLWe8xtld84luMfsA531gfAVFZ%2F%2F9QAFoLCap%2FdAk7UP2%2FEANg6%2BukxAMyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'

      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=13602605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KoQBCkb3AACmO%2F6mk9mYnpaexc%2FPz8%2FPz5qdzMnKmsjGyJvFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BENIGIWelo0E0S1nvMZmSahtDXMB%2FMUeE%2FfQLKPJeOSZsWQHEWf%2F%2FUABaCwlRswLEUjGSWhADYOvrpMQDMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'

      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=16602605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KoQBCkb3AACl8f5bh0uYnpaexc%2FPz8%2FPz8fMzZnHy5vPysjFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEIEIIWelo0E0S1nvMXeeF6ComPcgMYgh59z9KnOGObR4pAEOWv%2F%2FUABaCwlZmLQ9c6cechADYOvrpMQDMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=19902605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KrEBCkb3AACluP5g6f2Ynpaexc%2FPz8%2FPz8bLmsfPzJ2ex8rFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BELAJIWelo0E0S1nvMZWIDx6EnUOmMeVdetkJQ1IaMTxh4Ic0IcOnMdfxUzFIqXpgMeHw26u1E41YMY%2ByKLyE0gvtMSDBG9G7IOFBOQIWnwFHWv%2F%2FUABaCwkLiPYnCpfCPxADYOvrpMQDMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=40602605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KoICCkb3AAClmf982iyYnpaexc%2FPz8%2FPz82bzcjPx5rGm57FzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEN8KIWelo0E0S1nvMcl7GaV5tsNBMQyC0pOQu69BMcuUBIQih%2BkZMfSbLNIn53A5MVQKaQkZt%2B%2F2MXkKUgAO4Gj8MQnL3a86kdWGMVRnbxjyJvG2MUu%2FTDGJBfVTMYE6I7g6%2BCDKMcHEOexiUlQGMfpt4prpqbMjMZB6WF4YLhFVMbOPVKSHCozgMUKB3wKqHTcWMT1j1n8Eh%2FgYOdMlgwBmWv%2F%2FUABaCwkFvj3uae%2FTWRADYKD9utUEMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=43602605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAKWO%2F8%2BjxJielp7Fz8%2FPz8%2FPxsyay53KnsjPzcXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QjgwhZ6WjQTRLWe8xHo7wa1B2x7I5O1wwAHFa%2F%2F9QAFoLCQW%2BPe5p79NZEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=46402605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAKU4%2F874Npielp7Fz8%2FPz8%2FPmp2eyM6anJ6bmsXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QvQ0hZ6WjQTRLWe8xic7rqFVXmzY5yQcxAMda%2F%2F9QAFoLCZ6l3n4xxFKGEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=49302605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KsMBCkb3AAChq%2F68y0aYnpaexc%2FPz8%2FPz8%2BeysaazMadx8vFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEOwOIWelo0E0S1nvMUtARCmkMM6xMcVlGRlEBZRYMZM16htF%2BZsYMRgDsREFOa58MazuXC%2F6xoX9MSs8wUXeA0qmMQc1NAbgeUaOMX8zSiPi37RpMRY6IMvSI3AkObk0QwFUXv%2F%2FUABaCwmepd5%2BMcRShhADYKD9utUEMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=52002605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAJXy%2F8Tf%2F5ielp7Fz8%2FPz8%2FPyc%2FNx8zIzsuexsXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QmxAhZ6WjQTRLWe8xSm%2BNimSBSvU5ACA7AA1q%2F%2F9QAFoLCYoQRKp1ZnqZEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=55002605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KoQBCkb3AAB%2Bq%2F5TnvmYnpaexc%2FPz8%2FPz8yZzJvPmcrPnZrFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEMoRIWelo0E0S1nvMRF0OCZSiBkHMaU%2B8fwgSvqDOQZhrAFUgf%2F%2FUABaCwkoWfoSj0nKPhADYKD9utUEMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=57502605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAH4i%2FsnTk5ielp7Fz8%2FPz8%2FPyM7OnZ3HzcvGx8XOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4Q%2BRIhZ6WjQTRLWe8xNe%2Bg9b6iC%2Fc5bCw2Ad2B%2F%2F9QAFoLCShZ%2BhKPSco%2BEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: ' https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=60402605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAG89%2FqvL6Zielp7Fz8%2FPz8%2FPzJyay5vGyM3JmcXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QqBQhZ6WjQTRLWe8xdwG%2BBptkwB05FjRUAcKQ%2F%2F9QAFoLCShZ%2BhKPSco%2BEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=62902605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAG7I%2F%2FMut5ielp7Fz8%2FPz8%2FPzcnLnZzImZzPx8XOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4Q1xUhZ6WjQTRLWe8xwf1E6vwl2yw5SNEMADeR%2F%2F9QAFoLCbK5PUtkit2pEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=65502605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KpYBCkb3AABrNv7RODmYnpaexc%2FPz8%2FPz8mbm5yampmaz8rFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEIYXIWelo0E0S1nvMUS9HP950kxRMQ%2FvFdkq6iHvMdlvlSef%2F44IMSCYBv66niwFOcbHLgHJlP%2F%2FUABaCwmyuT1LZIrdqRADYKD9utUEMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=68002605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAGMi%2Fk7Jx5ielp7Fz8%2FPz8%2FPy5ybzs%2BayM%2BazMXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QtRghZ6WjQTRLWe8xvk8J7boNmds5ODaxAd2c%2F%2F9QAFoLCbK5PUtkit2pEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=70502605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22Ko0BCkb3AAACH%2F9cE2eYnpaexc%2FPz8%2FPz56bzZuZmcnHzcfFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEOQZIWelo0E0S1nvMaTeiAzr3ibXMTolTyuANulzMXH1%2BHvYwWTFOZjsowDg%2Ff%2F%2FUABaCwltuOYIuE%2FTyRADYKD9utUEMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=72902605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22Kp8BCkb3AAABvP6RQIWYnpaexc%2FPz8%2FPz8aaycabmpuZncjFzsWcl42QkpqgiJqdjIuQjZrFxsnKyMrKx8vMzMvPycjMzMjMxv%2F%2BEJMbIWelo0E0S1nvMUHrPR14fQm%2FMUFu%2BVXaZ2DSMbwMAO5qVUpFMY66IO0ccuTHMSdHHN10LNXNOXq%2FbgFD%2Fv%2F%2FUABaCwltuOYIuE%2FTyRADYKD9utUEMhsKGQoXX2F0dHJfZG91YmxlX2N3c19xc2NvcmU%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      },
      {
        url: 'https://chrome.google.com/webstore/reviews/get?hl=en-GB&gl=IN&pv=20200420&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csvp%2Cwtd%2Chap%2Cnma%2Cdpb%2Car2%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Cmac%2Cepb%2Cfcf%2Crma%2Clrc%2Cirt%2Cscm%2Cder%2Cbgi%2Cbem%2Crae%2Cshr%2Cesl%2Cdda%2Cqso%2Cpot%2Cevt&_reqid=75702605&rt=j',
        body: 'login=&f.req=%5B%22http%3A%2F%2Fchrome.google.com%2Fextensions%2Fpermalink%3Fid%3D' + extension_id + '%22%2C%22en%22%2C%5B175%2Cnull%2C%22KnsKRvcAAAE%2B%2Fu9G5Zielp7Fz8%2FPz8%2FPnsabm87Gx83LysXOxZyXjZCSmqCImp2Mi5CNmsXGycrIysrHy8zMy8%2FJyMzMyMzG%2F%2F4QwhwhZ6WjQTRLWe8xSpw4Gxn%2BDww5GrkQAcH%2B%2F%2F9QAFoLCW245gi4T9PJEANgoP261QQyGwoZChdfYXR0cl9kb3VibGVfY3dzX3FzY29yZQ%3D%3D%22%5D%2C1%2C%5B2%5D%5D&t=AHUv8HFtbOVf2jaQhlYgQAtuDdpu7O6BHw%3A1594322001975&'
      }

    ]

    // iteration over each api array 

    for (var j = 0; j < arr_api.length; j++) {


      let options = {
        method: 'POST',
        url: arr_api[j].url,

        headers: {
          'authority': 'chrome.google.com',
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',

          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
        },
        body: arr_api[j].body

      };

      //// using try and catch 

      try {

        // here we are getting value which is long string conaining reviews and rating 
        // we are using async /await to get value 
        let value = await request_promise(options)
        if (!value) {
          console.log('does not find value for ' + j + "th  api")

        } 
        else 
        {
          index_of_arr_api_that_worked.push(j+1)
          //we are getting value therefore we must extract reviews from raw value
          // console.log('ok' + j)
          
          arr_of_reviews_object = []
          const a = value.substring(5)
          const json = JSON.parse(a)
          // console.log(value)
          // console.log(json)

          const array_of_reviews = json[0][1][4]

          for (var i = 0; i < array_of_reviews.length; i++) {

            let obj = new Object()
            obj.name = array_of_reviews[i][2][1]
            obj.rating = array_of_reviews[i][3]
            obj.review = array_of_reviews[i][4]
            arr_of_reviews_object.push(obj)


          }
          // console.log(array_of_reviews.length)
          console.log(j+1+'th API gives : '+arr_of_reviews_object.length+' reviews')



          if (arr_of_reviews_object.length !== 175) 
          {
            for (var k = 0; k < arr_of_reviews_object.length; k++) 
            {
              answer.push(arr_of_reviews_object[k])
              if (arr_of_reviews_object[k].rating===5)
              {
                array_of_users_fiveStar_rating.push(arr_of_reviews_object[k])
              }
            }
            break;

          } 
          else 
          {
            for (var k = 0; k < arr_of_reviews_object.length; k++) 
            {
              answer.push(arr_of_reviews_object[k])
              if (arr_of_reviews_object[k].rating===5)
              {
                array_of_users_fiveStar_rating.push(arr_of_reviews_object[k])
              }
            }


          }

        }

      } catch (error) {

        console.log('request error' + j)
      }

    }
    resolve({totalReview:answer,fiveStarReview:array_of_users_fiveStar_rating,index_of_arr_api_that_worked:index_of_arr_api_that_worked})
    
  })
}


// const extension_id = 'kbfnbcaeplbcioakkpcpgfkobkghlhen'
const extension_id = 'bgdpkilkheacbboffppjgceiplijhfpd'

module.exports = chromeReview



