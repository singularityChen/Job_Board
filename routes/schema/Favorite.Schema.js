const Schema = require('mongoose').Schema;

exports.FavoriteSchema = new Schema({
    job: String,
    jobid: String,
    user: String,
    company: String,
    location: String,
    description: String,
    email: String,
    website: String,

}, {
    collection: 'favorites'
})