/**
 * Created by vigi on 2/3/2016.
 */
import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

import '../../css/bootstrap.css'
import '../../css/react-widgets.css'
import '../../css/doodle.css'

class App extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <IndexLink to="/" className="navbar-brand" activeClassName="active">Football Doodle</IndexLink>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/players" activeClassName="active">Players</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App