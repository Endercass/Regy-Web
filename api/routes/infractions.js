import express from "express";
import isvalid from "isvalid";
var router = express.Router();

const notFound = { message: "404: Not Found", code: 404 };
const invalid = { message: "422: Unprocessable Content", code: 422 };
let infractions = [];

router.get("/", function (req, res, next) {
  res.status(200).json(infractions);
});
router.post("/add", function (req, res, next) {
  console.log(
    `POST to ${req.url} with data: ${JSON.stringify(req.body.infraction)}`
  );
  isvalid(req.body.infraction, {
    regexID: { type: String, required: true },
    message: { type: String, required: true },
    authorID: { type: Number, required: true },
    messageID: { type: Number, required: true },
  })
    .then((data) => {
      let index = infractions.push(data);
      res.status(200).json(infractions[index - 1]);
    })
    .catch((err) => {
      res.status(400).json(invalid);
    });
});
router.get("/*", function (req, res, next) {
  res.status(404).json(notFound);
});

export default router;
