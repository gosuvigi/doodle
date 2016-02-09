/**
 * Created by vigi on 2/6/2016.
 */
import React, { Component, PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import DoodleTemplate from './DoodleTemplate.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DoodleActions from '../actions/actions'

export default class DoodlePlanner extends Component {

    render() {
        const { templates, selectedTemplate } = this.props

        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="templates" className="col-sm-2 control-label">Template</label>

                    <div className="col-sm-8">
                        <DropdownList
                            id="templates"
                            data={templates}
                            textField='title'
                            onChange={value => this.setState({ value })}/>
                    </div>
                </div>
                <DoodleTemplate template={selectedTemplate}/>

                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

DoodlePlanner.propTypes = {
    selectedTemplate: PropTypes.object.isRequired,
    templates: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        selectedTemplate: state.selectedTemplate,
        templates: state.templates
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(DoodleActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoodlePlanner)
