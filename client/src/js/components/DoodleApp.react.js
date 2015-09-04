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

    selectDoodleTemplate: function (newValue) {
        this.props.changeHandler(newValue);
    },
    getNextDayOfWeek: function (dayOfWeek) {
        var resultDate = new Date();
        resultDate.setHours(21, 0, 0, 0);

        resultDate.setDate(resultDate.getDate() + (7 + dayOfWeek - resultDate.getDay()) % 7);

        return resultDate;
    },
    handleChange: function(event) {
        console.log('event: ' + event.target.value);
        this.setState({value: event.target.value});
    },

    render: function () {
        return (
            <form>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="templates">Template3</label>
                        <DropdownList id='templates' ref="templates" valueField='id' textField='name'
                                      data={this.props.templates}
                                      onChange={value => this.selectDoodleTemplate(value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Title" ref="title" id="title" placeholder="Title"
                               value={this.props.selectedTemplate.title}
                               onChange={this.handleChange}
                               className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Location" ref="location" id="location" placeholder="Location"
                               value={this.props.selectedTemplate.location}
                               onChange={value => this.setState({ value: this.refs.location.getValue() })}
                               className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="dateTime">Date / Time</label>
                        <DateTimePicker ref="dateTime" id="dateTime" defaultValue={this.getNextDayOfWeek(1)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Initiator" ref="initiator" id="initiator" placeholder="Initiator"
                               value={this.props.selectedTemplate.initiator}
                               onChange={value => this.setState({ value: this.refs.initiator.getValue() })}
                               className="form-control"/>
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
                        <Multiselect ref="recipients" id="recipients" valueField='id'
                                     textField={item => item.firstName + ' ' + item.email}
                                     data={this.props.selectedTemplate.recipients}
                                     //value={this.props.selectedTemplate.recipients}
                                     onChange={value => this.setState({value: value})}/>
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
