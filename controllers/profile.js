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
    const data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    db.favePet.create({
        animalId: data.id,
        name: data.name,
        status: data.status,
        age: data.age,
        breed: data.breed,
        gender: data.gender,
        image: data.image,
        descrption: data.descrption,
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

router.get('/:animal_id', (req, res) => {
    db.favePet.findOne({
        where: {animalId: req.params.animal_id}
    })
})

module.exports = router