/**
 * Created by vigi on 4/23/2016 1:26 PM.
 */
import React, {Component, PropTypes} from 'react';
import TemplateForm from './TemplateForm'
import {restClient} from "../../utils/restClient"
import {browserHistory} from 'react-router'

class NewTemplate extends Component {

    componentWillMount() {
        this.setState({
            template: {
                name: "",
                location: "",
                initiator: "",
                matchDate: new Date(),
                players: [],

                emailText: ""
            },
            allPlayers: []
        })
    }

    componentDidMount() {
        restClient({method: 'GET', path: '/api/players'})
            .done(response => {
                const all = response.entity._embedded.playerList
                this.setState({
                    allPlayers: all
                })
            })
    }

    handleChange(field, value) {
        let updatedTemplate = Object.assign({}, this.state.template, {[field]: value})
        this.setState({template: updatedTemplate})
    }

    handleChangePlayers(players) {
        let updatedTemplate = Object.assign({}, this.state.template, {players: players})
        this.setState({template: updatedTemplate})
    }

    handleSubmit(e) {
        e.preventDefault()
        restClient({
            method: "POST",
            path: "/api/templates",
            entity: this.state.template,
            headers: {'Content-Type': 'application/json'}
        })
            .done(response => {
                    browserHistory.push("/templates")
                },
                error => {
                    JSON.stringify(console.log(error.entity))
                }
            )
    }

    handleClose(e) {
        browserHistory.push("/templates")
    }

    render() {
        return (
            <TemplateForm template={this.state.template} allPlayers={this.state.allPlayers}
                          handleChange={this.handleChange.bind(this)}
                          handleSubmit={this.handleSubmit.bind(this)} 
                          handleClose={this.handleClose.bind(this)}
                          handleChangePlayers={this.handleChangePlayers.bind(this)}/>
        )
    }
}

export default NewTemplate
