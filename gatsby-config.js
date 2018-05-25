module.exports = {
    // tossing in a dynamic title
        siteMetadata: {
          title: `Dani's Fake Title`,
        },
    plugins: [
        {
          // this plugin is always scanning for new files to be added...
          // when they are, the queries re-run automatically
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `src`,
              path: `${__dirname}/src/`,
            },
          },
          // gatsby-transformer-remark plugin transforms Markdown files
          `gatsby-transformer-remark`,
          `gatsby-plugin-glamor`,
          {
            resolve: `gatsby-plugin-typography`,
            options: {
              pathToConfigModule: `src/utils/typography`,
            },
          },
        ],
      };

// source plugins bring data into Gatsby's data system and transformer plugins
//  transform raw content brought by source plugins