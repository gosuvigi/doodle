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
var BootstrapCss = require('../css/bootstrap.css');
var ReactWidgetsCss = require('../css/react-widgets.css');

var stores = {
    DoodleStore: new DoodleStore()
};
var actions = DoodleActions;

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("DoodleStore")],

    getInitialState: function () {
        return {
            selectedTemplate: {}
        };
    },
    getStateFromFlux: function () {
        var store = this.getFlux().store("DoodleStore");
        return {
            loading: store.loading,
            error: store.error,
            templates: store.templates
        };
    },
    updateDoodleTemplateSelection: function (selected) {
        this.setState({selectedTemplate: selected});
    },
    render: function () {
        return (
            <div>
                <DoodleForm selectedTemplate={this.state.selectedTemplate} templates={this.state.templates}
                            changeHandler={this.updateDoodleTemplateSelection}/>
            </div>
        );
    },
    componentDidMount: function () {
        this.getFlux().actions.loadDoodleTemplates();
    }
});

React.render(
    <Application flux={flux}/>,
    document.getElementById('doodleMainForm')
);
