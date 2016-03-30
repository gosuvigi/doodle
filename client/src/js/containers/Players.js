/**
 * Created by vigi on 3/13/2016.
 */
import React, {Component, PropTypes} from 'react'
import PlayersList from '../components/PlayersList'
import {allPlayers as allPlayersList} from '../reducers/reducers'
import {restClient} from '../utils/restClient'

export default class Players extends Component {

    constructor(props) {
        super(props)
        this.state = {players: [], links: []}
    }

    componentDidMount() {
        restClient({method: 'GET', path: '/api/players'})
            .done(response => {
                this.setState({players: response.entity._embedded.playerList, links: {}});
            })
    }

    render() {
        return (
            <div>
                <PlayersList players={this.state.players} links={this.state.links}/>
            </div>
        )
    }

}
