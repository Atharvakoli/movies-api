const express = require('express');
const cors = require('cors');
const { getAllMovies, getMovieById } = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CI-CD pipelines HW_1');
});

app.get('/movies', async (req, res) => {
  let movies = getAllMovies();
  res.status(200).json({ movies });
});

app.get('/movies/details/:id', async (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  res.status(200).json({ movie });
});

module.exports = { app };
