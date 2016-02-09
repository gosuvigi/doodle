/**
 * Created by vigi on 8/24/15.
 */
import React from 'react/addons'
import {connect} from 'react-redux'
import {Input, ButtonInput} from 'react-bootstrap'
import ExampleInput from './ExampleInput'
import {DropdownList, DateTimePicker, Multiselect} from 'react-widgets'
import * as actionCreators from '../actions/actions'

export const DoodleForm = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getNextDayOfWeek: function (dayOfWeek) {
        var resultDate = new Date();
        resultDate.setHours(21, 0, 0, 0);

        resultDate.setDate(resultDate.getDate() + (7 + dayOfWeek - resultDate.getDay()) % 7);

        return resultDate;
    },

    render: function () {
        return (
            <form>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label htmlFor="templates">Template</label>
                        <DropdownList id='templates' ref="templates" valueField='id' textField='name'
                                      data={this.props.templates.toArray()} placeholder="Select a template"
                                      onChange={selected => this.props.selectDoodleTemplate(selected)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <ExampleInput type="text" label="Title" ref="title" id="title" placeholder="Title"
                               className="form-control" text={this.props.selectedTemplate.title}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <ExampleInput type="text" label="Location" ref="location" id="location" placeholder="Location"
                               className="form-control" text={this.props.selectedTemplate.location}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label htmlFor="dateTime">Date / Time</label>
                        <DateTimePicker ref="dateTime" id="dateTime" defaultValue={this.getNextDayOfWeek(1)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Initiator" ref="initiator" id="initiator" placeholder="Initiator"
                               className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label htmlFor="emailText">Email Text</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label htmlFor="recipients">Recipients</label>
                        <Multiselect ref="recipients" id="recipients" valueField='id'
                                     textField={item => item.firstName + ' ' + item.email}/>
                    </div>
                </div>
                <div className="row">
                    <ButtonInput type="submit" className="btn btn-primary col-md-offset-5 col-md-2">Submit</ButtonInput>
                </div>
            </form>
        );
    }
});

function mapStateToProps(state) {
    return {
        templates: state.get('templates'),
        selectedTemplate: state.get('selectedTemplate')
    };
}

export const DoodleFormContainer = connect(mapStateToProps, actionCreators)(DoodleForm);


