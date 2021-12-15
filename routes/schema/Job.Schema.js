const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    job: String,
    user: String,
    company: String,
    location: String,
    description: String,
    email: String,
    website: String,
    birthday: {
        type: Date,
        default: Date.now,
    },


}, { collection: 'jobs' });