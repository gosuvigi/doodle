/**
 * Created by ratoico on 8/24/15.
 */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
//var ReactQuill = require('react-quill');
var ReactWidgets = require('react-widgets');

var DropdownList = ReactWidgets.DropdownList;
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;
var DateTimePicker = ReactWidgets.DateTimePicker;

var DoodleForm = React.createClass({

    render: function () {
        return (
            <form>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="templates">Template</label>
                        <DropdownList id='templates' valueField='id' textField='name'/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <Input type="text" label="Title hodor" placeholder="Title"/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-offset-2 col-md-8">
                        <label for="location">Location</label>
                        <input type="text" className="form-control" id="location" placeholder="Location"/>
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
                        <label for="initiator">Initiator</label>
                        <input type="text" className="form-control" id="initiator" placeholder="Initiator"/>
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
                        <input type="text" className="form-control" id="recipients" placeholder="Recipients"/>
                    </div>
                </div>
                <div className="row">
                    <ButtonInput type="submit"
                                 className="btn btn-primary col-md-offset-5 col-md-2">Submit</ButtonInput>
                </div>
            </form>
        );
    }
});

module.exports = DoodleForm;
