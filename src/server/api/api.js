// @flow

import express from 'express'

import textsRoutes from './texts/textsRoutes'

const router = express.Router()

router.use('/texts', textsRoutes)

export default router
