---
title: "Movie Mania"
date: "2019-05-03"
description: React/Redux web app to scan new releases, trending movies, and top rated films of all time
---

## Movie Mania

<time datetime="2019-05-03">May 3, 2019</time>

Have you visited [IMDB](https://www.imdb.com/) lately? There's a ton of great content, but it can be overwhelming at times, especially if you are simply looking to check out the details of a movie. With a goal of creating a site that provides easier access to movie information, alongside a desire to sharpen my Redux knowledge, I decided to build [Movie Mania](https://movie-mania.netlify.com/).

![Movie Mania Overview](./post-assets/movie-mania-overview.gif)

[View full code](https://github.com/neil-berg/movie-mania)

###App architecture and Redux setup

Movie Mania has a directory structure of:

<!-- prettier-ignore -->
```
/src
  /actions
    index.js
  /apis
    moviedb.js
  /components
    App.js
    ...
  /reducers
    index.js
    ...
  /selectors
    index.js
  index.js
  helper.js
```

Since we're using Redux, separate directories are created to contain our actions, components, and reducers used in the app. Selectors to compute derived data from the Redux store are contained in the selectors directory. Various helper functions (e.g. formatting a film's revenue value) are contained in `helper.js`.

In the root `index.js` file, the Redux store is created and make it accessible to the `App` component and its child components via the `Provider` component from [react-redux](https://github.com/reduxjs/react-redux), the library that binds Redux to React components. Since we'll be making asynchronous API calls, [redux-thunk](https://github.com/reduxjs/redux-thunk) is used as middleware.

Three packages need to be installed to setup the store:

`npm install --save redux react-redux redux-thunk`

**src/index.js**

<!-- prettier-ignore -->
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

```

The `rootReducer` used to create the Redux store is exported from /reducers/index.js and contains the reducing function for the state tree of this application. More on that later in this post.

###Data source, fetching, and processing

####Movie DB API

Movie Mania is made possible through the amazing [Movie Database API](https://www.themoviedb.org/documentation/api), a public API with loads of information on past and current movies. The API is free to use after registering for an account and requesting an API key.

Five endpoints are used in Movie Mania:

1. [Discover](https://developers.themoviedb.org/3/discover/movie-discover) - to fetch movies based on their popularity, release date, ratings, genre, actors, and more
2. [Trending](https://developers.themoviedb.org/3/trending/get-trending) - to fetch movies that are trending for the current week
3. [Movie](https://developers.themoviedb.org/3/movies/get-movie-details) - to fetch primary details of a selected movie and corresponding credits of that movie
4. [Search](https://developers.themoviedb.org/3/search/search-movies) - to fetch movies that result from a user search
5. [Person](https://developers.themoviedb.org/3/people/get-person-details) - to fetch details of a selected cast member from a movie

####Axios setup

[Axios](https://github.com/axios/axios) is used to perform the data fetching, which has a particularly nice feature of automatically converting responses to JSON. Axios can be installed with:

`npm install --save axios`

Once installed, an Axios instance is created for the Movie DB with a baseURL. While only one API is used in this app, creating a separate subdirectory like src/apis to store various Axios instances scales nicely when multiple APIs are invoked.

**/apis/moviedb.js**

<!-- prettier-ignore -->
```javascript
import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});
```

####Action creators

Data fetching is performed in _action creators_. These are functions that return _actions_, which are plain objects that contain at least a "type" property and optionally a "payload". All of the action creators are contained and exported from the /actions/index.js file.

While each action creator differs slightly in the arguments it takes in and URL it fetches, they have a very similar overall structure. We'll demonstrate their structure with the `fetchNowPlayingMovies` action creator, which as the name suggests, fetches movies that are currently playing in theaters.

`fetchNowPlayingMovies` takes in three arguments:

1. startDate - the earliest release date to include in fetched movies
2. endDate - the latest release date to include in fetched movies
3. page - which page of returned results to include (default 1st page)

Since fetching is performed asynchronously, this action creator returns a function rather than an action, as would happen in a synchronous creator. This inner function then uses the [dispatch](https://redux.js.org/api/store#dispatch) method from the Redux store to dispatch an action. In this case, the dispatched action has a type of 'NOWPLAYING_MOVIES' and a payload that is an array of objects from the Movie DB API, where each object is a movie.

**actions/index.js**

<!-- prettier-ignore -->
```javascript
import moviedb from '../apis/moviedb';

export const fetchNowPlayingMovies = (startDate, endDate, page = 1) =>
  async dispatch => {
    dispatch(isLoading());
    const response = await moviedb.get(
      `/discover/movie?api_key=${your-api-key}&language=en-US&
      sort_by=popularity.desc&certification_country=US&include_adult=false&
      include_video=false&page=${page}&primary_release_date.gte=${startDate}&
      primary_release_date.lte=${endDate}&with_original_language=en`
    );
    dispatch({
      type: 'NOWPLAYING_MOVIES',
      payload: response.data.results
    });
    dispatch(isNotLoading());
  };
