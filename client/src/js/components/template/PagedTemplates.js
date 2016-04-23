/**
 * Created by vigi on 4/23/2016 11:37 AM.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'

export default class PagedTemplates extends Component {
    
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
        const {templates, pageMetadata} = this.props
        var templatesList = templates.map(template =>
            <tr key={template.id}>
                <td>
                    <Link to="/templates/new" data-toggle="tooltip" title="Add a new template"><span className="glyphicon glyphicon-plus-sign"/></Link>
                    <a href={"#deleteTemplate" + template.id}><span className="glyphicon glyphicon-minus-sign"/></a>
                </td>
                <td><Link to={template._links.view.href}>{template.name}</Link></td>
                <td>{template.dateTime}</td>
            </tr>
        )

        var navLinks = [];
        if (pageMetadata.number > 0) {
            navLinks.push(<li key="first"><a onClick={this.handleNavFirst.bind(this)}>&lt;&lt;</a></li>)
            navLinks.push(<li key="prev"><a onClick={this.handleNavPrev.bind(this)}>&lt;</a></li>)
        } else {
            navLinks.push(<li className="disabled" key="first"><span><span aria-hidden="true">&lt;&lt;</span></span></li>)
            navLinks.push(<li className="disabled" key="prev"><span><span aria-hidden="true">&lt;</span></span></li>)
        }

        if (pageMetadata.totalPages > (pageMetadata.number + 1)) {
            navLinks.push(<li key="next"><a onClick={this.handleNavNext.bind(this)}>&gt;</a></li>)
            navLinks.push(<li key="last"><a onClick={this.handleNavLast.bind(this)}>&gt;&gt;</a></li>)
        } else {
            navLinks.push(<li className="disabled" key="next"><span><span aria-hidden="true">&gt;</span></span></li>)
            navLinks.push(<li className="disabled" key="last"><span><span aria-hidden="true">&gt;&gt;</span></span></li>)
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover table-condensed">
                    <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {templatesList}
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
