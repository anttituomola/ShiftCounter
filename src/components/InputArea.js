import React, { Component } from 'react'
import "../index.css"
import { DatePicker } from 'react-dayjs-picker'
import 'react-dayjs-picker/dist/index.css'
var dayjs = require('dayjs')


export default class InputArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: dayjs(),
            startTime: dayjs().hour(12).minute(0).format("HH:mm"),
            endTime: dayjs().hour(19).minute(30).format("HH:mm"),
            calendarOpen: false
        }
        this.getInputValues = this.getInputValues.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updatePickerValue = this.updatePickerValue.bind(this)
        this.calendarOpen = this.calendarOpen.bind(this)
        this.listenForEnter = this.listenForEnter.bind(this)
    }

    //convert to date objects, send to App
    handleSubmit() {
        let startDate = new Date(dayjs(this.state.startDate))
        let startTime = new Date(dayjs(startDate).hour(this.state.startTime.split(":")[0]).minute(this.state.startTime.split(":")[1]))
        let endTime = new Date(dayjs(startDate).hour(this.state.endTime.split(":")[0]).minute(this.state.endTime.split(":")[1]))
        this.props.updateState(startDate, startTime, endTime)
        this.setState({
            startDate: dayjs(startDate).add(1, "day")
        })
    }

    //update input values to state
    getInputValues(event) {
        let value = event.target.value
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }

    //I needed to do another function for the date picker, as the one above didn't work for it
    updatePickerValue(date) {
        this.setState({
            startDate: date
        })
    }

    //toggle the visibility of the calendar
    calendarOpen() {
        this.setState(prevState => ({
            calendarOpen: !prevState.calendarOpen
        }))
    }

    listenForEnter(event) {
        if(event.key === "Enter") {
            this.handleSubmit()
        }
    }

    render() {
        return (
            <div id="inputArea">
                <DatePicker 
                    date={this.state.startDate} 
                    isOpen={this.state.calendarOpen} 
                    setIsOpen={this.calendarOpen} 
                    closeOnSelect={true} 
                    name="startDate" 
                    onSelect={(date) => this.updatePickerValue(date)} 
                />
                <div id="timeInputElements">
                    <input id="inputStartTimeEl" defaultValue={this.state.startTime} name="startTime" onChange={this.getInputValues} type="time" onKeyPress={this.listenForEnter}/>
                    <input id="inputEndTimeEl" defaultValue={this.state.endTime} name="endTime" onChange={this.getInputValues} type="time" onKeyPress={this.listenForEnter}/>
                </div>
                <button id="submitButton" onClick={this.handleSubmit}>ADD SHIFT</button>
            </div>
        )
    }
}
