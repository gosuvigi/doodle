/**
 * Created by vigi on 4/16/2016 5:42 PM.
 */
import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {restClient} from "../../utils/restClient"

class DeletePlayer extends Component {

    handleSubmit(e) {
        e.preventDefault()
        restClient({
            method: "DELETE",
            path: "/api/players/" + this.props.playerId
        })
            .done(response => {
                    window.location = "#"
                    browserHistory.push("/players")
                }
            )
    }

    handleClose(e) {
        e.preventDefault()
        window.location = "#"
    }

    render() {
        const {playerId} = this.props
        return (
            <div id={"deletePlayer" + playerId} className="modalDialog" tabIndex="-1" role="dialog" aria-labelledby="deletePlayerModalLabel">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="deletePlayerModalLabel">Delete player?</h4>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-warning" role="alert">
                                Are you sure that you want to delete this player?
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleSubmit.bind(this)} className="btn btn-danger">Delete</button>
                            <button onClick={this.handleClose.bind(this)} className="btn btn-submit">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeletePlayer