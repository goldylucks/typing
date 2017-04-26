const middleware404 = (req, res) => {
  res.status(404).send('oh no! resource not found! :(')
}

export default middleware404
