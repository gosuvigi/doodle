/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Fluxxor = require('fluxxor');
var DoodleForm = require('./components/DoodleApp.react');
var DoodleActions = require('./actions/DoodleActions');
var DoodleStore = require('./stores/DoodleStore');
//var data = [{"id":1,"name":"indoor","title":"football indoor","location":"the wall","dateTime":1440751306255,"initiator":"hodor 1","emailText":"text 1","recipients":[{"id": 666, "firstName":"gogu","lastName":null,"email":"gogu@gogu.com","active":false},{"id": 667, "firstName":"hodor","lastName":null,"email":"hodor@hodor.com","active":false}]},{"id":2,"name":"outdoor","title":"football outdoor","location":"vub","dateTime":1440751306256,"initiator":"hodor 2","emailText":"please come before 20:50","recipients":[{"id": 666, "firstName":"gogu","lastName":null,"email":"gogu@gogu.com","active":false},{"firstName":"hodor","lastName":null,"email":"hodor@hodor.com","active":false}]}];

var stores = {
    DoodleStore: new DoodleStore()
};
var actions = DoodleActions;

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("DoodleStore")],

    getInitialState: function() {
        return {
            selectedTemplate: {
                title: "",
                location: "",
                initiator: "",
                recipients: []
            }
        };
    },
    getStateFromFlux: function() {
        var store = this.getFlux().store("DoodleStore");
        return {
            loading: store.loading,
            error: store.error,
            templates: store.templates
        };
    },
    render: function() {
        return (
            <div>
                <DoodleForm selectedTemplate={this.state.selectedTemplate} templates={this.state.templates}/>
            </div>
        );
    },
    componentDidMount: function() {
        this.getFlux().actions.loadDoodleTemplates();
    }
});

React.render(
    <Application flux={flux}/>,
    document.getElementById('doodleMainForm')
);
