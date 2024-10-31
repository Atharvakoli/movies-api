let request = require('supertest');
let { getAllMovies } = require('../controllers');
let http = require('http');
let { app } = require('../index');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllMovies: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Functions Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should be able to return list of movies', () => {
    let mockMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getAllMovies.mockReturnValue(mockMovies);

    let movies = getAllMovies();
    expect(movies).toEqual(mockMovies);
    expect(movies.length).toBe(3);
  });

  describe('API Endpoints Tests', () => {
    it('GET /movies should get all movies', async () => {
      let res = await request(server).get('/movies');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        movies: [
          {
            movieId: 1,
            title: 'Inception',
            genre: 'Sci-Fi',
            director: 'Christopher Nolan',
          },
          {
            movieId: 2,
            title: 'The Shawshank Redemption',
            genre: 'Drama',
            director: 'Frank Darabont',
          },
          {
            movieId: 3,
            title: 'The Godfather',
            genre: 'Crime',
            director: 'Francis Ford Coppola',
          },
        ],
      });
      expect(res.body.movies.length).toBe(3);
    });

    it('GET /movies/details/:id should return details of specified id', async () => {
      let res = await request(server).get('/movies/details/2');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        movie: {
          movieId: 2,
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          director: 'Frank Darabont',
        },
      });
    });
  });
});
