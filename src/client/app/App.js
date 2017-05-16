import '../css/base.css'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { orderBy, get } from 'lodash'

import SortFilter from './SortFilter.js'

import AjaxAdapter from '../helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch)

export default class App extends Component {
  state={
    loanAmount: '',
    results: null,
    sortValue: '',
    isSearching: false,
    filterObject: {
      default: [
        {
          value: 'all'
        }
      ],
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    ajax.getMortgageData(this.state.loanAmount).then(data => {
      this.setState({
        rawData: data,
        results: data,
        isSearching: true
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

    window.scrollTo( 0, 0 );
  }

  getFilteredResults = (rawData, filter) => rawData.filter(each => {
    if(!filter.path) {
      return filter.value
    }
    return each[filter.path] === filter.value
  })

  recursiveFilter = (results, filterObj) => {
    const filterObject = { ...filterObj }
    for (let key in filterObject) {
      // AND keys
      const newResults = []
      for (let i = 0; i < filterObject[key].length; i++) {
        // OR options
        newResults.push(...this.getFilteredResults(results, filterObject[key][i]))
      }
      // remove the key from filterObj that has already been added
      delete filterObject[key]
      return this.recursiveFilter(newResults, filterObject)
    }
    return results
  }

  handleFilter = async (path, value, isChecked) => {
    if(this.state.filterObject[path] && this.state.filterObject[path].length) {
      let currentFilterArray = [ ...this.state.filterObject[path] ]
      
      let newFilterArray = [ ...currentFilterArray, { value, path } ]
      if(!isChecked) {
        newFilterArray = currentFilterArray.filter(each => (each.value !== value))
      }

      let newFilterObject = {
        ...this.state.filterObject,
        [path]: newFilterArray,
      }

      if (!newFilterArray.length) {
        delete newFilterObject[path]
      }
      
      await this.setState({
        filterObject: newFilterObject
      })
    } else {
      await this.setState({
        filterObject: {
          ...this.state.filterObject,
          [path]: [
            { value, path }
          ]
        }
      })
    }

    let filteredResults = await this.recursiveFilter(this.state.rawData, this.state.filterObject)

    this.setState({
      results: filteredResults
    })
    
    window.scrollTo( 0, 0 );
  }

  render () {
    const { loanAmount, results, sortValue, filterObject, isSearching } = this.state

    return (
      <div className={!isSearching ? 'hero': ''}>
        <header>
          <h1>Mortgage Search and Sort</h1>
          <form onSubmit={this.handleSubmit} >
            <input className="loan-amt-input" placeholder="Enter loan amount" value={loanAmount} onChange={this.updateLoanAmt} />
            <button type="submit">SEARCH</button>
          </form>
        </header>
        {
          results
          &&
          <SortFilter
            sortResults={this.sortResults}
            sortValue={sortValue}
            handleFilter={this.handleFilter}
          />
        }
        <ul className="results-container">
          {
            results
            &&
            results.length > 0
            &&
            results.map((each, i) => (
              <li key={`results-${i}`} className="each-result">
                <h4>{each.lender.name}</h4>
                <div className="results-info">
                  <p>interest rate: {(each.interest_rate * 100).toFixed(2)}%</p>
                  <p>rate type: {each.rate_type}</p>
                  <p>${each.monthly_payment}/month</p>
                </div>
              </li>
            ))
          }
          {
            isSearching
            &&
            (!results || !results.length)
            &&
            <li>Sorry, no loan products available for that loan amount.</li>
          }
        </ul>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
