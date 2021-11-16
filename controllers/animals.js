require('dotenv').config()
const { default: axios } = require('axios');
const express = require('express');
const petFinderKey = process.env.PET_FINDER_API_KEY
const petFinderSecret = process.env.PET_FINDER_SECRET
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
            url: "https://api.petfinder.com/v2/animals?special_needs=true&limit=100"
        }
        // console.log('this is the animals called', options)---gives me an access token
    axios(options)
    .then((response) => {
        let animals = response.data.animals
            res.render('animalsIndex', {animals: animals})  
        })
    })
    .catch(error => {
        console.log(error)
    })

})

router.get('/zipsearch', (req, res) => {
    let zipCode = req.query.zipcode
    console.log('heres the zip', zipCode)
    // console.log('this is req.query', req.query)

    let gettingToken = `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSecret}`
    axios.post(`https://api.petfinder.com/v2/oauth2/token`, gettingToken)
    .then(accessToken => {
        console.log('looking to see wtf is going on')
        const header = "Bearer " + accessToken.data.access_token;
        const options = {
            method: 'GET',
            headers: {'Authorization': header},
            url: `https://api.petfinder.com/v2/animals?special_needs=true&?location=${zipCode}&limit=100`
        }
        axios(options)
        .then((response) => {
            let animals = response.data.animals
            res.render('animalsResults', {animals: animals, zipCode})  
            })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router