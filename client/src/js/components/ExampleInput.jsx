/**
 * Created by vigi on 9/23/15:2:24 PM.
 */
import React, {Component, PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default class ExampleInput extends Component {

    static propTypes = {
        placeholder: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        }
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <Input
                type="text"
                value={this.state.text}
                placeholder={this.props.placeholder}
                label={this.props.label}
                hasFeedback
                ref="input"
                groupClassName="group-class"
                labelClassName="label-class"
                onChange={this.handleTextChange.bind(this)}/>
        );
    }
}