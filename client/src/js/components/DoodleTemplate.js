/**
 * Created by vigi on 2/6/2016.
 */
import React, { Component, PropTypes } from 'react'
import { Multiselect, DateTimePicker } from 'react-widgets'
var momentLocalizer = require('react-widgets/lib/localizers/moment')
import Moment from 'moment'

export default class DoodleTemplate extends Component {

    constructor(props) {
        super(props)
        momentLocalizer(Moment)
    }

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    handleChangePlayers(players) {
        this.props.handleChangePlayers(players)
    }

    render() {
        const { location, dateTime, initiator, players, emailText } = this.props.template
        const allPlayers = this.props.allPlayers
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="location" className="col-sm-2 control-label">Location</label>
                    <div className="col-sm-8">
                        <input type="text" value={location} ref="location" label="Location"
                               id="location" placeholder="Location" className="form-control"
                               onChange={this.handleChange.bind(this, 'location')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime" className="col-sm-2 control-label">Date / Time</label>
                    <div className="col-sm-4">
                        <DateTimePicker format='MMMM Do YYYY, h:mm a' type="text" value={dateTime}
                                        ref="dateTime" id="dateTime"
                                        onChange={this.handleChange.bind(this, 'dateTime')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="initiator" className="col-sm-2 control-label">Initiator</label>
                    <div className="col-sm-8">
                        <input type="text" value={initiator} ref="initiator" id="initiator"
                               placeholder="Initiator" className="form-control"
                               onChange={this.handleChange.bind(this, 'initiator')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="players" className="col-sm-2 control-label">Players</label>
                    <div className="col-sm-8">
                        <Multiselect data={allPlayers} value={players} ref="players" valueField="name" textField="email"
                                     //onChange={this.handleChange.bind(this, 'players')}
                                     onChange={value => this.handleChangePlayers(value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>
                    <div className="col-sm-8">
                        <input type="text" value={emailText} ref="emailText" id="emailText"
                               placeholder="Email Text" className="form-control"
                               onChange={this.handleChange.bind(this, 'emailText')}/>
                    </div>
                </div>
            </div>
        )
    }
}

DoodleTemplate.propTypes = {
    location: PropTypes.string.isRequired,
    //dateTime: PropTypes.date.isRequired,
    initiator: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    emailText: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

