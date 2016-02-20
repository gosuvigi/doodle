/**
 * Created by vigi on 2/6/2016.
 */
import React, { Component, PropTypes } from 'react'
import { DropdownList, Multiselect, DateTimePicker } from 'react-widgets'
//import DoodleTemplate from './DoodleTemplate.js'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { selectDoodleTemplate } from '../actions/actions'
var momentLocalizer = require('react-widgets/lib/localizers/moment')
import Moment from 'moment'
import { required, atLeastOneValue } from '../utils/validation'

export const fields = [
    'location',
    'dateTime',
    'initiator',
    'players',
    'emailText'
]

const validate = values => {
    const errors = {};
    console.log('---- ' + JSON.stringify(values))
    errors.location = required(values.location)
    errors.dateTime = required(values.dateTime)
    errors.initiator = required(values.initiator)
    errors.players = atLeastOneValue(values.players)
    errors.emailText = required(values.emailText)
    return errors;
}

class DoodlePlanner extends Component {

    constructor(props) {
        super(props)
        momentLocalizer(Moment)
    }

    render() {
        const { onSelectTemplate, templates, selectedTemplate, handleSubmit, submitting,
            fields: { location, dateTime, initiator, players, emailText}
            } = this.props

        return (
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="templates" className="col-sm-2 control-label">Template</label>

                    <div className="col-sm-6">
                        <DropdownList
                            id="templates"
                            data={templates}
                            textField='title'
                            onChange={value => onSelectTemplate(value)}/>
                    </div>
                </div>
                <div>
                    <div className={'form-group' + (location.touched && location.error ? ' has-error' : '')}>
                        <label htmlFor="location" className="col-sm-2 control-label">Location</label>

                        <div className="col-sm-6">
                            <input type="text" {...location} ref="location" label="Location"
                                   id="location" placeholder="Location" className="form-control"/>
                        </div>
                        {location.touched && location.error &&
                        <div className="col-sm-3 help-block">{location.error}</div>}
                    </div>
                    <div className={'form-group' + (dateTime.error ? ' has-error' : '')}>
                        <label htmlFor="dateTime" className="col-sm-2 control-label">Date / Time</label>

                        <div className="col-sm-6">
                            <DateTimePicker format='MMMM Do YYYY, h:mm a' type="text" {...dateTime} ref="dateTime"
                                            id="dateTime"/>
                        </div>
                        {dateTime.error && <div className="col-sm-3 help-block">{dateTime.error}</div>}
                    </div>
                    <div className={'form-group' + (initiator.touched && initiator.error ? ' has-error' : '')}>
                        <label htmlFor="initiator" className="col-sm-2 control-label">Initiator</label>

                        <div className="col-sm-6">
                            <input type="text" {...initiator} ref="initiator" id="initiator"
                                   placeholder="Initiator" className="form-control"/>
                        </div>
                        {initiator.touched && initiator.error &&
                        <div className="col-sm-3 help-block">{initiator.error}</div>}
                    </div>
                    <div className={'form-group' + (players.error ? ' has-error' : '')}>
                        <label htmlFor="players" className="col-sm-2 control-label">Players</label>

                        <div className="col-sm-6">
                            <Multiselect {...players} data={selectedTemplate.players} ref="players"
                                                      valueField="name" textField="email"/>
                        </div>
                        {players.error && <div className="col-sm-3 help-block">{players.error}</div>}
                    </div>
                    <div className={'form-group' + (emailText.touched && emailText.error ? ' has-error' : '')}>
                        <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>

                        <div className="col-sm-6">
                            <input type="text" {...emailText} ref="emailText" id="emailText"
                                   placeholder="Email Text" className="form-control"/>
                        </div>
                        {emailText.touched && emailText.error &&
                        <div className="col-sm-3 help-block">{emailText.error}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-2">
                        <button type="submit" disabled={submitting} className="btn btn-primary">
                            {submitting ? <i/> : <i/>} Submit
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

DoodlePlanner.propTypes = {
    selectedTemplate: PropTypes.object.isRequired,
    templates: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        templates: state.templates,
        initialValues: state.selectedTemplate,
        selectedTemplate: state.selectedTemplate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectTemplate: (template) => {
            dispatch(selectDoodleTemplate(template))
        }
    }
}

export default reduxForm({
        form: 'doodleForm',
        fields,
        validate
    },
    mapStateToProps,
    mapDispatchToProps)(DoodlePlanner)

