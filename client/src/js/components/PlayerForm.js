/**
 * Created by vigi on 4/9/2016.
 */
import React, {Component, PropTypes} from 'react'

class PlayerForm extends Component {

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value)
    }

    handleClose(e) {
        e.preventDefault()
        this.props.handleClose()
    }

    render() {
        return (
            <div>
                <a href="#createPlayer"><span className="glyphicon glyphicon-plus-sign"></span></a>
                <a href="#deletePlayer"><span className="glyphicon glyphicon-minus-sign"></span></a>
                <div id="createPlayer" className="modalDialog">
                    <form onSubmit={this.props.handleSubmit.bind(this)} className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                            <div className="col-sm-4">
                                <input type="text" value={this.props.player.name} id="name"
                                       onChange={this.handleChange.bind(this, "name")}
                                       placeholder="Name" required={true} autoFocus={true}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                            <div className="col-sm-4">
                                <input type="text" value={this.props.player.email} id="email"
                                       onChange={this.handleChange.bind(this, "email")}
                                       placeholder="Email" required={true}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="col-sm-2 control-label">Phone</label>
                            <div className="col-sm-4">
                                <input type="text" value={this.props.player.phone} id="phone"
                                       onChange={this.handleChange.bind(this, "phone")}
                                       placeholder="Phone"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6 col-sm-offset-2">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <a href="#" title="Close" className="btn btn-danger" role="button">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
                <div onClick={this.handleClose.bind(this)}>
                </div>
            </div>
        )
    }
}

PlayerForm.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default PlayerForm
