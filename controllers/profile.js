const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')

router.get('/', isLoggedIn, (req, res)=>{
    db.favePet.findAll()
    .then(faves => {
        res.render('profile', {pets: faves})
    })
    .catch(error => {
        console.log(error)
    })
})

router.post('/addFave', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data', data)
    db.favePet.create({
        name: data.name,
        status: data.status,
        age: data.age,
        breed: data.breed,
        gender: data.gender,
        descrption: data.descrption
    })
    .then(createdFave => {
        console.log('db instance created:', createdFave)
        res.redirect(`/profile`)
    })
})

module.exports = router