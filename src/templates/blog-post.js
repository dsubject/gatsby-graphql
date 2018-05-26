import React from "react";

// this is a page template component
//  used to query for data for each page

export default ({ data }) => {
    const post = data.markdownRemark;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    );
  };

  // pulling in data from markdown post
  
  export const query = graphql`
    query BlogPostQuery($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
          title
        }
      }
    }
  `;