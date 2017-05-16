import React, { Component } from 'react'

export default class FilterItem extends Component {
	state={}

	handleClickFilter = e => {
		this.props.filter(this.props.path, e.target.value, e.target.checked)
	}

	render() {
		const { option } = this.props

		return (
			<div className="each-filter">
        <input
          type="checkbox"
          id={option.value}
          value={option.value}
          name={option.label}
          onChange={this.handleClickFilter}
        />
        <label htmlFor={option.value}>{option.label}</label>
      </div>
		)
	}
}