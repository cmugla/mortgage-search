import React, { Component } from 'react'

export default class SelectOption extends Component {
  state={}

  render() {
    const { option } = this.props

    return (
      <option value={option.value}>{option.label}</option>
    )
  }
}