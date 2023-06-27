const Amadeus = require("amadeus");
const router = require("express").Router();


const { CLIENT_ID, CLIENT_SECRET } = require('./config');

const API = `api`;

const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
});

router.get(`/${API}/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;

  try {
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": page * 10
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

module.exports = router;
