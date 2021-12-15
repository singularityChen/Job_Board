const express = require('express');
const router = express.Router();
const FavoriteAccessor = require('./models/Favorite.Model');

router.get('/findAll', function (request, response) {
    return FavoriteAccessor.getAllFav()
        .then(favoriteResponse => response.status(200).send(favoriteResponse))
        .catch(error => response.status(400).send(error))
})

router.post('/createFav', (request, response) => {
    const { job, jobid, user, company, location, description, email } = request.body;

    if (!job || !jobid || !user || !company || !location || !description || !email) {
        return response.status(422).send("Missing data");
    }


    FavoriteAccessor.insertFavorite(request.body)
        .then(favoriteResponse => response.status(200).send(favoriteResponse))
        .catch(error => response.status(400).send(error))

})

router.get('/getFavJob/:user', function (request, response) {
    const username = request.params.user;
    return FavoriteAccessor.getFavJob(username)
        .then(favoriteResponse => response.status(200).send(favoriteResponse))
        .catch(error => response.status(400).send(error))
})

router.delete('/delete/:id/:user', function (request, response) {
    const id = request.params.id;
    const user = request.params.user;
    return FavoriteAccessor.deleteFavJob(id, user)
        .then(favoriteResponse => response.status(200).send(favoriteResponse))
        .catch(error => response.status(400).send(error))
})

router.delete('/deleteJob/:jobid', function (request, response) {
    const jobid = request.params.jobid;

    return FavoriteAccessor.deleteFavbyJobid(jobid)
        .then(favoriteResponse => response.status(200).send(favoriteResponse))
        .catch(error => response.status(400).send(error))
})

router.put('/editFav/:jobid', (request, response) => {

    const jobid = request.params.jobid;

    const { job, company, location, description, email, website } = request.body;

    if (!job || !company || !location || !description || !email) {
        return response.status(422).send("Missing data");
    }


    FavoriteAccessor.editFav(jobid, job, company, location, description, email, website)
        .then(favoriteResponse => response.status(200).send(favoriteResponse))
        .catch(error => response.status(400).send(error))

})

module.exports = router;