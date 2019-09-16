---
title: "A Counter Three Ways"
date: "2019-01-06"
description: "A simple counter app served three ways: vanilla JS, React, and React-Redux"
---

## A Counter Served Three Ways

<time datetime="2019-01-06">January 6, 2019</time>

When learning new languages, frameworks, and other tools to build apps, I find it helpful to have side-by-side code comparisons of how to execute a given task. It doesn't have to be fancy, a simple counter app will do.

As such, this post will demonstrate how to create a counter app in three methods:

1. Library-free vanilla JS
2. React
3. React + Redux

### 1. Library-free vanilla JS

Accessing the DOM using plain old JavaScript is as easy and necessary as ever right now. No need for bulky libraries like jQuery anymore, we can reach into and manipulate the DOM using a wealth of interfaces, espeically the [Document API](https://developer.mozilla.org/en-US/docs/Web/API/Document).

#### HTML

Here's the HTML for the counter. Two buttons with classes of either `decrement` or `increment`, which will be the critical piece of info when handling click events, along with two spans, one to keep track of the current count and another to record the total number of clicks.

<!-- prettier-ignore -->
```html
<div class="container">
  <div class="counter">
    <button class="btn decrement">-</button>
    <span class="count">0</span>
    <button class="btn increment">+</button>
  </div>
  <p>Total clicks: <span class="click-count">0</span></p>
</div>
```

#### JavaScript

Making use of the Document methods [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) and [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), variables are first declared for the buttons, count span, and total click span based on their classes.

<!-- prettier-ignore -->
```javascript
const buttons = document.querySelectorAll(".btn")
const count = document.querySelector(".count")
const clickCount = document.querySelector(".click-count")
```

Next, click event listeners are attached to each button using [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Each time the increment or decrement button is clicked, the callback function `handleClick` will be called with the event parameter `e` passed into it.

<!-- prettier-ignore -->
```javascript
buttons.forEach(button => 
  button.addEventListener("click", e => handleClick(e)))
```

Finally, we add logic in `handleClick` to modify the count and add to the total number of clicks.

<!-- prettier-ignore -->
```javascript
function handleClick(e) {
  // Increment or decrement count based on class of target button
  e.target.classList.contains('increment')
    ? count.textContent++
    : count.textContent--;

  // Add to the total number of clicks
  clickCount.textContent++;
}
```

No need to create separate functions to increment and decrement the count. Instead, we can define a single function that first determines the clicked button type based on their classes (using the handy `contains` method of [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)) and then adjust the count value accordingly. Regardless of whether the increment or decrement button was clicked, the total click count is incremented as well.

Simple as that!

### 2. React

Let's first create a React class component called `App` where the count value and total number of clicks are maintained in state:

<!-- prettier-ignore -->
```javascript
class App extends React.Component {
  state = {
    count: 0,
    clicks: 0
  };
```

Beneath the state object, a `handleClick` method is defined, this time using an arrow functional expression, which allows us to avoid having to explicitly bind `this` to the method. Callbacks in the `setState` method use `prevState` to reference previous state properties.

<!-- prettier-ignore -->
```javascript
handleClick = e => {
  // Increment or decrement count based on class of target button
  e.target.classList.contains('increment')
    ? this.setState(prevState => ({ count: prevState.count + 1 }))
    : this.setState(prevState => ({ count: prevState.count - 1 }));

  // Add to the total number of clicks
  this.setState(prevState => ({ clicks: prevState.clicks + 1 }));
};
```

Finally, the rendered JSX is nearly identical to the HTML in the vanilla JS example, only this time in-line click event listeners are added to the buttons and the text content of the count and total clicks spans come from state.

<!-- prettier ignore -->

```javascript
render() {
  return (
    <div className="container">
      <h2>Counter - React </h2>
      <div className="counter">
        <button
          className="btn decrement"
          onClick={this.handleClick}>
          -
        </button>
        <span className="count">{this.state.count}</span>
        <button
          className="btn increment"
          onClick={this.handleClick}>
          +
        </button>
      </div>
      <p>
        Total clicks:
          <span className="click-count">
            {this.state.clicks}
          </span>
      </p>
    </div>
  );
}
```

Voila!

### 3. React + Redux

Of course using Redux for something as simple as a counter is beyond overkill. However, creating a Redux store, dispatching actions, updating state with reducers, and connecting components to the store are still nicely illustrated here.

First, install redux and the redux binder to react, [react-redux](https://react-redux.js.org/), using `npm install --save redux react-redux`.

Let's also see the app's architecture to orient ourselves before diving into the code. There are many ways to organize your directories and files, but this is my preferred structure that scales easily as your app grows.

```
src
  /actions
      index.js
  /components
      App.js
  /reducers
      counterReducer.js
      clicksReducer.js
      index.js
  index.js
```

Three sub-directions are created under /src/:

1. `actions` contains a single file where action creators are defined and exported. Action creators are simply functions returning an "action" - a plain object with a "type" property and optionally a "payload" property.

2. `components` contains React components, but these components no longer need to maintain state (at least application-level state).

3. `reducers` contains individual files pertaining to unique slices of the application state (e.g. `count` and `clicks`) and an `index.js` file to combine and export our reducers into a single root reducer that creates the Redux store.

`index.js` is the root file where the Redux store is created and injected into top-level `Provider` component:

**index.js**

```javascript
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"

import App from "./components/App"
import rootReducer from "./reducers"

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
)
```

There are three new aspects of this code compared to a plain React app:

1. `Provider` is a named exported component from react-redux that makes the Redux store available to any nested components wrapped with the `connect()` function. In this case, `<App />` is nested in `<Provider>`, allowing it (and if we had further nested components) access to the Redux store. [More details on Provider](https://react-redux.js.org/api/provider).

2. `createStore` is a named exported function from redux that creates a [Redux store](https://redux.js.org/api/store) holding all application state. This function takes in a `reducer` argument (and optionally other arguments, for instance when using middleware for async actions). [More details on createStore.](https://redux.js.org/api/createstore)

3. `rootReducer` is a default exported function from `index.js` in the `reducers` directory. This reducer is actually the combined reducer from individual reducers `countReducer.js` and `clicksReducer.js`.

What exactly is a [reducer](https://redux.js.org/faq/reducers)? In Redux, they're functions that take in the state and an action describing how to change that state, and return a new state accordingly.

Before looking at the reducer code, let's see what actions are all about here.

Recall that the counter app modifies state in three ways:

1. Increment count when increment button is clicked
2. Decrement count when decrement button is clicked
3. Increment total clicks when either button is clicked

Therefore, three actions are needed that map to the state modification statements above.

**/actions/index.js**

<!-- prettier-ignore -->
```javascript
export const incrementCount = () => {
  return {
    type: 'INCREMENT_COUNT'
  };
};

export const decrementCount = () => {
  return {
    type: 'DECREMENT_COUNT'
  };
};

export const incrementClicks = () => {
  return {
    type: 'INCREMENT_CLICKS'
  };
};

```

Above are three action _creators_ (arrow functional expressions without any arguments in this case) that return _actions_, which are objects with at least a `type` property. The values of this property are capialized by convention and describe how we want to modify pieces of the application state. These actions are ingested by reducers, so let's finally dive into their code.

**/reducers/countReducer.js**

<!-- prettier-ignore -->
```javascript
export const countReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return state + 1;
    case 'DECREMENT_COUNT':
      return state - 1;
    default:
      return state;
  }
};
```

**/reducers/clicksReducer.js**

<!-- prettier-ignore -->
```javascript
export const clicksReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_CLICKS':
      return state + 1;
    default:
      return state;
  }
};
```

While a small app like this could have a single reducer to handle all the logic, this quickly becomes unmaintainable as the amount of state and logic grows. Therefore, logic is split in discrete reducers, where each reducer is responsible for handling a slice of state - a slice for the count and a slice for the clicks.

Each reducer takes as arguments a slice of the current state and an action, then based on the action types, updates that slice of state (be careful not to directly mutate state!). In case no action type is matched, the default is return the current state. State is initialized in the arguments with `state = 0`, since both the count and clicks are zero to begin with.

Finally, each of these _slice reducers_ are combined into a _root reducer_ that the Redux store will ingest, creating a complete state tree for our app. Redux provides a [helper function `combineReducers`](https://redux.js.org/api/combinereducers) to do just that.

**/reducers/index.js**

<!-- prettier-ignore -->
```javascript
import { combineReducers } from 'redux';

import { countReducer } from './countReducer';
import { clicksReducer } from './clicksReducer';

export default combineReducers({
  count: countReducer,
  clicks: clicksReducer
});
```

The `combineReducers` function ingests each of our slice reducers and assigns their output to a property of the app state tree. Similar to the React without Redux example. `count` and `clicks` continue to serve as properties of state.

Returning to src/index.js, we more clearly see that the Redux store is formed by the exported root reducer from the `combineReducers` function. This generates a state object with `count` and `clicks` as properties, which are modified by the `countReducer` and `clicksReducer` once various actions are dispatched.

Where are those actions dispatched and how is the store connected to the sole `App.js` component? Let's view the code behind `App.js` to answer those questions.

**/components/App.js**

First, a few new items compared to a basic React component need to be imported:

- the `connect` function from the react-redux package
- the three action creators

<!-- prettier-ignore -->
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { incrementCount, decrementCount, incrementClicks } from '../actions';

class App extends React.Component {
  // ...
}
```

We'll get to the rendered JSX and class methods shortly, first let's deal with the [`connect` function](https://react-redux.js.org/api/connect). For our purposes, the `connect` function will take in two parameters:

1. A function called `mapStateToProps` where its returned object contains the aspects of state we want available to the connected component via props
2. An object containing our actions creators (if you wanted to manually dispatch actions, you'd pass in a "mapDispatchToProps" function).

Here's what `mapStateToProps` and the `connect` function look like:

<!-- prettier-ignore -->
```javascript

class App extends React.Component {

  // placeholder for handleClick method
  
  render() {
    return (
      // placeholder for JSX
    )
  }

const mapStateToProps = state => {
  return {
    count: state.count,
    clicks: state.clicks
  };
};

export default connect(
  mapStateToProps,
  {
    incrementCount,
    decrementCount,
    incrementClicks
  }
)(App);
```

There we go! `connect` - a higher-order function - takes in `mapStateToProps` and an object containing our action creators, returning another function that wraps our `App` component, ultimately providing `App` with props containing our state and action creators.

With state and action creators available as props, we can create a slightly modified `handleClick` method compared to the non-Redux case with nearly identical JSX from before:

<!-- prettier-ignore -->
```javascript
class App extends React.Component {
  handleClick = e => {
    e.target.classList.contains('increment')
      ? this.props.incrementCount()
      : this.props.decrementCount();

    this.props.incrementClicks();
  };

  render() {
    return (
      <div className="container">
        <h2>Counter: React-Redux</h2>
        <div className="counter">
          <button className="btn decrement" onClick={this.handleClick}>
            -
          </button>
          <span className="count">{this.props.count}</span>
          <button className="btn increment" onClick={this.handleClick}>
            +
          </button>
        </div>
        <p>
          Total clicks: <span className="click-count">{this.props.clicks}</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.count,
    clicks: state.clicks
  };
};

export default connect(
  mapStateToProps,
  {
    incrementCount,
    decrementCount,
    incrementClicks
  }
)(App);

```

Only a few changes from the non-Redux example. First, the `handleClick` method executes the action creators that are then parsed by the root reducer to update state in the store. Second, `count` and `clicks` slices of state are accessed via props instead of a state object.

No doubt that Redux requires a lot of boilerplate code to use, but this simple example shows the elegance and scalability of Redux for more complex uses. No need to prop-drill several layers deep to share state and methods to update state. All that's needed for new global-state features are new actions and reducers, which can be selectively connected to components that need to access them.
