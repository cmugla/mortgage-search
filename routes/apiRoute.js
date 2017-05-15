"use strict";

const apiRouter = require('express').Router()
const { getMortgageData } = require('../models/apiData')

/* GET MORTAGES */
apiRouter.get('/', getMortgageData, function(req, res) {
  res.json(res.results)
})

module.exports = apiRouter;