```

A spinner is triggered on or off by other action creators `isLoading` and `isNotLoading` in the code above. These action creators return an action that has payload of either true or false that toggles the state of the spinner.

The starting and ending dates are computed in a helper function that returns an array of date strings. The first element in the array is the date one-month ago and the second element is today's date. Hence, "now playing" is defined as movies that were released in the past month.

**helper.js**

<!-- prettier-ignore -->
```javascript
export const nowPlayingDates = () => {
  const currentDate = new Date(Date.now());
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const currentDateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() +
    1}-${currentDate.getDate()}`;
  const oneMonthAgoStr = `${oneMonthAgo.getFullYear()}-${oneMonthAgo.getMonth() +
    1}-${oneMonthAgo.getDate()}`;

  return [oneMonthAgoStr, currentDateStr];
};
```

####Reducers

Alongside the action creators, corresponding reducers are created to handle slices of state. For example, inside of reducers/movieReducers.js, a function called `nowPlayingMoviesReducer` is created that takes in the current state of now playing movies (an empty array to begin with) and updates that slice of state with the payload property of the action with type 'NOWPLAYING_MOVIES':

**reducers/movieReducers.js**

<!-- prettier-ignore -->
```javascript
export const nowPlayingMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'NOWPLAYING_MOVIES':
      return action.payload;
    default:
      return state;
  }
};
```

