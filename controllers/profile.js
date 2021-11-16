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
    })
    .catch(error => {
        console.log(error)
    })
})

router.post('/addFave', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    // const reqBreeds = req.body.breeds
    // const dataOther = JSON.parse(JSON.stringify(reqBreeds))
    // console.log('this is breed', req.body.breeds.primary)
    db.favePet.create({
        name: data.name,
        status: data.status,
        age: data.age,
        // breed: dataOther.primary,
        gender: data.gender,
        descrption: data.descrption,
        userId: res.locals.currentUser.id
    })
    .then(createdFave => {
        // console.log('db instance created:', createdFave)
        res.render(`profile`, createdFave)
    })
    // res.redirect(`/profile`)
})

router.delete('/:id', (req, res)=> {
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

module.exports = router