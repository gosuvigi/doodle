/**
 * Created by vigi on 3/13/2016.
 */
import React, {Component, PropTypes} from "react"
import PlayersList from "../components/PlayersList"
import {allPlayers as allPlayersList} from "../reducers/reducers"
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
        this.onNavigate = this.onNavigate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
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
                    this.setState({
                        players: response.entity._embedded.playerList,
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
            <form onSubmit={this.onSearch}>
                <input ref="search" type="text" value={this.state.searchTerm} onChange={this.handleChange}/>
                <button type="submit" className="btn-primary">Search</button>
                <div className="table-responsive">
                    <PlayersList players={this.state.players} links={this.state.links}
                                 pageMetadata={this.state.pageMetadata}
                                 onNavigate={this.onNavigate}/>
                </div>
            </form>
        )
    }

}
