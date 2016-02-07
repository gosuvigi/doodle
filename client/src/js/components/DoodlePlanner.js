/**
 * Created by vigi on 2/6/2016.
 */
import React, {Component, PropTypes} from 'react'
import {DropdownList}from 'react-widgets'
import DoodleTemplate from './DoodleTemplate.js'

export default class DoodlePlanner extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        console.log('submitted')
    }

    render() {
        const templates = [{
            title: "Monday VUB",
            location: "VUB",
            dateTime: "Monday",
            initiator: "vigi",
            players: ["messi", "neymar", "suarez"],
            emailText: "gogo"
        }, {
            title: "Friday VUB",
            location: "VUB",
            dateTime: "Friday",
            initiator: "vigi",
            players: ["messi", "suarez"],
            emailText: "gogo"
        }]
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label for="templates" className="col-sm-2 control-label">Template</label>
                    <div className="col-sm-8">
                        <DropdownList
                            id="templates"
                            data={templates}
                            textField='title'
                            onChange={value => this.setState({ value })}/>
                    </div>
                </div>
                <DoodleTemplate template={templates[0]}/>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}
