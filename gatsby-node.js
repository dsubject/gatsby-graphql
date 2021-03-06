// this function will be called by Gatsby whenever a new
//  node is created or updated


// old function
/* exports.onCreateNode = ({ node }) => {
    console.log(node.internal.type);
  }; */


// new function that now only looks at MarkdownRemark nodes
/* exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    // traversing the "node graph" to its parent File node
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)
  }
}; */


// now using gatsby-source-filesystem plugin to create slugs

// this function handles finding the parent File node along with
//  creating the slug
/* const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode, basePath: `pages` }))
  }
}; */


// now both creating slugs with plugin and adding the 
//  new slugs directly onto the MarkdownRemark nodes... once the
//  data is added to nodes it's available to query later with
//  GraphQL
const path = require(`path`);

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
  // createNodeField function allows us to create additional fields on 
  //  nodes created by other plugins  
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
};

//Only the original creator of a node can directly modify the node—all other plugins (including our gatsby-node.js) must use this function to create additional fields.


// telling Gatsby about our pages below (their paths, template component etc)
// using this graphql function to query for the Markdown slugs we just created and then logging result of the query

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      //console.log(JSON.stringify(result, null, 4))
      resolve()
    })
  })
};

