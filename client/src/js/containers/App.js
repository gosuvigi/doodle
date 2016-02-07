/**
 * Created by vigi on 2/3/2016.
 */
import React, { Component } from 'react'
import DoodlePlanner from '../components/DoodlePlanner'

import '../../css/bootstrap.css'
import '../../css/react-widgets.css'

export default class App extends Component {

    render() {
        return (
            <div>
                <h2>Football Doodle</h2>
                <DoodlePlanner/>
            </div>
        )
    }
}
