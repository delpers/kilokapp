require("dotenv").config();
const { getCustomerByEmail } = require("../../src/utils");
const cors = require("micro-cors")();
module.exports = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  try {
    if (!req.body.email) {
      return res.status(400).json({
        error: true,
        message: "please input the customer email",
      });
    }
    const customer = await getCustomerByEmail(req.body.email);
    return res.json({
      isError: false,
      payload: customer,
    });
  } catch (err) {
    res.status(400).json({
      isError: true,
      payload: err.message,
    });
  }
});
