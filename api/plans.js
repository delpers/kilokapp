const { getPlans } = require("../src/utils/index")
const cors = require("micro-cors")()
module.exports = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok")
  }
  try {
    const plans = await getPlans()
    return res.json({
      isError: false,
      payload: plans,
    })
  } catch (err) {
    res.status(400).json({
      isError: true,
      payload: err.message,
    })
  }
})
