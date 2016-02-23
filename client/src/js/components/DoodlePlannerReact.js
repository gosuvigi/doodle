/**
 * Created by vigi on 2/23/2016.
 */
import React, { Component, PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import DoodleTemplate from './DoodleTemplate'
import { initialState, allPlayers as allPlayersList } from '../reducers/reducers'

export default class DoodlePlannerReact extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            selectedTemplate: {},
            templates: initialState.templates,
            allPlayers: allPlayersList
        })
    }

    handleChange(field, value) {
        let updatedField = {}
        updatedField[field] = value
        let updatedTemplate = Object.assign({}, this.state.selectedTemplate, updatedField)
        this.setState({selectedTemplate: updatedTemplate})
    }

    handleChangePlayers(players) {
        let updatedTemplate = Object.assign({}, this.state.selectedTemplate, {players: players})
        this.setState({selectedTemplate: updatedTemplate})
    }

    render() {
        const submitting = false
        const templates = this.templates

        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="templates" className="col-sm-2 control-label">Template</label>

                    <div className="col-sm-4">
                        <DropdownList
                            id="templates"
                            data={this.state.templates}
                            textField='title'
                            onChange={value => this.setState({ selectedTemplate: value })}/>
                    </div>
                </div>
                <DoodleTemplate template={this.state.selectedTemplate}
                                allPlayers={this.state.allPlayers}
                                handleChange={this.handleChange.bind(this)}
                                handleChangePlayers={this.handleChangePlayers.bind(this)}/>

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
