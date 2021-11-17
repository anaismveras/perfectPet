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
        // console.log('looking to see wtf is going on')
        const header = "Bearer " + accessToken.data.access_token;
        const options = {
            method: 'GET',
            headers: {'Authorization': header},
            url: `https://api.petfinder.com/v2/animals?special_needs=true&location=${zipCode}&distance=20&limit=100`
        }
        axios(options)
        .then((response) => {
            let animals = response.data.animals
            res.render('animalsResults', {animals: animals, zipCode: zipCode}) 
            console.log(animals[0].name)
            })
        .catch(error => {
            console.log(error)
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
            url: `https://api.petfinder.com/v2/animals?special_needs=true&location=${zipCode}&distance=20&limit=100`
        }
        axios(options)
        .then((response) => {
            let animals = response.data.animals
            res.render('animalsResults', {animals: animals, zipCode: zipCode}) 
            console.log(animals[0].name)
            })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/:animal_id', (req, res) => {
    let animalId = req.params.animal_id

    let gettingToken = `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSecret}`
    axios.post(`https://api.petfinder.com/v2/oauth2/token`, gettingToken)
    .then(accessToken => {
        console.log('looking to see wtf is going on')
        const header = "Bearer " + accessToken.data.access_token;
        const options = {
            method: 'GET',
            headers: {'Authorization': header},
            url: `https://api.petfinder.com/v2/animals/${animalId}?special_needs=true&limit=100`
        }
        axios(options)
        .then((response) => {
            let animalName = response.data.animal.name
            let animalStatus = response.data.animal.status
            let animalImage = response.data.animal.photos[0].large
            let animalSpecies = response.data.animal.species
            let animalAge = response.data.animal.age
            let animalBreed = response.data.animal.breeds.primary
            let animalGender = response.data.animal.gender
            let animalBabies = response.data.animal.attributes.spayed_neutered
            let animalContact = response.data.animal.contact
            let animalHouseTrained = response.data.animal.attributes.house_trained
            let animalShots = response.data.animal.attributes.shots_current
            console.log('this is the name', animalContact)
            res.render('animalDetail', {animalName: animalName, animalStatus: animalStatus, animalSpecies: animalSpecies, animalAge: animalAge, animalBreed, animalGender, animalImage, animalBabies, animalContact, animalHouseTrained, animalShots })
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