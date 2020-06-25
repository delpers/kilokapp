require("dotenv").config();
const { unsubscribe } = require("../../src/utils/index");
const cors = require("micro-cors")();
module.exports = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  try {
    if (!req.body.sub_id) {
      return res.status(400).json({
        error: true,
        message: "please input the message",
      });
    }
    const response = await unsubscribe(req.body.sub_id);
    return res.json({
      isError: false,
      payload: response,
    });
  } catch (err) {
    res.status(400).json({
      isError: true,
      payload: err.message,
    });
  }
});
