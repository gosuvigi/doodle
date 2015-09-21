/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import {Route, DefaultRoute} from 'react-router'
import {DoodleFormContainer} from './components/DoodleForm'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import {loadDoodleTemplates} from './action_creators'

import BootstrapCss from '../css/bootstrap.css'
import ReactWidgetsCss from '../css/react-widgets.css'

const store = createStore(reducer);

const templates = [{
    "id": 1,
    "name": "indoor",
    "title": "football indoor",
    "location": "the wall",
    "dateTime": 1442839798856,
    "initiator": "hodor 1",
    "emailText": "text 1",
    "recipients": [{
        "id": 666,
        "firstName": "gogu",
        "lastName": null,
        "email": "gogu@gogu.com",
        "active": false
    }, {"id": 667, "firstName": "hodor", "lastName": null, "email": "hodor@hodor.com", "active": false}]
}, {
    "id": 2,
    "name": "outdoor",
    "title": "football outdoor",
    "location": "vub",
    "dateTime": 1442839798858,
    "initiator": "hodor 2",
    "emailText": "please come before 20:50",
    "recipients": [{
        "id": null,
        "firstName": "gogu",
        "lastName": null,
        "email": "gogu@gogu.com",
        "active": false
    }, {"id": null, "firstName": "hodor", "lastName": null, "email": "hodor@hodor.com", "active": false}]
}];

store.dispatch(loadDoodleTemplates(templates));

var Application = React.createClass({

    render: function () {
        return (
            <div>
                <DoodleFormContainer/>
            </div>
        );
    }
});

React.render(
    <Provider store={store}>
        {() => <Application/>}
    </Provider>,
    document.getElementById('doodleMainForm')
);
