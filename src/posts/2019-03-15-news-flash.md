---
title: "Project Review: News Flash"
date: "2019-03-15"
description: "React App build on the New York Times API to cruise the latest news, top stories, best sellers, and movie reviews."
---

## News Flash

**March 15, 2019**

I read the New York Times online constantly, it serves worldclass journalism and excellent short-form writing all day long. They also have a killer and generous team of developers who maintain a public and data-rich API.

Looking for a way to sharpen my React knowledge while maintaining a daily dose of NYT articles, I decided to create a stripped down news site sourcing all content from the NYT API.

[News Flash](https://news-flash.netlify.com/) is the outcome.

###Data source and fetching

The [NYT API](https://developer.nytimes.com/) is free to any developer after registering for an API key on their site. The team manages about a dozen APIs, notably:

- [Most Popular API](https://developer.nytimes.com/docs/most-popular-product/1/overview) to get information on the most emailed, shared, and viewed recent articles
- [Books API](https://developer.nytimes.com/docs/books-product/1/overview) that provides details on the current Best Sellers in additoin to book reviews
- [Movie Reviews API](https://developer.nytimes.com/docs/movie-reviews-api/1/overview) for the latest film reviews
- [Top Stories API](https://developer.nytimes.com/docs/top-stories-product/1/overview) for current articles based on various newspaper sections

Each API has a base URL of https://api.nytimes.com/svc with API-specific root endpoints of either /mostpopular, /movies, /books, or /topstories.

Data is returned in JSON format and I use the built-in [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to asynchronously fetch data from the NYT API. Top stories, best selling books, and film reviews are fetched when the app first mounts, so these calls are stored in the `componentDidMount` lifecycle method of the `App.js` component. Below is a condensed snippet of code demonstrating how the the most viewed stories are fetched and stored in state. The other landing-page fetches are very similar, only with sligtly different URLs.

**App.js**

<!-- prettier-ignore -->
```javascript
class App extends React.Component {
  state = {
    popularStories: []
  }

  componentDidMount() {
    this.fetchPopularStories();
  }

  fetchPopularStories = async () => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/
                viewed/7.json?api-key=${your-api-key}`;
    const response = await fetch(url);
    const json = await response.json();
    const popularStories = await json.results;
    this.setState({ popularStories });
  };
}
```

I'm using the ES6 `async/await` syntax to handle the asynchronous fetching calls, which I prefer over Promises and chained `.then()` statements. `popularStories` contains the final slice of data we want, which is the `results` property on the `json` data object. Since this variable name is the same as the property in state, we can use another ES6 goody and update state with just the property and spare typing out the corresponding value to it.

Alongside the initial fetching for landing-page content, there is also fetching of section-specific top stories that gets trigged once a user clicks on a desired section link either in the header navigation bar or the sliding sidebar. For example, if a user clicks "Arts", then they are taken to `/topstories/arts` and are shown the top stories in the Arts section.

Fetching top stories per section is handled separately in the `TopStories` component. This component is rendered on matched URLs to "/topstories/:sectionID", where sectionID is any of the available newspaper sections. React-router provides a `match` [Route prop](https://reacttraining.com/react-router/web/api/Route) that we use to determine the current path of our app. When `TopStories` first mounts, which occurs when a user first clicks on a desired section either in the header navbar or the sliding sidebar, we first parse that section from the URL, then fetch the top stories to that section.

**TopStories.js**

<!-- prettier-ignore -->
```javascript
class TopStories extends React.Component {
  state = {
    stories: [],
    isLoading: false,
  };

  componentDidMount() {
    const section = this.props.match.params.sectionId;
    this.fetchStories(section);
  }

  fetchStories = async section => {
    this.setState({isLoading: true });

    const url = `https://api.nytimes.com/svc/topstories/v2/
                ${section}.json?api-key=${your-api-key}`;
    const response = await fetch(url);
    const json = await response.json();
    const stories = await json.results;

    this.setState({ stories, isLoading: false });
  };

```

The `isLoading` Boolean in our state is used to trigger a spinner while our data is being fetched.

After the `TopStories` component is mounted, the user can still click a new section in the navbar or sidebar. How is data fetched in this case? We simply check if the URL changed, which updates the `match` Route prop and triggers a new fetching of stories. Checking updates to the `match` prop and executing a new fetch is done in the `componentDidUpdate` lifecycle method in the `TopStories` component.

<!-- prettier-ignore -->
```javascript
  componentDidUpdate(prevProps) {
    const oldSection = prevProps.match.params.sectionId;
    const newSection = this.props.match.params.sectionId;
    if (oldSection !== newSection) {
      this.fetchStories(newSection);
    }
  }

```

###Login and database persistence

[Firebase](https://firebase.google.com/) is a wonderful database option by Google that offers not only a wealth of data storage tools, but also authorization tools (more on that in a bit). I wanted a way to track users who optionally can login to my app. So I created a Firebase database instance for my app.

We need to install two libraries to sync Firebase with our React app - Firebase library itself and [Rebase](https://github.com/tylermcginnis/re-base), which is a binding library to connect React apps to Firebase.

`npm install --save firebase re-base`

Once those packages are installed, we first need to register our app in the Firebase console to initiate a new database. It's a simple two-click process:

1. Click "Add a Project" from the Firebase homepage console and give your database a name
2. Click the web-app icon (empty HTML tags) and take note of the config object to initialize Firebase with

Next, we create a new JS file called `base.js` in our `src` directory and import `firebase` and `re-base`. From there it's a 3-step process to creating our database and connecting it to React:

1. Use the `initializeApp` method from `firebase` to initialize Firebase. Remember those config options from Firebase's webpage? Copy that `config` object as the argument to `initializeApp`.
2. Create an instance of the Firebase database using the `database` instance from `firebase`.
3. Create an instance of the connected database to React (or re-base) using the `createClass` method from `Rebase`.

**base.js**

<!-- prettier-ignore -->
```javascript
import firebase from 'firebase';
import Rebase from 're-base';

const firebaseApp = firebase.initializeApp({
  apiKey: <your-api-key>,
  authDomain: <your-auth-domain>,
  databaseURL: <your-database-url>,
  projectId: <your-project-id>,
  messagingSenderId: <your-messaging-sender-id>
});

const db = firebase.database(firebaseApp);
const base = Rebase.createClass(db);

export { firebaseApp };
export default base;
```

Finally, we'll export both the Firebase database and re-base instances to use in other components of our app.

####Login procedure

The Firebase JS SDK offers a sleek way to [handle sign-in flow](https://firebase.google.com/docs/auth/web/google-signin) using email/password or OAuth2 tokens. I opted for OAuth through several providers: Google, Facebook, Twitter, and Github. All of this code is contained in a `Login`
component.

We begin by creating an instance of the provider object, such as:

`const authProvider = new firebase.authGoogleAuthProvider()`;

Rather than repeat this line of code four times - one for each of the four providers listed above - I instead created a method called `authenticate` in `Login` that is called when any of the login buttons (one for each of the providers) is clicked. It takes an argument of the provider name (e.g. `<button onClick={() => this.authenticate('Facebook')}>`) and creates a new auth-provider instance that way.

Next, we authenticate with Firebase using that provider's object by prompting users to sign in with their accounts in a pop-up window. This is done through:

`firebaseApp.auth().signInWithPopup(authProvider)`

This function returns a Promise with the access token/user data granted to us from the auth provider. We handle the Promise by chaining on a `.then()` statement that calls another async function to process the user data and store them in Firebase. Let's see the code and then clarify this last step further.

**Login.js**

<!-- prettier-ignore -->
```javascript
import React from react;
import firebase from 'firebase';
import base, {firebaseApp} from '../base';

class Login extends React.Component {

  authHandler = async authData => {
    await base.post(`users/${authData.user.uid}/name`, {
      data: authData.user.displayName
    });

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    return (
      // JSX for login buttons and container
      // Recall that the buttons have a structure like
      // <button onClick={() => this.authenticate('Google')}>
      // Sign in with Google
      // </button>
    )
  }
}
```

`authHandler` receives the `authData` object with a "user" property on it. That user property contains basic inforamtion of our user: their email, name, a profile pic, etc. We use a Rebase method `post` to post the logged-in user's inforamtion to Firebase. `post` takes in two arguments:

1. The endpoint in Firebase to store data at. In our case, we specify an endpoint of /users/{userID}/name, where usedID is extracted from the `authData` object.
2. The data we want to persist in Firebase. In our case, I just want to store the user's first and last name, aka the `displayName`.

Back on the Firebase website, we can click on the Database tab in the sidebar and confirm that logged-in users are stored at the /users/userID/name endpoint, something like:

```
users
  - df3y7283nbeEHDDEHbehWW1653
    - name: "Neil Berg"
```

### Styling

I'm a huge fan of [styled components](https://www.styled-components.com/). Writing component-specific CSS that can handle props inside of JS files seems ideal to me...though I know others may strongly disagree :).

You can install styled components with:

`npm install --save styled-components`

I made heavy usage of CSS Grid to responsively display all the stories on the page and to style the story card itself.

The story card is a styled div with a vertical layout for the story's header (the bookmark icon and published date), thumbnail image, title, and abstract:

<!-- prettier-ignore -->
```css
const Story = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header "
    "image"
    "byline "
    "title "
    "abstract";
  border-bottom: 1px lightgrey solid;
  padding: 0 0.5em;

  .header {
    grid-area: header;
    /* more styling */
  }

  .byline {
    grid-area: byline;
    /* more styling */
  }

  /* ... */
`
```

Back in our `TopStories` component, we first create a list of these story cards based on the data stored in state and then wrap them in another stlyed component called `StoryWrapper`. `StoryWrapper` is another grid that responsively lays out each story card by auto-fitting columns of fixed 300px. A screen width of 400px would yield a single column of story cards, a width of 650px would yields two columns, and so forth. It's amazing how much layout control you can get from these four lines of CSS in our styled component:

<!-- prettier-ignore -->
```css
const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
`;
```

Since we force all of our grid items to have a fixed width of 300px, the total size of the grid is often less than the size of its grid container (i.e it doesn't fill up the entire page width). Therefore, we use the `justify-content: center;` property to center the grid within the page along the row axis.
