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
              allContentfulPages(limit: 1000) {
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

          const pageTemplate = path.resolve(`./src/templates/page.js`)
          req.each(result.data.allContentfulPages.edges, edge => {
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
                allContentfulRecipes(limit: 1000) {
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
  
            const recipeTemplate = path.resolve(`./src/templates/recipe-page.js`)
            req.each(result.data.allContentfulRecipes.edges, edge => {
              createPage({
                path: `/recette/${edge.node.slug}`,
                component: slash(recipeTemplate),
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
                allContentfulTraining(limit: 1000) {
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
  
            const trainingTemplate = path.resolve(`./src/templates/training-page.js`)
            req.each(result.data.allContentfulTraining.edges, edge => {
              createPage({
                path: `/training/${edge.node.slug}`,
                component: slash(trainingTemplate),
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
                allContentfulMonth(limit: 1000) {
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
  
            const mounthTemplate = path.resolve(`./src/templates/calandar-page.js`)
            req.each(result.data.allContentfulMonth.edges, edge => {
              createPage({
                path: `/calandar/${edge.node.slug}`,
                component: slash(mounthTemplate),
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
                  allContentfulCookingStarters(limit: 1000) {
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
    
              const entryTemplate = path.resolve(`./src/templates/starters-page.js`)
              req.each(result.data.allContentfulCookingStarters.edges, edge => {
                createPage({
                  path: `/recettes/${edge.node.slug}`,
                  component: slash(entryTemplate),
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
                    allContentfulCookingBreakfasts(limit: 1000) {
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
      
                const breakfastTemplate = path.resolve(`./src/templates/breakfasts-page.js`)
                req.each(result.data.allContentfulCookingBreakfasts.edges, edge => {
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
                  allContentfulCookingPlats(limit: 1000) {
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
    
              const platsTemplate = path.resolve(`./src/templates/plats-page.js`)
              req.each(result.data.allContentfulCookingPlats.edges, edge => {
                createPage({
                  path: `/plats/recettes/${edge.node.slug}`,
                  component: slash(platsTemplate),
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
                  allContentfulCookingDesserts(limit: 1000) {
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
    
              const dessertsTemplate = path.resolve(`./src/templates/desserts-page.js`)
              req.each(result.data.allContentfulCookingDesserts.edges, edge => {
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
                  allContentfulBoosters(limit: 1000) {
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
    
              const boostersTemplate = path.resolve(`./src/templates/boosters-page.js`)
              req.each(result.data.allContentfulBoosters.edges, edge => {
                createPage({
                  path: `/booster/${edge.node.slug}`,
                  component: slash(boostersTemplate),
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
    
              const vegetablesTemplate = path.resolve(`./src/templates/vegetables-page.js`)
              req.each(result.data.allContentfulFruitsVegetables.edges, edge => {
                createPage({
                  path: `/recettes/base/${edge.node.slug}`,
                  component: slash(vegetablesTemplate),
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