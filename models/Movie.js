const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection: String,
    budget: Number,
    genres: [{ id: Number, name: String }],
    homepage: String,
    id: { type: Number, index: { unique: true }},
    imdb_id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    production_companies: [{ id: Number, logo_path: String, name: String, origin_country: String }],
    release_date: Date,
    revenue: Number,
    runtime: Number,
    spoken_languages: [{ english_name: String, iso_639_1: String, name: String }],
    status: String,
    tagline: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
})

module.exports = mongoose.model('movie', MovieSchema)