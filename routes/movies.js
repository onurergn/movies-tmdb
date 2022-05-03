const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const dotenv = require('dotenv')
const Movie = require('../models/Movie')
dotenv.config('../.env')

const REQUEST_URL = process.env.REQUEST_URL
const DETAIL_URL = process.env.DETAIL_URL
const API_KEY_QP = process.env.API_KEY_QP

getMovies = () => {
  const response = axios.get(REQUEST_URL)
    .then(function (response) {
      return { isSuccessful: true, body: response.data.results }
    })
    .catch(function (error) {
      return { isSuccessful: false, error }
    })

  return response
}

getMoviesId = async () => {
  let moviesId = []
  const response = getMovies()
  await response.then(async (result) => {

    if (result.isSuccessful) {
      result.body.forEach(movie => {

        moviesId.push(movie.id)
      });
    }
  })

  return moviesId
}

getMovieDetail = (movieId) => {
  const url = `${DETAIL_URL}${movieId}${API_KEY_QP}`
  const response = axios.get(url)
    .then(function (response) {
      return { isSuccessful: true, body: response.data }
    })
    .catch(function (error) {
      return { isSuccessful: false, error }
    })

  return response
}

router.post('/movie', (req, res) => {
  const { movieId } = req.query

  const moviesId = getMoviesId()

  moviesId.then((moviesId) => {

    if (moviesId.legth != 0) {

      let checkMovieId = moviesId.find(i => (i == movieId))
      if (checkMovieId != undefined) {

        const response = getMovieDetail(movieId)
        response.then((result) => {
          const data = result.body

          Movie.collection.insertOne(data, (error, data) => {
            if (error) {
              res.status(500).send({ isSuccessful: false, error })

            }
            else {
              res.status(200).send({ isSuccessful: true, body: 'Movie saved' })

            }
          })
        })
      }
      else {
        res.status(404).send({ isSuccessful: false, error: 'Movie Not Found!' })
      }
    }
  })
});

router.get('/movie', (req, res) => {
  const { movieId } = req.query
  if (movieId == undefined) {

    Movie.find({}, (error, data) => {
      if (error) {
        res.status(500).send({ isSuccessful: false, error })
      }
      else {
        res.status(200).send({ isSuccessful: true, body: data })

      }
    })
  }
  else {
    Movie.find({ id: movieId }, (error, data) => {
      if (error) {
        res.status(500).send({ isSuccessful: false, error })
      }
      else {
        res.status(200).send({ isSuccessful: true, body: data })

      }
    })
  }
})

router.delete('/movie', (req, res) => {
  const { movieId } = req.query
  if (movieId) {

    Movie.remove({ id: movieId }, (error, data) => {
      if (error) {
        res.status(500).send({ isSuccessful: false, error })
      }
      else {
        res.status(200).send({ isSuccessful: true, body: `${movieId} ids Movie Deleted` })

      }
    })
  }
  else {
    res.status(400).send({ isSuccessful: false, body: `movieId required` })

  }
})

module.exports = router;
