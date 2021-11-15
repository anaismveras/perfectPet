const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const petFinderKey = process.env.PET_FINDER_API_KEY
const petFinderSecret = process.env.PET_FINDER_SECRET

function getData () {
    const token = ''
    axios.post('https://api.petfinder.com/v2/animals', {

    }, {
        headers: {

        }
    })
    // const tokenUrl = `'grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSecret}' https://api.petfinder.com/v2/oauth2/token`
    // axios.get(tokenUrl.access_token)
    // .then(apiToken => {
    //     let petFinderUrl = `'Authorization: Bearer ${apiToken}' https://api.petfinder.com/v2/animals`
    //     console.log(petFinderUrl)
    // })
    // console.log(accessToken)
    // axios.get(petFinderUrl)
    // .then(apiRes => {
    //     let animals = apiRes.data.animals
    //     res.send(`this is the type of animals, ${animals}`)
    // })
    // .catch(error => {
    //     console.log(error)
    // })
}

router.get('/', (req, res) => {
    getData()
})

module.exports = router