const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')

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
    // const reqBreeds = req.body.breeds
    const data = JSON.parse(JSON.stringify(req.body))
    db.favePet.create({
        animalId: data.id,
        name: data.name,
        status: data.status,
        age: data.age,
        // breed: data.breeds.primary,
        gender: data.gender,
        image: data.photos,
        descrption: data.description,
        userId: res.locals.currentUser.id
    })
    .then(() => {
        // console.log('db instance created:', createdFave)
        res.redirect('/profile')
    })
    // res.redirect(`/profile`)
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

router.get('/:animal_id', (req, res) => {
    console.log('this is fave id', req.params.id)
    db.favePet.findOne({
        where: { animalId: req.params.id}
    })
    .then(foundFave => {
        res.render('animalDetail', { name: foundFave.name})
    })
})

module.exports = router