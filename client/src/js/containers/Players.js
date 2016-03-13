/**
 * Created by vigi on 3/13/2016.
 */
import React, { Component, PropTypes } from 'react'
import PlayersList from '../components/PlayersList'
import { allPlayers as allPlayersList } from '../reducers/reducers'

export default class Players extends Component {

    constructor(props) {
        super(props)
        this.state = {players: allPlayersList, links: {}}
    }

    render() {
        return (
            <div>
                <PlayersList players={this.state.players} links={this.state.links}/>
            </div>
        )
    }

}
