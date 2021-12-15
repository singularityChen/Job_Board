const mongoose = require("mongoose")
const FavoriteSchema = require('../schema/Favorite.Schema').FavoriteSchema

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

function getAllFav() {
    return FavoriteModel.find().exec();
}

function insertFavorite(job) {
    return FavoriteModel.create(job);
}

function getFavJob(username) {
    return FavoriteModel.find({ user: username }).exec();
}

function deleteFavJob(jobid, user) {
    return FavoriteModel.deleteOne({
        jobid: jobid,
        user: user
    });
}

function deleteFavbyJobid(jobid) {
    return FavoriteModel.deleteMany({
        jobid: jobid,
    });
}

function editFav(jobid, job, company, location, description, email, website) {
    return FavoriteModel.updateMany(
        {
            jobid: jobid
        },
        {
            $set: {
                job: job,
                company: company,
                location: location,
                description: description,
                email: email,
                website: website,
            }
        });
}

module.exports = {
    getAllFav,
    insertFavorite,
    getFavJob,
    deleteFavJob,
    editFav,
    deleteFavbyJobid
};