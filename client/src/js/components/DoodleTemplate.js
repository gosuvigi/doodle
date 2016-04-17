/**
 * Created by vigi on 2/6/2016.
 */
import React, {Component, PropTypes} from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import ReactQuill from 'react-quill'

export default class DoodleTemplate extends Component {

    constructor(props) {
        super(props)
    }

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    handleChangePlayers(players) {
        this.props.handleChangePlayers(players)
    }

    render() {
        const {location, dateTime, initiator, players, emailText} = this.props.template
        const allPlayers = this.props.allPlayers
        var change = (name, value) => {
            console.log('name: ' + name + ' value: ' + value)
        }

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="location" className="col-sm-2 control-label">Location</label>
                    <div className="col-sm-8">
                        <input type="text" value={location} label="Location" placeholder="Location"
                               className="form-control"
                               onChange={this.handleChange.bind(this, 'location')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime" className="col-sm-2 control-label">Date / Time</label>
                    <div className="col-sm-4">
                        <DateTimePicker type="text" value={new Date(dateTime)}
                                        onChange={val => this.props.handleChange('dateTime', val)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="initiator" className="col-sm-2 control-label">Initiator</label>
                    <div className="col-sm-8">
                        <input type="text" value={initiator} placeholder="Initiator" className="form-control"
                               onChange={this.handleChange.bind(this, 'initiator')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="players" className="col-sm-2 control-label">Players</label>
                    <div className="col-sm-8">
                        <Multiselect data={allPlayers} value={players} valueField="name" textField="email"
                                     onChange={value => this.handleChangePlayers(value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>
                    <div className="col-sm-8">
                    <ReactQuill value={emailText} onChange={val => this.props.handleChange('emailText', val)} theme='snow'/>
                    </div>
                </div>
            </div>
        )
    }
}

DoodleTemplate.propTypes = {
    template: PropTypes.object.isRequired,
    location: PropTypes.string,
    dateTime: PropTypes.object,
    initiator: PropTypes.string,
    players: PropTypes.array,
    emailText: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    handleChangePlayers: PropTypes.func.isRequired
}

