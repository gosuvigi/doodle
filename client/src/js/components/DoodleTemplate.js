/**
 * Created by vigi on 2/6/2016.
 */
import React, { Component, PropTypes } from 'react'
import { Multiselect } from 'react-widgets'

export default class Explore extends Component {
    constructor(props) {
        super(props)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    handleKeyUp(e) {
        this.refs.input.value = val
    }

    render() {
        const { location, dateTime, initiator, players, emailText } = this.props.template
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="location" className="col-sm-2 control-label">Location</label>
                    <div className="col-sm-8">
                        <input type="text" defaultValue={location} ref="location" label="Location"
                               id="location" placeholder="Location" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime" className="col-sm-2 control-label">Date / Time</label>
                    <div className="col-sm-8">
                        <input type="text" defaultValue={dateTime} ref="dateTime" id="dateTime"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="initiator" className="col-sm-2 control-label">Initiator</label>
                    <div className="col-sm-8">
                        <input type="text" defaultValue={initiator} ref="initiator" id="initiator"
                               placeholder="Initiator" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="players" className="col-sm-2 control-label">Players</label>
                    <div className="col-sm-8">
                        <Multiselect defaultValue={players} data={players} ref="players"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>
                    <div className="col-sm-8">
                        <input type="text" defaultValue={emailText} ref="emailText" id="emailText"
                               placeholder="Email Text" className="form-control"/>
                    </div>
                </div>
            </div>
        )
    }
}