const makeId = require("../shortId");
const URL = require("../models/url");
async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ err: "Url is required" });
  }
  const shortId = makeId(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    timestamps: [],
  });
  return res.json({
    shortId: shortId,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics,
};
