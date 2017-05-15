import React, { Component } from 'react'

export default class SelectOption extends Component {
  state={}

  handleClickOption = async () => {
    await this.props.onClick(this.props.option.value)
  }

  render() {
    const { option } = this.props

    return (
      <option value={option.value}>{option.label}</option>
    )
  }
}