const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const JobAccessor = require('./models/Job.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

// Returns all known user
router.get('/findAll', function (request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })
        .catch(error => response.status(400).send(error))
})

router.get('/whoIsLoggedIn', auth_middleware, function (request, response) {
    const username = request.username;
    //console.log(request.session);
    return response.send(username);

})

router.get('/logOff', auth_middleware, function (request, response) {
    const payload = { username: null };

    const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
        expiresIn: '14d',
    });

    return response.cookie('huntersCookie', token, { httpOnly: true }).status(200).send("log off");


})


router.get('/:username', (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("User not found");
            }

            response.send(userResponse)
        })
        .catch((error) => response.status(500).send("Issue getting user"))


})

router.post('/authenticate', function (request, response) {
    let { username, password } = request.body;
    //password = JSON.stringify(password);

    //console.log(password);

    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }

            console.log(password);
            console.log(userResponse.password);

            if (userResponse.password == password) {

                const payload = { username: username };

                const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
                    expiresIn: '14d',
                });

                //request.session.username = username;

                return response.cookie('huntersCookie', token, { httpOnly: true }).status(200).send({ username });
                //return response.status(200).send({ username });

                //return response.status(200).send("User is logged in!")
            } else {
                return response.status(404).send("No user found with that password");
            }
        })



        .catch((error) => console.error(`Something went wrong: ${error}`));


})


router.post('/', function (req, res) {
    const { password, password2, username } = req.body;
    // const username = req.body.username
    // const password = req.body.password
    console.log(req.body)
    if (!username || !password || !password2) {
        return res.status(422).send("Missing username: " + username + "or password" )
    }

    if (password !== password2) {
        return res.status(422).send("The confirm password doen not match." )
    }

    return UserModel.insertUser({ username, password })
        .then((userResponse) => {
            return res.status(200).send(userResponse);

        })
        .catch(error => res.status(400).send(error))

});

router.put('/favorite', auth_middleware, function (request, response) {
    const username = request.username;
    const id = request.body.id;
    console.log(request.body.id);

    return UserModel.favorite(username, id)
        .then(response.status(200).send("add to " + username + " favorites!"))
        .catch(error => response.status(400).send(error))


})

router.put('/unfavorite', auth_middleware, function (request, response) {
    const username = request.username;
    const id = request.body.id;
    console.log(request.body.id);

    return UserModel.unfavorite(username, id)
        .then(response.status(200).send("remove from " + username + " favorites!"))
        .catch(error => response.status(400).send(error))


})

router.get('/findFavorite/:username', (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("User not found");
            }

            response.send(userResponse.favorites);
        })
        .catch((error) => response.status(500).send("Issue getting user"))


})

// router.put('/favorite/:id', (request, response) => {

//     const id = request.params.id;

//     const job = JobAccessor.findJobById(id);

//     console.log(job);

// })

module.exports = router;