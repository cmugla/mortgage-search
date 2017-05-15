import '../css/base.css'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { orderBy } from 'lodash'

import sortOptions from '../data/sortOptions.js'

import SelectOption from './SelectOption.js'

import AjaxAdapter from '../helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch)

export default class App extends Component {
  state={
    loanAmount: '',
    results: null,
    sortValue: '',
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

  sortResults = e => {
    const val = e.target.value
    let sortedResults = orderBy(this.state.results, [val], ['asc'])

    this.setState({
      sortValue: val,
      results: sortedResults
    })
  }

  render () {
    console.log("you're excellent");
    console.log("\n.-        -.\n| ,-. ,-.  |\n| |   | |  |\n| `-' `-|  |\n`-     ,| -'\n       `'    ")

    const { loanAmount, results, sortValue } = this.state

    console.log('results', results)

    return (
      <div>
        <h1>Mortgage Search and Sort</h1>
        <form onSubmit={this.handleSubmit} >
          <input placeholder="Enter loan amount" value={loanAmount} onChange={this.updateLoanAmt} />
          <button type="submit">SEARCH</button>
        </form>
        {
          sortOptions
          &&
          <select onChange={this.sortResults} value={sortValue}>
            {
              sortOptions.map((each, i) => (
                <SelectOption
                  key={`sort-option-${i}`}
                  option={each}
                  onClick={this.sortResults}
                />
              ))
            }
          </select>
        }
        <ul>
          {
            results
            &&
            results.length > 0
            &&
            results.map((each, i) => (
              <li key={`results-${i}`}>
                {each.lender.name}<br/>
                {each.interest_rate}<br/>
                {each.monthly_payment}
              </li>
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
