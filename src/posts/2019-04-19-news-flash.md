---
title: "News Flash"
date: "2019-04-19"
description: "React App build on the New York Times API to cruise the latest news, top stories, best sellers, and movie reviews."
---

## News Flash

<time datetime="2019-04-19">April 19, 2019</time>

I read the New York Times online constantly, it serves worldclass journalism and excellent short-form writing all day long. They also have a generous team of developers who maintain a public and data-rich API.

Looking for a way to sharpen my React knowledge while maintaining a daily dose of NYT articles, I decided to create a stripped down news site sourcing all content from the NYT API.

[News Flash](https://news-flash.netlify.com/) is the outcome.

![News Flash Overview](./post-assets/news-flash-overview.gif)

[View full code](https://github.com/neil-berg/nyt-articles)

###Data source and fetching

The [NYT API](https://developer.nytimes.com/) is free after registering for an API key on their site. A dozen or so APIs are available, notably:

- [Most Popular API](https://developer.nytimes.com/docs/most-popular-product/1/overview) to get information on the most emailed, shared, and viewed recent articles
- [Books API](https://developer.nytimes.com/docs/books-product/1/overview) that provides details on the current Best Sellers in additoin to book reviews
- [Movie Reviews API](https://developer.nytimes.com/docs/movie-reviews-api/1/overview) for the latest film reviews
- [Top Stories API](https://developer.nytimes.com/docs/top-stories-product/1/overview) for current articles based on various newspaper sections

Each API has a base URL of https://api.nytimes.com/svc with API-specific root endpoints of either /mostpopular, /movies, /books, or /topstories.

Data is returned in JSON format and I use the built-in [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to asynchronously fetch data from the NYT API. Top stories, best selling books, and film reviews are fetched when the app first mounts, so these calls are stored in the `componentDidMount` lifecycle method of the `App` component. Below is a condensed snippet of code demonstrating how the the most viewed stories are fetched and stored in state. The other landing-page fetches are very similar, only with sligtly different URLs.

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

The `async/await` syntax is used to asynchronously handle the Promise returned from `fetch(url)`, which I prefer over chained `.then()` statements. `popularStories` contains the final slice of data we want, which is the `results` property on the `json` data object. Since this variable name is the same as the property in state, state can be set with just the property name.

Alongside the initial fetching for landing-page content, there is also fetching of section-specific top stories that gets trigged once a user clicks on a desired section link either in the header navigation bar or the sliding sidebar. For example, if a user clicks "Arts", then they are taken to `/topstories/arts` and are shown the top stories in the Arts section.

Fetching top stories per section is handled separately in the `TopStories` component. This component is rendered on matched URLs to "/topstories/:sectionID", where sectionID is any of the available newspaper sections. React-router provides a `match` [Route prop](https://reacttraining.com/react-router/web/api/Route) that we use to determine which section was matched in our URL. When `TopStories` first mounts, which occurs when a user first clicks on a desired section either in the header navbar or the sliding sidebar, we parse that section from the URL and fetch its top stories.

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

####Firebase setup

[Firebase](https://firebase.google.com/) is a wonderful database option by Google that offers not only a wealth of data storage tools, but also authorization tools (more on that in a bit). I wanted a way to track users who login to the app and used Firebase to do so.

Two libraries need to be installed to sync Firebase with React - the Firebase library itself and [Rebase](https://github.com/tylermcginnis/re-base), which is a binding library to connect React apps to Firebase.

`npm install --save firebase re-base`

Once those packages are installed, we first need to register our app in the Firebase console to initiate a new database. It's a simple two-click process:

1. Click "Add a Project" from the Firebase homepage console and give your database a name
2. Click the web-app icon (empty HTML tags) and take note of the config object to initialize Firebase with

Next, a new file called `base.js` is created in the src directory to create the database and connect it to React. It's a simple three-step process:

1. Use the `initializeApp` method from `firebase` to initialize Firebase. Remember those config options from Firebase's webpage? Copy that `config` object as the argument to `initializeApp`.
2. Create an instance of the Firebase database using the `database` method from `firebase`.
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

Both the Firebase database and re-base instances are exported to use in other components of the app.

####OAuth setup

The Firebase JS SDK offers a sleek way to [handle sign-in flow](https://firebase.google.com/docs/auth/web/google-signin) using email/password or OAuth2 tokens. I opted for OAuth through several providers: Google, Facebook, Twitter, and Github.

Before diving into the code, we first need to register our app with each provider and obtain authorization credentials - namely a client or app ID and secret. This step varies a bit for each provider, but has a general flow of registering the app on each provider's developer website, entering some details on your app, and then creating new credentials for that app. The callback URL generated by Firebase also needs to be entered to each of the auth providers during the app registration process.

Here are a few more resources to help with this process:

- [Google OAuth2 for Client-Side Web Apps](https://developers.google.com/identity/protocols/OAuth2UserAgent)
- [OAUth with Twitter APIs](https://developer.twitter.com/en/docs/basics/authentication/overview/oauth)
- [Github Authorizing OAuth Apps](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)
- [Facebook Login for the Web](https://developers.facebook.com/docs/facebook-login/web/)

With our credentials in hand, sign-in from each provider is enabled in the Firebase console. Under "Authentication -> Sign-in method", we can select the providers to enable (e.g. Google, Facebook, Twitter, and Github) by entering in the corresponding credentials.

####Sign-in flow and logging users

In the `Login` component, we begin by creating an instance of the authorization provider object, such as:

`const authProvider = new firebase.authGoogleAuthProvider()`;

Rather than repeat this line of code four times - one for each of the four providers listed above - I instead created a method called `authenticate` in `Login` that is called when any of the login buttons (one for each of the providers) is clicked. It takes an argument of the provider name (e.g. `<button onClick={() => this.authenticate('Facebook')}>`) and creates a new auth-provider instance that way.

Next, we authenticate with Firebase using that provider's object by prompting users to sign in with their accounts in a pop-up window. This is done through:

`firebaseApp.auth().signInWithPopup(authProvider)`

This function returns a Promise with the access token/user data granted to us from the auth provider. The Promise is handled by chaining on a `.then()` statement that calls another async function to process the user data and store them in Firebase. Let's see the code and then clarify this last step further.

**Login.js**

<!-- prettier-ignore -->
```javascript
import React from react;
import firebase from 'firebase';
import base, {firebaseApp} from '../base';

class Login extends React.Component {

  componentDidMount() {
    // To be filled in shortly
  }

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

`authHandler` receives the `authData` object with a "user" property on it. That user property contains basic information of the user: their email, name, a profile pic, etc. We use a Rebase method `post` to post the logged-in user's inforamtion to Firebase. `post` takes in two arguments:

1. The endpoint in Firebase to store data at. In this case, we specify an endpoint of /users/{userID}/name, where usedID is extracted from the `authData` object.
2. The data we want to persist in Firebase. In this case, just the user's first and last name, aka the `displayName`.

Back on the Firebase console, we can click on the Database tab in the sidebar and confirm that logged-in users are stored at the /users/userID/name endpoint, something like:

```
users
  - df3y7283nbeEHDDEHbehWW1653
    - name: "Neil Berg"
```

One last piece of this flow is maintaining the logged-in state during a refresh. State is persistent during a refresh by adding an observer from Firebase called `onAuthStateChanged()` in the `componentDidMount` lifecycle method. When `Login` first mounts, we check whether a user is logged-in (i.e. `user` is not null), and if so, send that user through the `authHandler` process again.

<!-- prettier-ignore -->
```javascript
componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.authHandler({ user });
    }
  });
}
```

Finally, users can sign-out by clicking a logout button contained in the `Header` component. This click event triggers a method called `logout` that is passed to `Header` via our top-level `App` component (where application-level state is stored, including the user object). Once signed-out, we clear the `user` property in state by setting it to `null`.

**App.js**

<!-- prettier-ignore -->
```javascript
logout = async () => {
  await firebase.auth().signOut();
  this.setState({
    user: null
  });
};
```

### Styling

I'm a huge fan of [styled components](https://www.styled-components.com/). Writing component-specific CSS that can handle props inside of JS files seems ideal to me...though I know others may disagree :).

Styled components can be installed with:

`npm install --save styled-components`

CSS Grid is used to responsively display all the stories on the page and to style the story card itself.

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

Back in the `TopStories` component, a list of story cards is first created based on the data stored in state. That list of cards is then wrapped by another styled component called `StoryWrapper`.

`StoryWrapper` is another grid that responsively lays out each story card by auto-fitting columns of fixed 300px. A screen width of 400px would yield a single column of story cards, a width of 650px would yields two columns, and so forth. It's amazing how much layout control you can get from these four lines of CSS in our styled component:

<!-- prettier-ignore -->
```css
const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
`;
```

Since we force all of our grid items (story cards) to have a fixed width of 300px, the total size of the grid is often less than the size of its grid container (i.e it doesn't fill up the entire page width). Therefore, we use the `justify-content: center` property to center the grid within the page along the row axis.

![News Flash Responsive Layout](./post-assets/news-flash-responsive-layout.gif)
