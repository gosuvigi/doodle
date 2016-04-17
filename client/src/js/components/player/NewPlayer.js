/**
 * Created by vigi on 4/9/2016.
 */
import React, {Component, PropTypes} from 'react';
import PlayerForm from './PlayerForm'
import {restClient} from "../../utils/restClient"
import {browserHistory} from 'react-router'

class NewPlayer extends Component {

    componentWillMount() {
        this.setState({
            name: "",
            email: "",
            phone: "",
        })
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmit(e) {
        e.preventDefault()
        restClient({
            method: "POST",
            path: "/api/players",
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

export default NewPlayer
