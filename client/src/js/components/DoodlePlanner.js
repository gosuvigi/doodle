/**
 * Created by vigi on 2/6/2016.
 */
import React, { Component, PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import DoodleTemplate from './DoodleTemplate.js'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { selectDoodleTemplate } from '../actions/actions'
import { Multiselect } from 'react-widgets'

export const fields = [
    'location',
    'dateTime',
    'initiator',
    'players',
    'emailText'
]

class DoodlePlanner extends Component {

    render() {
        const { onSelectTemplate, templates,
            fields: { location, dateTime, initiator, players, emailText}
            } = this.props

        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="templates" className="col-sm-2 control-label">Template</label>

                    <div className="col-sm-8">
                        <DropdownList
                            id="templates"
                            data={templates}
                            textField='title'
                            onChange={value => onSelectTemplate(value)}/>
                    </div>
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="location" className="col-sm-2 control-label">Location</label>

                        <div className="col-sm-8">
                            <input type="text" {...location} ref="location" label="Location"
                                   id="location" placeholder="Location" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateTime" className="col-sm-2 control-label">Date / Time</label>

                        <div className="col-sm-8">
                            <input type="text" {...dateTime} ref="dateTime" id="dateTime"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="initiator" className="col-sm-2 control-label">Initiator</label>

                        <div className="col-sm-8">
                            <input type="text" {...initiator} ref="initiator" id="initiator"
                                   placeholder="Initiator" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="players" className="col-sm-2 control-label">Players</label>

                        <div className="col-sm-8">
                            <Multiselect {...players} ref="players"
                                                      onChange={value => this.setState({ value })}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailText" className="col-sm-2 control-label">Email Text</label>

                        <div className="col-sm-8">
                            <input type="text" {...emailText} ref="emailText" id="emailText"
                                   placeholder="Email Text" className="form-control"/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
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
        initialValues: state.selectedTemplate
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
        fields
    },
    mapStateToProps,
    mapDispatchToProps)(DoodlePlanner)

