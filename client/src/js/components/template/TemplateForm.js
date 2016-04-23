/**
 * Created by vigi on 4/23/2016 1:40 PM.
 */
import React, {Component, PropTypes} from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import ReactQuill from 'react-quill'

class TemplateForm extends Component {

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value)
    }

    handleClose(e) {
        e.preventDefault()
        this.props.handleClose(e)
    }

    render() {
        const {name, location, matchDate, initiator, players, emailText} = this.props.template
        const allPlayers = this.props.allPlayers
        return (
            <form onSubmit={this.props.handleSubmit.bind(this)} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-8">
                        <input type="text" value={name} label="Name" placeholder="Name"
                               className="form-control"
                               onChange={this.handleChange.bind(this, 'name')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="location" className="col-sm-2 control-label">Location</label>
                    <div className="col-sm-8">
                        <input type="text" value={location} label="Location" placeholder="Location"
                               className="form-control"
                               onChange={this.handleChange.bind(this, 'location')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime" className="col-sm-2 control-label">Match Date</label>
                    <div className="col-sm-4">
                        <DateTimePicker type="text" value={new Date(matchDate)}
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
                                     onChange={value => this.props.handleChangePlayers(value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>
                    <div className="col-sm-8">
                        <ReactQuill value={emailText} onChange={val => this.props.handleChange('emailText', val)}
                                    theme='snow'/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-2">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button onClick={this.handleClose.bind(this)} className="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}

TemplateForm.propTypes = {
    template: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.string,
        matchDate: PropTypes.object,
        initiator: PropTypes.string,
        players: PropTypes.array,
        emailText: PropTypes.string
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleChangePlayers: PropTypes.func.isRequired
}

export default TemplateForm
