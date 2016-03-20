/**
 * Created by vigi on 2/23/2016.
 */
import React, { Component, PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import DoodleTemplate from './../components/DoodleTemplate'
import { initialState, allPlayers as allPlayersList } from '../reducers/reducers'
import {restClient} from '../utils/restClient'

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
        // restClient({method: 'GET', path: '/api/templates'})
        //     .done(response => {
        //         const loadedTemplates = response.entity._embedded.doodleTemplateList
        //         this.setState({
        //             selectedTemplate: {},
        //             templates: loadedTemplates,
        //             allPlayers: allPlayersList
        //         })
        //     })
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