This slice reducer is transformed to a single reducer inside of reducers/index.js using the [combineReducers](https://redux.js.org/api/combinereducers) function from Redux. As seen in the beginning of this post, this single reducing function (aka `rootReducer`) is then passed into the `createStore` function in src/index.js to generate the state tree.

**reducers/index.js**

<!-- prettier-ignore -->
```javascript
import { combineReducers } from 'redux';

import { nowPlayingMoviesReducer } from './movieReducers';

export default combineReducers({
  nowPlayingMovies: nowPlayingMoviesReducer
})
```

####Connected components

Finally, a component called `NowPlaying` is created to both fetch and display movies that are now playing. It is connected to the Redux store using the [connect](https://react-redux.js.org/api/connect) function from React-Redux. This connected component has access to the `nowPlayingMovies` piece of state thanks to the [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate) function that serves as the first argument to `connect()`. The second argument to `connect()` grants the connected component access to the data-fetching action creators through the object short-hand form of [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch).

**components/NowPlaying.js**

<!-- prettier-ignore -->
```javascript
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Spinner } from './Spinner'
import MovieCard from './MovieCard';
import { fetchNowPlayingMovies } from '../actions';
import { nowPlayingDates } from '../helper.js';

const CardGrid = styled.div`
  // Styles discussed later in post
`

class NowPlaying extends React.Component {
  componentDidMount() {
    const [startDate, endDate] = nowPlayingDates();
    this.props.fetchNowPlayingMovies(startDate, endDate, page = 1);
  }

  renderList() {
    return this.props.nowPlayingMovies.map(movie => (
      <MovieCard movie={movie} key={movie.id} />
    ));
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner text="Loading movies" />;
    }
    return (
      <CardGrid>{this.renderList()}</CardGrid>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    nowPlayingMovies: state.nowPlayingMovies
  };
};

export default connect(
  mapStateToProps, 
  { fetchNowPlayingMovies }
  )(NowPlaying);
```

When the component first mounts, the range of dates from now to one-month ago is calculated and used to trigger the action creator `fetchNowPlayingMovies` with those dates. Recall that that action creator toggles the `isLoading` piece of state to render a `Spinner` or not. The `renderList()` method on this class component is used to return a list of `MovieCard` components, where each movie is an object within the array of `nowPlayingMovies` slice of state. We'll discuss the styling to `MovieCard` and its container - `CardGrid` - a little later in this post.

####Selectors

The code above for `NowPlaying` was refactored to allow users to select how to sort the list of movies that are rendered in this component. Users can sort by most popular (default), highest rated, or most recent, each of which are based on properties attached to each movie (e.g. popularity rating, release date, etc). Computing data from the Redux store is accomplished through [selector](https://redux.js.org/recipes/computing-derived-data) functions. In this case, sorting arrays of movies in the store based on a sorting key is the derived data that we are after.

The [reselect](https://github.com/reduxjs/reselect) library provides a convenient way to create memoized selectors for apps with a Redux store. It can be installed with

`npm install --save reselect`

Sorting selectors are created for each part of the app (e.g. Now Playing, Trending, Top Rated) and they have a common structure. Using `NowPlaying` as the example, the selector function uses the `createSelector` function from reselect to take in two other selectors:

1. nowPlayingSelector - returns the `nowPlayingMovies` array from state
2. sortKeySelector - returns the `sortKey` string from state

to then return a sorted array of now playing movies from the store.

**selectors/index.js**

<!-- prettier-ignore -->
```javascript
import { createSelector } from 'reselect';

const nowPlayingSelector = state => state.nowPlayingMovies;
const sortKeySelector = state => state.sortKey;

export const sortedNowPlayingSelector = createSelector(
  nowPlayingSelector,
  sortKeySelector,
  (movies, sortKey) => {
    if (sortKey === 'popularity' || sortKey === 'vote_average') {
      return [...movies].sort((a, b) => b[sortKey] - a[sortKey]);
    } else if (sortKey === 'release_date') {
      return [...movies].sort(
        (a, b) => new Date(b[sortKey]) - new Date(a[sortKey])
      );
    } else {
      return movies;
    }
  }
);
```

The refactored `NowPlaying` component includes a new component `SortMenu` that tracks the user-selected sort option (this sets `sortKey` in state) to perform this reselection. Below is a snippet reflecting these changes.

**components/NowPlaying.js**

<!-- prettier-ignore -->
```diff
// new imports
+ import SortMenu from './SortMenu';
+ import { sortedNowPlayingSelector } from '../selectors';

class NowPlaying extends React.Component {
  componentDidMount() {
    // no refactors
  }

  renderList() {
    // no refactors
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner text="Loading movies" />;
    }
    return (
      <div>
+       <SortMenu />
        <CardGrid>{this.renderList()}</CardGrid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
+   nowPlayingMovies: sortedNowPlayingSelector(state),
+   sortKey: state.sortKey    
  };
};
// no refactors to the connect() function
```

Here's a demo of the selector in action:

![Movie Mania Selector Demo](./post-assets/movie-mania-selectors.gif)

###Styling

####Cards and card grid

The `MovieCard` and `CardGrid` components referenced in the `NowPlaying` snippet above uses a similiar techique to organize items in a grid as was used in [News Flash](/blog/2019-04-19-news-flash). `MovieCard` takes in a movie object and returns a card with a fixed 350px width that contains the movie's poster, title, release date, rating, plot summary, and a link to view more details of the movie. A styled component `CardContainer` is created to handle this:

**components/MovieCard.js**

<!-- prettier-ignore -->
```css
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 200px;
  grid-template-areas:
    'poster header'
    'poster overview'
    'poster link';
  border: 1px grey solid;
  border-radius: 3px;
  box-shadow: 1px 2px 2px grey;
  transition: all 0.2s ease-in;
  background: var(--black);

  img {
    grid-area: poster;
    ...
  }

  .header {
    grid-area: header;
    ...
  }

  p.overview {
    grid-area: overview;
    ...
  }

  a {
    grid-area: link;
    ...
  }

  @media screen and (min-width: 500px) {
    grid-template-columns: 150px 260px;
  
  /* additional styles to increase font-size  */
  /* padding on larger screens */
`
```

These styles are mobile-first and a media query is created for larger screens (minimum width of 500px) to increase the overall size of the card and the content inside of it.

An array of `MovieCard` commponents then serve as grid items to the `CardGrid` styled component back in `NowPlaying`. `CardGrid` auto-fits as many cards as possible based on fixed column widths of 350px (the width of small-screen cards) or 410px (the width of larger-screen cards).

**components/NowPlaying.js**

<!-- prettier-ignore -->
```css
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-gap: 1.5em;
  justify-content: center;
  padding: 1.5em 0;

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(auto-fit, 410px);
  }
`;
```

###Movie details

When a user clicks to reveal details of a movie, new data is fetched providing specifics of that movie and its crew. This fetch ultimately stores an object called `selectedMovie` in the Redux store that is made accessible to the `MovieDetails` component. This component is actually comprised of six child components:

- DetailsBackdrop - large backdrop poster image
- DetailsOverview - title, release date, rating, revenue, and plot summary
- DetailsCrew - writer and director information
- DetailsVideos - embedded YouTube trailers and featurettes
- DetailsCast - horizontal gallery of top billed cast members
- DetailsSimilar - horizontal gallery of similar movies

One of the more challenging styling tasks was responsively displaying the backdrop poster. The backdrop is natively sized with a much larger width than height. This makes it naturally fit on larger screens, so its shape needs to transform from rectangular-ish to square-ish for smaller screens. After some trial and error, I settled on just 4 lines of CSS to create a response backdrop poster:

**components/DetailsBackdrop.js**

<!-- prettier-ignore -->
```css
const Backdrop = styled.div`
  height: 350px;
  background-image: url("https://image.tmdb.org/t/p/original${props =>
    props.imgPath}");
  background-position: center 25%;
  background-size: cover;
`;
```

The `Backdrop` styled div is passed a prop of `imgPath`, which is a property on the selected movie, to create the URL that is fetched in `background-image`. The div is set with a fixed height of 350px and the image inside the div centered on the x-axis and offset 25% below the top of the container. The `cover` image size scales the backdrop poster as large as needed without stretching it and crops it so that no empty space exists in the container.

![Movie Mania Backdrop Demo](./post-assets/movie-mania-backdrop.gif)
