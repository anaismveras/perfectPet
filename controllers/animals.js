const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let petFinderUrl = `https://api.petfinder.com/v2/animals`
    axios.get(petFinderUrl)
    .then(apiRes => {
        let animals = apiRes.animals
        res.send(`this is the type of animals, ${animals}`)
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router