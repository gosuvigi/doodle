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
        this.props.handleClose(e)
    }

    render() {
        const {id, name, email, phone} = this.props.player
        return (
            <form onSubmit={this.props.handleSubmit.bind(this)} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-6">
                        <input type="text" value={name} className="form-control"
                               onChange={this.handleChange.bind(this, "name")}
                               placeholder="Name" required={true} autoFocus={true}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-6">
                        <input type="text" value={email} className="form-control"
                               onChange={this.handleChange.bind(this, "email")}
                               placeholder="Email" required={true}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="col-sm-2 control-label">Phone</label>
                    <div className="col-sm-6">
                        <input type="text" value={phone} className="form-control"
                               onChange={this.handleChange.bind(this, "phone")}
                               placeholder="Phone"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-2">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button onClick={this.handleClose.bind(this)} className="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
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
