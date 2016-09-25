/**
 * Created by vigi on 2/6/2016.
 */
import React, {Component, PropTypes} from 'react'
import Multiselect from '../../../../node_modules/react-widgets/lib/Multiselect'
import DateTimePicker from '../../../../node_modules/react-widgets/lib/DateTimePicker'
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

    handleAddCustomPlayer(player) {
        this.props.handleAddCustomPlayer(player)
    }

    getNextDayOfWeek(date, dayOfWeek) {
        var resultDate = new Date(date.getTime())
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7)
        return resultDate
    }

    render() {
        const {location, matchDate, matchDayOfWeek, initiator, players, emailText} = this.props.template
        const allPlayers = this.props.allPlayers
        const adjustedNextMatchDate = this.getNextDayOfWeek(new Date(), matchDayOfWeek)
        const helperDateTime = new Date(matchDate)
        if (matchDate) {
            adjustedNextMatchDate.setHours(helperDateTime.getHours(), helperDateTime.getMinutes())
        }
        const messageLabels = {createNew: "Add new email address"}


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
                        <DateTimePicker type="text" value={new Date(adjustedNextMatchDate)}
                                        format={"dddd, MMMM DD, HH:mm"}
                                        onChange={val => this.props.handleChange('matchDate', val)}/>
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
                                     onChange={value => this.handleChangePlayers(value)}
                                     onCreate={value => this.handleAddCustomPlayer(value)}
                                     messages={messageLabels}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>
                    <div className="col-sm-8">
                        <ReactQuill value={emailText} onChange={val => this.props.handleChange('emailText', val)}
                                    theme='snow'/>
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
    handleChangePlayers: PropTypes.func.isRequired,
    handleAddCustomPlayer: PropTypes.func.isRequired
}

