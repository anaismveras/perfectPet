require('dotenv').config()
const { default: axios } = require('axios');
const express = require('express');
const layouts = require('express-ejs-layouts');
const petFinderKey = process.env.PET_FINDER_API_KEY
const petFinderSecret = process.env.PET_FINDER_SECRET
const db = express.Router()
const router = express.Router();



router.get('/', (req, res) => {
    let gettingToken = `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSecret}`
    axios.post(`https://api.petfinder.com/v2/oauth2/token`, gettingToken)
    .then(accessToken => {
        console.log('looking to see wtf is going on')
        const header = "Bearer " + accessToken.data.access_token;
        const options = {
            method: 'GET',
            headers: {'Authorization': header},
            url: "https://api.petfinder.com/v2/animals"
        }
        // console.log('this is the animals called', options)---gives me an access token
    axios(options)
    .then((response) => {
        console.log(response.data)
        })
    })

})

module.exports = router