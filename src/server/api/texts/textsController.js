import Texts from './textsModel'

const getList = (req, res, next) => {
  Texts.find()
    .then(texts => res.json(texts))
    .catch(next)
}

const getItem = (req, res, next) => {
  Texts.findById(req.params.id)
    .then(text => res.json(text))
    .catch(next)
}

const createItem = (req, res, next) => {
  Texts.create(req.body)
    .then(text => res.status(201).send(text))
    .catch(next)
}

const updateItem = (req, res, next) => {
  Texts.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(204).send())
    .catch(next)
}

const deleteItem = (req, res, next) => {
  Texts.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send())
    .catch(next)
}

const textsController = {
  getList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
}

export default textsController
