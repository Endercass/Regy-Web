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
    messageID: { type: Number, required: true },
    author: {
      type: Object,
      required: true,
      schema: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        pfpURL: { type: String, required: true },
      },
    },
  })
    .then((data) => {
      let index = infractions.push(data);
      res.status(200).json(infractions[index - 1]);
    })
    .catch((err) => {
      res.status(422).json(invalid);
    });
});
router.post("/rm", function (req, res, next) {
  console.log(
    `POST to ${req.url} with data: ${JSON.stringify(req.body.infraction)}`
  );
  isvalid(req.body, {
    index: { type: Number, required: true },
  })
    .then((data) => {
      infractions.splice(data.index, 1);
      res
        .status(200)
        .json({ message: "Successfully removed infraction.", code: 200 });
    })
    .catch((err) => {
      res.status(422).json(invalid);
    });
});
router.get("/*", function (req, res, next) {
  res.status(404).json(notFound);
});

export default router;
