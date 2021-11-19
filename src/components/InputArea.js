import React, { Component } from 'react'
var dayjs = require('dayjs')


export default class InputArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: Date,
            startTime: "",
            endTime: ""
        }
        this.getInputValues = this.getInputValues.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        let startDate = new Date(dayjs(this.state.startDate))
        let startTime = new Date(dayjs(startDate).hour(this.state.startTime.split(":")[0]).minute(this.state.startTime.split(":")[1]))
        let endTime = new Date(dayjs(startDate).hour(this.state.endTime.split(":")[0]).minute(this.state.endTime.split(":")[1]))
        this.setState({
            startDate: startDate,
            startTime: startTime,
            endTime: endTime
        })
        console.log(this.state)
    }

    getInputValues(event) {
       let value = event.target.value
       this.setState({
           ...this.state, 
           [event.target.name]: value})
    }

    render() {
        return (
            <div id="inputArea">
                <input id="inputDateEl" name="startDate" onChange={this.getInputValues} type="date" />
                <input id="inputStartTimeEl" name="startTime" onChange={this.getInputValues} type="time" />
                <input id="inputEndTimeEl" name="endTime" onChange={this.getInputValues} type="time" />
                <button id="submitButton" onClick={this.handleSubmit}>ADD SHIFT</button>
            </div>
        )
    }
}
