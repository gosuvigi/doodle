/**
 * Created by vigi on 2/23/2016.
 */
import React, {Component} from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
import DoodleTemplate from './../components/template/DoodleTemplate'
import {restClient} from '../utils/restClient'

export default class DoodlePlannerReact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTemplate: {matchDate: new Date(), players: []},
            templates: [],
            allPlayers: [],
        }
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    handleSubmit(e) {
        e.preventDefault();
        restClient({
            method: 'POST',
            path: '/api/templates/doodle',
            entity: this.state.selectedTemplate,
            headers: {'Content-Type': 'application/json'}
        })
            .done(
                response => {
                    console.log(JSON.stringify(response.entity))
                    this.setState({doodleCreationSuccess: "Doodle created and notifications sent successfully."})
                }, error => {
                    console.log('error: ' + JSON.stringify(error))
                    this.setState({error: error})
                })
    }

    componentDidMount() {
        restClient({method: 'GET', path: '/api/templates'})
            .done(
                response => {
                    const loadedTemplates = response.entity._embedded.doodleTemplateList
                    this.setState({
                        templates: loadedTemplates
                    }, error => {
                        this.setState({error: error})
                    })
                })
        restClient({method: 'GET', path: '/api/players'})
            .done(
                response => {
                    const all = response.entity._embedded.playerList
                    this.setState({
                        allPlayers: all
                    }, error => {
                        this.setState({error: error})
                    })
                })
    }

    handleChange(field, value) {
        const updatedField = {}
        updatedField[field] = value
        const updatedTemplate = Object.assign({}, this.state.selectedTemplate, updatedField)
        this.setState({selectedTemplate: updatedTemplate})
    }

    handleChangePlayers(players) {
        const updatedTemplate = Object.assign({}, this.state.selectedTemplate, {players: players})
        this.setState({selectedTemplate: updatedTemplate})
    }

    handleChangeTemplate(template) {
        restClient({method: 'GET', path: '/api/templates/' + template.id + '/players'})
            .done(
                response => {
                    const templatePlayers = response.entity
                    const updatedTemplate = Object.assign({}, template, {players: templatePlayers})
                    this.setState({selectedTemplate: updatedTemplate, doodleCreationSuccess: null})
                }, error => {
                    this.setState({selectedTemplate: template, error: error})
                })
    }

    addCustomPlayer(email) {
        if (!this.emailRegex.test(email)) {
            return;
        }
        const newSize = this.state.selectedTemplate.players.length + this.state.allPlayers.length + 1
        const player = {id: newSize, email: email}
        const players = this.state.selectedTemplate.players.concat(player)
        const updatedTemplate = Object.assign({}, this.state.selectedTemplate, {players: players})
        this.setState({selectedTemplate: updatedTemplate})
    }

    render() {
        const submitting = false
        const doodleCreationSuccessDiv = this.state.doodleCreationSuccess == null ? <div/> :
            <div className="alert alert-success">{this.state.doodleCreationSuccess}</div>
        const errorDiv = this.state.error == null ? <div/> :
            <div className="alert alert-danger">{JSON.stringify(this.state.error.entity)}</div>
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="templates" className="col-sm-2 control-label">Template</label>
                    <div className="col-sm-4">
                        <DropdownList
                            data={this.state.templates}
                            textField='name'
                            onChange={this.handleChangeTemplate.bind(this)}/>
                    </div>
                </div>
                <DoodleTemplate template={this.state.selectedTemplate}
                                allPlayers={this.state.allPlayers}
                                handleChange={this.handleChange.bind(this)}
                                handleChangePlayers={this.handleChangePlayers.bind(this)}
                                handleAddCustomPlayer={this.addCustomPlayer.bind(this)}/>
                <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-2">
                        <button type="submit" disabled={submitting} className="btn btn-primary">
                            {submitting ? <i/> : <i/>} Submit
                        </button>
                    </div>
                </div>
                {doodleCreationSuccessDiv}
                {errorDiv}
            </form>
        )
    }
}
