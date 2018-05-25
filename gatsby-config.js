module.exports = {
    // tossing in a dynamic title
        siteMetadata: {
          title: `Blah Blah Fake Title`,
        },
    plugins: [
      `gatsby-plugin-glamor`,
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography`,
        },
      },
    ],
  };