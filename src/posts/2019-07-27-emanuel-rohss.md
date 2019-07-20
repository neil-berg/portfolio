---
title: "Project Review: Emanuel Röhss"
date: "2019-07-27"
description: A blazing-fast, image-optimized artist portfolio built with Gatsby, Airtable, and GraphQL
---

## Emanuel Röhss

**July 27, 2019**

Emanuel Röhss is a talent artist based in Los Angeles and was seeking a new design and increased performance for his image-heavy online portfolio.

Given [Gatsby's image optimization features](https://www.gatsbyjs.org/docs/working-with-images/), [plugin ecosystem ](https://www.gatsbyjs.org/plugins/) for sourcing of 3rd party APIs, built-in [GraphQL interface](https://www.gatsbyjs.org/docs/querying-with-graphql/), and ability to seamlessly [deploy continuously on Netlify](https://www.gatsbyjs.org/docs/deploying-to-netlify/), it was an easy call to go with this framework for [Emanuel's site](https://emanuel-rohss-demo1.netlify.com/).

### Airtable as a Headless CMS

[Airtable](https://guide.airtable.com/introduction-to-databases/) is a cloud-based database product allowing user to create custom relational tables and access the content via APIs. The free-tier option allows for 1,200 records a 2GB in the database, plenty for a personal project (even with dozens of heavy images like an artist portfolio). The developer experience for Airtable is wonderful. It's easy to get a new database created, organized, and made accessible to your site. The following sections will cover all of these topics, and make sure you checkout the YouTube video below for additional knowledge.

 <iframe
  title="Use Airtable as a CMS for Gatsby — Learn With Jason"
  src="https://www.youtube.com/embed/x6IA6dfzlcQ" 
  style="border:none" 
  allow="fullscreen" 
  ></iframe>
<figcaption>Jason and Giovanni's Airtable + Gatsby tutorial. 10/10 recommend.</figcaption>

#### Database Schema

In the Portfolio database (or "base" in Airtable lingo), three tables are created that have links to each other:

1. Projects
2. Images
3. Videos

Each record in the Project base has the following fields:

- project title (string)
- project order (integer)
- slug (string)
- cover photo (attached jpeg/png)
- press release (attached PDF)
- Images (linked records from Images base)
- Videos (linked records from Videos base)

Each record in the Images base has the following fields:

- project (linked to a specified record in Projects base)
- image order (integer)
- attachment (attached jpeg/png)
- image title (string)
- image year (string)
- image view (string)
- image location (string)
- image materials (string)
- image dimensions (string)

The same schema exists for records in the Videos base, only with video order, video title, etc., as field names.

#### Connecting Airtable to Gatsby

Each base comes with a built-in API from Airtable along with custom documentation on how to access and query data from a given base. Authentication is token-based, using a `BASE_ID` and `API_KEY`. With those values in hand, we can install a Gatsby plugin called "Gatsby Source Airtable" that will enable GraphQL queries on the data in our Airtable bases.

The "Gatsby Source Filesystem" plugin is also required for the Airtable sourcing to work when attachments are one of the fields in a table. Finally, we'll leverage the Sharp image-processing plugin for sleek blur-up and lazy-loading effects.

`npm install --save gatsby-source-filesystem`

`npm install --save gatsby-source-airtable`

`npm install --save gatsby-transformer-sharp gatsby-plugin-sharp`

We'll also want to install the `dotenv` package so that we can store the Airtables tokens in a `.env` file instead of directly in visible code.

`npm install dotenv`

Once installed, the tables can be configured in the `gatsby-config.js` file:

<!-- prettier-ignore -->
```javascript
require('dotenv').config()

module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: "Images",
            mapping: {attachment: `fileNode`},
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: "Videos",
            mapping: {attachment: `fileNode`},
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: "Projects",
            tableLinks: ["Images", "Videos"]
            mapping: {attachment: `fileNode`},
          },
 
        ]
      }
    }
  ]
}
```

Connecting each table to Gatsby requires its `baseId` (same for all tables in a given base), the `tableName`, and when using attachments, a specification that a node for each of these attached files should be created with the column name `fileNode`, which will then be used in Gatsby's Sharp image plugin (discussed in depth later on). Since the Images and Videos tables are linked to Projects, we also need to specifiy that information in the array value to the `tableLinks` property for the Projects table.

#### GraphQL Queries on Airtable Data

There are two primary queries of data from Airtable in this site:

1. The landing page that displays a title and cover photo for each project

   - This is pulling fields from all projects in the Projects table (e.g. project title and cover photo)

2. Specific project pages that include a gallery of images/videos for that project

   - This is pulling linked data from a specified project in the Project's table (e.g., images and videos linked to a project)

The landing page query occurs in `src/pages/index.js` and uses the built-in `graphql` function from Gatsby. Exporting a graphql query in a Gatsby page component automatically inserts the result of the query as a `data` prop into the component.

Building the GraphQL query is easiest through the GraphiQL Explorer feature, accesible at `http://localhost:8000/___graphql`. One way to tap into the Projects table is by querying all tables in the base, filtering for "Projects", and sorting the projects in ascending order. Once inside Project, we then traverse the nodes in that graph (i.e., each project) to retrieve corresponding cover photos, titles, press releases, and slugs.

**/src/pages/index.js**

<!-- prettier-ignore -->
```javascript
import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components;

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  {
    allAirtable(
      sort: { order: ASC, fields: data___project_order }
      filter: { table: { eq: "Projects" } }
    ) {
      nodes {
        data {
          cover_photo {
            localFiles {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          project_title
          press_release {
            filename
            id
            url
          }
          slug
        }
        recordId
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  // JSX for Index page
}

export default IndexPage;
```

Note how attached images are queried here using ImageSharp nodes from the Sharp image processing library. We specify that each `cover_photo`, which are available on the `localFiles` nodes, is a fluid image that is responsive to its container up to a width of 800px and will blur-up to focus using [Webp](https://using-gatsby-image.gatsbyjs.org/prefer-webp/).

Since the contents of this query are injected into the component as a "data" prop, we can destructure that prop out and then access its nested properties in the JSX.

<!-- prettier-ignore -->
```javascript
import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components;

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  // GraphQL query from above
`;

const IndexPage = ({ data }) => {
  const renderCoverPhotoList = data.allAirtable.nodes.map(node => (
    <li className="project-item" key={node.recordId}>
      <Link className="project-item__link" to={`/${node.data.slug}`}>
        <h2 className="project-item__title">{node.data.project_title}</h2>
        <Img
          alt={node.data.project_title}
          fluid={node.data.cover_photo.localFiles[0].childImageSharp.fluid}
        />
      </Link>
    </li>
  ))
  return (
    <Layout>
      <SEO title="Home" />
      <ProjectWrapper>
        <ul className="project-list">{renderCoverPhotoList}</ul>
      </ProjectWrapper>
    </Layout>
  )
}

const ProjectWrapper = styled.div`
  // CSS for the project wrapper
`
export default IndexPage;
```

The GraphQL query tells us exactly how to retrieve nested properties since it mimics the query structure itself! And note how the Gatsby Image component is created by passing it an `alt` attribute equal to the cover photo's title and `fluid` attribute equal to the `fluid` property of that cover photo.

The end result is a landing page with a list of project title's and cover photos:

![Landing page demo](./post-assets/emanuel-landing-page-demo.gif)

<figcaption>Project titles and blurred-up cover photos sourced from Airtable via GraphQL!</figcaption>

### Programmatically Creating Pages in Gatsby

#### Gatsby Node API

As referenced in the previous section, there's a second major query of data that happens in this site - the query used to generate individual project pages when a user clicks on any cover image on the landing page. This query and the process of creating new project pages requires the [Gatsby Node API](https://www.gatsbyjs.org/docs/node-apis/), which can be utilized in the "gatsby-node.js" file.

The key to this process is [createPages](https://www.gatsbyjs.org/docs/node-apis/#createPages) in the Gatsby Node API. This method tells plugins to add pages based on sourced nodes from Airtable (or any other data source). The two-step process is:

1. Source nodes from Airtable, where nodes are each project
   - Use the `graphql` method made available from the `createPages` API to grab the nodes
2. Map nodes to unique pages based on their slug and by providing a component template for all the content of that page
   - Use the `actions` method - an object containing functions - also made available from the `createPages` API to translate each node to a page

**src/gatsby-node.js**

<!-- prettier-ignore -->
```javascript
const path = require('path');

exports.createPages = async ({ actions, graphql }) => {

  // 1. Query project nodes from Airtable
  // Make sure to grab the slug, which is necessary
  // for the second step of defining a path
  const { data } = await graphql(`
    {
      allAirtable(
        filter: { table: { eq: "Projects" } }
        sort: { order: ASC, fields: data___project_order }
      ) {
        nodes {
          data {
            slug
            project_title
            press_release {
              url
            }
          }
        }
      }
    }
  `)

  // Extract the nodes and rename as projects
  const projects = data.allAirtable.nodes;

  // 2. Map each project to a new page
  projects.forEach((project, index) => {

    // Create next and previous propertyies that will be
    // passed along to each page for next/prev navigation
    const previous = index === projects.length - 1 ? null : projects[index + 1].data
    const next = index === 0 ? null : projects[index - 1].data

    // Create new pages by defining a path and component template
    // Share other properties via the context object
    actions.createPage({
      path: project.data.slug,
      component: path.resolve(`./src/templates/project-template.js`),
      context: {
        slug: project.data.slug,
        projectTitle: project.data.project_title,
        pressRelease: project.data.press_release[0].url,
        previous,
        next,
      },
    })
  })
}
```

#### Page template component

The second major query of data in this site occurs in `/src/templates/project-template.js`, which is slug-specific. In other words, once we create the framework of a new project page (i.e., all the code in `gatbsby-node.js`), we then need to source all the images and videos for that project.

One amazing aspect of GraphQL is its ability to ingest variables that can be used in its queries. In our case, we are querying Airtable for nodes attached to a project's slug. `slug` is a string passed down to `project-template.js` from the context object in `createPage` in `gatsby-node.js`, which is then ingested into the GraphQL query for that specific page.

**/src/templates/project-template.js**

<!-- prettier-ignore -->
```javascript
import React from 'react'
import { graphql, Link } from 'gatsby'

export const query = graphql`
  query($slug: String!) {
    allAirtable(filter: { data: { slug: { eq: $slug } } }) {
      nodes {
        data {
          Images {
            data {
              dimensions
              view
              image_title
              location
              materials
              year(formatString: "YYYY")
              attachment {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 960) {
                      ...GatsbyImageSharpFluid_withWebp
                      aspectRatio
                    }
                  }
                }
              }
            }
            id
          }
          Videos {
            data {
              attachment {
                localFiles {
                  url
                }
              }
              video_title
              year(formatString: "YYYY")
              materials
              length
              dimensions
            }
          }
        }
      }
    }
  }
`

const ProjectTemplate = props => {
  // Extract image and video nodes from Airtable
  const images = props.data.allAirtable.nodes[0].data.Images
  const videos = props.data.allAirtable.nodes[0].data.Videos

  // Remaining JSX
}

export default ProjectTemplate;

```

The code snippet above shows how all the sourced data from Airtable is on the `data` property on the components `props`. Additionally, all properties from the context object passed to this page can be accessed by the `pageContext` property, for instance, `props.pageContext.pressRelease`.

## TODO: add gif showing project page once all data is in Airtable

### Image Gallery and Modal Carousel

#### Flexbox gallery

#### Portals in Gatsby/React

#### Modal and Carousel Components

### Continuous Deployment on Netlify

#### Linking to GitHub

#### Build Commands and Environmental Variables
