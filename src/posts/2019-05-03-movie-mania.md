---
title: "Project Review: Movie Mania"
date: "2019-05-03"
description: React/Redux web app to scan new releases, trending movies, and top rated films of all time.
---

## Movie Mania

**May 3, 2019**

Have you checked out [IMDB](https://www.imdb.com/) lately? There's a ton of content that can be overwhelming at times, especially if you are simply looking to check out the details of a movie. With a goal to create a site that provides easier access to movie information, alongside a desire to sharpen my Redux knowledge, I decided to build [Movie Mania](https://movie-mania.netlify.com/).

Placeholder - gif overview of movie mania

###Movie DB API and data fetching

Movie Mania is made possible through the amazing [Movie Database API](https://www.themoviedb.org/documentation/api), a public API with loads of information on past and current movies. The API is free to use once you register for an account and request an API key.

Five endpoints are used in Movie Mania:

1. [Discover](https://developers.themoviedb.org/3/discover/movie-discover) - to fetch movies based on their popularity, release date, ratings, genre, actors, and more
2. [Trending](https://developers.themoviedb.org/3/trending/get-trending) - to fetch movies that are trending for the current week
3. [Movie](https://developers.themoviedb.org/3/movies/get-movie-details) - to fetch primary details of a selected movie and corresponding credits of that movie
4. [Search](https://developers.themoviedb.org/3/search/search-movies) - to fetch movies that result from a user search
5. [Person](https://developers.themoviedb.org/3/people/get-person-details) - to fetch details of a selected cast member from a movie

[Axios](https://github.com/axios/axios) is used to perform the data fetchng, which has a particularly nice feature of automatically converting responses to JSON. Axios can be installed with:

`npm install --save axios`

Once installed, we create a MovieDB-specific files to store our Axios instance with a custom baseURL in it. While only one API is used in this app, creating a separate subdirectory like /src/apis to store various Axios instances scales nicely when multiple APIs are invoked.

**/apis/moviedb.js**

<!-- prettier-ignore -->
```javascript
import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});
```
