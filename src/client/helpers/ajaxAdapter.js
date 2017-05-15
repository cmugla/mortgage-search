export default class AjaxAdapter{
  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  }

  getMortgageData(loan_amount){
    return fetch(`/api?loan_amount=${loan_amount}`).then(r => r.json())
  }
}