// @flow

import express from 'express'

import controller from './textsController'

const router = express.Router()

router.route('/')
  .get(controller.getList)
  .post(controller.createItem)

router.route('/:id')
  .get(controller.getItem)
  .put(controller.updateItem)
  .delete(controller.deleteItem)

export default router
