import React, { Component } from 'react'

import sortOptions from '../data/sortOptions.js'
import filterOptions from '../data/filterOptions.js'

import FilterItem from './FilterItem.js'

export default class SortFilter extends Component {
  render() {
    const { sortResults, handleFilter, sortValue } = this.props

    return (
      <div className="sort-filter-container">
        <div className="sort-container">
          <h4>Sort by...</h4>
          {
            sortOptions
            &&
            <select onChange={sortResults} value={sortValue}>
              {
                sortOptions.map((each, i) => (
                  <option
                    key={`sort-option-${i}`}
                    value={each.value}
                  >
                    {each.label}
                  </option>
                ))
              }
            </select>
          }
        </div>
        <div className="filter-container">
          <h4>Filter by...</h4>
          {
            filterOptions
            &&
            filterOptions.map((each, i) => (
              <div key={`filter-${i}`} className="each-filter-container">
                <p>{each.label}</p>
                {
                  each.options.map((option, j) => (
                    <FilterItem 
                      key={`filter-item-${j}`}
                      option={option}
                      path={each.type}
                      filter={handleFilter}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}