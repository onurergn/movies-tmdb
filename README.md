docker-compose up



----API----

movie IDs to use;

movieId = [ 424, 13, 278, 550, 497, 129, 122, 4953, 155, 496243 ]

@POST
http://localhost:3000/movies/movie?movieId={movieId}

@GET ALL
http://localhost:3000/movies/movie

@GET BY ID
http://localhost:3000/movies/movie?movieId={movieId}

@DELETE
http://localhost:3000/movies/movie?movieId={movieId}
