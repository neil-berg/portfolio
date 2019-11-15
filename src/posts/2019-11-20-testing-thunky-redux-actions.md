---
title: "Testing Thunk-y Redux Actions"
date: "2019-11-20"
description: Diving into redux-thunk and middleware in general for testing thunk-y Redux action creators
---

## Testing Thunk-y Redux Actions

<time datetime="2019-11-20">November 20, 2019</time>

Thunk-y action creators are those that return a function and not a plain object. Using them in a Redux store can be achieved with the redux-thunk middleware. Writing unit tests on thunk-y action creators is the topic of this post.

### Setup

To demo the testing of thunk-y action creators, we'll create a [simple React app](link to github repo) that first fetches the latitude and longitude of an inputted city and then uses those coordinates to fetch the current weather of that city.

The app is bootstrapped with `create-react-app` and has a directory structure as follows:

<!-- prettier-ignore -->
```javascript
src/actions
src/components
src/reducers/
src/store
App.js
index.js 
```

#### Reducers and Redux store

Three reducers are used in this app:

1. `geocode-reducer` for handling state related to the city's coordinates
2. `weather-reducer` for handling state related to the city's weather
3. `status-reducer` for handling data fetching states, e.g. loading, error, and success

All the reducers and their initial states are exported from their respective reducer files and combined into a single `rootReducer` in `store.js`. Then we can create the Redux store that incorporates the `redux-thunk` middleware.

<!-- prettier-ignore -->
```javascript
// src/store/store.js
import { combinedReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { geocodeReducer } from '../reducers/geocode-reducer';
import { statusReducer } from '../reducers/status-reducer';
import { weatherReducer } from '../reducers/weather-reducer';

const rootReducer = combineReducers({
	status: statusReducer,
	geocode: geocodeReducer,
	weather: weatherReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
```
