var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * So if we're here someone sent a GET request to the server at the route '/test-get', so either localhost:3000/test-get, or dayvid.com/test-get if we put it on a server with that url
 * Browsers by default send a GET request when you type a URL, so google.com sends a GET to google at the / route
 * GET requests are for exactly what they sound like, to get data. These requests shouldn't cause side effects
 * GET requests also usually don't have a body, you can technically send one but there's a lot of debate on if you should ever check for one
 * The standard for having different options on how data is sent back on a GET endpoint is with Query String Parameters
 * This is a good read, some of it you might know, a lot you probably wont: https://launchschool.com/books/http/read/what_is_a_url 
 */
router.get('/test-get', (req, res, next) => {
    // the variables req, res, and next are passed in by Express whenever the routes we define are hit, we can log them to look at them
    // TODO: Figure out why these logs dont want to work
    console.log(`Request variable: ${req}`)
    console.log(`Response log: ${res}`)

    // at this point just send back a response with some data in it, that way you'll see how you send stuff back
    let responseObject = {
        currentTime: Date.now(),
        status: 200,
        data: {
            motd: "Joe Rogan is cracked on Fortnite",
            someField: 12345
        }
    }

    // Now send the response back to the person that made the request, and they can do whatever they want with the data
    res.json(responseObject)
})

/**
 * POST requests are sent to either take some action or to make new data, like sending a request to make a new user and store their data, or start some kind of job
 * POST techincally is supposed to be used to make NEW data, but sometimes you can send a post to just update data as well
 * POST requests have some kind of body with them, usually the data the requester wants saved, authentication, extra data the endpoint might need
 * POST endpoints can also use query params
 */
router.post('/test-post', (req, res, next) => {
    // Since we don't have a database right now or want to write to local files at the moment, just take a number, and send it back with number + 1
    // When you set up POST endpoints you should be expecting certain data and validating that that data is there and valid.
    // People sending the requests should be aware of the query params and needed structure
    // You as an API maker should be providing documentation that explains what is available on an endpoint, and we will want some way of doing that we can reference 
    // for now it's fine to just comment it here since it's just us
    let body = req.body

    // Expect an object, with a field called number, we will validate that the field is there, and a number was actually sent
    let numberFromRequest = body.number // If you end up looking at resources on object in JS, sometimes you'll see this done as 'body[number], there are some advantages to it, don't worry about it for now

    // Check if the data we got from the body is 1) actually there, 2) actually a number
    // If it isn't send back a 400 status, which means bad request
    if (numberFromRequest === undefined || typeof numberFromRequest !== 'number') {
        // There are multiple ways to format and send a response, this is just from a quick look at their documentation: http://expressjs.com/en/api.html#res
        // Set the status code to 400, and send a response, the 'reason' field doesn't always need to be so detailed but it helps here. Sometimes you don't actually want to be detailed in responses
        res.status(400)
        res.json({
            status: 400, // Also don't always need to put the status in the response body, it tends to vry from place to place
            reason: `Invalid message sent. Was expecing field 'number' with type number, but got type: ${typeof numberFromRequest}, value: ${numberFromRequest}`
        })

        return;
    }

    // Send it back
    res.json({
        status: 200, // 200 responses mean OK, server got the request and the endpoint was successful (usually, sometimes things run out of sync and you'll get a 200, but not see the result yet, this is called eventual consistency)
        new_number: numberFromRequest + 1
    })
})

router.post('/test-pog', (req, res, next) => {
    let body = req.body
    
    let emoteFromRequest = body.emote
    let numberFromRequest = body.number

    if (numberFromRequest === undefined || typeof numberFromRequest !== 'number') {
        // There are multiple ways to format and send a response, this is just from a quick look at their documentation: http://expressjs.com/en/api.html#res
        // Set the status code to 400, and send a response, the 'reason' field doesn't always need to be so detailed but it helps here. Sometimes you don't actually want to be detailed in responses
        res.status(400)
        res.json({
            status: 400, // Also don't always need to put the status in the response body, it tends to vry from place to place
            reason: `Invalid message sent. Was expecing field 'number' with type number, but got type: ${typeof numberFromRequest}, value: ${numberFromRequest}`
        })

        return;
    }
    if (!isFieldValid(emoteFromRequest, 'string')) {
        // There are multiple ways to format and send a response, this is just from a quick look at their documentation: http://expressjs.com/en/api.html#res
        // Set the status code to 400, and send a response, the 'reason' field doesn't always need to be so detailed but it helps here. Sometimes you don't actually want to be detailed in responses
        res.status(400)
        res.json({
            status: 400, // Also don't always need to put the status in the response body, it tends to vry from place to place
            reason: `Invalid message sent. Was expecing field 'emote' with type string, but got type: ${typeof emoteFromRequest}, value: ${emoteFromRequest}`
        })

        return;
    }
    let emoteToSend;

    if (emoteFromRequest === 'pogchamp') {
        emoteToSend = 'Pog'
    }
    else if (emoteFromRequest === 'weirdchamp') {
        emoteToSend = '4Weird'
    }
    else if (emoteFromRequest === 'jakechamp') {
        emoteToSend = 'Cringe'
    }
    else {
        emoteToSend = `${emoteFromRequest} is not a valid emote`
        res.status(400)
        res.json({
            status: 400, // Also don't always need to put the status in the response body, it tends to vry from place to place
            reason: `Invalid message sent. Was expecting a good emote`
        })
    }

    res.json(
        {
        new_emote: emoteToSend,
        new_number: numberFromRequest + 1
        }
    )


    /*
    Helper functions
    */

    function isFieldValid(fieldToValidate, expectedType) {
        return fieldToValidate !== undefined && typeof fieldToValidate === expectedType
    }



})


module.exports = router;