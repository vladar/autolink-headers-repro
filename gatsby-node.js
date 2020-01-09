const { createFilePath } = require(`gatsby-source-filesystem`)

const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({ node, name: `slug`, value: slug })
  }
}
// Implement the Gatsby API `createPages`.
// This is called after the Gatsby bootstrap is finished
// so you have access to any information necessary to
// programatically create pages.
exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const pages = data.allMarkdownRemark.edges.map(p => p.node)

  pages.forEach(page => {
    actions.createPage({
      path: page.fields.slug,
      component: path.resolve(`src/templates/page.js`),
      context: { id: page.id },
    })
  })
}
