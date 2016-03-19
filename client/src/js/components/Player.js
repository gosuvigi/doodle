/**
 * Created by vigi on 3/13/2016.
 */
import React, { Component, PropTypes } from 'react'

export default class Player extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.params.playerName}</h2>
            </div>
        )
    }
}
