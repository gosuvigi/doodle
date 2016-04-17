/**
 * Created by vigi on 4/16/2016.
 */
import React, {Component, PropTypes} from 'react';
import PlayerForm from './PlayerForm'
import {restClient} from "../../utils/restClient"
import {browserHistory} from 'react-router'

class EditPlayer extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            phone: ""
        }
    }

    componentDidMount() {
        const playerId = this.props.params.id
        restClient({
            method: "GET",
            path: "/api/players/" + playerId,
            headers: {'Content-Type': 'application/json'}
        })
            .done(response => {
                    const player = response.entity
                    this.setState({
                        id: player.id,
                        name: player.name,
                        email: player.email,
                        phone: player.phone
                    })
                }
            )
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmit(e) {
        e.preventDefault()
        const playerId = this.props.params.id
        restClient({
            method: "PUT",
            path: "/api/players/" + playerId,
            entity: this.state,
            headers: {'Content-Type': 'application/json'}
        })
            .done(response => {
                    browserHistory.push("/players")
                }
            )
    }

    handleClose(e) {
        browserHistory.push("/players")
    }

    render() {
        return (
            <PlayerForm player={this.state} handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)} handleClose={this.handleClose.bind(this)}/>
        )
    }
}

export default EditPlayer
