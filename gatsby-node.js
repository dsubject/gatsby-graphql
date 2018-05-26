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
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode, basePath: `pages` }))
  }
};