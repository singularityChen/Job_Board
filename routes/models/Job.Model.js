const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJob() {
    return JobModel.find().exec();
}

function getUserJob(username) {
    return JobModel.find({ user: username }).exec();
}

function getJob(job) {
    return JobModel.find({ "job": { "$regex": job, "$options": "i" } }).exec();
}

function findJobById(id) {
    return JobModel.find({ _id: id }).exec();
}

function deleteJob(id) {
    return JobModel.deleteOne({ _id: id });
}

function editJob(id, job, user, company, location, description, email, website) {
    return JobModel.findByIdAndUpdate(id,
        {
            $set: {
                job: job,
                user: user,
                company: company,
                location: location,
                description: description,
                email: email,
                website: website,
            }
        });
}

module.exports = {
    insertJob,
    getUserJob,
    getAllJob,
    findJobById,
    editJob,
    deleteJob,
    getJob,
};