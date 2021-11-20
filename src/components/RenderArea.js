import React, { Component } from 'react'

export default class RenderArea extends Component {
    render() {
        if(this.props.shifts[0]) {
            let shiftsArray = Array.from(this.props.shifts)
            let shifts = shiftsArray.map(shift => {
                return shift.hours
            })

            return (
                <div>
                   {shifts}
                </div>
            )
        } else {
            return null
        }
    }
}
