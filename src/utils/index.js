const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

console.log(process.env)

const bluebird = require("bluebird")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const _ = require("lodash")
export const getProducts = async ids => {
  console.log(ids)
  const listProducts = bluebird.promisify(stripe.products.list, {
    context: stripe.products,
  })
  const response = await listProducts({
    ids: ids,
  })
  const products = response.data
  return products
}

export const getPlans = async () => {
  const listPlans = bluebird.promisify(stripe.plans.list, {
    context: stripe.plans,
  })
  const res = await listPlans()
  const plans = res.data
  const productIds = plans.map(plan => plan.product)
  const products = await getProducts(productIds)
  console.log(products)
  const fullyPlans = plans.map(plan => {
    const productId = plan.product
    plan.product = _.find(products, {
      id: productId,
    })
    return plan
  })
  return fullyPlans
}

export const unsubscribe = id => {
  const updateSubscription = bluebird.promisify(stripe.subscriptions.update, {
    context: stripe.subscriptions,
  })
  return updateSubscription(id, {
    cancel_at_period_end: true,
  })
}

export const getCustomerByEmail = async email => {
  const listCustomers = bluebird.promisify(stripe.customers.list, {
    context: stripe.customers,
  })
  const response = await listCustomers({
    email,
    limit: 1,
  })
  if (!response || !response.data || response.data.length === 0) {
    return null
  }
  const customer = response.data[0]
  if (customer.subscriptions && customer.subscriptions.data.length > 0) {
    customer["subscriptions"] = customer.subscriptions.data[0]
  }
  return customer
}
