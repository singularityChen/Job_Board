const express = require('express');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');

// Returns all known pokemon
router.get('/findAll', function (request, response) {
    return JobAccessor.getAllJob()
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})


router.get('/findUser/:user', function (request, response) {
    const username = request.params.user;
    return JobAccessor.getUserJob(username)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

router.get('/findJob/:job', function (request, response) {
    const job = request.params.job;
    return JobAccessor.getJob(job)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

router.get('/findId/:id', function (request, response) {
    const id = request.params.id;
    return JobAccessor.findJobById(id)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})


router.delete('/delete/:id', function (request, response) {
    const id = request.params.id;
    return JobAccessor.deleteJob(id)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

router.post('/create', (request, response) => {
    const { job, user, company, location, description, email } = request.body;

    if (!job || !user || !company || !location || !description || !email) {
        return response.status(422).send("Missing data");
    }


    JobAccessor.insertJob(request.body)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))

})

router.put('/edit/:id', (request, response) => {

    const id = request.params.id;

    const { job, user, company, location, description, email, website } = request.body;

    if (!job || !user || !company || !location || !description || !email) {
        return response.status(422).send("Missing data");
    }


    JobAccessor.editJob(id, job, user, company, location, description, email, website)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))

})




module.exports = router; // <== Look at our new friend, module.exports!