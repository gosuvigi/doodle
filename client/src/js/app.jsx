/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import DoodleForm from './components/DoodleForm'
import BootstrapCss from '../css/bootstrap.css'
import ReactWidgetsCss from '../css/react-widgets.css'

var Application = React.createClass({

    render: function () {
        return (
            <div>
                <DoodleForm/>
            </div>
        );
    }
});

React.render(
    <Application/>,
    document.getElementById('doodleMainForm')
);
