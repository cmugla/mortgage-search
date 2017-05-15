const request = require('request');

function getMortgageData(req, res, next) {
  const url = `http://morty.mockable.io/quotes?loan_amount=${req.query.loan_amount}`

  request({
    url,
    method: 'get',
    json: true,
  },(err, response, body)=>{
    if(err) throw err;
    res.results = body;
    next();
  })
}


module.exports = { getMortgageData }