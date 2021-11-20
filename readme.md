# perfectPet 🐶

perfectPet is an app to help someone that would like to adopt a pet with special needs. There are all types of pets in all types of species and all of them are CUTE!

### Tech stack

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

![16C3D974-239F-4425-81CA-A83825930BA0](https://user-images.githubusercontent.com/78924263/142742374-5d60a3f8-c452-4b98-9f73-935ddcfe758c.jpeg)

## API Call

- In the PetFinder API first a call to recieve a token is required and with that token then the API can be called to get back information requested.

- To get the token I need to use my API key indicated below as petFinderKey and a Secret ID given to me by PetFinder.com indicated below as petFinderSecret and then use a specific API call url for the token.
- Once I have gotten the repsonse from the API for the token then I have to make another call for the information I want to get about the animals. In geting that information I need to put header information for the call which is used for authorization.
- In the URL shown below int he API URL is using query parameters that only gives me infotmaiton for animals with specials needs and on the page can render up to 100 animals.
- I put all of the header infomation with the token into a veriable named options and then I am using axios again to finally call the API for the information
- That infomation is being rendered on the animalIndex page where after the user signed in they see all of the animals with the query parameters before entering a zipcode

     ``` js
          let gettingToken = `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSecret}`
          axios.post(`https://api.petfinder.com/v2/oauth2/token`, gettingToken)
          .then(accessToken => {
               const header = "Bearer " + accessToken.data.access_token;
               const options = {
                    method: 'GET',
                    headers: {'Authorization': header},
                    url: "https://api.petfinder.com/v2/animals?special_needs=true&limit=100"
               }
          axios(options)
          .then((response) => {
               let animals = response.data.animals
                    res.render('animalsIndex', {animals: animals})  
               
               })
          })
          .catch(error => {
               console.log(error)
          })
     ```

- The other API calls looked similar to the over above except for the query paramters in the API url based on zip code the user entered and specific animal ID that the user clicked.

## How To Use

- NavBar - On everypage there is a navbar that the user would be able to press the links throughout the site to go back to another back or even log out.
- Home Page: A short description on what the website is about with a login and sign up button. To use the website you must log in or sign up.
- Login/Sign Up Page: Showing a form with name, email and password so that the user can get into using the website.
- AnimalIndex Page: showing a form that the user can put in the zipcode and a grid of animals from the API call without any specifications except for special needs and 100 animals per page. Each animal has an 'Add to favorites' button that regardless of the animal being in the users zipcode or not they can favorite it to see more information about the animal.
- AnimalResults Page: Showing a grid of animals from the API call with the specifications special needs, 100 animals per page and by the zipcode the user entered.
- Favorited Pet/Profile Page: Once the user presses the 'add to favorites' button that animal will appear on the 'favorited pet'/profile page. On this page there is a grid of animals infomation where the user can click on the animals name to show more information on the animal. Where they will go to another page, below each animals information there is a delete button that if the user perfers not to adopt or research more about the animal they will be removed from the 'favorited pet'/profile page.
- AnimalDetail Page: Shows the information(breeed, species, gender, etc.) of the animal that the user added to the 'favorited pets' page, when the user clicks the animals name. The user can also make comments to themselves about this animal for example, 'If I adopt them, they need to be neutered'. The comments can also be deleted or edited by the user.

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