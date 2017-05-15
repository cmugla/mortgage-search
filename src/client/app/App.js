import '../css/base.css'
import React, { Component } from 'react'
import { render } from 'react-dom'

import AjaxAdapter from '../helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch)

export default class App extends Component {
  state={
    loanAmount: '',
    results: null,
  }

  handleSubmit = e => {
    e.preventDefault()

    ajax.getMortgageData(this.state.loanAmount).then(data => {
      this.setState({
        results: data
      })
    })
  }

  updateLoanAmt = e => {
    this.setState({
      loanAmount: e.target.value
    })
  }

  render () {
    console.log("you're excellent");
    console.log("\n.-        -.\n| ,-. ,-.  |\n| |   | |  |\n| `-' `-|  |\n`-     ,| -'\n       `'    ")

    const { loanAmount, results } = this.state

    return (
      <div>
        <h1>Mortgage Search and Sort</h1>
        <form onSubmit={this.handleSubmit} >
          <input placeholder="Enter loan amount" value={loanAmount} onChange={this.updateLoanAmt} />
          <button type="submit">SEARCH</button>
        </form>
        <ul>
          {
            results
            &&
            results.length > 0
            &&
            results.map((each, i) => (
              <li key={`results-${i}`}>{each.lender.name}</li>
            ))
          }
          {
            (!results || !results.length)
            &&
            <li>No results.</li>
          }
        </ul>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
