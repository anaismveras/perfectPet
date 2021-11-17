const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')
const { default: axios } = require('axios');
const petFinderKey = process.env.PET_FINDER_API_KEY
const petFinderSecret = process.env.PET_FINDER_SECRET

router.get('/', isLoggedIn, (req, res)=>{
    db.favePet.findAll({
        where: {userId: res.locals.currentUser.id}
    })
    .then(faves => {
        res.render('profile', {pets: faves})
        // console.log('this is faves', faves)
    })
    .catch(error => {
        console.log(error)
    })
})

router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    db.favePet.create({
        animalId: data.id,
        name: data.name,
        status: data.status,
        age: data.age,
        breed: data.breed,
        userId: res.locals.currentUser.id
    })
    .then((newFavePet) => {
        res.redirect('/profile')
        console.log(newFavePet)
    })
    .catch(error => {
        console.log(error)
    })
})

router.delete('/:id', isLoggedIn, (req, res)=> {
    db.favePet.destroy({
        where: {id: req.params.id}
    })
    .then(deletedItem => {
        // console.log('you deleted', deletedItem)
        res.redirect('/profile')
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/:animal_id', isLoggedIn, (req, res) => {
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