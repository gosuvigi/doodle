/**
 * Created by vigi on 4/9/2016.
 */
import React,{Component, PropTypes} from 'react';
import PlayerForm from './PlayerForm'
import {restClient} from "../utils/restClient"

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
        restClient({method: "POST", path: "/api/players", entity: this.state, headers: { 'Content-Type': 'application/json' }})
            .done(response => {
                    JSON.stringify(response)
                }
            )
    }

    handleClose(e) {
        this.props.history.pushState(null, '/players')
    }

    render() {
        return (
            <PlayerForm player={this.state} handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)} handleClose={this.handleClose.bind(this)}/>
        )
    }
}

export default NewPlayer
