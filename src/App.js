import InputArea from "./components/InputArea";
import RenderArea from "./components/RenderArea";
import React, { Component } from "react";
import "./index.css"
var dayjs = require('dayjs')
const { v4 } = require('uuid');

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: Date,
      startTime: "",
      endTime: "",
      shifts: []
    }
    this.updateState = this.updateState.bind(this)
    this.deleteShift = this.deleteShift.bind(this)
  }

  //get values from InputArea, calulate a shitf and update state
  updateState(startDate, startTime, endTime) {
    const hours = dayjs(endTime).diff(dayjs(startTime), "hours", true)
    const aShift = {
      date: startDate,
      hours: hours,
      id: v4()
    }
    this.setState({
      startDate: startDate,
      startTime: startTime,
      endTime: endTime,
      shifts: [...this.state.shifts, aShift]
    })
  }

  deleteShift(id) {
    const shifts = this.state.shifts
    shifts.map((shift) => {
      if (shift.id === id) {
        this.setState({
          shifts: this.state.shifts.filter(shift => shift.id !== id)
        })
      }
    })
  }


  render() {
    return (
      <div className="App">
        <InputArea updateState={this.updateState} />
        <RenderArea shifts={this.state.shifts} deleteShift={this.deleteShift} />
      </div>
    )
  }
}



