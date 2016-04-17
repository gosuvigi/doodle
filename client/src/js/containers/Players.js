/**
 * Created by vigi on 3/13/2016.
 */
import React, {Component} from "react"
import PlayersList from "../components/player/PlayersList"
import {restClient} from "../utils/restClient"

export default class Players extends Component {

    constructor(props) {
        super(props)
        this.state = {
            players: [], 
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
                players: response.entity._embedded.playerList,
                links: response.entity._links,
                pageMetadata: response.entity.page
            })
        })
    }

    loadFromServer(searchTerm, pageSize) {
        restClient({method: "GET", path: "/api/players", params: {q: searchTerm, size: pageSize}})
            .done(response => {
                const foundPlayers = response.entity._embedded ? response.entity._embedded.playerList : []
                    this.setState({
                        players: foundPlayers,
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
                    <label className="sr-only" htmlFor="searchPlayers">Search text</label>
                    <input type="text" id="searchPlayers" className="form-control"
                           value={this.state.searchTerm} onChange={this.handleChange.bind(this)} placeholder="Search text"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onSearch.bind(this)}>Search</button>
                <div className="table-responsive">
                    <PlayersList players={this.state.players} links={this.state.links}
                                 pageMetadata={this.state.pageMetadata}
                                 onNavigate={this.onNavigate.bind(this)}/>
                </div>
            </div>
        )
    }
}
