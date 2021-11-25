import React, { Component } from 'react'
import {FiDelete} from "react-icons/fi"
import "../index.css"
const dayjs = require('dayjs')
const { v4 } = require('uuid');


export default class RenderArea extends Component {
    render() {
        let shifts = this.props.shifts
        if (shifts[0]) {
            let shiftsRender = shifts.map((shift) => {
                return <div class="shiftRow" key={v4()}>
                            <span className="shiftDateText">{dayjs(shift.date).format("DD.MM.YYYY")}: {shift.hours} hours</span>
                            <FiDelete className="deleteIcon" id={shift.id} onClick={() => this.props.deleteShift(shift.id)}/>
                        </div>
            })
            return (
                <div id="renderEl">
                    {shiftsRender}
                </div>
            )


        } else {
            return null
        }
    }
}
