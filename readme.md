# perfectPet 🐶

- Tech stack

Express, Ejs, Ejs-layouts, sequelize, method-override, axios

## Wireframes

![perfectPet (5)](https://user-images.githubusercontent.com/78924263/141401541-6ca5cd12-f41d-429e-848d-b1938128f4b9.png)

![perfectPet](https://user-images.githubusercontent.com/78924263/141401607-1988bd48-033b-4a39-894c-a22cf6bd0aa8.png)

![perfectPet (6)](https://user-images.githubusercontent.com/78924263/141401779-424abb3f-51b5-40c2-8855-34c891c3c76f.png)

![perfectPet (3)](https://user-images.githubusercontent.com/78924263/141401642-7f7d50ca-2654-4b8f-a48a-4e028adef009.png)

![perfectPet (7)](https://user-images.githubusercontent.com/78924263/141534683-953ef406-6216-46fa-94ad-3e03564e66bd.png)
         
## API Link

https://www.petfinder.com/developers/v2/docs/

## ERD

![25EF90CB-F4CB-4689-8F62-D4AA36D509F6](https://user-images.githubusercontent.com/78924263/141535428-b38c2de3-d966-4947-acab-720320a89dea.jpeg)

- Example of how to call/invoke your API, and a description of what data comes back.
     
     - For Searched Animals by zipCode
          ``` js
          // For Searched Animals by zipCode
               app.get('/:location', (req, res) => {
               //will make the call after user puts in zipCode
               let animalsUrl = 'https://api.petfinder.com/v2/animals/${location}';

          axios.get(animalsUrl).then(apiRes => {
               let animals = apiRes.animals
          res.render('locationDetail', {animals});
               })
          }); 
          ```
     - To see information of Favorited Animal
          ```js
               router.get('/:id', (req, res)=> {
               let favePetInfo => req.params.id 
               let animalUrl = https://api.petfinder.com/v2/animals/${id}

          axios.get(animalUrl)
               .then(apiRes => {
                    let petImage = apiRes.animal.photos.medium
                    let petStatus = apiRes.animal.status
                    let petName = apiRes.animal.name
                    let petAge = apiRes.animal.age
                    let petBreed = apiRes.animal.breeds.primary
                    let petGender = apiRes.animal.gender
                    let petDescrption = apiRes.animal.description

          res.render('faveDetail', {petImage, petStatus, petName, petAge, petBreed, petGender, petDescrption})
          })
          .catch(error => {
          console.log(error)
               })
          }) 

          ```
    - Information comeback:
        - For Searched Animals by zipCode - all animals on petfinder API that is in that zip code with the disalibily === true
        - To see information of Favorited Animal - Animal's searched in API by id selected and pet's Image, Adoptablity status, Name, Age(young, adult, senoir), Breed, Gender and a Descrption 

## MVP Goals

- Have users press a button to sign up/login and be put/aknowledged into a data base
- Have users search by city name show pets in that area
- Have users be able to press a button to favorite a pet to be added to a "favorite pets" list
- Have users see their "favorite pets" list and be able to remove animals and see more about an animal by clicking the name
- Use API call to show animal information

## Stretch Goals

- Show ONLY animals with disabilities
- Have User be able to go to the adoption agency website

## Potential Roadblocks

- Not being able to ONLY show special needs pets since in the API it shows as a boolean
- Not being able to get the API to get the write information for the pet
- Not being able to get the CSS to look right