import React, { Component } from 'react'
var dayjs = require('dayjs')


export default class InputArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: dayjs().format("YYYY-MM-DD"),
            startTime: dayjs().hour(12).minute(0).format("HH:mm"),
            endTime: dayjs().hour(19).minute(30).format("HH:mm"),
        }
        this.getInputValues = this.getInputValues.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //convert to date objects, send to App
    handleSubmit() {
        let startDate = new Date(dayjs(this.state.startDate))
        let startTime = new Date(dayjs(startDate).hour(this.state.startTime.split(":")[0]).minute(this.state.startTime.split(":")[1]))
        let endTime = new Date(dayjs(startDate).hour(this.state.endTime.split(":")[0]).minute(this.state.endTime.split(":")[1]))
        this.props.updateState(startDate, startTime, endTime)
        //This doesn't work yet: the input field does not update the visible value
        /* this.setState({
            startDate: dayjs(startDate).add(1, "day")
        }) */
    }

    //update input values to state
    getInputValues(event) {
        let value = event.target.value
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }

    render() {
        return (
            <div id="inputArea">
                <input id="inputDateEl" defaultValue={this.state.startDate} autoFocus name="startDate" onChange={this.getInputValues} type="date" />
                <input id="inputStartTimeEl" defaultValue={this.state.startTime} name="startTime" onChange={this.getInputValues} type="time" />
                <input id="inputEndTimeEl" defaultValue={this.state.endTime} name="endTime" onChange={this.getInputValues} type="time" />
                <button id="submitButton" onClick={this.handleSubmit}>ADD SHIFT</button>
            </div>
        )
    }
}
