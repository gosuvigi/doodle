/**
 * Created by vigi on 2/27/2016.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
export default class PlayersList extends Component {

    constructor(props) {
        super(props)
        this.handleNavFirst = this.handleNavFirst.bind(this)
        this.handleNavPrev = this.handleNavPrev.bind(this)
        this.handleNavNext = this.handleNavNext.bind(this)
        this.handleNavLast = this.handleNavLast.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleNavFirst(e){
        e.preventDefault()
        this.props.onNavigate(this.props.links.first.href)
    }

    handleNavPrev(e){
        e.preventDefault()
        this.props.onNavigate(this.props.links.prev.href)
    }

    handleNavNext(e){
        e.preventDefault()
        this.props.onNavigate(this.props.links.next.href)
    }

    handleNavLast(e){
        e.preventDefault()
        this.props.onNavigate(this.props.links.last.href)
    }

    handleInput(e) {
        e.preventDefault()
        var pageSize = React.findDOMNode(this.refs.pageSize).value
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize)
        } else {
            React.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1)
        }
    }

    render() {
        const { players, links } = this.props
        var playersList = players.map(player =>
            <tr key={player.name}>
                <td><Link to={"/players/" + player.name}>{player.name}</Link></td>
                <td>{player.email}</td>
            </tr>
        )

        var navLinks = [];
        if ("first" in links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>)
        }
        if ("prev" in links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>)
        }
        if ("next" in links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>)
        }
        if ("last" in links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>)
        }

        return (
            <div className="table-responsive">
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table className="table table-striped table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playersList}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}
