/**
 * Created by vigi on 2/3/2016.
 */
import React, { Component, PropTypes } from 'react'
import DoodlePlanner from '../components/DoodlePlanner'

import '../../css/bootstrap.css'
import '../../css/react-widgets.css'

class App extends Component {
    render() {
        return (
            <div>
                <h2>Football Doodle</h2>
                <DoodlePlanner/>
            </div>
        )
    }
}

export default App