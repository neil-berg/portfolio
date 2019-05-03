---
title: "Project Review: Meredith Lackey"
date: "2019-01-03"
description: "A sleek and minimal filmmaker's portfolio built in React"
---

## Project Review: Meredith Lackey

**January 3, 2019**

Meredith Lackey is a talented filmmaker based in Los Angeles, who recently had her latest film Cablestreet premier at the Sundance Film Festival. We collaborated to create a sleek portfolio for her that is built in React.

[View the portfolio](https://mlackey-demo.netlify.com/)

### Design

Meredith shared several vintage and modern movie posters that she wanted to incorporate into the style of her site. Here are a couple of them:

![Meredith Lackey Poster 1 for Style](./post-assets/meredith-lackey-poster-1.jpg)

![Meredith Lackey Poster 2 for Style](./post-assets/meredith-lackey-poster-2.jpg)

The use of thumbnails to create borders in these posters was immediately appealing and aligned naturally with Meredith's film catalogue. The striking solid red landing backdrop in the second poster was another feature we wanted to include in the site.

We ended up using the red from the second poster (#e62020) and paired it with a deep black (#140101) for text and soft white (#fff9f1) for active links and page/image margins. The result is a bold and minimal showcase of Meredith and her work:

![Meredith Lackey App Overview](./post-assets/meredith-lackey-overview2.gif)

###Creating the side gallery

This React app has three general components:

1. SideGallery - the left-sidebar of thumbnail images
2. NavBar - the top navigation panel
3. About/Contact/Work - the main content of the site displayed beneath the NavBar

`SideGallery` needs to know two values to get initialized:

1. What is the viewport height when the app first mounts?
2. Is the content next to `SideGallery` (i.e. height of `NavBar` + height of main content) taller or shorter than the initial viewport height?

If the viewport height is taller than the combined height of `NavBar` and the content beneath it, then we know that `SideGallery` should vertically span 100% of the viewport height (aka 100vh).

Though suppose we have a case where the `Work` component contained 10 films that pushed text way beneath the fold of the initial viewport height. In this case, `SideGallery` needs to vertically extend beyond 100vh to cover the `NavBar` and the client height of the main section being displayed beneath it.

The results of these questions are used to calculate `galleryHeight`, which is tracked in the application state in `App.js`. It is set through a method called `setGalleryHeight` that is passed as props to children components like `Work`. When `Work` mounts, it adds the client height of that section to how far offset it is from the top of the page to calculate `galleryHeight`. A 10px margin-bottom to is also factored in.

**App.js**

<!-- Prettier ignore -->

```javascript
class App extends React.Component {
  state = {
    galleryHeight: null,
  }

  setGalleryHeight = height => {
    this.setState({ galleryHeight: height })
  }

  //...
}
```

**Work.js**

<!-- Prettier ignore -->

```javascript
class Work extends React.Component {
  componentDidMount() {
    const sectionHeight = this.sectionRef.clientHeight
    const sectionOffsetTop = this.sectionRef.offsetTop
    const galleryHeight = sectionOffsetTop + sectionHeight - 10
    this.props.setGalleryHeight(galleryHeight)
  }

  //...
}
```
