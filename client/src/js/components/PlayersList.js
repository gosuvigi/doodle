/**
 * Created by vigi on 2/27/2016.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class PlayersList extends Component {

    constructor(props) {
        super(props)
        this.handleNavFirst = this.handleNavFirst.bind(this)
        this.handleNavPrev = this.handleNavPrev.bind(this)
        this.handleNavNext = this.handleNavNext.bind(this)
        this.handleNavLast = this.handleNavLast.bind(this)
    }

    handleNavFirst(e) {
        e.preventDefault()
        this.props.onNavigate(this.props.links.first.href)
    }

    handleNavPrev(e) {
        e.preventDefault()
        this.props.onNavigate(this.props.links.prev.href)
    }

    handleNavNext(e) {
        e.preventDefault()
        this.props.onNavigate(this.props.links.next.href)
    }

    handleNavLast(e) {
        e.preventDefault()
        this.props.onNavigate(this.props.links.last.href)
    }

    render() {
        const {players, links, pageMetadata} = this.props
        var playersList = players.map(player =>
            <tr key={player.name}>
                <td><Link to={player._links.view.href}>{player.name}</Link></td>
                <td>{player.email}</td>
                <td>{player.phone}</td>
            </tr>
        )

        var navLinks = [];
        if (pageMetadata.number > 0) {
            navLinks.push(<li key="first"><a onClick={this.handleNavFirst}>&lt;&lt;</a></li>)
            navLinks.push(<li key="prev"><a onClick={this.handleNavPrev}>&lt;</a></li>)
        } else {
            navLinks.push(<li className="disabled" key="first"><span><span aria-hidden="true">&lt;&lt;</span></span></li>)
            navLinks.push(<li className="disabled" key="prev"><span><span aria-hidden="true">&lt;</span></span></li>)
        }

        if (pageMetadata.totalPages > (pageMetadata.number + 1)) {
            navLinks.push(<li key="next"><a onClick={this.handleNavNext}>&gt;</a></li>)
            navLinks.push(<li key="last"><a tooltip="Last" onClick={this.handleNavLast}>&gt;&gt;</a></li>)
        } else {
            navLinks.push(<li className="disabled" key="next"><span><span aria-hidden="true">&gt;</span></span></li>)
            navLinks.push(<li className="disabled" key="last"><span><span aria-hidden="true">&gt;&gt;</span></span></li>)
        }

        return (
            <div>
                <table className="table table-striped table-hover table-condensed">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playersList}
                    </tbody>
                </table>
                <nav>
                    <ul className="pager">
                        {navLinks}
                        <span>{pageMetadata.totalElements} results found. Page {pageMetadata.number + 1} of {pageMetadata.totalPages}.</span>
                    </ul>
                </nav>
            </div>
        )
    }
}
