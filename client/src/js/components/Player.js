/**
 * Created by vigi on 3/13/2016.
 */
import React, { Component, PropTypes } from 'react'

export default class Player extends Component {
    render() {
        const { name, email } = this.props.player

        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
            </tr>
        )
    }
}
