/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const paginateResults = ({ edges, numberPerPage, createPage, slug, componentPath, count, context }) => {
  context = context || {};
  const totalCount = !!edges ? edges.length : count;
  const numOfPagesCat = Math.ceil(totalCount / numberPerPage);
  Array.from({ length: numOfPagesCat }).forEach((_, ndx) => {
    createPage({
      path: ndx === 0 ? `${slug}` : `${slug}/${ndx + 1}`,
      component: path.resolve(componentPath),
      context: {
        limit: numberPerPage,
        skip: ndx * numberPerPage,
        numOfPages: numOfPagesCat,
        currentPage: ndx + 1,
        ...context,
      }
    });
  })
}

const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`{
     services: allWpService {
    nodes {
      slug
      title
      databaseId
      servicesFields {
        tags {
          tag
        }
      }
    }
  }
  projects: allWpProject {
    nodes {
      slug
      title
      databaseId
      tags {
        nodes {
          name
        }
      }
    }
  }
}`);
  result.data.services.nodes.map((node) => {
    const tags = node.servicesFields.tags ? node.servicesFields.tags.reduce((acc, tag) => {
      // tag.tag
      return [tag.tag, tag.tag.toLowerCase(), ...acc];
    }, []) : [];
    actions.createPage({
      path: `/solutions/${node.slug}`,
      component: path.resolve("./src/templates/solutions.js"),
      context: {
        id: node.databaseId,
        tags: tags,
      }
    });
  });
  result.data.projects.nodes.map((node) => {
    const tags = node.tags ? node.tags.nodes.reduce((acc, tag) => {
      // tag.tag
      return [tag.name, tag.name.toLowerCase(), ...acc];
    }, []) : [];
    actions.createPage({
      path: `/projects/${node.slug}`,
      component: path.resolve("./src/templates/project.js"),
      context: {
        id: node.databaseId,
        tags: tags,
      }
    });
  });
}
//   const result = await graphql(`{
//     projects: allWordpressWpProject(sort: {order: DESC, fields: date}) {
//       edges {
//         node {
//           slug
//           wordpress_id
//         }
//       }
//     }
//     services: allWordpressWpServices(sort: {order: DESC, fields: date}) {
//       edges {
//         node {
//           acf {
//             page_layout
//           }
//           slug
//           wordpress_id
//         }
//       }
//     }
//     categories: allWordpressCategory {
//       nodes {
//         slug
//         count
//         description
//         name
//       }
//     }
//     tags: allWordpressTag {
//       nodes {
//         name
//         slug
//         wordpress_id
//         description
//         count
//       }
//     }
//   }`);

//   const numberPerPage = 6;

//   paginateResults({
//     edges: result.data.projects.edges,
//     numberPerPage,
//     slug: "/projects",
//     createPage: actions.createPage,
//     componentPath: "./src/templates/projectHub.js",
//   });

//   result.data.categories.nodes.forEach((category) => {
//     if (category.count === 0) {
//       return;
//     }
//     paginateResults({
//       count: category.count,
//       numberPerPage,
//       slug: `/blog/${category.slug}`,
//       createPage: actions.createPage,
//       componentPath: "./src/templates/blogHub.js",
//       context: {
//         ...category,
//       },
//     });
//   });


//   result.data.tags.nodes.forEach(tag => {
//     if (tag.count === 0) {
//       return null;
//     }
//     paginateResults({
//       count: tag.count,
//       numberPerPage,
//       slug: `/tags/${tag.slug}`,
//       createPage: actions.createPage,
//       componentPath: "./src/templates/tags.js",
//       context: {
//         ...tag,
//       }
//     });
//   });

//   result.data.projects.edges.forEach(({ node }) => {
//     actions.createPage({
//       path: `/projects/${node.slug}`,
//       component: path.resolve("./src/templates/project.js"),
//       context: {
//         id: node.wordpress_id,
//       }
//     })
//   });

//   result.data.services.edges.forEach(({ node }) => {
//     const template = node.acf.page_layout === "one" ? "./src/templates/oneColumnService.js" : "./src/templates/twoColumnService.js"
    // actions.createPage({
    //   path: `/services/${node.slug}`,
    //   component: path.resolve(template),
    //   context: {
    //     id: node.wordpress_id,
    //   }
    // })
//   });

//   result.data.posts = {};
//   result.data.posts.nodes = [];
//   paginateResults({
//     numberPerPage,
//     edges: result.data.posts.nodes,
//     createPage: actions.createPage,
//     componentPath: path.resolve("./src/templates/blogHub.js"),
//     slug: "/blog/",
//     context: {
//       name: "Our latest posts",
//       description: "",
//       category: "",
//       useAll: true,
//     }
//   });

//   result.data.posts.nodes.forEach((node) => {
//     const category = node.categories[0].slug;
//     actions.createPage({
//       path: `/blog/${category}/${node.slug}`,
//       component: path.resolve("./src/templates/blog.js"),
//       context: {
//         id: node.wordpress_id,
//       }
//     });
//   });
// }