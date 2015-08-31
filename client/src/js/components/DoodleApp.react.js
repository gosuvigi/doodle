/**
 * Created by ratoico on 8/24/15.
 */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactWidgets = require('react-widgets');

var DropdownList = ReactWidgets.DropdownList;
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;
var DateTimePicker = ReactWidgets.DateTimePicker;
var Multiselect = ReactWidgets.Multiselect;

var DoodleForm = React.createClass({

    render: function () {
        return (
            <form>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="templates">Template</label>
                        <DropdownList id='templates' valueField='id' textField='name' data={this.props.templates}
                                      onChange={value => console.log(value.toSource())}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Title" ref="title" placeholder="Title"
                               defaultValue={this.props.selectedTemplate.title} className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Location" ref="location" placeholder="Location"
                               defaultValue={this.props.selectedTemplate.location} className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="dateTime">Date / Time</label>
                        <DateTimePicker id="dateTime"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Initiator" ref="initiator" placeholder="Initiator"
                               defaultValue={this.props.selectedTemplate.initiator} className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="emailText">Email Text</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="recipients">Recipients</label>
                        <Multiselect id="recipients" valueField='id'
                                     textField={item => item.firstName + ' ' + item.email}
                                     data={this.props.selectedTemplate.recipients}/>
                    </div>
                </div>
                <div className="row">
                    <ButtonInput type="submit" className="btn btn-primary col-md-offset-5 col-md-2">Submit</ButtonInput>
                </div>
            </form>
        );
    }
});

module.exports = DoodleForm;
