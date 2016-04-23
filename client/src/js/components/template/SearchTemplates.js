/**
 * Created by vigi on 4/23/2016 11:32 AM.
 */
import React, {Component} from "react"
import {restClient} from "../../utils/restClient"
import PagedTemplate from "./PagedTemplates"

export default class SearchTemplates extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            templates: [],
            links: [],
            pageMetadata: {},
            searchTerm: "",
            pageSize: 2
        }
    }

    componentDidMount() {
        this.loadFromServer(this.state.searchTerm, this.state.pageSize)
    }

    onNavigate(navUri) {
        restClient({method: "GET", path: navUri}).done(response => {
            this.setState({
                templates: response.entity._embedded.doodleTemplateList,
                links: response.entity._links,
                pageMetadata: response.entity.page
            })
        })
    }

    loadFromServer(searchTerm, pageSize) {
        restClient({method: "GET", path: "/api/templates", params: {q: searchTerm, size: pageSize}})
            .done(response => {
                    const foundTemplates = response.entity._embedded ? response.entity._embedded.doodleTemplateList : []
                    this.setState({
                        templates: foundTemplates,
                        links: response.entity._links,
                        pageMetadata: response.entity.page
                    })
                }
            )
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    onSearch(event) {
        event.preventDefault()
        this.loadFromServer(this.state.searchTerm, this.state.pageSize)
    }

    render() {
        return (
            <div className="form-inline">
                <div className="form-group">
                    <label className="sr-only" htmlFor="searchTemplates">Search text</label>
                    <input type="search" id="searchTemplates" className="form-control"
                           value={this.state.searchTerm} onChange={this.handleChange.bind(this)} placeholder="Search text"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onSearch.bind(this)}>Search</button>
                <div className="table-responsive">
                    <PagedTemplate templates={this.state.templates} links={this.state.links}
                                  pageMetadata={this.state.pageMetadata}
                                  onNavigate={this.onNavigate.bind(this)}/>
                </div>
            </div>
        )
    }
}
