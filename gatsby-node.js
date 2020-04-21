const req = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allContentfulBlogPost(limit: 1000) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    )

      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const postTemplate = path.resolve(`./src/templates/blog-post.js`)

        req.each(result.data.allContentfulBlogPost.edges, edge => {
          createPage({
            path: `/blog/${edge.node.slug}`,
            component: slash(postTemplate),
            context: {
              id: edge.node.id,
              slug: edge.node.slug,
            },
          })
        })
      })









      .then(() => {
        graphql(
          `
            {
              allContentfulPage(limit: 1000) {
                edges {
                  node {
                    id
                    slug
                  }
                }
              }
            }
          `
        )
        
        .then(result => {
          if (result.errors) {
            reject(result.errors)
          }

          const pageTemplate = path.resolve(`./src/templates/blog-page.js`)
          req.each(result.data.allContentfulPage.edges, edge => {
            createPage({
              path: `/page/${edge.node.slug}`,
              component: slash(pageTemplate),
              context: {
                id: edge.node.id,
                slug: edge.node.slug,
              },
            })
          })
        })


        .then(() => {
          graphql(
            `
              {
                allContentfulCookingRecipe(limit: 1000) {
                  edges {
                    node {
                      id
                      slug
                    }
                  }
                }
              }
            `
          )
          
          .then(result => {
            if (result.errors) {
              reject(result.errors)
            }
  
            const pageTemplate = path.resolve(`./src/templates/e-recipe-page.js`)
            req.each(result.data.allContentfulCookingRecipe.edges, edge => {
              createPage({
                path: `/recette/${edge.node.slug}`,
                component: slash(pageTemplate),
                context: {
                  id: edge.node.id,
                  slug: edge.node.slug,
                },
              })
            })
          })
        })


          .then(() => {
            graphql(
              `
                {
                  allContentfulCookingE(limit: 1000) {
                    edges {
                      node {
                        id
                        slug
                      }
                    }
                  }
                }
              `
            )
            
            .then(result => {
              if (result.errors) {
                reject(result.errors)
              }
    
              const entrancesTemplate = path.resolve(`./src/templates/e-page.js`)
              req.each(result.data.allContentfulCookingE.edges, edge => {
                createPage({
                  path: `/recettes/${edge.node.slug}`,
                  component: slash(entrancesTemplate),
                  context: {
                    id: edge.node.id,
                    slug: edge.node.slug,
                  },
                })
              })
    
            })

    
    

            .then(() => {
              graphql(
                `
                  {
                    allContentfulCookingB(limit: 1000) {
                      edges {
                        node {
                          id
                          slug
                        }
                      }
                    }
                  }
                `
              )
              
              .then(result => {
                if (result.errors) {
                  reject(result.errors)
                }
      
                const breakfastTemplate = path.resolve(`./src/templates/breakfast-page.js`)
                req.each(result.data.allContentfulCookingB.edges, edge => {
                  createPage({
                    path: `/breakfast/recettes/${edge.node.slug}`,
                    component: slash(breakfastTemplate),
                    context: {
                      id: edge.node.id,
                      slug: edge.node.slug,
                    },
                  })
                })
      
              })
            })
  

      .then(() => {
            graphql(
              `
                {
                  allContentfulCookingP(limit: 1000) {
                    edges {
                      node {
                        id
                        slug
                      }
                    }
                  }
                }
              `
            )
            
            .then(result => {
              if (result.errors) {
                reject(result.errors)
              }
    
              const dishesTemplate = path.resolve(`./src/templates/p-page.js`)
              req.each(result.data.allContentfulCookingP.edges, edge => {
                createPage({
                  path: `/dishes/recettes/${edge.node.slug}`,
                  component: slash(dishesTemplate),
                  context: {
                    id: edge.node.id,
                    slug: edge.node.slug,
                  },
                })
              })
    
            })
       })




      .then(() => {
            graphql(
              `
                {
                  allContentfulCookingD(limit: 1000) {
                    edges {
                      node {
                        id
                        slug
                      }
                    }
                  }
                }
              `
            )
            
            .then(result => {
              if (result.errors) {
                reject(result.errors)
              }
    
              const dessertsTemplate = path.resolve(`./src/templates/d-page.js`)
              req.each(result.data.allContentfulCookingD.edges, edge => {
                createPage({
                  path: `/desserts/recettes/${edge.node.slug}`,
                  component: slash(dessertsTemplate),
                  context: {
                    id: edge.node.id,
                    slug: edge.node.slug,
                  },
                })
              })
    
            })
       })







      .then(() => {
            graphql(
              `
                {
                  allContentfulBooster(limit: 1000) {
                    edges {
                      node {
                        id
                        slug
                      }
                    }
                  }
                }
              `
            )
            
            .then(result => {
              if (result.errors) {
                reject(result.errors)
              }
    
              const boosterTemplate = path.resolve(`./src/templates/b-page.js`)
              req.each(result.data.allContentfulBooster.edges, edge => {
                createPage({
                  path: `/booster/${edge.node.slug}`,
                  component: slash(boosterTemplate),
                  context: {
                    id: edge.node.id,
                    slug: edge.node.slug,
                  },
                })
              })
    
            })
       })




          .then(() => {
            graphql(
              `
                {
                  allContentfulFruitsVegetables(limit: 1000) {
                    edges {
                      node {
                        id
                        slug
                      }
                    }
                  }
                }
              `
            )
            
            .then(result => {
              if (result.errors) {
                reject(result.errors)
              }
    
              const entrancesTemplate = path.resolve(`./src/templates/recipes-page.js`)
              req.each(result.data.allContentfulFruitsVegetables.edges, edge => {
                createPage({
                  path: `/recettes/base/${edge.node.slug}`,
                  component: slash(entrancesTemplate),
                  context: {
                    id: edge.node.id,
                    slug: edge.node.slug,
                  },
                })
              })
    
            })
      })
    




          resolve()
        })
      })
  })
}