module.exports = function (req, res) {
  res.status(404)
  res.send({ error: 'Oh my! Resource not found :(' })
}
